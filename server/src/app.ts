import express, {
    Request,
    RequestHandler,
    ErrorRequestHandler,
    Router
} from 'express';
import { Server } from 'node:http';
import debug from 'debug';
import { Role } from 'yo-shop-model';

// locals
import config from './config';
import {
    HTTPMethod,
    MetaController,
    MetaMethod,
    symbolsController,
    symbolsRoles
} from './helpers/decorators';
import { getMeta } from './helpers/decorators';
import { authorization } from './middleware/authorization';

// protocols
const log = debug('app:log');
const error = debug('app:error');

// server
const app = express();

/**
 * Start server.
 * @returns Promise<Server>
 */
export function start(): Promise<Server> {
    return Promise.resolve(
        app.listen(config.server.port, () => {
            log(`server starts on port: ${config.server.port}`);
        })
    );
}

/**
 *
 * @param classConstructor
 * @returns
 */
export function addController(
    classConstructor: new (...args: any) => any
): Promise<void> {
    // if no constructor is passed
    if (!classConstructor) {
        return Promise.resolve();
    }

    const { path: pathController } = getMeta<MetaController>(
        classConstructor,
        symbolsController.Controller
    );

    // if there is no metadata
    if (!pathController || typeof pathController !== 'string') {
        return Promise.resolve();
    }

    const router = Router();
    const controller = new classConstructor();

    log(`added controller ${classConstructor.name}`);

    Reflect.ownKeys(classConstructor.prototype)
        // get all props
        .map(prop => classConstructor.prototype[prop])
        // filter only methods for which metadata with methods is defined
        .filter(
            prop =>
                prop instanceof Function &&
                getMeta(prop, symbolsController.Method)
        )
        .map<[Function, MetaMethod]>(classMethod => [
            classMethod,
            getMeta(classMethod, symbolsController.Method)
        ])
        .forEach(([classMethod, { httpMethod, path: pathMethod, params }]) => {
            const handlers: RequestHandler[] = [];

            // get roles
            const roles: Role[] | undefined = getMeta(
                classMethod,
                symbolsRoles.Roles
            );

            if (Array.isArray(roles)) {
                handlers.push(authorization(...roles));
            }

            const getArgs = GetArgs(httpMethod);

            // register the handler
            router[httpMethod](
                // path
                `${pathController}${pathMethod ?? ''}${params ?? ''}`,
                // handlers
                ...handlers,
                (req, res, next) => {
                    const result = classMethod.call(controller, getArgs(req, params));

                    if (result instanceof Promise) {
                        result
                            .then(promiseResult => {
                                res.json(promiseResult);
                            })
                            .catch(err => next(err));
                    } else {
                        res.send(result.toString());
                    }
                }
            );
            log(
                `Add handler ${classConstructor.name}.${classMethod.name}(${httpMethod})`
            );
        });

    // add router
    app.use(router);

    return Promise.resolve();
}

export function addMiddleware(
    middleWare: RequestHandler | ErrorRequestHandler
) {
    app.use(middleWare);
    log(`Add middleware ${middleWare.name}`);
}

function GetArgs(httpMethod: HTTPMethod): (req: Request, params?: string) => any {
    switch (httpMethod) {
        case 'get':
            return getArgsGet;

        case 'post':
            return getArgsPost;

        case 'put':
            return getArgsPut;

        case 'delete':
            return getArgsDelete;

        default:
            throw Error('');
    }
}

function getArgsGet(req: Request, params?: string): any {
    return params ? req.params : undefined;
}

function getArgsPost(req: Request, params?: string): any {
    return req.body;
}

function getArgsPut(req: Request, params?: string): any {
    return req.body;
}

function getArgsDelete(req: Request, params?: string): any {
    return params ? req.params : undefined;
}
