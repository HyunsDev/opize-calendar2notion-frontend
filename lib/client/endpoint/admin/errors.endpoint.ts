import { Endpoint } from 'endpoint-client';
import { CalendarDto, ErrorLogDto, PaymentLogDto, UserDto } from '../../dto';

// GET /admin/errors
export type GetAdminErrorsParameter = {
    page: number;
    pageSize: number;
    userId?: number;
};
export type GetAdminErrorsResponse = {
    errorLogs: (ErrorLogDto & {
        user: UserDto;
    })[];
};
export const getAdminErrors: Endpoint<GetAdminErrorsParameter, GetAdminErrorsResponse> = {
    method: 'GET',
    path: () => `/admin/errors`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['page', 'pageSize', 'userId'],
};

// DELETE /admin/error/:errorId
export type DeleteAdminErrorParameter = {
    errorId: number;
};
export type DeleteAdminErrorResponse = {};

export const deleteAdminError: Endpoint<DeleteAdminErrorParameter, DeleteAdminErrorResponse> = {
    method: 'DELETE',
    path: (e) => `/admin/error/${e.errorId}`,
    bodyParams: [],
    pathParams: ['errorId'],
    queryParams: [],
};
