import {MainLayout} from "@/widgets";
import type {ReactNode} from "react";
import s from './ProfileLayout.module.scss'
import {NavLink, type NavLinkRenderProps} from "react-router-dom";
import {routes} from "@/app/routes";
import clsx from "clsx";

interface ProfileLayoutProps {
    children?: ReactNode;
}

export function ProfileLayout(props: ProfileLayoutProps){
    const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
        isActive ? clsx(s.navLink, s.active) : s.navLink
    return (
        <MainLayout>
            <div className={s.profileLayout}>
                <aside className={s.aside}>
                    <NavLink className={getLinkClass} to={routes.user.profile}>Профиль</NavLink>
                    <NavLink className={getLinkClass} to={routes.user.profileHistory}>История заказов</NavLink>
                </aside>
                <div className={s.mainContent}>
                    {props.children}
                </div>
            </div>
        </MainLayout>
    )
}