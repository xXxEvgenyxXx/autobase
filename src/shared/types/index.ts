export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    surname: string;
    patronymic?: string;
    email: string;
    roleId: number;
    role?: Role; // если будете включать связанную роль в ответ
}

export interface UserCreate {
    name: string;
    surname: string;
    patronymic?: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UserUpdate {
    name?: string;
    surname?: string;
    patronymic?: string;
    email?: string;
    password?: string;
    roleId?: number;
}

export interface Driver {
    id: number;
    userId: number;
    isBusy: number;
    userName?: string; // если джойните в запросе
    userSurname?: string;
}

export interface DriverCreate {
    userId: number;
    isBusy?: number;
}

export interface DriverUpdate {
    isBusy: number;
}

export interface OrderStatus {
    id: number;
    name: string;
}

export interface OrderType {
    id: number;
    name: string;
    shortDesc: string;
}

export interface Order {
    id: number;
    userId: number;
    typeId: number;
    statusId: number;
    driverId: number;
    departure: string;
    destination: string;
    price: number;
    userName?: string;
}

export interface OrderCreate {
    userId: number;
    typeId: number;
    statusId: number;
    driverId: number;
    departure: string;
    destination: string;
    price: number;
}

export interface OrderUpdate {
    userId?: number;
    typeId?: number;
    statusId?: number;
    driverId?: number;
    departure?: string;
    destination?: string;
    price?: number;
}

export interface DriverOrder {
    driverId: number;
    orderId: number;
    driverUserId?: number;
}

// Универсальный ответ сервера
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}