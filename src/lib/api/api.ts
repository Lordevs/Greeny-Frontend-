import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import {
    clearAuthCookies,
    getAuthTokens,
    setAuthCookies,
    setCookie,
} from "@/lib/cookies";
import { getApiBaseUrl } from "./config";

const BACKEND_URL = getApiBaseUrl();

interface PendingRequest {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

export class ApiClient {
    private axios: AxiosInstance;
    private isRefreshing = false;
    private queue: PendingRequest[] = [];

    constructor() {
        this.axios = axios.create({
            baseURL: BACKEND_URL,
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });

        this.axios.interceptors.request.use(this.attachAccessToken.bind(this));
        this.axios.interceptors.response.use(
            (res) => res,
            this.handleResponseError.bind(this),
        );
    }

    private attachAccessToken(config: InternalAxiosRequestConfig) {
        const url = config.url ?? "";
        const pathOnly = url.split("?")[0];

        // Paths that don't need the Authorization header
        const authBypassPaths = [
            API_ROUTES.AUTH.REFRESH,
            API_ROUTES.AUTH.LOGIN,
            API_ROUTES.AUTH.REGISTER,
        ].filter(Boolean) as string[];

        const shouldBypass = authBypassPaths.some((p) => pathOnly.includes(p));

        if (shouldBypass) {
            return config;
        }

        const token = getAuthTokens().accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }

    private async refreshAccessToken(): Promise<string> {
        try {
            const { refreshToken } = getAuthTokens();
            if (!refreshToken) throw new Error("No refresh token available");

            // Use a clean axios instance to avoid interceptor recursion
            const response = await axios.post(
                `${BACKEND_URL}${API_ROUTES.AUTH.REFRESH}`,
                { refresh: refreshToken },
                { withCredentials: true },
            );

            const data = response.data;
            const newAccess = data.access || data.access_token;
            const newRefresh = data.refresh || data.refresh_token;

            if (!newAccess) {
                throw new Error("Refresh endpoint did not return an access token");
            }

            if (newRefresh) {
                setAuthCookies(newAccess, newRefresh);
            } else {
                setCookie("access_token", newAccess, 7);
            }

            return newAccess;
        } catch (error) {
            console.error("ApiClient: Refresh token failed", error);
            throw error;
        }
    }

    private processQueue(error: unknown, token: string | null = null) {
        this.queue.forEach(({ resolve, reject }) => {
            if (error) reject(error);
            else resolve(token!);
        });
        this.queue = [];
    }

    private async handleResponseError(error: AxiosError) {
        const originalReq = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalReq._retry) {
            // If the failed request IS the refresh request, do not retry
            if (originalReq.url?.includes(API_ROUTES.AUTH.REFRESH)) {
                this.redirectToLogin();
                return Promise.reject(error);
            }

            originalReq._retry = true;

            if (this.isRefreshing) {
                return new Promise((resolve, reject) => {
                    this.queue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalReq.headers) {
                            originalReq.headers.Authorization = `Bearer ${token}`;
                        }
                        return this.axios.request(originalReq);
                    })
                    .catch((err) => Promise.reject(err));
            }

            this.isRefreshing = true;
            try {
                const newToken = await this.refreshAccessToken();
                this.isRefreshing = false;
                this.processQueue(null, newToken);

                if (originalReq.headers) {
                    originalReq.headers.Authorization = `Bearer ${newToken}`;
                }
                return this.axios.request(originalReq);
            } catch (refreshError) {
                this.isRefreshing = false;
                this.processQueue(refreshError, null);
                this.redirectToLogin();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }

    private redirectToLogin() {
        clearAuthCookies();
        if (typeof window !== "undefined") {
            window.location.href = `${ROUTES.AUTH.LOGIN}?force=true`;
        }
    }


    public get instance(): AxiosInstance {
        return this.axios;
    }
}

export const api = new ApiClient().instance;
