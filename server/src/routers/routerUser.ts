import { NextFunction, Router, Request, Response } from 'express';
import debug from 'debug';

// local
import ControllerUser from '../controllers/controllerUser';
import auth from '../middleware/auth';
import { domain } from '../helpers/domain';
import { role } from '../middleware/role';

const log = debug('app:log');

// Создаём роутер
export const router = Router();

// Регистрация пользователя
router.post(
    domain.api.user.registration.url,
    (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        // Регистрируем пользователя
        // При регистрации, регистрируем пользователей не выше user
        ControllerUser.registration(email, password, 'user')
            // Если успешно зарегистрировали, отправлем полученный jwt токен
            .then(token => res.json({ token }))
            // Произошла ошибка при регистрации пользователя
            .catch(next);
    }
);

// Авторизация пользователя
router.post(
    domain.api.user.login.url,
    (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        ControllerUser.login(email, password)
            // Авторизуем пользователя
            .then(token => res.json({ token }))
            // Произошла ошибка при регистрации пользователя
            .catch(err => next(err));
    }
);

// Удаление пользователей
router.delete(
    '/',
    role('root', 'admin'), // Разрешаем удалять пользователей только для администраторов
    (req: Request, res: Response, next: NextFunction) => {
        
        (Object.getOwnPropertyNames(req.query).length !== 0
            ? ControllerUser.delete(req.query) // Удаляем пользователей по фильтру
            : ControllerUser.clear()
        ) // Если не указаны параметры удаляем всех пользователей
            // Возвращаем количество удалённых пользователей
            .then(count => res.json({ count }))
            // Проризошла ошибка при удалении пользователей
            .catch(next);
    }
);
