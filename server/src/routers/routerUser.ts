import { NextFunction, Router, Request, Response } from 'express';
import debug from 'debug';

// local
import ControllerUser from '../controllers/controllerUser';
import auth from '../middleware/auth';
import { domain } from '../helpers/domain';

const log = debug('app:log');

// Создаём роутер
export const router = Router();

// Регистрация пользователя
router.post(
    domain.api.user.registration.url,
    (req: Request, res: Response, next: NextFunction) => {
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
router.post(domain.api.user.login.url, (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    ControllerUser.login(email, password)
        // Авторизуем пользователя
        .then(token => res.json({ token }))
        // Произошла ошибка при регистрации пользователя
        .catch(err => next(err));
});

// Удаление пользователей
router.delete('/', (req: Request, res: Response, next: NextFunction) => {
    log(req.query);
    
    if (req.query) {
        ControllerUser.delete({ where: req.query });
    }
    else {
        ControllerUser.delete({ truncate: true });
    }
    
});
