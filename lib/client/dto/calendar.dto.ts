export type CalendarDto = {
    id: number;
    googleCalendarId: string;
    googleCalendarName: string;
    status: 'DISCONNECTED' | 'CONNECTED' | 'PENDING';
    accessRole: 'none' | 'freeBusyReader' | 'reader' | 'writer' | 'owner';
    notionPropertyId: string;
    createdAt: string;
};

export type GoogleCalendarDto = {
    id: string;
    summary: string;
    primary: boolean;
    accessRole: 'none' | 'freeBusyReader' | 'reader' | 'writer' | 'owner';
    backgroundColor: string;
    foregroundColor: string;
};
