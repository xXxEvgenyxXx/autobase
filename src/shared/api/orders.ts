import apiClient from './client';
import type { Order, OrderCreate, OrderUpdate } from '../types';

export const getOrders = (): Promise<Order[]> => apiClient.get('/orders');
export const getOrder = (id: number): Promise<Order> => apiClient.get(`/orders/${id}`);
export const createOrder = (data: OrderCreate) => apiClient.post('/orders', data);
export const updateOrder = (id: number, data: OrderUpdate) => apiClient.put(`/orders/${id}`, data);
export const deleteOrder = (id: number) => apiClient.delete(`/orders/${id}`);