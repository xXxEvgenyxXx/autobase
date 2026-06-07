import {MainLayout} from "@/widgets";
import type {ReactNode} from "react";
import {NavLink, type NavLinkRenderProps} from "react-router-dom";
import {routes} from "@/app/routes";
import s from './AdminLayout.module.scss'
import clsx from "clsx";

interface AdminLayoutProps {
    children?: ReactNode;
}

export function AdminLayout(props: AdminLayoutProps) {
    const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
        isActive ? clsx(s.navLink, s.active) : s.navLink
    return (
        <MainLayout>
            <div className={s.adminLayout}>
                <aside className={s.aside}>
                    <NavLink className={getLinkClass} to={routes.admin.dashboard}>Статистика</NavLink>
                </aside>
                <div className={s.mainContent}>
                    {props.children}
                </div>
            </div>
        </MainLayout>
    )
}