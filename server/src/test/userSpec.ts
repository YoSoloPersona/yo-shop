import 'jasmine';
import axios, { AxiosResponse } from 'axios';
import debug from 'debug';

// local
import { Url } from '../routers/routerUser';

// Определяем протоколы
const log = debug('test:log'); // Для отображения простой информации
const logError = debug('test:error'); // Для отображения ошибок

// Время ожидания ответов от сервера
const timeout = 3000;

// Данные для авторизации
const userData = JSON.stringify({
    email: 'user1@mail.ru',
    password: '1234',
    role: 'user'
});

// Общие для все запросов параметры
const protocol = process.env.SHOP_PROTOCOL || 'http';
const host = process.env.SHOP_HOST || 'localhost';
const port = Number(process.env.SHOP_PORT) || 3000;
const url = `${protocol}://${host}:${port}`;
const config = {
    baseURL: url,
    timeout: timeout
};

describe('#Проверка системы авторизации.', () => {
    it(
        'Регистрация пользователя.',
        done => {
            // Информация для отправки запроса
            const path = `/api/v1/user${Url.registration}`;

            axios
                .post(url + path, userData, {
                    ...config,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                //
                .then(({ status, data }) => {
                    expect(status).toBe(200); // Статус код в ответе должен быть "успешным"
                    expect(data).toBeDefined(); // Ответ дожлен содержать объект
                    expect(data.token).toBeDefined(); // В объекте должен быть определено поле с jsonwebtoken токеном
                    done();
                })
                //
                .catch(err => {
                    fail(err);
                    logError(`problem with request: ${err.message}`);
                });
        },
        timeout
    );

    it(
        'Авторизация пользователя.',
        done => {
            // Информация для отправки запроса
            const path = `/api/v1/user${Url.login}`;

            axios
                .post(url + path, userData, {
                    ...config,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                //
                .then(({ status, data }) => {
                    expect(status).toBe(200); // Статус код в ответе должен быть "успешным"
                    expect(data).toBeDefined(); // Ответ дожлен содержать объект
                    expect(data.token).toBeDefined(); // В объекте должен быть определено поле с jsonwebtoken токеном
                    done();
                })
                //
                .catch(err => {
                    fail(err);
                    logError(`problem with request: ${err.message}`);
                });
        },
        timeout
    );
});
