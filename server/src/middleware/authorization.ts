import { Response, NextFunction, RequestHandler } from 'express';
import { Role } from '@YoSoloPersona/yo-shop-model';
import debug from 'debug';

// locals
import ErrorApi from '../errors/errorApi';
import { RequestAuthentication } from './authentication';

// protocols
const log = debug('middleware:authorization');
const error = debug('middleware:authorization:error');

/**
 * Creates a function to check if you have permissions to perform an operation
 * @param roles List of user roles for which access to query execution is allowed
 * @returns (req: Request, res: Response, next: NextFunction) => void.
 */
export function authorization(...roles: Role[]): RequestHandler {
    /**
     * Checks if you have permissions to perform the operation.
     * @param req request
     * @param res response
     * @param next next handler
     * @returns void.
     */
    return function (
        req: RequestAuthentication,
        res: Response,
        next: NextFunction
    ) {
        if (!req.user) {
            error('User is not authenticated');
            return next(ErrorApi.unauthorized('User is not authenticated'));
        }

        if (!roles.includes(req.user.role)) {
            error('Not enough rights to execute the request');
            return next(
                ErrorApi.forbidden('Not enough rights to execute the request')
            );
        }

        log(`user successfully authorized`);
        // next handler
        next();
    };
}
