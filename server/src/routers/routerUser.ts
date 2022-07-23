import { NextFunction, Router, Request, Response } from 'express';

// local
import ControllerUser from '../controllers/controllerUser';
import auth from '../middleware/auth';

export class Paths {
    static get registration() {
        return '/registration';
    }

    static get login() {
        return '/login';
    }
}

// Создаём роутер
export const router = Router();

// 
router.post('/auth', auth, (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'good' });
});

// Регистрация
router.post(
    Paths.registration,
    (req: Request, res: Response, next: NextFunction) => {
        const { email, password, role } = req.body;
        // Регистрируем пользователя
        ControllerUser.registration(email, password, role)
            // Если успешно зарегистрировали, отправлем полученный jwt токен
            .then((token) => res.json({ token }))
            // Произошла ошибка при регистрации пользователя
            .catch((err) => next(err));
    }
);

router.post(Paths.login, (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    ControllerUser.login(email, password)
        .then((token) => res.json({ token }))
        .catch((err) => next(err));
});

router.delete('/', ControllerUser.delete);