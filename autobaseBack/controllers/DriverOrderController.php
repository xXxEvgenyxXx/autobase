<?php
class DriverOrderController extends Controller {
    private $model;
    public function __construct() { $this->model = new DriverOrder(); }

    // GET /driver-orders – все связи
    public function index() {
        $this->response($this->model->getAll());
    }

    // GET /driver-orders/driver/{driverId} – заказы водителя
    public function ordersByDriver($driverId) {
        $orders = $this->model->getOrdersByDriver($driverId);
        $this->response($orders);
    }

    // POST /driver-orders – добавить связь
    public function attach() {
        $data = $this->getRequestBody();
        if (empty($data['driverId']) || empty($data['orderId']))
            $this->error('driverId and orderId required');
        try {
            $this->model->attach($data['driverId'], $data['orderId']);
            $this->response(['message' => 'Attached'], 201);
        } catch (PDOException $e) {
            $this->error('Could not attach (duplicate?)', 409);
        }
    }

    // DELETE /driver-orders – удалить связь (передаём driverId и orderId в теле)
    public function detach() {
        $data = $this->getRequestBody();
        if (empty($data['driverId']) || empty($data['orderId']))
            $this->error('driverId and orderId required');
        $this->model->detach($data['driverId'], $data['orderId']);
        $this->response(['message' => 'Detached']);
    }
}

?>