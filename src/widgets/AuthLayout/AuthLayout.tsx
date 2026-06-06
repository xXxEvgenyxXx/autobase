import s from './AuthLayout.module.scss'
import type {ReactNode} from "react";
import {Link, NavLink, type NavLinkRenderProps} from "react-router-dom";
import {routes} from "@/app/routes";
import clsx from "clsx";
import {LeftOutlined} from "@ant-design/icons";

export interface AuthLayoutProps {
    children?: ReactNode
}

export function AuthLayout(props: AuthLayoutProps){
    const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
        isActive ? clsx(s.authLink, s.active) : s.authLink;
    return (
        <div className={s.authLayout}>
            <div className={s.formWrapper}>
                <p><Link to={routes.everyone.main}><LeftOutlined/> На главную</Link></p>
                <div className={s.selectBetweenForms}>
                    <NavLink className={getLinkClass} to={routes.everyone.login}>Вход</NavLink>
                    <NavLink className={getLinkClass} to={routes.everyone.register}>Регистрация</NavLink>
                </div>
                {props.children}
            </div>
        </div>
    )
}