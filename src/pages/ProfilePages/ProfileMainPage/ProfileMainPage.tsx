import { useState, useCallback } from "react";
import { ProfileLayout } from "@/widgets";
import { ProfileView } from "./ProfileView";
import { ProfileEdit } from "./ProfileEdit";
import { getUser, saveUser } from "@/shared/api/auth";
import { updateUser } from "@/shared/api/users";

export function ProfileMainPage() {
    const currentUser = getUser(); // синхронно из localStorage
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

    const fullName = userData
        ? `${userData.surname} ${userData.name} ${userData.patronymic}`.trim()
        : "";

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

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
                // Обновляем данные в состоянии и в localStorage
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
                throw err; // пробросим в ProfileEdit для message.error
            }
        },
        [userData, currentUser]
    );

    const getRoleName = (roleId: number): string => {
        switch (roleId) {
            case 1: return 'Заказчик';
            case 2: return 'Администратор';
            case 3: return 'Водитель';
            default: return 'Неизвестно';
        }
    };

    if (!userData) {
        return (
            <ProfileLayout>
                <div>Пользователь не найден. Войдите заново.</div>
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