import debug from 'debug';

// locals
import { setMeta } from './meta';

// protocols
const log = debug('controller');

/**
 * Type with controller parameters
 */
export type MetaController = {
    /**
     * Path
     */
    path: string;
};

type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export type MetaMethod = {
    /**
     * 
     */
    httpMethod: HTTPMethod;

    /**
     * 
     */
    path?: string;

    /**
     * 
     */
    params?: string;
};

export const symbols = {
    /**
     * 
     */
    Controller: Symbol('controller'),

    /**
     * 
     */
    Method: Symbol('method')
};

/**
 * 
 * @param params 
 * @returns 
 */
export const controller = function (params: MetaController) {
    return function (
        classConstructor: new (...args: any) => any,
        context: ClassDecoratorContext
    ) {
        setMeta(classConstructor, symbols.Controller, params);

        return undefined;
    };
};

/**
 * 
 * @param httpMethod 
 * @returns 
 */
function factory(httpMethod: HTTPMethod) {
    return function (params: Omit<MetaMethod, 'httpMethod'> = { params: '' }) {
        return function (
            classMethod: Function,
            context: ClassMethodDecoratorContext
        ) {
            setMeta(classMethod, symbols.Method, { httpMethod, ...params });

            return undefined;
        };
    };
}

export const get = factory('get');

export const post = factory('post');

export const put = factory('put');

export const del = factory('delete');
