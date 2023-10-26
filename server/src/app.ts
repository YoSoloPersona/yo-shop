import express from 'express';
import { Server } from 'node:http';
import debug from 'debug';
import cors from 'cors';

// locals
import config from './config';
import { router as routerApi } from './routers/routerApi';
import { domain } from './helpers/domain';
import { errorHandler } from './middleware/errorHandler';

// Protocols
const log = debug('app:log');
const error = debug('app:error');

// Server
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(domain.api.url, routerApi);
app.use(errorHandler);

// start server
export function start(): Promise<Server> {
    return Promise.resolve(
        app.listen(config.server.port, () => {
            log(`server starts on port: ${config.server.port}`);
        })
    );
}
