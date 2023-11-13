import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// locals
import { User } from 'yo-shop-model';

/**
 * Type of request with authenticated user data
 */
export interface RequestAuthentication extends Request {
    user?: User;
}

/**
 * Authenticates the user and, if successful, stores the user's details in the request
 * @param req request
 * @param res response
 * @param next next handler
 * @returns
 */
export default function authentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // skip OPTIONS requests
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];

        // there is no token in the request
        if (token) {
            // verify the token sent
            const user = jwt.verify(token, process.env.SECRET_KEY as string);
            // retrieve and save user data
            Object.defineProperty(req, 'user', {
                value: user,
                writable: false,
                configurable: false
            });
        }
    } catch (error) {
        next(error);
    }

    // next handler
    next();
}
