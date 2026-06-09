import { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import {
    FileAddOutlined,
    CloseCircleOutlined,
    WarningOutlined,
    CarOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { AdminLayout } from '@/widgets';
import { AdminDashboardCard } from '@/widgets';
import { getAdminStats } from '@/shared/api/admin';

export function AdminDashboardPage() {
    const [stats, setStats] = useState({
        newOrders: 0,
        cancelledOrders: 0,
        problemOrders: 0,
        totalDrivers: 0,
        freeDrivers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminStats()
            .then((data) => setStats(data))
            .catch(() => {}) // можно добавить обработку ошибок
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <h1 style={{ marginBottom: 24 }}>Дашборд</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                    <AdminDashboardCard
                        title="Новые заказы"
                        statsNumber={stats.newOrders}
                        icon={<FileAddOutlined />}
                    />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <AdminDashboardCard
                        title="Отменённые заказы"
                        statsNumber={stats.cancelledOrders}
                        icon={<CloseCircleOutlined />}
                    />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <AdminDashboardCard
                        title="Проблемы / задержки"
                        statsNumber={stats.problemOrders}
                        icon={<WarningOutlined />}
                    />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <AdminDashboardCard
                        title="Свободные водители"
                        statsNumber={stats.freeDrivers}
                        icon={<CarOutlined />}
                    />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <AdminDashboardCard
                        title="Всего водителей"
                        statsNumber={stats.totalDrivers}
                        icon={<TeamOutlined />}
                    />
                </Col>
            </Row>
        </AdminLayout>
    );
}