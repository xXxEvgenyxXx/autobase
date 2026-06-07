import { useState, useEffect, useMemo } from 'react';
import { Table, Select, Space, Input, message, Spin } from 'antd';
import { AdminLayout } from '@/widgets';
import { getUsers, updateUserRole } from '@/shared/api/users';
import { getRoles } from '@/shared/api/roles';
import type { User, Role } from '@/shared/types';

const { Option } = Select;

export function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);          // для фильтра
    const [loading, setLoading] = useState(true);

    // Фильтры
    const [filterRole, setFilterRole] = useState<number | null>(null);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        Promise.all([getUsers(), getRoles()])
            .then(([usersData, rolesData]) => {
                setUsers(usersData);
                setRoles(rolesData);
            })
            .catch(() => message.error('Ошибка загрузки данных'))
            .finally(() => setLoading(false));
    }, []);

    const handleRoleChange = async (userId: number, newRoleId: number) => {
        try {
            await updateUserRole(userId, newRoleId);
            setUsers((prev) =>
                prev.map((u) => {
                    if (u.id !== userId) return u;
                    return {
                        ...u,
                        roleId: newRoleId,
                        roleName:
                            newRoleId === 1
                                ? 'Обычный пользователь'
                                : newRoleId === 2
                                    ? 'Администратор'
                                    : 'Водитель',
                    };
                })
            );
            message.success('Роль обновлена');
        } catch (err: any) {
            message.error(err.message || 'Ошибка');
        }
    };

    // Фильтрация пользователей
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            // Фильтр по роли
            if (filterRole && user.roleId !== filterRole) return false;

            // Поиск по ФИО (регистронезависимый, частичное совпадение)
            if (searchName.trim()) {
                const fullName =
                    `${user.surname} ${user.name} ${user.patronymic || ''}`
                        .toLowerCase();
                const query = searchName.toLowerCase().trim();
                // Позволяет найти даже по одной фамилии или фамилии с именем
                if (!fullName.includes(query)) return false;
            }

            return true;
        });
    }, [users, filterRole, searchName]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'ФИО',
            key: 'fullName',
            render: (_: any, record: User) =>
                `${record.surname} ${record.name} ${record.patronymic || ''}`,
            sorter: (a: User, b: User) => a.surname.localeCompare(b.surname),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Роль',
            key: 'role',
            width: 220,
            render: (_: any, record: User) => {
                if (record.roleId === 2) {
                    return 'Администратор'; // админа не трогаем
                }
                return (
                    <Select
                        value={record.roleId}
                        size="small"
                        style={{ width: 180 }}
                        onChange={(value: number) => handleRoleChange(record.id, value)}
                    >
                        <Option value={1}>Обычный пользователь</Option>
                        <Option value={3}>Водитель</Option>
                    </Select>
                );
            },
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
            <h2>Управление пользователями</h2>

            {/* Блок фильтров */}
            <Space style={{ marginBottom: 16 }} wrap>
                <Select
                    allowClear
                    placeholder="Все роли"
                    style={{ width: 200 }}
                    value={filterRole}
                    onChange={(val) => setFilterRole(val)}
                >
                    {roles.map((r) => (
                        <Option key={r.id} value={r.id}>
                            {r.name}
                        </Option>
                    ))}
                </Select>

                <Input
                    placeholder="Поиск по ФИО"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    allowClear
                    style={{ width: 250 }}
                />
            </Space>

            <Table
                columns={columns}
                dataSource={filteredUsers}
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