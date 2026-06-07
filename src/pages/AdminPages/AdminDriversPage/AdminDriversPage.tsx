import { useState, useEffect, useMemo } from 'react';
import { Table, Select, Input, Space, message, Spin } from 'antd';
import { AdminLayout } from '@/widgets';
import { getDrivers, updateDriver } from '@/shared/api/drivers';
import type { Driver } from '@/shared/types';

const { Option } = Select;

export function AdminDriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);

    // Фильтры
    const [searchName, setSearchName] = useState('');
    const [filterBusy, setFilterBusy] = useState<number | null>(null); // null = все, 0/1

    useEffect(() => {
        getDrivers()
            .then(setDrivers)
            .catch(() => message.error('Ошибка загрузки водителей'))
            .finally(() => setLoading(false));
    }, []);

    const handleBusyChange = async (driverId: number, newIsBusy: number) => {
        try {
            await updateDriver(driverId, { isBusy: newIsBusy });
            setDrivers((prev) =>
                prev.map((d) =>
                    d.id === driverId ? { ...d, isBusy: newIsBusy } : d
                )
            );
            message.success('Статус занятости обновлён');
        } catch (err: any) {
            message.error(err.message || 'Ошибка');
        }
    };

    // Фильтрация водителей
    const filteredDrivers = useMemo(() => {
        return drivers.filter((driver) => {
            // Фильтр по занятости
            if (filterBusy !== null && driver.isBusy !== filterBusy) return false;

            // Поиск по ФИО (регистронезависимый)
            if (searchName.trim()) {
                const fullName =
                    `${driver.userSurname} ${driver.userName} ${driver.userPatronymic ?? ''}`.toLowerCase();
                const query = searchName.toLowerCase().trim();
                if (!fullName.includes(query)) return false;
            }

            return true;
        });
    }, [drivers, filterBusy, searchName]);

    const columns = [
        {
            title: 'ID водителя',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'ФИО водителя',
            key: 'fullName',
            render: (_: any, record: Driver) =>
                `${record.userSurname} ${record.userName} ${record.userPatronymic ?? ''}`,
            sorter: (a: Driver, b: Driver) =>
                (a.userSurname ?? '').localeCompare(b.userSurname ?? ''),
        },
        {
            title: 'Статус занятости',
            key: 'isBusy',
            width: 180,
            render: (_: any, record: Driver) => (
                <Select
                    value={record.isBusy}
                    size="small"
                    style={{ width: 150 }}
                    onChange={(value: number) => handleBusyChange(record.id, value)}
                >
                    <Option value={0}>Свободен</Option>
                    <Option value={1}>Занят</Option>
                </Select>
            ),
        },
    ];

    if (loading) {
        return (
            <AdminLayout>
                <Spin size="large" />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <h2>Управление водителями</h2>

            <Space style={{ marginBottom: 16 }} wrap>
                <Select
                    allowClear
                    placeholder="Все статусы занятости"
                    style={{ width: 220 }}
                    value={filterBusy}
                    onChange={(val) => setFilterBusy(val)}
                >
                    <Option value={0}>Свободен</Option>
                    <Option value={1}>Занят</Option>
                </Select>

                <Input
                    placeholder="Поиск по ФИО водителя"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    allowClear
                    style={{ width: 250 }}
                />
            </Space>

            <Table
                columns={columns}
                dataSource={filteredDrivers}
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
        </AdminLayout>
    );
}