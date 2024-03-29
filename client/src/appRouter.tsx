import { connect, ConnectedProps } from 'react-redux';
import {  useRoutes } from 'react-router-dom';

// local
import { RootState } from './reducer';
import { domain } from './domain';
import Admin from './components/admin';
import Basket from './components/basket';
import Shop from './components/shop';
import Auth from './components/auth';
import Device from './components/device';

/** Список роутеров требующих авторизации. */
const authRoutes = [
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
const publicRoutes = [
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

const mapState = (state: RootState) => state.auth;

const mapDispatch = {};

const connecter = connect(mapState, mapDispatch);

type Props = {} & ConnectedProps<typeof connecter>;

/**
 * Компонент. Создаёт роутеры.
 * @param props 
 * @returns 
 */
const AppRouter = (props: Props) => {

    // Создаём роутеры
    return useRoutes([...((props.user) ? authRoutes : []), ...publicRoutes])
};

export default connecter(AppRouter);
