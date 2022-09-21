import 'jasmine';
import axios, { AxiosResponse } from 'axios';
import debug from 'debug';

// local
import { domain } from '../helpers/domain';
import { user } from './data/users'
import { repositoryUser } from '../repositories';

// Определяем протоколы
const log = debug('test:log'); // Для отображения простой информации
const logError = debug('test:error'); // Для отображения ошибок

// Время ожидания ответов от сервера
const timeout = 3000;


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
    Promise.resolve(
        it('Очистка базы данных.', (done) => {
            repositoryUser.clear();
        })
    )
    .then(() => {
        xit(
            'Регистрация пользователя.',
            done => {
                // Информация для отправки запроса
                
                const path = domain.api.user.registration.path;

                axios
                    .post(url + path, user, {
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
                    });
            },
            timeout
        )
    })
    .then(() => {
        xit(
            'Авторизация пользователя.',
            done => {
                // Информация для отправки запроса
                const path = domain.api.user.login.path;

                axios
                    .post(url + path, user, {
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
                    });
            },
            timeout
        );
    });
});
