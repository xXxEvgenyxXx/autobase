import s from './OrderCard.module.scss'
import {Button} from "antd";
import {routes} from "@/app/routes";

interface OrderCardProps {
    name: string;
    shortDescription: string;
    typeId: number;
}

export function OrderCard(props:OrderCardProps) {
    return (
        <div className={s.orderCard}>
            <h3 className={s.title}>{props.name}</h3>
            <p className={s.desc}>{props.shortDescription}</p>
            <Button
                variant="link"
                href={`${routes.user.orderForm}?typeId=${props.typeId}`}
            >
                Заказать услугу
            </Button>
        </div>
    )
}