export type ErrorCode =
    | 'gcal_api_invalid_request'
    | 'gcal_api_invalid_credentials'
    | 'gcal_api_user_rate_limit_exceeded'
    | 'gcal_api_user_calendar_usage_limits_exceeded'
    | 'gcal_api_forbidden'
    | 'gcal_api_not_found'
    | 'gcal_api_gone_updated_min_too_long_ago'
    | 'gcal_api_gone'
    | 'gcal_api_internal_server_error'
    | 'gcal_api_unknown_error'
    | 'notion_api_invalid_request'
    | 'notion_api_database_not_found'
    | 'notion_api_page_not_found'
    | 'notion_api_rate_limit_exceeded'
    | 'notion_api_unauthorized'
    | 'notion_api_conflict_error'
    | 'notion_api_internal_server_error'
    | 'notion_api_service_unavailable'
    | 'notion_api_unknown_error'
    | 'notion_validation_error'
    | 'timeout';

export type ResolvableErrorCode = 'notion_api_database_not_found' | 'notion_validation_error';
