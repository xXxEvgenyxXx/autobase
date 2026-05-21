import s from './Header.module.scss'
import {routes} from '@/app/routes'
import {Logo} from '@/widgets'
import {Link, NavLink} from "react-router-dom";
import type {NavLinkRenderProps} from "react-router-dom";
import clsx from "clsx";

export function Header(){
    const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
        isActive ? clsx(s.headerLink, s.active) : s.headerLink;
    return (
        <header className={s.header}>
            <Logo/>
            <div className={s.linksWrapper}>
                <NavLink className={getLinkClass} to={routes.everyone.main}>Главная</NavLink>
                <NavLink className={getLinkClass} to={routes.everyone.catalog}>Каталог</NavLink>
            </div>
            <div className={s.linksWrapper}>
                <Link className={s.headerLink} to={routes.everyone.login}>Войти</Link>
                <Link className={s.headerLink} to={routes.everyone.register}>Регистрация</Link>
            </div>
        </header>
    )
}