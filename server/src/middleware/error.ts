import { Request, Response, NextFunction } from 'express';
import debug from 'debug';

// local
import ErrorApi from '../errors/errorApi';

const logError = debug('app:error');

/**
 * Обрабатывает ошибки API.
 * @param err возникшая ошибка.
 * @param req запрос.
 * @param res ответ.
 * @param next следующий обработчик.
 * @returns void.
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

    // Если не сгенерированная нами ошибка.
    logError(err);
    res.status(500).json({ message: `Непредвиденная ошибка.` });
}
