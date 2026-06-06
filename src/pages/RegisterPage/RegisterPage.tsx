import { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { AuthLayout } from '@/widgets';
import { register } from '@/shared/api/auth';
import { useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '@/shared/types';

const { Title } = Typography;

export function RegisterPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: Omit<RegisterRequest, 'roleId'>) => {
        setLoading(true);
        try {
            await register({ ...values, roleId: 1 });
            message.success('Регистрация прошла успешно! Теперь войдите.');
            navigate('/login');
        } catch (err: any) {
            message.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
                <Title level={3} style={{ textAlign: 'center' }}>
                    Регистрация
                </Title>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[{ required: true, message: 'Введите имя' }]}
                    >
                        <Input placeholder="Иван" />
                    </Form.Item>

                    <Form.Item
                        name="surname"
                        label="Фамилия"
                        rules={[{ required: true, message: 'Введите фамилию' }]}
                    >
                        <Input placeholder="Петров" />
                    </Form.Item>

                    <Form.Item name="patronymic" label="Отчество (при наличии)">
                        <Input placeholder="Иванович" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Введите email' },
                            { type: 'email', message: 'Некорректный email' },
                        ]}
                    >
                        <Input placeholder="user@example.com" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            { required: true, message: 'Введите пароль' },
                            { min: 6, message: 'Минимум 6 символов' },
                        ]}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Подтверждение пароля"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Подтвердите пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Повторите пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthLayout>
    );
}