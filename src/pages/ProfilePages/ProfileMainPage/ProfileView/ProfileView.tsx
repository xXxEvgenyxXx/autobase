import { Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import s from "./ProfileView.module.scss";

interface Props {
  fullName: string;
  email: string;
  onEdit: () => void;
}

export function ProfileView({ fullName, email, onEdit }: Props) {
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
      </div>
    </div>
  );
}