import { useState, useEffect, useMemo } from 'react';
import { Table, Select, Input, Space, message, Spin } from 'antd';
import { ProfileLayout } from '@/widgets';
import { getOrders } from '@/shared/api/orders';
import { getOrderStatuses } from '@/shared/api/orderStatuses';
import { getDrivers } from '@/shared/api/drivers';
import { getUser } from '@/shared/api/auth';
import type { Order, OrderStatus } from '@/shared/types';
import s from './ProfileDriverOrdersPage.module.scss'

const { Option } = Select;

export function ProfileDriverOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [statuses, setStatuses] = useState<OrderStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const user = getUser();

    // Фильтры
    const [filterStatus, setFilterStatus] = useState<number | null>(null);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        if (!user) {
            message.error('Пользователь не авторизован');
            setLoading(false);
            return;
        }

        // Загружаем статусы и всех водителей (чтобы найти driverId)
        Promise.all([getOrderStatuses(), getDrivers()])
            .then(([statusesData, drivers]) => {
                setStatuses(statusesData);
                const currentDriver = drivers.find((d) => d.userId === user.id);
                if (!currentDriver) {
                    message.warning('Вы не зарегистрированы как водитель');
                    setLoading(false);
                    return;
                }

                // Загружаем заказы и фильтруем по driverId
                return getOrders().then((allOrders) => {
                    const driverOrders = allOrders.filter(
                        (order) => order.driverId === currentDriver.id
                    );
                    setOrders(driverOrders);
                });
            })
            .catch(() => message.error('Ошибка загрузки данных'))
            .finally(() => setLoading(false));
    }, [user]);

    // Фильтрация на клиенте
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            if (filterStatus && order.statusId !== filterStatus) return false;

            if (searchName.trim()) {
                const fullName =
                    `${order.userSurname} ${order.userName} ${order.userPatronymic || ''}`
                        .toLowerCase();
                if (!fullName.includes(searchName.toLowerCase().trim())) return false;
            }

            return true;
        });
    }, [orders, filterStatus, searchName]);

    const columns = [
        {
            title: 'ID заказа',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Заказчик',
            key: 'user',
            render: (_: any, record: Order) =>
                `${record.userSurname} ${record.userName} ${record.userPatronymic || ''}`,
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
            <div className={s.driverOrders}>
                <h2>Мои заказы (как водитель)</h2>

                <Space style={{ marginBottom: 16 }} wrap>
                    <Select
                        allowClear
                        placeholder="Все статусы"
                        style={{ width: 200 }}
                        value={filterStatus}
                        onChange={(val) => setFilterStatus(val)}
                    >
                        {statuses.map((s) => (
                            <Option key={s.id} value={s.id}>
                                {s.name}
                            </Option>
                        ))}
                    </Select>

                    <Input
                        placeholder="Поиск по заказчику (ФИО)"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        allowClear
                        style={{ width: 250 }}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredOrders}
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