import apiClient from './client';

export const getAdminStats = (): Promise<{
    newOrders: number;
    cancelledOrders: number;
    problemOrders: number;
    totalDrivers: number;
    freeDrivers: number;
}> => apiClient.get('/admin/stats');