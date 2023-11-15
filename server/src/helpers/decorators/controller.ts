import debug from 'debug';

// locals
import { setMeta } from './meta';

// protocols
const log = debug('decorators:controller');
const error = debug('decorators:controller:error');

/**
 * Type with controller parameters
 */
export type MetaController = {
    /**
     * Path
     */
    path: string;
};

/**
 * Type of supported HTTP request types
 */
export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

/**
 * Type with description of method parameters
 */
export type MetaMethod = {
    /**
     * HTTP type of incoming request
     */
    httpMethod: HTTPMethod;

    /**
     * Address to which the method is bound
     */
    path?: string;

    /**
     * Parameter description string
     */
    params?: string;
};

/**
 * Symbols
 */
export const symbolsController = {
    /**
     * Symbol for accessing controller data
     */
    Controller: Symbol('controller'),

    /**
     * Symbol for accessing method data
     */
    Method: Symbol('method')
};

/**
 * Saves metadata about the controller
 * @param params сontroller parameters
 * @returns decorator function
 */
export const controller = function (params: MetaController) {
    return function (
        classConstructor: new (...args: any) => any,
        context: ClassDecoratorContext
    ) {
        if (context.kind !== 'class') {
            error(`Attempting to apply a decorator to a class other than a class`);
            return;
        }

        setMeta(classConstructor, symbolsController.Controller, params);
        log(`Controller '${classConstructor.name}' metadata saved`);

        return undefined;
    };
};

/**
 * Stores metadata about the method
 * @param httpMethod method type
 * @returns 
 */
function factory(httpMethod: HTTPMethod) {
    return function (params: Omit<MetaMethod, 'httpMethod'> = { params: '' }) {
        return function (
            classMethod: Function,
            context: ClassMethodDecoratorContext
        ) {
            if (context.kind !== 'method') {
                error(`Attempting to apply a decorator to a method that is not a method`);
                return ;
            }
            setMeta(classMethod, symbolsController.Method, { httpMethod, ...params });
            log(`Method '${classMethod.name}' metadata saved`);

            return undefined;
        };
    };
}

/**
 * Decorator for GET requests
 */
export const get = factory('get');

/**
 * Decorator for POST requests
 */
export const post = factory('post');

/**
 * Decorator for PUT requests
 */
export const put = factory('put');

/**
 * Decorator for DELETE requests
 */
export const del = factory('delete');
