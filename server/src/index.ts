import express from 'express';
import debug from 'debug';
import cors from 'cors';

// local
import { router as routerApi } from './routers/routerApi';
import { domain } from './routers/domain';
import sequelize from './db/db';
import {error} from './middleware/error';

// Протоколы
const log = debug('app:log');
const logError = debug('app:error');

// Сервер
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(domain.api.url, routerApi);

// обработчик ошибок
app.use(error);
 
sequelize
    // авторизируемся в бд
    .authenticate()
    // синхронизируемся с бд
    .then(() => sequelize.sync())
    // запускаем сервер
    .then(() => {
        const PORT = process.env.PORT || 3000;

        // Запускаем сервер
        app.listen(PORT, () => {
            log(`Сервер запущен на порту: ${PORT}`);
        });
    })
    // обработка ошибок
    .catch((err) => {
        logError(err);
    });
