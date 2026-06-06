import apiClient from './client';
import type { LoginRequest, RegisterRequest, AuthResponse} from '@/shared/types';

export const login = (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', data);
};

export const register = (data: RegisterRequest): Promise<{ id: number; message: string }> => {
    return apiClient.post('/users', data);
};

// ----- token -----
export const saveToken = (token: string) => {
    localStorage.setItem('token', token);
};
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};
export const removeToken = () => {
    localStorage.removeItem('token');
};

// ----- user -----
export const saveUser = (user: AuthResponse['user']) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): AuthResponse['user'] | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

// ----- выход -----
export const logout = () => {
    removeToken();
    removeUser();
};