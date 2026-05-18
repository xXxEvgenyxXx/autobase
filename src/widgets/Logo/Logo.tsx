import {Link} from "react-router-dom";
import {routes} from "@/app/routes";
import s from './Logo.module.scss'

export function Logo(){
    return (
        <Link className={s.logo} to={routes.everyone.main}>
            <h1>Автобаза-транс</h1>
        </Link>
    )
}