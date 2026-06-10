import { Link } from 'react-router-dom';
import s from './Footer.module.scss';
import { routesArray } from '@/app/routes';

export function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                {/* Колонка: Общие страницы */}
                <div className={s.column}>
                    <h3 className={s.title}>Навигация</h3>
                    <ul className={s.list}>
                        {routesArray.everyone.map((route) => (
                            <li key={route.path}>
                                <Link to={route.path} className={s.link}>
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Колонка: Личный кабинет */}
                <div className={s.column}>
                    <h3 className={s.title}>Личный кабинет</h3>
                    <ul className={s.list}>
                        {routesArray.user.map((route) => (
                            <li key={route.path}>
                                <Link to={route.path} className={s.link}>
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Колонка: О нас / Контакты (по желанию) */}
                <div className={s.column}>
                    <h3 className={s.title}>Контакты</h3>
                    <p className={s.text}>Телефон: +7 (999) 123-45-67</p>
                    <p className={s.text}>Email: info@autobase.ru</p>
                </div>
            </div>

            <div className={s.bottom}>
                <p>© {new Date().getFullYear()} Автобаза. Все права защищены.</p>
            </div>
        </footer>
    );
}