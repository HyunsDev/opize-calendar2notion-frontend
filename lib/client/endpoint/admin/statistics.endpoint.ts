import { Endpoint } from 'endpoint-client';
import { CalendarDto, PaymentLogDto, UserDto } from '../../dto';

// GET /admin/statistics
export type GetAdminStatisticsParameter = {};
export type GetAdminStatisticsResponse = {
    user: {
        all: number;
        plan: {
            free: number;
            pro: number;
        };
        connect: {
            connected: number;
            disconnected: number;
        };
    };
    calendar: number;
    money: number;
};

export const getAdminStatistics: Endpoint<GetAdminStatisticsParameter, GetAdminStatisticsResponse> = {
    method: 'GET',
    path: () => '/admin/statistics',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
