import { createContext, useContext } from 'react';

// local
import { User } from '../models/user';
// import ServiceUser from '../services/serviceUser';

export class ServiceUser {
    private _isAuth = false;

    get isAuth() {
        return this._isAuth;
    }

    set isAuth(value) {
        this._isAuth = value;
    }

    private _user?: User;

    get user(): User | undefined {
        return this._user;
    }

    set user(value: User | undefined) {
        this._user = value;
    }

    registration() {}
}

// Создаём контекст для доставки данных о пользователе
const Context = createContext({ user: new ServiceUser() });

/**
 * Открывает доступ к контексту с данными о пользователе.
 * @returns данные о пользователе.
 */
export const useUser = () => useContext(Context);

/** Список дочерних элементов провайдера. */
type Props = { children: JSX.Element };

/** Провайдер контекста с данными о пользователе. */
export function UserProvider({ children }: Props) {
    return (
        <Context.Provider value={{ user: new ServiceUser() }}>
            {children}
        </Context.Provider>
    );
}
