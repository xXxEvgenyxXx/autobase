import {
    AdminDashboardPage, AdminOrdersPage,
    CatalogPage,
    FavoritePage, LoginPage, RegisterPage,
    MainPage,
    OrderFormPage,
    ProfileHistoryPage,
    ProfileMainPage, AdminUsersPage, AdminDriversPage
} from "@/pages";

export const routes = {
    everyone: {
        main: "/",
        catalog: "/catalog",
        register: "/register",
        login: "/login",
    },
    admin:{
        dashboard: "/admin-dashboard",
        orders:"/admin-orders",
        users:"/admin-users",
        drivers: "/admin-drivers",
    },
    user:{
        profile: "/profile",
        profileHistory:"/profile-history",
        orderForm:"/order-form",
        favorite:"/favorite"
    }
}

export const routesArray = {
    everyone: [
        {
            name: "Главная",
            path: routes.everyone.main,
            element: MainPage
        },
        {
            name:"Каталог",
            path:routes.everyone.catalog,
            element: CatalogPage
        },
        {
            name: "Войти",
            path:routes.everyone.login,
            element: LoginPage
        },
        {
            name:"Регистрация",
            path:routes.everyone.register,
            element: RegisterPage
        }
    ],
    user: [
        {
            name:"Форма заявки",
            path:routes.user.orderForm,
            element: OrderFormPage,
        },
        {
            name: "Личный кабинет",
            path: routes.user.profile,
            element: ProfileMainPage
        },
        {
            name:"История заказов",
            path: routes.user.profileHistory,
            element: ProfileHistoryPage
        },
        {
            name:"Избранное",
            path:routes.user.favorite,
            element: FavoritePage
        }
    ],
    admin: [
        {
            name: "Статистика",
            path:routes.admin.dashboard,
            element: AdminDashboardPage
        },
        {
            name:"Отслеживание заказов",
            path: routes.admin.orders,
            element: AdminOrdersPage
        },
        {
            name:"Отслеживание пользователей",
            path: routes.admin.users,
            element:AdminUsersPage
        },
        {
            name:"Отслеживание водителей",
            path:routes.admin.drivers,
            element: AdminDriversPage
        }
    ]
}