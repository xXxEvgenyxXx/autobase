import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/widgets';
import { Form, Select, Input, Button, message, Spin, InputNumber, Typography } from 'antd';
import { getOrderTypes } from '@/shared/api/orderTypes';
import { getDrivers } from '@/shared/api/drivers';
import { createOrder } from '@/shared/api/orders';
import { getUser } from '@/shared/api/auth';
import s from './OrderFormPage.module.scss'
import type { OrderType, Driver } from '@/shared/types';

const { Option } = Select;
const { Text } = Typography;

// ---------- Формулы ----------
const PRICE_INSIDE_CITY_PER_KM = 30;   // руб/км
const MIN_PRICE_INSIDE_CITY = 300;     // минимум
const PRICE_INTERCITY_PER_KM = 20;     // руб/км
const MIN_PRICE_INTERCITY = 1000;      // минимум

function calculatePrice(typeId: number, distance: number): number {
    if (!distance || distance <= 0) return 0;
    if (typeId === 1) {
        // Внутри города
        return Math.max(distance * PRICE_INSIDE_CITY_PER_KM, MIN_PRICE_INSIDE_CITY);
    }
    // Междугородняя (id !== 1)
    return Math.max(distance * PRICE_INTERCITY_PER_KM, MIN_PRICE_INTERCITY);
}
// --------------------------------

