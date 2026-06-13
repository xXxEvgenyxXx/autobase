<?php
class OrderController extends Controller {
    private $model;
    public function __construct() { $this->model = new Order(); }
    public function index() { $this->response($this->model->getAll()); }
    public function show($id) {
        $o = $this->model->getById($id);
        $o ? $this->response($o) : $this->error('Order not found', 404);
    }
    public function store() {
        $data = $this->getRequestBody();
        $required = ['userId','typeId','statusId','driverId','departure','destination','price'];
        foreach ($required as $f) {
            if (!isset($data[$f])) $this->error("$f is required");
        }
        $id = $this->model->create($data);
        $this->response(['id' => $id, 'message' => 'Order created'], 201);
    }
    public function update($id) {
        if (!$this->model->getById($id)) $this->error('Order not found', 404);
        $data = $this->getRequestBody();
        if (empty($data)) $this->error('No data');
        $this->model->update($id, $data);
        $this->response(['message' => 'Updated']);
    }
    public function destroy($id) {
        if (!$this->model->getById($id)) $this->error('Order not found', 404);
        $this->model->delete($id);
        $this->response(['message' => 'Deleted']);
    }
}

?>