import React, { useContext } from 'react';
import { Route, NavLink, Link, Routes, useRoutes } from 'react-router-dom';


// local
import { useUser } from "./hooks/userHook";
import { domain } from './domain';
import Admin from './components/admin';
import Basket from './components/basket';
import Shop from './components/shop';
import { Auth } from './components/auth';
import Device from './components/device';

/** Список роутеров требующих авторизации. */
export const authRoutes = [
    {
        path: domain.user.admin.url,
        element: <Admin />
    },

    {
        path: domain.basket.url,
        element: <Basket />
    }
];

/** Список роутеров НЕ требующих авторизации. */
export const publicRoutes = [
    {
        path: domain.shop.url,
        element: <Shop />
    },
    {
        path: domain.user.login.url,
        element: <Auth />
    },
    {
        path: domain.user.registration.url,
        element: <Auth />
    },
    {
        path: domain.device.url + '/:id',
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
