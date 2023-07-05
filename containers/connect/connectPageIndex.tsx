export const connectPageIndex = {
    GOOGLE_LOGIN: 0,
    CHECK_MIGRATION: 1,
    CHECK_EXIST: 2,

    NEW_CONNECT: {
        NOTION_API: 100,
        FINISH: 101,
    },

    MIGRATE_CONNECT: {
        NOTION_API: 200,
        MIGRATION: 201,
        FINISH: 202,
    },

    EXIST_CONNECT: {
        NOTION_API: 300,
        DATABASE: 301,
        FINISH: 302,
    },
} as const;
