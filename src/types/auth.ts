export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar?: string;
}

export interface UserProfile extends User {
    date_joined: string;
    last_login: string;
}

export interface Tokens {
    access: string;
    refresh: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}


export interface LoginResponse {
    user: User;
    tokens: Tokens;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
}

export interface RegisterResponse {
    user: User;
    tokens: Tokens;
    message: string;
}

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
}
