<?php
class Role {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function getAll() {
        return $this->db->query("SELECT id, name FROM role")->fetchAll();
    }
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT id, name FROM role WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    public function create($name) {
        $stmt = $this->db->prepare("INSERT INTO role (name) VALUES (?)");
        $stmt->execute([$name]);
        return $this->db->lastInsertId();
    }
    public function update($id, $name) {
        $stmt = $this->db->prepare("UPDATE role SET name = ? WHERE id = ?");
        return $stmt->execute([$name, $id]);
    }
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM role WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>