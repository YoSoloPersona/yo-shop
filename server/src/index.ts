import express from 'express';
import debug from 'debug';
import cors from "cors";

// local
import sequelize from './db/db';
import * as models from './models/models';

// Протоколы
const log = debug('app:log');

// Сервер
const app = express();

// Middleware
// app.use(cors);
app.use(express.json());

// Routers
app.get('/', (req, res) => {
    res.json({message: 'working!!!'})
})

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
    .catch(err => {
        log(err);
    })
