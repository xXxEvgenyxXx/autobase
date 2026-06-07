import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks';
import { getUser } from '@/shared/api/auth';
import type { JSX } from 'react';

interface AdminRouteProps {
    children: JSX.Element;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Пока идёт проверка токена
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    // Если вообще не авторизован – на страницу входа
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Проверяем роль из localStorage (синхронно)
    const user = getUser();
    const isAdmin = user?.roleId === 2; // 2 = Администратор

    if (!isAdmin) {
        // Обычный пользователь или водитель – на главную
        return <Navigate to="/" replace />;
    }

    // Доступ разрешён
    return children;
};