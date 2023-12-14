import debug from 'debug';

// locals
import { setMeta } from './meta';
import { Role } from '@YoSoloPersona/yo-shop-model';

// protocols
const log = debug('decorators:role');

/**
 *  Symbols
 */
export const symbolsRoles = {
    /**
     * Symbol to access the data of the roles for which the method is available
     */
    Roles: Symbol('roles')
};

/**
 * Saves the metadata of the list of user roles that have access to the method
 * @param roles list of user roles
 * @returns decorator function
 */
export function roles(...roles: Role[]): (classMethod: Function, context: ClassMethodDecoratorContext) => void {
    return function (
        classMethod: Function,
        context: ClassMethodDecoratorContext
    ) {
        if (context.kind !== 'method') {
            return;
        }

        setMeta(classMethod, symbolsRoles.Roles, roles);
        log(`metadata for the method ${classMethod.name} are set [${roles.reduce((acc, role) => acc += `'${role}', `,"")}]`);
    };
}
