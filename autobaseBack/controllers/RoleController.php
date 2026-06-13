<?php
class RoleController extends Controller {
    private $model;
    public function __construct() { $this->model = new Role(); }
    public function index() { $this->response($this->model->getAll()); }
    public function show($id) {
        $item = $this->model->getById($id);
        $item ? $this->response($item) : $this->error('Role not found', 404);
    }
    public function store() {
        $data = $this->getRequestBody();
        if (empty($data['name'])) $this->error('Name is required');
        $id = $this->model->create($data['name']);
        $this->response(['id' => $id, 'message' => 'Created'], 201);
    }
    public function update($id) {
        $role = $this->model->getById($id);
        if (!$role) $this->error('Role not found', 404);
        $data = $this->getRequestBody();
        if (empty($data['name'])) $this->error('Name is required');
        $this->model->update($id, $data['name']);
        $this->response(['message' => 'Updated']);
    }
    public function destroy($id) {
        if (!$this->model->getById($id)) $this->error('Role not found', 404);
        $this->model->delete($id);
        $this->response(['message' => 'Deleted']);
    }
}

?>