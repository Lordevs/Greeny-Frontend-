import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/constants/routes';
import { LoginRequest, RegisterRequest, UserProfile } from '@/types/auth';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { getAuthTokens } from '@/lib/cookies';


export const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();
    const normalizedPathname = pathname?.replace(/\/$/, '') || '';
    const isAuthPage = normalizedPathname === ROUTES.AUTH.LOGIN.replace(/\/$/, '') ||
        normalizedPathname === ROUTES.AUTH.SIGNUP.replace(/\/$/, '');



    const userQuery = useQuery({
        queryKey: ['user-profile'],
        queryFn: authService.getProfile,
        retry: false,
        // Disable on login/signup pages to avoid unnecessary calls
        // Also only fetch if we have a refresh token to avoid forced redirects on public pages
        enabled: typeof window !== 'undefined' && !isAuthPage && !!getAuthTokens().refreshToken,
    });


    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: (data) => {
            queryClient.setQueryData(['user-profile'], data.user);
            toast.success('Logged in successfully');
            router.push(ROUTES.CHAT.ROOT);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Login failed');
        },
    });

    const googleLoginMutation = useMutation({
        mutationFn: (id_token: string) => authService.googleLogin(id_token),
        onSuccess: (data) => {
            queryClient.setQueryData(['user-profile'], data.user);
            toast.success('Logged in with Google successfully');
            router.push(ROUTES.CHAT.ROOT);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Google login failed');
        },
    });


    const registerMutation = useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data),
        onSuccess: (data) => {
            queryClient.setQueryData(['user-profile'], data.user);
            toast.success(data.message || 'Account created');
            router.push(ROUTES.CHAT.ROOT);
        },
        onError: (error: any) => {
            const errors = error.response?.data;
            if (typeof errors === 'object') {
                Object.values(errors).flat().forEach((err: any) => toast.error(err as string));
            } else {
                toast.error('Registration failed');
            }
        },
    });

    const logout = async () => {
        try {
            await authService.logout();
            queryClient.setQueryData(['user-profile'], null);
            queryClient.clear();
            router.push(ROUTES.AUTH.LOGIN);
            toast.success('Logged out');
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if API fails, clear local state
            queryClient.setQueryData(['user-profile'], null);
            router.push(ROUTES.AUTH.LOGIN);
        }
    };

    return {
        user: userQuery.data,
        isLoading: userQuery.isLoading,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        googleLogin: googleLoginMutation.mutate,
        isGoogleLoggingIn: googleLoginMutation.isPending,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        logout,
    };
};

