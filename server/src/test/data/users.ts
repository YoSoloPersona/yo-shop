import { OptionalUser } from '../../models';

// Заранее опрделённые для тестирования пользователи

/** Администратор. */
export const root: OptionalUser = {
    email: 'yo.solo.persona@gmail.com',
    password: '1234',
    role: 'root'
};

/** Администратор. */
export const admin: OptionalUser = {
    email: 'admin@mail.ru',
    password: '1234',
    role: 'admin'
};

/** Обычный пользователь. */
export const user1: OptionalUser = {
    email: 'user1@mail.ru',
    password: '1234',
    role: 'user'
};
