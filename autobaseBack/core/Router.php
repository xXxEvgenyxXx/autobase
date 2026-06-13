<?php
class Router {
    private static $routes = [];

    public static function get($route, $callback) {
        self::$routes['GET'][$route] = $callback;
    }

    public static function post($route, $callback) {
        self::$routes['POST'][$route] = $callback;
    }

    public static function put($route, $callback) {
        self::$routes['PUT'][$route] = $callback;
    }

    public static function delete($route, $callback) {
        self::$routes['DELETE'][$route] = $callback;
    }

    public static function dispatch() {
        $method = $_SERVER['REQUEST_METHOD'];
        $url = $_GET['url'] ?? '';
        $url = rtrim($url, '/');
        $url = '/' . $url;

        if (isset(self::$routes[$method])) {
            foreach (self::$routes[$method] as $route => $callback) {
                // Превращаем {param} в регулярное выражение
                $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[a-zA-Z0-9_]+)', $route);
                $pattern = '#^' . $pattern . '$#';

                if (preg_match($pattern, $url, $matches)) {
                    // Оставляем только именованные параметры
                    $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                    call_user_func_array($callback, $params);
                    return;
                }
            }
        }

        // 404
        http_response_code(404);
        echo json_encode(['message' => 'Route not found']);
    }
}
?>