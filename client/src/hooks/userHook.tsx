import { createContext, useContext } from 'react';

// local
import ServiceUser from '../services/serviceUser';

// Создаём контекст для доставки данных о пользователе
const Context = createContext({ user: new ServiceUser() });

/**
 * Открывает доступ к контексту с данными о пользователе.
 * @returns данные о пользователе.
 */
export const useUser = () => useContext(Context);

/** Список дочерних элементов провайдера. */
type Props = { children: JSX.Element[] };

/** Провайдер контекста с данными о пользователе. */
export function UserProvider({ children }: Props) {
    return (
        <Context.Provider value={{ user: new ServiceUser() }}>
            {children}
        </Context.Provider>
    );
}
