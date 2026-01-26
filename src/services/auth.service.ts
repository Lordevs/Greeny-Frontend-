import apiCaller from '@/lib/api/api-caller';
import { API_ROUTES } from '@/constants/api-routes';
import { setAuthCookies, clearAuthCookies, getAuthTokens } from '@/lib/cookies';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UserProfile,
    ChangePasswordRequest
} from '@/types/auth';

export const authService = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await apiCaller<LoginResponse>(API_ROUTES.AUTH.LOGIN, 'POST', data);
        if (response.tokens?.access && response.tokens?.refresh) {
            setAuthCookies(response.tokens.access, response.tokens.refresh);
        }
        return response;
    },

    async googleLogin(id_token: string): Promise<LoginResponse> {
        const response = await apiCaller<LoginResponse>(API_ROUTES.AUTH.GOOGLE, 'POST', { id_token });
        if (response.tokens?.access && response.tokens?.refresh) {
            setAuthCookies(response.tokens.access, response.tokens.refresh);
        }
        return response;
    },


    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await apiCaller<RegisterResponse>(API_ROUTES.AUTH.REGISTER, 'POST', data);
        if (response.tokens?.access && response.tokens?.refresh) {
            setAuthCookies(response.tokens.access, response.tokens.refresh);
        }
        return response;
    },

    async logout(): Promise<void> {
        try {
            const { refreshToken } = getAuthTokens();
            await apiCaller(API_ROUTES.AUTH.LOGOUT, 'POST', { refresh: refreshToken });
        } finally {
            clearAuthCookies();
        }
    },

    async getProfile(): Promise<UserProfile> {
        return apiCaller<UserProfile>(API_ROUTES.AUTH.USER);
    },

    async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
        return apiCaller<UserProfile>(API_ROUTES.AUTH.USER, 'PATCH', data);
    },

    async changePassword(data: ChangePasswordRequest): Promise<void> {
        return apiCaller(API_ROUTES.AUTH.CHANGE_PASSWORD, 'POST', data);
    },
};
