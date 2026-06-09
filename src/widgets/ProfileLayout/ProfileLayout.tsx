import { MainLayout } from "@/widgets";
import type { ReactNode } from "react";
import s from "./ProfileLayout.module.scss";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import { routes } from "@/app/routes";
import clsx from "clsx";
import { getUser } from "@/shared/api/auth";  // <-- добавлен импорт

interface ProfileLayoutProps {
    children?: ReactNode;
}

export function ProfileLayout(props: ProfileLayoutProps) {
    const user = getUser();                       // получаем пользователя
    const isDriver = user?.roleId === 3;

    const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
        isActive ? clsx(s.navLink, s.active) : s.navLink;

    return (
        <MainLayout>
            <div className={s.profileLayout}>
                <aside className={s.aside}>
                    <NavLink className={getLinkClass} to={routes.user.profile}>
                        Профиль
                    </NavLink>
                    <NavLink className={getLinkClass} to={routes.user.profileHistory}>
                        История заказов
                    </NavLink>
                    {isDriver && (
                        <NavLink className={getLinkClass} to={routes.user.driverOrders}>
                            Портфолио заказов
                        </NavLink>
                    )}
                </aside>
                <div className={s.mainContent}>{props.children}</div>
            </div>
        </MainLayout>
    );
}