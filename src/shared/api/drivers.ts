import apiClient from './client';
import type { Driver, DriverCreate, DriverUpdate } from '../types';

export const getDrivers = (): Promise<Driver[]> => apiClient.get('/drivers');
export const getDriver = (id: number): Promise<Driver> => apiClient.get(`/drivers/${id}`);
export const createDriver = (data: DriverCreate) => apiClient.post('/drivers', data);
export const updateDriver = (id: number, data: DriverUpdate) => apiClient.put(`/drivers/${id}`, data);
export const deleteDriver = (id: number) => apiClient.delete(`/drivers/${id}`);