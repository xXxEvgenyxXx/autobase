import { useEffect, useState } from 'react';
import { MainLayout, OrderCard } from '@/widgets';
import { getOrderTypes } from '@/shared/api/orderTypes';
import type { OrderType } from '@/shared/types';
import { Spin, Alert } from 'antd';
import s from './CatalogPage.module.scss';

export function CatalogPage() {
    const [orderTypes, setOrderTypes] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getOrderTypes()
            .then((data) => {
                setOrderTypes(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message || 'Ошибка загрузки услуг');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
                    <Spin size="large" />
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <Alert message="Ошибка" description={error} type="error" showIcon />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <h1 className={s.title}>Каталог услуг</h1>
            <div className={s.catalogWrapper}>
                <div className={s.cardsWrapper}>
                    {orderTypes.length > 0 ? (
                        orderTypes.map((type) => (
                            <OrderCard
                                key={type.id}
                                name={type.name}
                                shortDescription={type.shortDesc}
                                typeId={type.id}
                            />
                        ))
                    ) : (
                        <p>Нет доступных услуг</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}