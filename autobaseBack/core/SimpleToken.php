<?php
class SimpleToken {
    public static function generate($userId, $email) {
        $payload = $userId . '::' . $email . '::' . bin2hex(random_bytes(16));
        return base64_encode($payload);
    }
}
?>