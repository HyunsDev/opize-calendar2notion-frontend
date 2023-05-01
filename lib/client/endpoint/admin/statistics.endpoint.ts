import { Endpoint } from 'endpoint-client';
import { CalendarObject, PaymentLogObject, UserObject } from '../../object';

// GET /admin/statistics
export type getAdminStatisticsParameter = {};
export const getAdminStatistics: Endpoint<getAdminStatisticsParameter, getAdminStatisticsResponse> = {
    method: 'GET',
    path: () => '/admin/statistics',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getAdminStatisticsResponse = {
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
