import React from 'react';
import { Route, NavLink, Link, Routes } from 'react-router-dom';


// local
import { authRoutes, publicRoutes } from './routes';

type Props = {};

const AppRouter = (props: Props) => {
    const isAuth = false;

    return <Routes>
        {isAuth && authRoutes.map((info) => <Route key={info.path} path={info.path} element={info.element({})}></Route>)}
        {publicRoutes.map((info) => <Route key={info.path} path={info.path} element={info.element({})}></Route>)}
    </Routes>;
};

export default AppRouter;
