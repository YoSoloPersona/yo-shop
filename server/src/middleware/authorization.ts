import { Response, NextFunction } from 'express';
import { Role } from 'yo-shop-model';
import debug from 'debug';

// locals
import ErrorApi from '../errors/errorApi';
import { RequestAuthentication } from './authentication';

// protocols
const log = debug('middleware:authorization');
const error = debug('middleware:authorization:error');

/**
 * Creates a function to check if you have permissions to perform an operation
 * @param role List of user roles for which access to query execution is allowed
 * @returns (req: Request, res: Response, next: NextFunction) => void.
 */
export function role(...role: Role[]) {
    /**
     * Checks if you have permissions to perform the operation.
     * @param req request
     * @param res response
     * @param next next handler
     * @returns void.
     */
    return function authorization(
        req: RequestAuthentication,
        res: Response,
        next: NextFunction
    ) {
        if (!req.user) {
            
            return next(ErrorApi.unauthorized('User is not authenticated'));
        }

        if (!role.includes(req.user.role)) {
            return next(
                ErrorApi.forbidden('Not enough rights to execute the request')
            );
        }

        log(`user successfully authorized`);
        // next handler
        next();
    };
}