export function OrderFormPage() {
    const [searchParams] = useSearchParams();
    const preselectedTypeId = Number(searchParams.get('typeId')) || undefined;
    const navigate = useNavigate();
    const user = getUser();

    const [orderTypes, setOrderTypes] = useState<OrderType[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const selectedTypeId = Form.useWatch('typeId', form);
    const distance = Form.useWatch('distance', form);

    // Вычисляем цену по формулам
    const computedPrice = useMemo(() => {
        return calculatePrice(selectedTypeId, distance);
    }, [selectedTypeId, distance]);

    useEffect(() => {
        Promise.all([getOrderTypes(), getDrivers()])
            .then(([types, allDrivers]) => {
                setOrderTypes(types);
                setDrivers(allDrivers.filter((d) => d.isBusy === 0));
                if (preselectedTypeId && types.some((t) => t.id === preselectedTypeId)) {
                    form.setFieldsValue({ typeId: preselectedTypeId });
                }
            })
            .catch(() => message.error('Не удалось загрузить данные'))
            .finally(() => setLoadingData(false));
    }, [preselectedTypeId, form]);

    // При внутригородской услуге подставляем город назначения = город отправления
    useEffect(() => {
        if (selectedTypeId === 1) {
            const cityFrom = form.getFieldValue('cityFrom');
            form.setFieldsValue({ cityTo: cityFrom || '' });
        }
    }, [selectedTypeId, form]);

    const freeDriversExist = drivers.length > 0;

    const onFinish = async (values: any) => {
        if (!user) {
            message.error('Не авторизован');
            return;
        }
        const { typeId, driverId, cityFrom, addressFrom, cityTo, addressTo } = values;
        const departure = cityFrom ? `${cityFrom}, ${addressFrom}` : addressFrom;
        const destinationCity = typeId === 1 ? cityFrom : cityTo;
        const destination = destinationCity ? `${destinationCity}, ${addressTo}` : addressTo;

        const orderData = {
            userId: user.id,
            typeId,
            statusId: 1,
            driverId,
            departure,
            destination,
            price: computedPrice, // <-- вычисленная цена
        };

        setSubmitting(true);
        try {
            await createOrder(orderData);
            message.success('Заказ успешно оформлен!');
            navigate('/profile');
        } catch (err: any) {
            message.error(err.message || 'Ошибка при создании заказа');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingData) {
        return (
            <MainLayout>
                <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={s.orderFormPage}>
                <h1 style={{ marginBottom: 24 }}>Оформление заказа</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ typeId: preselectedTypeId }}
                    style={{ maxWidth: 600 }}
                >
                    {/* Тип услуги */}
                    <Form.Item
                        name="typeId"
                        label="Тип услуги"
                        rules={[{ required: true, message: 'Выберите тип услуги' }]}
                    >
                        <Select placeholder="Выберите услугу">
                            {orderTypes.map((t) => (
                                <Option key={t.id} value={t.id}>
                                    {t.name} – {t.shortDesc}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Адрес отправления */}
                    <Form.Item label="Адрес отправления" required>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Form.Item
                                name="cityFrom"
                                rules={[{ required: true, message: 'Введите город' }]}
                                style={{ flex: 1 }}
                            >
                                <Input placeholder="Город отправления" />
                            </Form.Item>
                            <Form.Item
                                name="addressFrom"
                                rules={[{ required: true, message: 'Введите адрес' }]}
                                style={{ flex: 2 }}
                            >
                                <Input placeholder="Улица, дом, квартира" />
                            </Form.Item>
                        </div>
                    </Form.Item>

                    {/* Адрес назначения */}
                    <Form.Item label="Адрес назначения" required>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Form.Item
                                name="cityTo"
                                rules={
                                    selectedTypeId !== 1
                                        ? [{ required: true, message: 'Введите город' }]
                                        : []
                                }
                                style={{ flex: 1 }}
                            >
                                <Input
                                    placeholder="Город назначения"
                                    disabled={selectedTypeId === 1}
                                />
                            </Form.Item>
                            <Form.Item
                                name="addressTo"
                                rules={[{ required: true, message: 'Введите адрес' }]}
                                style={{ flex: 2 }}
                            >
                                <Input placeholder="Улица, дом, квартира" />
                            </Form.Item>
                        </div>
                        {selectedTypeId === 1 && (
                            <span style={{ color: '#888', fontSize: 12 }}>
              Для внутригородских поездок город назначения совпадает с городом отправления
            </span>
                        )}
                    </Form.Item>

                    {/* Расстояние */}
                    <Form.Item
                        name="distance"
                        label="Расстояние (км)"
                        rules={[
                            { required: true, message: 'Укажите расстояние' },
                            { type: 'number', min: 1, message: 'Минимум 1 км' },
                        ]}
                    >
                        <InputNumber
                            placeholder="Километраж"
                            style={{ width: '100%' }}
                            min={1}
                            step={1}
                        />
                    </Form.Item>

                    {/* Расчётная цена */}
                    <Form.Item label="Стоимость заказа">
                        <p className={s.orderPrice}>
                            {computedPrice > 0 ? `${computedPrice} ₽` : '—'}
                        </p>
                        {computedPrice > 0 && (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {selectedTypeId === 1
                                    ? `Формула: ${distance} км × ${PRICE_INSIDE_CITY_PER_KM} ₽/км (мин. ${MIN_PRICE_INSIDE_CITY} ₽)`
                                    : `Формула: ${distance} км × ${PRICE_INTERCITY_PER_KM} ₽/км (мин. ${MIN_PRICE_INTERCITY} ₽)`}
                            </Text>
                        )}
                    </Form.Item>

                    {/* Водитель */}
                    <Form.Item
                        name="driverId"
                        label="Водитель"
                        rules={[{ required: true, message: 'Выберите водителя' }]}
                    >
                        {freeDriversExist ? (
                            <Select placeholder="Выберите свободного водителя">
                                {drivers.map((d) => (
                                    <Option key={d.id} value={d.id}>
                                        {d.userSurname} {d.userName} {d.userPatronymic ?? ''}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            <Text style={{ color: 'var(--color-text)' }}>Нет свободных водителей</Text>
                        )}
                    </Form.Item>

                    {/* Кнопка отправки */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                            disabled={!freeDriversExist || computedPrice <= 0}
                            block
                        >
                            Оформить заказ
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </MainLayout>
    );
}