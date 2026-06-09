import s from './AdminDashboardCard.module.scss'

interface AdminDashboardCardProps {
    title: string;
    statsNumber:number;
    icon: React.ReactNode
}

export function AdminDashboardCard(props: AdminDashboardCardProps){
    return (
        <div className={s.adminDashboardCard}>
            <div className={s.iconWrapper}>{props.icon}</div>
            <div className={s.info}>
                <span className={s.title}>{props.title}</span>
                <span className={s.statsNumber}>{props.statsNumber}</span>
            </div>
        </div>
    )
}