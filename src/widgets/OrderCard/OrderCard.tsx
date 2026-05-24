import s from './OrderCard.module.scss'
import {Button} from "antd";

interface orderCardProps {
    name:string;
    shortDescription:string;
}

export function OrderCard(props:orderCardProps) {
    return (
        <div className={s.orderCard}>
            <h3 className={s.title}>{props.name}</h3>
            <p className={s.desc}>{props.shortDescription}</p>
            <Button>Заказать услугу</Button>
        </div>
    )
}