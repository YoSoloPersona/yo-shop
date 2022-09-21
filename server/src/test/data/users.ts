// Заранее опрделённые для тестирования пользователи

import { User } from '../../models';

/** Администратор. */
export const admin: User = {
    email: 'admin@mail.ru',
    password: '1234',
    role: 'admin'
}

/** Обычный пользователь. */
export const user = JSON.stringify({
    email: 'user1@mail.ru',
    password: '1234',
    role: 'user'
});