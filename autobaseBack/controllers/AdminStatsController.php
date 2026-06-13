<?php
class AdminStatsController extends Controller {
    public function index() {
        $db = Database::getInstance()->getConnection();

        // Новые заказы (статус "Новый")
        $stmt = $db->prepare(
            "SELECT COUNT(*) as cnt FROM `order` o
             JOIN orderStatus os ON o.statusId = os.id
             WHERE os.name = 'Новый'"
        );
        $stmt->execute();
        $newOrders = $stmt->fetch()['cnt'];

        // Отменённые заказы (статус "Отменен")
        $stmt = $db->prepare(
            "SELECT COUNT(*) as cnt FROM `order` o
             JOIN orderStatus os ON o.statusId = os.id
             WHERE os.name = 'Отменен'"
        );
        $stmt->execute();
        $cancelledOrders = $stmt->fetch()['cnt'];

        // Проблемные заказы (статус "Проблема/задержка")
        $stmt = $db->prepare(
            "SELECT COUNT(*) as cnt FROM `order` o
             JOIN orderStatus os ON o.statusId = os.id
             WHERE os.name = 'Проблема/задержка'"
        );
        $stmt->execute();
        $problemOrders = $stmt->fetch()['cnt'];

        // Всего водителей
        $stmt = $db->query("SELECT COUNT(*) as cnt FROM driver");
        $totalDrivers = $stmt->fetch()['cnt'];

        // Свободные водители (isBusy = 0)
        $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM driver WHERE isBusy = 0");
        $stmt->execute();
        $freeDrivers = $stmt->fetch()['cnt'];

        $this->response([
            'newOrders'       => (int) $newOrders,
            'cancelledOrders' => (int) $cancelledOrders,
            'problemOrders'   => (int) $problemOrders,
            'totalDrivers'    => (int) $totalDrivers,
            'freeDrivers'     => (int) $freeDrivers,
        ]);
    }
}