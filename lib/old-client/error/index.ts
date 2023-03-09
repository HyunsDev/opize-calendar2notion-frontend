import { AxiosResponse, AxiosResponseHeaders } from 'axios';
import { APIErrorCode, ClientErrorCode, OpizeErrorCode } from './errorCode';
import { isObject } from './utils';

abstract class OpizeErrorBase<Code extends OpizeErrorCode> extends Error {
    abstract code: Code;
}

export type OpizeClientError = RequestTimeoutError;

export function isOpizeClientError(error: unknown): error is OpizeClientError {
    return isObject(error) && error instanceof OpizeErrorBase;
}

function isOpizeClientErrorWithCode<Code extends OpizeErrorCode>(
    error: unknown,
    codes: { [C in Code]: true }
): error is OpizeClientError & { code: Code } {
    return isOpizeClientError(error) && error.code in codes;
}

export class RequestTimeoutError extends OpizeErrorBase<ClientErrorCode.RequestTimeout> {
    readonly code = ClientErrorCode.RequestTimeout;
    readonly name = 'RequestTimeoutError';

    constructor(message = 'Request to Hyuns API has time out') {
        super(message);
    }

    static isRequestTimeoutError(error: unknown): error is RequestTimeoutError {
        return isOpizeClientErrorWithCode(error, {
            [ClientErrorCode.RequestTimeout]: true,
        });
    }

    static rejectAfterTimeout<T>(promise: Promise<T>, timeoutMS: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new RequestTimeoutError());
            }, timeoutMS);

            promise
                .then(resolve)
                .catch(reject)
                .then(() => clearTimeout(timeoutId));
        });
    }
}

type HTTPResponseErrorCode = ClientErrorCode.ResponseError | APIErrorCode;

class HTTPResponseError<Code extends HTTPResponseErrorCode> extends OpizeErrorBase<Code> {
    readonly name: string = 'HTTPResponseError';
    readonly code: Code;
    readonly status: number;
    readonly headers: AxiosResponseHeaders;
    readonly body: Record<string, any>;

    constructor(args: {
        code: Code;
        status: number;
        message: string;
        headers: AxiosResponseHeaders;
        body: Record<string, any>;
    }) {
        super(args.message);
        const { code, status, headers, body } = args;
        this.code = code;
        this.status = status;
        this.headers = headers;
        this.body = body;
    }
}

const httpResponseErrorCodes: { [C in HTTPResponseErrorCode]: true } = {
    [ClientErrorCode.ResponseError]: true,
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true,
};

export function isHTTPResponseError(error: unknown): error is UnknownHTTPResponseError | APIResponseError {
    return isOpizeClientErrorWithCode(error, httpResponseErrorCodes);
}

export class UnknownHTTPResponseError extends HTTPResponseError<ClientErrorCode.ResponseError> {
    readonly name = 'UnknownHTTPResponseError';

    constructor(args: {
        status: number;
        message: string | undefined;
        headers: AxiosResponseHeaders;
        body: Record<string, any>;
    }) {
        super({
            body: args.body,
            headers: args.headers,
            status: args.status,
            code: ClientErrorCode.ResponseError,
            message: args.message ?? `Request to Hyuns API failed with status: ${args.status}`,
        });
    }

    static isUnknownHTTPResponseError(error: unknown): error is UnknownHTTPResponseError {
        return isOpizeClientErrorWithCode(error, {
            [ClientErrorCode.ResponseError]: true,
        });
    }
}

const APIErrorCodes: { [C in APIErrorCode]: true } = {
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true,
};

export class APIResponseError extends HTTPResponseError<APIErrorCode> {
    readonly name = 'APIResponseError';

    static isAPIResponseError(error: unknown): error is APIResponseError {
        return isOpizeClientErrorWithCode(error, APIErrorCodes);
    }
}

export function buildRequestError(response: AxiosResponse): APIResponseError | UnknownHTTPResponseError {
    const apiErrorResponseBody = response.data;
    if (apiErrorResponseBody !== undefined) {
        return new APIResponseError({
            code: apiErrorResponseBody.code,
            message: apiErrorResponseBody.message,
            headers: response.headers as AxiosResponseHeaders,
            status: response.status,
            body: apiErrorResponseBody,
        });
    }
    return new UnknownHTTPResponseError({
        message: undefined,
        headers: response.headers as AxiosResponseHeaders,
        status: response.status,
        body: response.data,
    });
}
