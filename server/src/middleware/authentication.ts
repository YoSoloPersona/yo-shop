import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import debug from 'debug';

// locals
import { User } from 'yo-shop-model';

// protocols
const log = debug('middleware:authentification');
const error = debug('middleware:authentification:error');

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
            log(`token request received ${token}`);
            // verify the token sent
            const user = jwt.verify(token, process.env.SECRET_KEY as string);
            // retrieve and save user data
            Object.defineProperty(req, 'user', {
                value: user,
                writable: false,
                configurable: false
            });

            log(`the user is successfully authenticated ${user}`);
        }
    } catch (err) {
        error(err);
        next(err);
    }

    // next handler
    next();
}
