/**
 * Shared API Configuration
 * Centralized configuration for API base URL
 */

export function getApiBaseUrl(): string {
    // Check NEXT_PUBLIC_BACKEND_URL first
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL.trim();
        // Remove trailing slash if present
        return url.replace(/\/+$/, "");
    }

    // Check BACKEND_URL (server-side only)
    if (process.env.BACKEND_URL) {
        const url = process.env.BACKEND_URL.trim();
        return url.replace(/\/+$/, "");
    }

    // Default fallback for development
    return "http://127.0.0.1:8000/api/v1";
}

/**
 * Get the full API URL for a given route
 */
export function getApiUrl(route: string): string {
    const baseUrl = getApiBaseUrl();
    const cleanRoute = route.startsWith("/") ? route.slice(1) : route;
    return `${baseUrl}/${cleanRoute}`;
}
