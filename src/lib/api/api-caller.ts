import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "./api";

export type RequestData =
    | Record<
        string,
        string | number | boolean | File | Blob | string[] | null | undefined
    >
    | FormData;

/**
 * Standardized API caller utility.
 * Handles JSON and FormData automatically.
 */
export default async function apiCaller<T = unknown>(
    url: string,
    method: AxiosRequestConfig["method"] = "GET",
    data?: RequestData | any,
    options: AxiosRequestConfig = {},
    dataType: "json" | "formdata" = "json"
): Promise<T> {
    const config: AxiosRequestConfig = {
        ...options,
        url,
        method,
        headers: { ...(options.headers || {}) },
    };

    if (data) {
        if (dataType === "formdata") {
            if (data instanceof FormData) {
                config.data = data;
            } else {
                const formData = new FormData();
                Object.entries(data as Record<string, unknown>).forEach(
                    ([key, value]) => {
                        if (value instanceof File) {
                            formData.append(key, value, value.name);
                        } else if (value instanceof Blob) {
                            formData.append(key, value);
                        } else if (value !== null && value !== undefined) {
                            formData.append(key, String(value));
                        }
                    }
                );
                config.data = formData;
            }
            // SIGNAL TO AXIOS: let it set the boundary
            if (config.headers) {
                config.headers["Content-Type"] = undefined;
            }
        } else {
            config.data = data;
            if (config.headers && !config.headers["Content-Type"]) {
                config.headers["Content-Type"] = "application/json";
            }
        }
    }

    const response: AxiosResponse<T> = await api.request<T>(config);
    return response.data;
}
