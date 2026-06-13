<?php
class Order {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function getAll() {
        return $this->db->query(
            "SELECT o.id, o.userId, o.typeId, o.statusId, o.driverId,
                    o.departure, o.destination, o.price,
                    u.name AS userName, u.surname AS userSurname, u.patronymic AS userPatronymic,
                    ot.name AS typeName,
                    os.name AS statusName,
                    d.userId AS driverUserId,
                    ud.name AS driverName, ud.surname AS driverSurname, ud.patronymic AS driverPatronymic
            FROM `order` o
            JOIN user u ON o.userId = u.id
            JOIN orderType ot ON o.typeId = ot.id
            JOIN orderStatus os ON o.statusId = os.id
            LEFT JOIN driver d ON o.driverId = d.id
            LEFT JOIN user ud ON d.userId = ud.id"
        )->fetchAll();
    }
    public function getById($id) {
        $stmt = $this->db->prepare(
            "SELECT o.*, u.name AS userName
             FROM `order` o JOIN user u ON o.userId = u.id
             WHERE o.id = ?"
        );
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    public function create($data) {
        $stmt = $this->db->prepare(
            "INSERT INTO `order` (userId, typeId, statusId, driverId, departure, destination, price)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['userId'],
            $data['typeId'],
            $data['statusId'],
            $data['driverId'],
            $data['departure'],
            $data['destination'],
            $data['price']
        ]);
        return $this->db->lastInsertId();
    }
    public function update($id, $data) {
        $fields = [];
        $params = [];
        foreach (['userId','typeId','statusId','driverId','departure','destination','price'] as $col) {
            if (isset($data[$col])) {
                $fields[] = "$col = ?";
                $params[] = $data[$col];
            }
        }
        if (empty($fields)) return false;
        $params[] = $id;
        $stmt = $this->db->prepare("UPDATE `order` SET " . implode(', ', $fields) . " WHERE id = ?");
        return $stmt->execute($params);
    }
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM `order` WHERE id = ?");
        return $stmt->execute([$id]);
    }
}

?>