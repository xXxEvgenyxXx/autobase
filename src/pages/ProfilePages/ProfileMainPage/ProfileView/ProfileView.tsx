import { Button, Select } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import s from "./ProfileView.module.scss";

interface Props {
    fullName: string;
    email: string;
    role: string;
    isDriver: boolean;               // новое
    isBusy?: number;                 // 0 или 1
    onStatusChange?: (value: number) => void; // новое
    onEdit: () => void;
}

export function ProfileView({
                                fullName,
                                email,
                                role,
                                isDriver,
                                isBusy,
                                onStatusChange,
                                onEdit,
                            }: Props) {
    return (
        <div className={s.profile}>
            <Button
                className={s.editButton}
                icon={<EditOutlined />}
                onClick={onEdit}
            />
            <div className={s.personalData}>
                <div className={s.avatar}>
                    <UserOutlined />
                </div>
                <h2>{fullName}</h2>
                <h3>{email}</h3>
                <p>Роль: {role}</p>

                {isDriver && (
                    <div className={s.status}>
                        Статус:{" "}
                        <Select
                            value={isBusy}
                            size="small"
                            style={{ width: 130, marginLeft: 8 }}
                            onChange={onStatusChange}
                            options={[
                                { value: 0, label: "Свободен" },
                                { value: 1, label: "Занят" },
                            ]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}