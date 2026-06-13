<?php
class User {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function getAll() {
        return $this->db->query(
            "SELECT u.id, u.name, u.surname, u.patronymic, u.email, u.roleId,
                    r.name AS roleName
            FROM user u
            JOIN role r ON u.roleId = r.id"
        )->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->db->prepare(
            "SELECT u.id, u.name, u.surname, u.patronymic, u.email, u.roleId,
                    r.name AS roleName
            FROM user u
            JOIN role r ON u.roleId = r.id
            WHERE u.id = ?"
        );
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    public function create($data) {
        // $data: name, surname, patronymic, email, password, roleId
        $stmt = $this->db->prepare(
            "INSERT INTO user (name, surname, patronymic, email, passwordHash, roleId) VALUES (?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['name'],
            $data['surname'],
            $data['patronymic'] ?? null,
            $data['email'],
            password_hash($data['password'], PASSWORD_DEFAULT),
            $data['roleId']
        ]);
        return $this->db->lastInsertId();
    }
    public function update($id, $data) {
        $fields = [];
        $params = [];
        if (isset($data['name'])) { $fields[] = 'name = ?'; $params[] = $data['name']; }
        if (isset($data['surname'])) { $fields[] = 'surname = ?'; $params[] = $data['surname']; }
        if (isset($data['patronymic'])) { $fields[] = 'patronymic = ?'; $params[] = $data['patronymic']; }
        if (isset($data['email'])) { $fields[] = 'email = ?'; $params[] = $data['email']; }
        if (isset($data['roleId'])) { $fields[] = 'roleId = ?'; $params[] = $data['roleId']; }
        if (isset($data['password'])) {
            $fields[] = 'passwordHash = ?';
            $params[] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        if (empty($fields)) return false;
        $params[] = $id;
        $stmt = $this->db->prepare("UPDATE user SET " . implode(', ', $fields) . " WHERE id = ?");
        return $stmt->execute($params);
    }
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM user WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>