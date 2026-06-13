<?php
class OrderType {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function getAll() {
        return $this->db->query("SELECT id, name, shortDesc FROM orderType")->fetchAll();
    }
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT id, name, shortDesc FROM orderType WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    public function create($name, $shortDesc) {
        $stmt = $this->db->prepare("INSERT INTO orderType (name, shortDesc) VALUES (?, ?)");
        $stmt->execute([$name, $shortDesc]);
        return $this->db->lastInsertId();
    }
    public function update($id, $name, $shortDesc) {
        $stmt = $this->db->prepare("UPDATE orderType SET name = ?, shortDesc = ? WHERE id = ?");
        return $stmt->execute([$name, $shortDesc, $id]);
    }
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM orderType WHERE id = ?");
        return $stmt->execute([$id]);
    }
}

?>