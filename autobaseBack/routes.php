<?php
// Roles
Router::get('/roles', fn() => (new RoleController())->index());
Router::get('/roles/{id}', fn($id) => (new RoleController())->show($id));
Router::post('/roles', fn() => (new RoleController())->store());
Router::put('/roles/{id}', fn($id) => (new RoleController())->update($id));
Router::delete('/roles/{id}', fn($id) => (new RoleController())->destroy($id));

// Users
Router::get('/users', fn() => (new UserController())->index());
Router::get('/users/{id}', fn($id) => (new UserController())->show($id));
Router::post('/users', fn() => (new UserController())->store());
Router::put('/users/{id}', fn($id) => (new UserController())->update($id));
Router::delete('/users/{id}', fn($id) => (new UserController())->destroy($id));
Router::put('/users/{id}/role', fn($id) => (new UserController())->changeRole($id));

// Drivers
Router::get('/drivers', fn() => (new DriverController())->index());
Router::get('/drivers/{id}', fn($id) => (new DriverController())->show($id));
Router::post('/drivers', fn() => (new DriverController())->store());
Router::put('/drivers/{id}', fn($id) => (new DriverController())->update($id));
Router::delete('/drivers/{id}', fn($id) => (new DriverController())->destroy($id));

// OrderStatuses
Router::get('/order-statuses', fn() => (new OrderStatusController())->index());
Router::get('/order-statuses/{id}', fn($id) => (new OrderStatusController())->show($id));
Router::post('/order-statuses', fn() => (new OrderStatusController())->store());
Router::put('/order-statuses/{id}', fn($id) => (new OrderStatusController())->update($id));
Router::delete('/order-statuses/{id}', fn($id) => (new OrderStatusController())->destroy($id));

// OrderTypes
Router::get('/order-types', fn() => (new OrderTypeController())->index());
Router::get('/order-types/{id}', fn($id) => (new OrderTypeController())->show($id));
Router::post('/order-types', fn() => (new OrderTypeController())->store());
Router::put('/order-types/{id}', fn($id) => (new OrderTypeController())->update($id));
Router::delete('/order-types/{id}', fn($id) => (new OrderTypeController())->destroy($id));

// Orders
Router::get('/orders', fn() => (new OrderController())->index());
Router::get('/orders/{id}', fn($id) => (new OrderController())->show($id));
Router::post('/orders', fn() => (new OrderController())->store());
Router::put('/orders/{id}', fn($id) => (new OrderController())->update($id));
Router::delete('/orders/{id}', fn($id) => (new OrderController())->destroy($id));

// DriverOrders (связка)
Router::get('/driver-orders', fn() => (new DriverOrderController())->index());
Router::get('/driver-orders/driver/{driverId}', fn($driverId) => (new DriverOrderController())->ordersByDriver($driverId));
Router::post('/driver-orders', fn() => (new DriverOrderController())->attach());
Router::delete('/driver-orders', fn() => (new DriverOrderController())->detach());

Router::post('/auth/login', fn() => (new AuthController())->login());

Router::get('/admin/stats', fn() => (new AdminStatsController())->index());
?>