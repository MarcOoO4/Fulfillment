import Admin from "./pages/Admin";
import {ADMIN_ROUTE, ACCOUNT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CALCULATOR_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth"
import Shop from "./pages/Shop";
import Calculator from "./pages/Calculator";
import Profile from "./components/UserProfile";
export const authRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: Profile
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CALCULATOR_ROUTE,
        Component: Calculator
    },
]