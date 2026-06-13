<?php
class AuthController extends Controller {
    public function login() {
        $data = $this->getRequestBody();
        if (empty($data['email']) || empty($data['password'])) {
            $this->error('Email and password required', 400);
        }

        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare(
            "SELECT id, email, passwordHash, roleId, name, surname, patronymic 
            FROM user WHERE email = ?"
        );
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['passwordHash'])) {
            $this->error('Invalid credentials', 401);
        }

        $token = base64_encode($user['id'] . '::' . $user['email'] . '::' . bin2hex(random_bytes(16)));

        $this->response([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'roleId' => $user['roleId'],
                'name' => $user['name'],
                'surname' => $user['surname'],
                'patronymic' => $user['patronymic'] ?? null,
            ]
        ]);
    }
}
?>