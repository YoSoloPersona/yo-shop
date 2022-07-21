import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    // Если в запросе не токена
    if (!token) {
        return res.status(401).json({ message: 'Не авторизован!' });
    }

    // Проверяем присланный токен, получаем и сохраняем данные пользователя
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    Object.defineProperty(req, 'user', { value: user, writable: false });   

    // следующий обработчик
    next();
}
