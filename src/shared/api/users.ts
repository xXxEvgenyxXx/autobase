import apiClient from './client';
import type { User, UserCreate, UserUpdate } from '../types';

export const getUsers = (): Promise<User[]> => {
    return apiClient.get('/users');
};

export const getUser = (id: number): Promise<User> => {
    return apiClient.get(`/users/${id}`);
};

export const createUser = (data: UserCreate): Promise<{ id: number; message: string }> => {
    return apiClient.post('/users', data);
};

export const updateUser = (id: number, data: UserUpdate): Promise<{ message: string }> => {
    return apiClient.put(`/users/${id}`, data);
};

export const deleteUser = (id: number): Promise<{ message: string }> => {
    return apiClient.delete(`/users/${id}`);
};