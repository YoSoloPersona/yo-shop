import { User } from '@YoSoloPersona/yo-shop-model';

// Заранее опрделённые для тестирования пользователи

/** Администратор. */
export const root: User = {
    email: 'yo.solo.persona@gmail.com',
    password: '1234',
    role: 'root'
};

/** Администратор. */
export const admin: User = {
    email: 'admin@mail.ru',
    password: '1234',
    role: 'admin'
};

/** Обычный пользователь. */
export const user1: User = {
    email: 'user1@mail.ru',
    password: '1234',
    role: 'user'
};
