<?php
class OrderTypeController extends Controller {
    private $model;
    public function __construct() { $this->model = new OrderType(); }
    public function index() { $this->response($this->model->getAll()); }
    public function show($id) {
        $t = $this->model->getById($id);
        $t ? $this->response($t) : $this->error('Not found', 404);
    }
    public function store() {
        $data = $this->getRequestBody();
        if (empty($data['name']) || empty($data['shortDesc'])) $this->error('name and shortDesc required');
        $id = $this->model->create($data['name'], $data['shortDesc']);
        $this->response(['id' => $id, 'message' => 'Created'], 201);
    }
    public function update($id) {
        if (!$this->model->getById($id)) $this->error('Not found', 404);
        $data = $this->getRequestBody();
        if (empty($data['name']) || empty($data['shortDesc'])) $this->error('name and shortDesc required');
        $this->model->update($id, $data['name'], $data['shortDesc']);
        $this->response(['message' => 'Updated']);
    }
    public function destroy($id) {
        if (!$this->model->getById($id)) $this->error('Not found', 404);
        $this->model->delete($id);
        $this->response(['message' => 'Deleted']);
    }
}

?>