import { Reducer, Action } from 'redux';

type User = {
    email: string | null;
    token: string | null;
};

/** Данные о пользователе. */
type Auth = {
    user: User;
};

/** Описание команд для изменения данных о пользователе. */
type AuthAction = {
    user: User;
} & Action<'SET_USER'>;

// Начальное состояние
// Проверяем был ли уже авторизован пользователь и пробуем вытащить данные
const initialState: Auth = {
    user: {
        email: localStorage.getItem('user.email'),
        token: localStorage.getItem('user.token')
    }
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
 * Редуктор.
 * @param state текущее состояние хранилища.
 * @param action действие (клманда).
 * @returns Auth.
 */
export const reducer: Reducer<Auth, AuthAction> = (
    state = initialState,
    { type, user }
) => {
    switch (type) {
        // Сохраняет данные авторизованного пользователя
        case 'SET_USER':
            user.email && localStorage.setItem('user.email', user.email);
            user.token && localStorage.setItem('user.token', user.token);

            return { ...state, user };

        default:
            return state;
    }
};
