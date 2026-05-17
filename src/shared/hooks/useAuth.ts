import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Симуляция проверки токена
        const token = localStorage.getItem('token');
        setTimeout(() => {
            setIsAuthenticated(!!token);
            setIsLoading(false);
        }, 1000);
    }, []);

    return { isAuthenticated, isLoading };
};