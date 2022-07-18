import express from 'express';
import debug from 'debug';
import cors from 'cors';

// local
import router from './routers';
import sequelize from './db/db';
import errorHandler from './middleware/errorHandle';

// версия API
const version = 1;

// Протоколы
const log = debug('app:log');
const logError = debug('app:error');

// Сервер
const app = express();

// Middleware
// app.use(cors);
app.use(express.json());
app.use(`/api/v${version}`, router);

// обработчик ошибок
app.use(errorHandler);

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
