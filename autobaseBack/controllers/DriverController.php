<?php
class DriverController extends Controller {
    private $model;
    public function __construct() { $this->model = new Driver(); }
    public function index() { $this->response($this->model->getAll()); }
    public function show($id) {
        $d = $this->model->getById($id);
        $d ? $this->response($d) : $this->error('Driver not found', 404);
    }
    public function store() {
        $data = $this->getRequestBody();
        if (empty($data['userId'])) $this->error('userId is required');
        $isBusy = $data['isBusy'] ?? 0;
        $id = $this->model->create($data['userId'], $isBusy);
        $this->response(['id' => $id, 'message' => 'Driver created'], 201);
    }
    public function update($id) {
        if (!$this->model->getById($id)) $this->error('Driver not found', 404);
        $data = $this->getRequestBody();
        if (!isset($data['isBusy'])) $this->error('isBusy is required');
        $this->model->update($id, $data['isBusy']);
        $this->response(['message' => 'Updated']);
    }
    public function destroy($id) {
        if (!$this->model->getById($id)) $this->error('Driver not found', 404);
        $this->model->delete($id);
        $this->response(['message' => 'Deleted']);
    }
}

?>