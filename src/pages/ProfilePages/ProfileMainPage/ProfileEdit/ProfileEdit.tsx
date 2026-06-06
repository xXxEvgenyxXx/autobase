import { Form, Input, Button, Space, message } from "antd";
import { SaveOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import s from "./ProfileEdit.module.scss";
import {useState} from "react";

interface Props {
    initialValues: {
        name: string;
        surname: string;
        patronymic: string;
        email: string;
    };
    onSave: (values: {
        name: string;
        surname: string;
        patronymic: string;
        email: string;
    }) => Promise<void>;
    onCancel: () => void;
}

export function ProfileEdit({ initialValues, onSave, onCancel }: Props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            await onSave(values);
            message.success("Данные сохранены");
        } catch (err) {
            if (err && typeof err === "object" && "errorFields" in err) {
                // ошибка валидации формы, ничего не делаем
                return;
            }
            message.error("Ошибка при сохранении");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={s.profile}>
            <div className={s.buttons}>
                <Space>
                    <Button
                        icon={<SaveOutlined />}
                        type="primary"
                        onClick={handleSave}
                        loading={loading}
                    >
                        Сохранить
                    </Button>
                    <Button icon={<CloseOutlined />} onClick={onCancel} disabled={loading}>
                        Отмена
                    </Button>
                </Space>
            </div>
            <div className={s.personalData}>
                <div className={s.avatar}>
                    <UserOutlined />
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        name="surname"
                        label="Фамилия"
                        rules={[{ required: true, message: "Введите фамилию" }]}
                    >
                        <Input placeholder="Иванов" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[{ required: true, message: "Введите имя" }]}
                    >
                        <Input placeholder="Иван" />
                    </Form.Item>
                    <Form.Item name="patronymic" label="Отчество">
                        <Input placeholder="Иванович" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Введите email" },
                            { type: "email", message: "Некорректный email" },
                        ]}
                    >
                        <Input placeholder="example@mail.com" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}