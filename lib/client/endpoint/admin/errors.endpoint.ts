import { Endpoint } from 'endpoint-client';
import { CalendarDto, ErrorLogDto, PaymentLogDto, UserDto } from '../../dto';

// GET /admin/errors
export type getAdminErrorsParameter = {
    page: number;
    pageSize: number;
    userId?: number;
};
export const getAdminErrors: Endpoint<getAdminErrorsParameter, getAdminErrorsResponse> = {
    method: 'GET',
    path: () => `/admin/errors`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['page', 'pageSize', 'userId'],
};
export type getAdminErrorsResponse = {
    errorLogs: (ErrorLogDto & {
        user: UserDto;
    })[];
};

// DELETE /admin/error/:errorId
export type deleteAdminErrorParameter = {
    errorId: number;
};
export const deleteAdminError: Endpoint<deleteAdminErrorParameter, deleteAdminErrorResponse> = {
    method: 'DELETE',
    path: (e) => `/admin/error/${e.errorId}`,
    bodyParams: [],
    pathParams: ['errorId'],
    queryParams: [],
};
export type deleteAdminErrorResponse = {};
