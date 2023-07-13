export const editableProps = {
    name: 'string',
    email: 'string',
    imageUrl: 'string',
    opizeId: 'number',
    opizeAccessToken: 'string',
    googleId: 'string',
    googleAccessToken: 'string',
    googleEmail: 'string',
    googleRefreshToken: 'string',
    notionAccessToken: 'string',
    notionBotId: 'string',
    notionDatabaseId: 'string',
    lastCalendarSync: 'string',
    lastSyncStatus: 'string',
    status: ['FIRST', 'GOOGLE_SET', 'NOTION_API_SET', 'NOTION_SET', 'FINISHED'],
    isConnected: 'boolean',
    userPlan: ['FREE', 'PRO'],
    userTimeZone: 'string',
    notionProps: 'string',
    isWork: 'boolean',
};