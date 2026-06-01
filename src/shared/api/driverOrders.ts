import apiClient from './client';
import type { DriverOrder, Order } from '../types';

export const getDriverOrders = (): Promise<DriverOrder[]> => {
    return apiClient.get('/driver-orders');
};

export const getOrdersByDriver = (driverId: number): Promise<Order[]> => {
    return apiClient.get(`/driver-orders/driver/${driverId}`);
};

export const attachDriverToOrder = (
    driverId: number,
    orderId: number
): Promise<{ message: string }> => {
    return apiClient.post('/driver-orders', { driverId, orderId });
};

export const detachDriverFromOrder = (
    driverId: number,
    orderId: number
): Promise<{ message: string }> => {
    return apiClient.delete('/driver-orders', { data: { driverId, orderId } });
};