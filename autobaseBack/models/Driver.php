<?php
class Driver {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function getAll() {
        return $this->db->query(
            "SELECT d.id, d.userId, d.isBusy,
                    u.name AS userName, u.surname AS userSurname, u.patronymic AS userPatronymic
            FROM driver d JOIN user u ON d.userId = u.id"
        )->fetchAll();
    }
    public function getById($id) {
        $stmt = $this->db->prepare(
            "SELECT d.id, d.userId, d.isBusy,
                    u.name AS userName, u.surname AS userSurname, u.patronymic AS userPatronymic
            FROM driver d JOIN user u ON d.userId = u.id
            WHERE d.id = ?"
        );
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    public function create($userId, $isBusy = 0) {
        $stmt = $this->db->prepare("INSERT INTO driver (userId, isBusy) VALUES (?, ?)");
        $stmt->execute([$userId, $isBusy]);
        return $this->db->lastInsertId();
    }
    public function update($id, $isBusy) {
        $stmt = $this->db->prepare("UPDATE driver SET isBusy = ? WHERE id = ?");
        return $stmt->execute([$isBusy, $id]);
    }
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM driver WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>