import express from 'express';
import debug from 'debug';

const app = express();

const PORT = process.env.PORT || 3000;

// Протоколы
const log = debug('app:log');

app.listen(PORT, () => {
    log(`Сервер запущен на порту: ${PORT}`);
});
