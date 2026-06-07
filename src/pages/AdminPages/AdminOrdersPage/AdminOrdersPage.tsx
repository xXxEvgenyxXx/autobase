import { useState, useEffect, useMemo } from 'react';
import { Table, Select, Space, message, Spin, Typography } from 'antd';
import { AdminLayout } from '@/widgets';
import { getOrders, updateOrder } from '@/shared/api/orders';
import { getOrderStatuses } from '@/shared/api/orderStatuses';
import { getDrivers } from '@/shared/api/drivers';
import type { Order, OrderStatus, Driver } from '@/shared/types';

const { Text } = Typography;
const { Option } = Select;

export function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [statuses, setStatuses] = useState<OrderStatus[]>([]);
    const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);

    // Фильтры
    const [filterStatus, setFilterStatus] = useState<number | null>(null);
    const [filterDriver, setFilterDriver] = useState<number | null>(null);
    const [filterUser, setFilterUser] = useState<string>(''); // поиск по ФИО заказчика

    useEffect(() => {
        Promise.all([getOrders(), getOrderStatuses(), getDrivers()])
            .then(([ordersData, statusesData, driversData]) => {
                setOrders(ordersData);
                setStatuses(statusesData);
                setAllDrivers(driversData);
            })
            .catch(() => message.error('Ошибка загрузки данных'))
            .finally(() => setLoading(false));
    }, []);

    // Список свободных водителей для конкретной строки (водитель считается свободным, если isBusy === 0)
    const getFreeDrivers = (excludeDriverId?: number) => {
        return allDrivers.filter(
            (d) => d.isBusy === 0 && (!excludeDriverId || d.id !== excludeDriverId)
        );
    };

    // Фильтрация заказов
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            if (filterStatus && order.statusId !== filterStatus) return false;
            if (filterDriver && order.driverId !== filterDriver) return false;
            if (filterUser) {
                const fullName = `${order.userSurname} ${order.userName} ${order.userPatronymic || ''}`.toLowerCase();
                if (!fullName.includes(filterUser.toLowerCase())) return false;
            }
            return true;
        });
    }, [orders, filterStatus, filterDriver, filterUser]);

    // Обработчики изменения статуса и водителя
    const handleStatusChange = async (orderId: number, newStatusId: number) => {
        try {
            await updateOrder(orderId, { statusId: newStatusId });
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, statusId: newStatusId, statusName: statuses.find(s => s.id === newStatusId)?.name || '' } : o))
            );
            message.success('Статус обновлён');
        } catch (err: any) {
            message.error(err.message || 'Ошибка');
        }
    };

    const handleDriverChange = async (orderId: number, newDriverId: number) => {
        try {
            await updateOrder(orderId, { driverId: newDriverId });
            // Обновляем заказ, подставляя данные нового водителя (ФИО)
            const newDriver = allDrivers.find(d => d.id === newDriverId);
            setOrders((prev) =>
                prev.map((o) => {
                    if (o.id !== orderId) return o;
                    return {
                        ...o,
                        driverId: newDriverId,
                        driverName: newDriver?.userName,
                        driverSurname: newDriver?.userSurname,
                        driverPatronymic: newDriver?.userPatronymic,
                    };
                })
            );
            message.success('Водитель изменён');
        } catch (err: any) {
            message.error(err.message || 'Ошибка');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Заказчик',
            key: 'user',
            render: (_: any, record: Order) =>
                `${record.userSurname} ${record.userName} ${record.userPatronymic || ''}`,
            sorter: (a: Order, b: Order) =>
                a.userSurname.localeCompare(b.userSurname),
        },
        {
            title: 'Тип заказа',
            dataIndex: 'typeName',
            key: 'typeName',
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
        {
            title: 'Статус',
            key: 'status',
            width: 180,
            render: (_: any, record: Order) => (
                <Select
                    value={record.statusId}
                    size="small"
                    style={{ width: 160 }}
                    onChange={(value: number) => handleStatusChange(record.id, value)}
                >
                    {statuses.map((s) => (
                        <Option key={s.id} value={s.id}>
                            {s.name}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Сменить водителя',
            key: 'changeDriver',
            width: 220,
            render: (_: any, record: Order) => {
                const freeDrivers = getFreeDrivers(record.driverId);
                // Если текущий водитель занят, его можно не менять – просто оставляем заглушку
                if (freeDrivers.length === 0) {
                    return <Text type="secondary">Нет свободных</Text>;
                }
                return (
                    <Select
                        value={record.driverId}
                        size="small"
                        style={{ width: 200 }}
                        onChange={(value: number) => handleDriverChange(record.id, value)}
                    >
                        {freeDrivers.map((d) => (
                            <Option key={d.id} value={d.id}>
                                {d.userSurname} {d.userName} {d.userPatronymic ?? ''}
                            </Option>
                        ))}
                    </Select>
                );
            },
        },
    ];

    if (loading) {
        return <AdminLayout><Spin size="large" /></AdminLayout>;
    }

    return (
        <AdminLayout>
            <h2>Управление заказами</h2>

            {/* Блок фильтров */}
            <Space style={{ marginBottom: 16 }} wrap>
                <Select
                    allowClear
                    placeholder="Все статусы"
                    style={{ width: 180 }}
                    value={filterStatus}
                    onChange={(val) => setFilterStatus(val)}
                >
                    {statuses.map((s) => (
                        <Option key={s.id} value={s.id}>{s.name}</Option>
                    ))}
                </Select>

                <Select
                    allowClear
                    placeholder="Все водители"
                    style={{ width: 220 }}
                    value={filterDriver}
                    onChange={(val) => setFilterDriver(val)}
                >
                    {allDrivers.map((d) => (
                        <Option key={d.id} value={d.id}>
                            {d.userSurname} {d.userName} {d.userPatronymic ?? ''}
                        </Option>
                    ))}
                </Select>

                <input
                    placeholder="Поиск по заказчику (ФИО)"
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    style={{ padding: '4px 11px', border: '1px solid #d9d9d9', borderRadius: 6, width: 200 }}
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
                scroll={{ x: 1200 }}
            />
        </AdminLayout>
    );
}