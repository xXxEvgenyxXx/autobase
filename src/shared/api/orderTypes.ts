import apiClient from './client';
import type { OrderType } from '../types';

export const getOrderTypes = (): Promise<OrderType[]> => {
    return apiClient.get('/order-types');
};

export const getOrderType = (id: number): Promise<OrderType> => {
    return apiClient.get(`/order-types/${id}`);
};

export const createOrderType = (
    name: string,
    shortDesc: string
): Promise<{ id: number; message: string }> => {
    return apiClient.post('/order-types', { name, shortDesc });
};

export const updateOrderType = (
    id: number,
    name: string,
    shortDesc: string
): Promise<{ message: string }> => {
    return apiClient.put(`/order-types/${id}`, { name, shortDesc });
};

export const deleteOrderType = (id: number): Promise<{ message: string }> => {
    return apiClient.delete(`/order-types/${id}`);
};