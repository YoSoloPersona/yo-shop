import { Request, Response, NextFunction } from 'express';

// local
import ErrorApi from '../errors/errorApi';

/**
 * Обрабатывает ошибки API.
 * @param err возникшая ошибка
 * @param req запрос
 * @param res ответ
 * @param next следующий обработчик
 * @returns 
 */
export default function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Если возникла предвиденная нами ошибка.
    if (err instanceof ErrorApi) {
        res.status(err.status).json({ message: err.message });
        return;
    }

    res.status(500).json({ message: `Непредвиденная ошибка: ${err.message}` });
}
