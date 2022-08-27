import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// local
import { User, Role } from '../models';
import ErrorApi from '../errors/errorApi';

/**
 * Проверяет наличие прав для выполнения операции.
 * @param role тип пользователя.
 * @returns (req: Request, res: Response, next: NextFunction) => void.
 */
export function role (role: Role) {
    /**
     * Проверяет необходимые для авторизации данные.
     * @param req запрос.
     * @param res ответ.
     * @param next следубщий обработчик.
     * @returns void.
     */
    return function auth(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }

        const token = req.headers.authorization?.split(' ')[1];

        // Если в запросе нет токена
        if (!token) {
            next(ErrorApi.unauthorized('Не авторизован.'));
            return;
        }
        console.log(token)
        // Проверяем присланный токен, получаем и сохраняем данные пользователя
        try {
            const user = jwt.verify(
                token,
                process.env.SECRET_KEY as string
            ) as User;
            Object.defineProperty(req, 'user', { value: user, writable: false });

            if (role !== user?.role) {
                next(ErrorApi.forbidden('Не достаточно прав.'));
            }
        } catch (error) {
            next(ErrorApi.forbidden('Ошибка при верификации токена.'));
        }

        // следующий обработчик
        next();
    };
}
