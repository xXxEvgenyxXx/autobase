import { Form, Input, Button, message, Typography } from 'antd';
import { AuthLayout } from '@/widgets';
import { login, saveToken, saveUser } from '@/shared/api/auth.ts';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '@/shared/types';
import {useState} from "react";

const { Title } = Typography;

export function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: LoginRequest) => {
        setLoading(true);
        try {
            const response = await login(values);
            saveToken(response.token);
            saveUser(response.user);
            message.success('Вход выполнен успешно');
            navigate('/');
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
                    Вход
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
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
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthLayout>
    );
}