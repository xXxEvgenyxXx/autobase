<?php
class OrderStatusController extends Controller {
    private $model;
    public function __construct() { $this->model = new OrderStatus(); }
    public function index() { $this->response($this->model->getAll()); }
    public function show($id) {
        $s = $this->model->getById($id);
        $s ? $this->response($s) : $this->error('Not found', 404);
    }
    public function store() {
        $data = $this->getRequestBody();
        if (empty($data['name'])) $this->error('Name required');
        $id = $this->model->create($data['name']);
        $this->response(['id' => $id, 'message' => 'Created'], 201);
    }
    public function update($id) {
        if (!$this->model->getById($id)) $this->error('Not found', 404);
        $data = $this->getRequestBody();
        if (empty($data['name'])) $this->error('Name required');
        $this->model->update($id, $data['name']);
        $this->response(['message' => 'Updated']);
    }
    public function destroy($id) {
        if (!$this->model->getById($id)) $this->error('Not found', 404);
        $this->model->delete($id);
        $this->response(['message' => 'Deleted']);
    }
}
?>