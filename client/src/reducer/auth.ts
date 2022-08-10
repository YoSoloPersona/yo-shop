import { Reducer, Action } from 'redux';

// local
import { User } from '../models/user';

/** Данные о пользователе. */
type Auth = {
    user?: User;

    token: string;
};

/** Описание команд для изменения данных о пользователе. */
type AuthAction = {
    user?: User;
    token?: string;
} & Action<'SET_USER' | 'SET_TOKEN' | 'SET_AUTH'>;

// Начальное состояние
const initialState = {
    user: undefined,

    token: ''
};

/**
 * Сохраняет данные авторизованного пользователя.
 * @param user данные авторизованного пользователя.
 * @returns AuthAction.
 */
export function setUserAction(user: User): AuthAction {
    return {
        type: 'SET_USER',
        user
    };
}

/**
 * Сохраняет токен авторизованного пользователя.
 * @param token JWT токен авторизованного пользователя
 * @returns AuthAction.
 */
export const setTokenAction = (token = '') => {
    return {
        type: 'SET_TOKEN',
        token
    };
};

/**
 * Сохраняет данные авторизованного пользователя.
 * @param param0 данные авторизованного пользователя.
 * @returns AuthAction.
 */
export const setAuthAction = ({user, token}: Auth) => {
    return {
        type: 'SET_AUTH',
        user,
        token
    }
}

/**
 * Редуктор.
 * @param state текущее состояние хранилища.
 * @param action действие (клманда).
 * @returns Auth.
 */
export const reducer: Reducer<Auth, AuthAction> = (
    state = initialState,
    { type, user, token }
) => {
    switch (type) {
        // Сохраняет данные авторизованного пользователя
        case 'SET_USER':
            return { ...state, user };

        // Сохраняет JWT токен авторизованного пользователя
        case 'SET_TOKEN':
            return { ...state, token: token ?? '' };

        // Сохраняет данные авторизованного пользователя
        case 'SET_AUTH':
            console.log({ ...state, user, token: token ?? '' });
            return { ...state, user, token: token ?? '' }

        default:
            return state;
    }
};
