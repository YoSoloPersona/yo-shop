import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// local
import ErrorApi from "../errors/errorApi";

/**
 * Проверяет необходимые для авторизации данные.
 * @param req запрос.
 * @param res ответ.
 * @param next следубщий обработчик.
 * @returns void.
 */
export default function auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    // Если в запросе нет токена
    if (!token) {
        next(ErrorApi.unauthorized('Не авторизован.'));
        return;
    }

    // Проверяем присланный токен, получаем и сохраняем данные пользователя
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    Object.defineProperty(req, 'user', { value: user, writable: false });

    // следующий обработчик
    next();
}
