<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';
require_once 'core/Router.php';
require_once 'core/Database.php';
require_once 'core/Controller.php';

// Автозагрузка моделей и контроллеров (можно перечислить руками)
spl_autoload_register(function ($class) {
    if (file_exists("models/$class.php")) {
        require_once "models/$class.php";
    } elseif (file_exists("controllers/$class.php")) {
        require_once "controllers/$class.php";
    }
});

require_once 'routes.php';
Router::dispatch();
?>