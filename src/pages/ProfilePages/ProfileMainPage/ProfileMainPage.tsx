import { useState, useCallback, useEffect } from "react";
import { ProfileLayout } from "@/widgets";
import { ProfileView } from "./ProfileView";
import { ProfileEdit } from "./ProfileEdit";
import { getUser, saveUser } from "@/shared/api/auth";
import { updateUser } from "@/shared/api/users";
import { getDrivers, updateDriver } from "@/shared/api/drivers";
import { message } from "antd";

export function ProfileMainPage() {
    const currentUser = getUser();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(
        currentUser
            ? {
                id: currentUser.id,
                name: currentUser.name || "",
                surname: currentUser.surname || "",
                patronymic: currentUser.patronymic || "",
                email: currentUser.email || "",
                roleId: currentUser.roleId,
            }
            : null
    );

    // Данные водителя (если роль = 3)
    const [driverInfo, setDriverInfo] = useState<{ id: number; isBusy: number } | null>(null);
    const [loadingDriver, setLoadingDriver] = useState(false);

    // Загрузка данных водителя при монтировании, если роль = 3
    useEffect(() => {
        if (userData?.roleId === 3) {
            setLoadingDriver(true);
            getDrivers()
                .then((drivers) => {
                    const found = drivers.find((d) => d.userId === userData.id);
                    if (found) {
                        setDriverInfo({ id: found.id, isBusy: found.isBusy });
                    } else {
                        message.error("Не найдена запись водителя");
                    }
                })
                .catch(() => message.error("Ошибка загрузки статуса водителя"))
                .finally(() => setLoadingDriver(false));
        }
    }, [userData]);

    const fullName = userData
        ? `${userData.surname} ${userData.name} ${userData.patronymic}`.trim()
        : "";

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    const handleSave = useCallback(
        async (values: { name: string; surname: string; patronymic: string; email: string }) => {
            if (!userData) return;
            try {
                await updateUser(userData.id, {
                    name: values.name,
                    surname: values.surname,
                    patronymic: values.patronymic,
                    email: values.email,
                });
                const updatedUser = {
                    ...currentUser!,
                    name: values.name,
                    surname: values.surname,
                    patronymic: values.patronymic,
                    email: values.email,
                };
                saveUser(updatedUser);
                setUserData({ ...userData, ...values });
                setIsEditing(false);
            } catch (err: any) {
                throw err;
            }
        },
        [userData, currentUser]
    );

    // Изменение статуса занятости водителя
    const handleDriverStatusChange = async (newIsBusy: number) => {
        if (!driverInfo) return;
        try {
            await updateDriver(driverInfo.id, { isBusy: newIsBusy });
            setDriverInfo({ ...driverInfo, isBusy: newIsBusy });
            message.success("Статус обновлён");
        } catch (err: any) {
            message.error(err.message || "Ошибка при обновлении статуса");
        }
    };

    const getRoleName = (roleId: number): string => {
        switch (roleId) {
            case 1: return "Заказчик";
            case 2: return "Администратор";
            case 3: return "Водитель";
            default: return "Неизвестно";
        }
    };

    if (!userData) {
        return (
            <ProfileLayout>
                <div>Пользователь не найден. Войдите заново.</div>
            </ProfileLayout>
        );
    }

    // Пока загружаются данные водителя, можно показать спиннер или ничего
    if (userData.roleId === 3 && loadingDriver) {
        return (
            <ProfileLayout>
                <div style={{ textAlign: "center", marginTop: 40 }}>Загрузка статуса водителя...</div>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout>
            {!isEditing ? (
                <ProfileView
                    fullName={fullName}
                    email={userData.email}
                    role={getRoleName(userData.roleId)}
                    isDriver={userData.roleId === 3}
                    isBusy={driverInfo?.isBusy}
                    onStatusChange={handleDriverStatusChange}
                    onEdit={handleEdit}
                />
            ) : (
                <ProfileEdit
                    initialValues={{
                        name: userData.name,
                        surname: userData.surname,
                        patronymic: userData.patronymic,
                        email: userData.email,
                    }}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </ProfileLayout>
    );
}