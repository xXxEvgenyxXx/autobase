<?php
class UserController extends Controller {
    private $model;
    public function __construct() { $this->model = new User(); }
    public function index() { $this->response($this->model->getAll()); }
    public function show($id) {
        $user = $this->model->getById($id);
        $user ? $this->response($user) : $this->error('User not found', 404);
    }
    public function store() {
        $data = $this->getRequestBody();
        $required = ['name', 'surname', 'email', 'password', 'roleId'];
        foreach ($required as $f) {
            if (empty($data[$f])) $this->error("$f is required");
        }
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $this->error('Invalid email');
        try {
            $id = $this->model->create($data);
            $this->response(['id' => $id, 'message' => 'User created'], 201);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) $this->error('Duplicate email or role issue', 409);
            else $this->error('DB error', 500);
        }
    }
    public function update($id) {
        $user = $this->model->getById($id);
        if (!$user) $this->error('User not found', 404);
        $data = $this->getRequestBody();
        if (isset($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL))
            $this->error('Invalid email');
        try {
            $this->model->update($id, $data);
            $this->response(['message' => 'Updated']);
        } catch (PDOException $e) {
            $this->error('Update failed', 500);
        }
    }
    public function destroy($id) {
        if (!$this->model->getById($id)) $this->error('User not found', 404);
        $this->model->delete($id);
        $this->response(['message' => 'Deleted']);
    }
    public function changeRole($id) {
        $data = $this->getRequestBody();
        if (empty($data['roleId'])) {
            $this->error('roleId is required');
        }

        $newRoleId = (int)$data['roleId'];
        // Разрешаем только роли: 1 (обычный пользователь) и 3 (водитель)
        if (!in_array($newRoleId, [1, 3])) {
            $this->error('Недопустимая роль', 400);
        }

        $db = Database::getInstance()->getConnection();

        // Проверяем существование пользователя
        $user = (new User())->getById($id);
        if (!$user) {
            $this->error('User not found', 404);
        }

        // Обновляем роль
        $stmt = $db->prepare("UPDATE user SET roleId = ? WHERE id = ?");
        $stmt->execute([$newRoleId, $id]);

        // Если роль "водитель" – создаём запись в driver, если её нет
        if ($newRoleId === 3) {
            $checkStmt = $db->prepare("SELECT id FROM driver WHERE userId = ?");
            $checkStmt->execute([$id]);
            if (!$checkStmt->fetch()) {
                $insertStmt = $db->prepare("INSERT INTO driver (userId, isBusy) VALUES (?, 0)");
                $insertStmt->execute([$id]);
            }
        }

        $this->response(['message' => 'Role updated']);
    }
}

?>