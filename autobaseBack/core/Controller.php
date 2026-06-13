<?php
class Controller {
    protected function response($data, $status = 200) {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }

    protected function error($message, $status = 400) {
        $this->response(['error' => $message], $status);
    }

    protected function getRequestBody() {
        $input = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() !== JSON_ERROR_NONE) return null;
        return $input;
    }
}
?>