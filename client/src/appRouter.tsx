import React, { useContext } from 'react';
import { Route, NavLink, Link, Routes, useRoutes } from 'react-router-dom';


// local
import { useUser } from "./hooks/userHook";
import { Api } from './info';
import Admin from './components/admin';
import Basket from './components/basket';
import Shop from './components/shop';
import { Auth } from './components/auth';
import Device from './components/device';

/** Список роутеров требующих авторизации. */
export const authRoutes = [
    {
        path: Api.user.admin.url,
        element: <Admin />
    },

    {
        path: Api.basket.url,
        element: <Basket />
    }
];

/** Список роутеров НЕ требующих авторизации. */
export const publicRoutes = [
    {
        path: Api.shop.url,
        element: <Shop />
    },
    {
        path: Api.user.login.url,
        element: <Auth />
    },
    {
        path: Api.user.registration.url,
        element: <Auth />
    },
    {
        path: Api.device.url + '/:id',
        element: <Device />
    },
];

type Props = {};

/**
 * Компонент. Создаёт роутеры.
 * @param props 
 * @returns 
 */
const AppRouter = (props: Props) => {
    const { user } = useUser();
    const { isAuth } = user;

    // Создаём роутеры
    return useRoutes([...((isAuth) ? authRoutes : []), ...publicRoutes])
};

export default AppRouter;
