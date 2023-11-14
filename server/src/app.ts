import express, { RequestHandler, ErrorRequestHandler, Router } from 'express';
import { Server } from 'node:http';
import debug from 'debug';

// locals
import config from './config';
import { MetaController, MetaGet, symbols } from './helpers/decorators';
import { getMeta } from './helpers/decorators/meta';

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
        symbols.Controller
    );

    // if there is no metadata
    if (!pathController || typeof pathController !== 'string') {
        return Promise.resolve();
    }

    const router = Router();
    const controller = new classConstructor();

    log(`added controller ${classConstructor.name}`);

    Reflect.ownKeys(classConstructor.prototype)
        .map(prop => classConstructor.prototype[prop])
        .filter(
            prop => prop instanceof Function && getMeta(prop, symbols.Method)
        )
        .map<[Function, MetaGet]>(method => [
            method,
            getMeta(method, symbols.Method)
        ])
        .forEach(([classMethod, { httpMethod, path: pathMethod, params }]) => {
            // register the handler
            switch (httpMethod) {
                case 'get':
                    router[httpMethod](
                        // path
                        `${pathController}${pathMethod ?? ''}${params}`,
                        // handler
                        (req, res, next) => {
                            const result = classMethod.call(
                                controller,
                                params ? req.params : undefined
                            );

                            if (result instanceof Promise) {
                                result
                                    .then(promiseResult => {
                                        res.send(promiseResult);
                                    })
                                    .catch(err => next(err));
                            } else {
                                res.send(result.toString());
                            }
                        }
                    );
                    break;

                case 'post':
                    router[httpMethod](
                        // path
                        `${pathController}${pathMethod ?? ''}${params ?? ''}`,
                        // handler
                        (req, res, next) => {
                            const result = classMethod.call(
                                controller,
                                req.body
                            );

                            if (result instanceof Promise) {
                                result
                                    .then(promiseResult => {
                                        res.send(promiseResult);
                                    })
                                    .catch(err => next(err));
                            } else {
                                res.send(result.toString());
                            }
                        }
                    );
                    break;

                case 'delete':
                    router[httpMethod](
                        // path
                        `${pathController}${pathMethod ?? ''}${params}`,
                        // handler
                        (req, res, next) => {
                            const result = classMethod.call(
                                controller,
                                params ? req.params : undefined
                            );

                            if (result instanceof Promise) {
                                result
                                    .then(promiseResult => {
                                        res.send(promiseResult.toString());
                                    })
                                    .catch(err => next(err));
                            } else {
                                res.send(result.toString());
                            }
                        }
                    );
                    break;
            }

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
