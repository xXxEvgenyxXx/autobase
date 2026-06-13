<?php
class DriverOrder {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    // Получить все связи
    public function getAll() {
        return $this->db->query(
            "SELECT do.driverId, do.orderId, d.userId AS driverUserId
             FROM driverOrders do
             JOIN driver d ON do.driverId = d.id"
        )->fetchAll();
    }
    // Добавить связь
    public function attach($driverId, $orderId) {
        $stmt = $this->db->prepare("INSERT INTO driverOrders (driverId, orderId) VALUES (?, ?)");
        return $stmt->execute([$driverId, $orderId]);
    }
    // Удалить связь
    public function detach($driverId, $orderId) {
        $stmt = $this->db->prepare("DELETE FROM driverOrders WHERE driverId = ? AND orderId = ?");
        return $stmt->execute([$driverId, $orderId]);
    }
    // Получить заказы конкретного водителя
    public function getOrdersByDriver($driverId) {
        $stmt = $this->db->prepare(
            "SELECT o.* FROM `order` o
             JOIN driverOrders do ON o.id = do.orderId
             WHERE do.driverId = ?"
        );
        $stmt->execute([$driverId]);
        return $stmt->fetchAll();
    }
}

?>