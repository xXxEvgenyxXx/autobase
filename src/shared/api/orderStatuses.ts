import apiClient from './client';
import type { OrderStatus } from '../types';

export const getOrderStatuses = (): Promise<OrderStatus[]> => {
    return apiClient.get('/order-statuses');
};

export const getOrderStatus = (id: number): Promise<OrderStatus> => {
    return apiClient.get(`/order-statuses/${id}`);
};

export const createOrderStatus = (name: string): Promise<{ id: number; message: string }> => {
    return apiClient.post('/order-statuses', { name });
};

export const updateOrderStatus = (id: number, name: string): Promise<{ message: string }> => {
    return apiClient.put(`/order-statuses/${id}`, { name });
};

export const deleteOrderStatus = (id: number): Promise<{ message: string }> => {
    return apiClient.delete(`/order-statuses/${id}`);
};