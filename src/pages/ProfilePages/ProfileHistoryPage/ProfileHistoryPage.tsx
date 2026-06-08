import { useState, useEffect } from 'react';
import { Table, Spin, message } from 'antd';
import { ProfileLayout } from '@/widgets';
import { getOrders } from '@/shared/api/orders';
import { getUser } from '@/shared/api/auth';
import type { Order } from '@/shared/types';
import s from './ProfileHistoryPage.module.scss'

export function ProfileHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const user = getUser();

    useEffect(() => {
        if (!user) {
            message.error('Пользователь не авторизован');
            setLoading(false);
            return;
        }

        getOrders()
            .then((data) => {
                // Оставляем только заказы текущего пользователя
                const userOrders = data.filter((order) => order.userId === user.id);
                setOrders(userOrders);
            })
            .catch(() => message.error('Не удалось загрузить историю заказов'))
            .finally(() => setLoading(false));
    }, [user]);

    const columns = [
        {
            title: 'ID заказа',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Водитель',
            key: 'driver',
            render: (_: any, record: Order) => {
                if (!record.driverName) return '—';
                return `${record.driverSurname || ''} ${record.driverName || ''} ${record.driverPatronymic || ''}`;
            },
        },
        {
            title: 'Тип заказа',
            dataIndex: 'typeName',
            key: 'typeName',
        },
        {
            title: 'Статус',
            dataIndex: 'statusName',
            key: 'statusName',
        },
        {
            title: 'Отправление',
            dataIndex: 'departure',
            key: 'departure',
            ellipsis: true,
        },
        {
            title: 'Назначение',
            dataIndex: 'destination',
            key: 'destination',
            ellipsis: true,
        },
        {
            title: 'Цена (₽)',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            render: (price: number) => price.toLocaleString(),
        },
    ];

    if (loading) {
        return (
            <ProfileLayout>
                <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout>
            <div className={s.profileHistory}>
                <h1>Мои заказы</h1>
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: false,
                        pageSize: 10,
                        showQuickJumper: false,
                        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
                        itemRender: (page, type, originalElement) => {
                            if (type === 'prev') return <a>« Предыдущая</a>;
                            if (type === 'next') return <a>Следующая »</a>;
                            if (type === 'page') return <a>{page}</a>;
                            return originalElement;
                        },
                    }}
                />
            </div>
        </ProfileLayout>
    );
}