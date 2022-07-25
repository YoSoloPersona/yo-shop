import { Api } from './info';
import Admin from './components/admin';
import Basket from './components/basket';
import Shop from './components/shop';
import Auth from './components/auth';
import Device from './components/device';

export const authRoutes = [
    {
        path: Api.user.admin.url,
        element: Admin
    },

    {
        path: Api.basket.url,
        element: Basket
    }
];

export const publicRoutes = [
    {
        path: Api.shop.url,
        element: Shop
    },
    {
        path: Api.user.login.url,
        element: Auth
    },
    {
        path: Api.user.registration.url,
        element: Auth
    },
    {
        path: Api.device.url + '/:id',
        element: Device
    },
];
