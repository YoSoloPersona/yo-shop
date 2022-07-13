import express from 'express';
import debug from 'debug';

const app = express();
const port = 3000;

// Протоколы
const log = debug('app:log');

app.listen(port, () => {
    log(`Сервер запущен на порту: ${port}`);
});
