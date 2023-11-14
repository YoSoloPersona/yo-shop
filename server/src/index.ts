import express from 'express';
import cors from 'cors';
import debug from 'debug';

// locals
import { db } from './db';
import { errorHandler } from './middleware/errorHandler';
import { addController, addMiddleware, start } from './app';
import { ControllerUser } from './components/user';
import authentication from './middleware/authentication';

// protocols
const log = debug('app:log');
const error = debug('app:error');

// init db
db()
    // add middleware
    .then(() => {
        addMiddleware(cors());
        addMiddleware(express.json());
        addMiddleware(authentication);

        // errors handler!
        addMiddleware(errorHandler);
    })
    // add controllers
    .then(() => addController(ControllerUser))
    // start server
    .then(() => start())
    // catch errors
    .catch(err => {
        error(err);
    });
