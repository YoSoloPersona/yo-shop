import 'jasmine';
import * as http from 'http';
import debug from 'debug';

// local
import { Paths } from '../routers/routerUser';

// Определяем протоколы
const log = debug('test:log'); // Для отображения простой информации
const logError = debug('test:error'); // Для отображения ошибок

// Время ожидания ответов от сервера
const timeout = 10000;

// Данные для авторизации
const userData = JSON.stringify({
    email: 'user1@mail.ru',
    password: '1234',
    role: 'user',
});

describe('#Проверка системы авторизации.', () => {
    it(
        'Регистрация пользователя.',
        done => {
            
            // Информация для отправки запроса
            const options = {
                hostname: process.env.HOST || 'localhost',
                port: Number(process.env.PORT) || 80,
                path: `/api/v1/user${Paths.registration}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(userData),
                },
            };

            // Формируем запрос
            const req = http.request(options, res => {
                const offset = 0;
                //const buffer =  Buffer.alloc(Number(res.headers['content-length']));
                const buffer: number[] = [];

                // Получили ответ
                res.setEncoding('utf8');
                // Считываем тело ответа
                res.on('readable', () => {
                    let data;
                    while (null != (data = res.read())) {
                        buffer.push(data);
                    }
                })
                    // Закончили считывание
                    .on('end', () => {
                        expect(res.statusCode).toBe(200); // Статус код в ответе должен быть "успешным"
                        const answer = JSON.parse(buffer.join(''));
                        expect(answer).toBeDefined(); // Ответ дожлен содержать объект
                        expect(answer.token).toBeDefined(); // В объекте должен быть определено поле с jsonwebtoken токеном
                        done();
                    })
                    // Ошибка при отпраке запроса
                    .on('error', err => {
                        fail(err);
                    });
            });

            req.on('error', e => {
                logError(`problem with request: ${e.message}`);
            });

            // Дописываем тело и отправлем запрос
            req.write(userData);
            req.end();
        },
        timeout
    );

    it(
        'Авторизация пользователя.',
        done => {
            // Информация для отправки запроса
            const options = {
                hostname: process.env.HOST || 'localhost',
                port: Number(process.env.PORT) || 80,
                path: `/api/v1/user${Paths.login}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(userData),
                },
            };

            // Формируем запрос
            const req = http.request(options, res => {
                const offset = 0;
                //const buffer =  Buffer.alloc(Number(res.headers['content-length']));
                const buffer: number[] = [];

                // Получили ответ
                res.setEncoding('utf8');
                // Считываем тело ответа
                res.on('readable', () => {
                    let data;
                    while (null != (data = res.read())) {
                        buffer.push(data);
                    }
                })
                    // Закончили считывание
                    .on('end', () => {
                        expect(res.statusCode).toBe(200); // Статус код в ответе должен быть "успешным"
                        const answer = JSON.parse(buffer.join(''));
                        expect(answer).toBeDefined(); // Ответ дожлен содержать объект
                        expect(answer.token).toBeDefined(); // В объекте должен быть определено поле с jsonwebtoken токеном
                        done();
                    })
                    // Ошибка при отпраке запроса
                    .on('error', err => {
                        fail(err);
                    });
            });

            req.on('error', e => {
                logError(`problem with request: ${e.message}`);
            });

            // Дописываем тело и отправлем запрос
            req.write(userData);
            req.end();
        },
        timeout
    );
});
