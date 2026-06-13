<?php
class OrderStatus {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function getAll() {
        return $this->db->query("SELECT id, name FROM orderStatus")->fetchAll();
    }
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT id, name FROM orderStatus WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    public function create($name) {
        $stmt = $this->db->prepare("INSERT INTO orderStatus (name) VALUES (?)");
        $stmt->execute([$name]);
        return $this->db->lastInsertId();
    }
    public function update($id, $name) {
        $stmt = $this->db->prepare("UPDATE orderStatus SET name = ? WHERE id = ?");
        return $stmt->execute([$name, $id]);
    }
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM orderStatus WHERE id = ?");
        return $stmt->execute([$id]);
    }
}

?>