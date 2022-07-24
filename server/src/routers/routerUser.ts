import { NextFunction, Router, Request, Response } from 'express';
import debug from 'debug';

// local
import ControllerUser from '../controllers/controllerUser';
import auth from '../middleware/auth';

const log = debug('app:log');

export class Url {
    static get registration() {
        return '/registration';
    }

    static get login() {
        return '/login';
    }

    static get auth() {
        return '/auth';
    }
}

// Создаём роутер
export const router = Router();

//
router.post(
    Url.auth,
    auth,
    (req: Request, res: Response, next: NextFunction) => {
        res.json({ message: 'good' });
    }
);

// Регистрация пользователя
router.post(
    Url.registration,
    (req: Request, res: Response, next: NextFunction) => {
        log(router);
        const { email, password, role } = req.body;
        // Регистрируем пользователя
        ControllerUser.registration(email, password, role)
            // Если успешно зарегистрировали, отправлем полученный jwt токен
            .then(token => res.json({ token }))
            // Произошла ошибка при регистрации пользователя
            .catch(err => next(err));
    }
);

// Авторизация пользователя
router.post(Url.login, (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    ControllerUser.login(email, password)
        // Авторизуем пользователя
        .then(token => res.json({ token }))
        // Произошла ошибка при регистрации пользователя
        .catch(err => next(err));
});

// Удаление пользователя
router.delete('/', ControllerUser.delete);
