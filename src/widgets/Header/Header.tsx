import s from './Header.module.scss'
import { routes } from '@/app/routes'
import { Logo } from '@/widgets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import type { NavLinkRenderProps } from 'react-router-dom'
import clsx from 'clsx'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '@/shared/hooks/useAuth'
import { getUser, logout } from '@/shared/api/auth'
import { Button, Space } from 'antd'

export function Header() {
    const { isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()
    const user = getUser()

    const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
        isActive ? clsx(s.headerLink, s.active) : s.headerLink

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    if (isLoading) {
        return null
    }

    return (
        <header className={s.header}>
            <Logo />
            <div className={s.linksWrapper}>
                <NavLink className={getLinkClass} to={routes.everyone.main}>Главная</NavLink>
                <NavLink className={getLinkClass} to={routes.everyone.catalog}>Каталог</NavLink>
            </div>
            <div className={s.linksWrapper}>
                {!isAuthenticated ? (
                    <>
                        <Link className={s.headerLink} to={routes.everyone.login}>Войти</Link>
                        <Link className={s.headerLink} to={routes.everyone.register}>Регистрация</Link>
                    </>
                ) : (
                    <Space size="middle">
                        {(user?.roleId === 1 || user?.roleId === 2 || user?.roleId === 3) && (
                            <NavLink className={getLinkClass} to={routes.user.profile}>
                                <UserOutlined/>
                            </NavLink>
                        )}
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            className={s.headerLink}
                        />
                    </Space>
                )}
            </div>
        </header>
    )
}