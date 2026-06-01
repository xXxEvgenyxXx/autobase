import apiClient from './client';
import type { Role } from '../types';

export const getRoles = (): Promise<Role[]> => {
    return apiClient.get('/roles');
};

export const getRole = (id: number): Promise<Role> => {
    return apiClient.get(`/roles/${id}`);
};

export const createRole = (name: string): Promise<{ id: number; message: string }> => {
    return apiClient.post('/roles', { name });
};

export const updateRole = (id: number, name: string): Promise<{ message: string }> => {
    return apiClient.put(`/roles/${id}`, { name });
};

export const deleteRole = (id: number): Promise<{ message: string }> => {
    return apiClient.delete(`/roles/${id}`);
};