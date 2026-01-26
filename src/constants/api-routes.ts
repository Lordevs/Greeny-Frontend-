export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login/',
        REGISTER: '/auth/register/',
        LOGOUT: '/auth/logout/',
        REFRESH: '/auth/refresh/',
        USER: '/auth/profile/',
        CHANGE_PASSWORD: '/auth/change-password/',
        GOOGLE: '/auth/google/',
    },

    FILES: {
        BASE: '/files/',
        INSIGHTS: (id: string) => `/files/${id}/insights/`,
    },
    CONVERSATIONS: {
        BASE: '/conversations/',
        DETAIL: (id: number | string) => `/conversations/${id}/`,
        ANALYZE: (id: number | string) => `/conversations/${id}/analyze/`,
        MESSAGES: (id: number | string) => `/conversations/${id}/messages/`,
        CLEAR_MESSAGES: (id: number | string) => `/conversations/${id}/clear_messages/`,
        CHANGE_MODEL: (id: number | string) => `/conversations/${id}/change_model/`,
    },

};
