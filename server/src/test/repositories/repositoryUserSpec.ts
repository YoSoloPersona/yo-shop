import 'jasmine';
import debug from 'debug';

// local
import { user1, admin, root } from '../data/users';
import { repositoryUser } from '../../repositories';
import e from 'express';

// Определяем протоколы
const log = debug('test:log'); // Для отображения простой информации
const logError = debug('test:error'); // Для отображения ошибок

/** Таймаут на выполнение утверждений. */
const timeoutIt = 20000;

describe('#Проверка репозитория пользователей.', () => {
    it(
        'Авторизация под root -> Очистка списка пользователей.',
        done => {
            repositoryUser
                // Авторизируемся под root
                .login(root)
                // Указываем репозиторию использовать токен, так как для удалении БД требуются дополнительные права
                .then(({ token }) => (repositoryUser.token = token))
                // Очищаем БД
                .then(() => repositoryUser.clear())
                // Регистрируем пользователя
                .then(() => repositoryUser.registrate(user1))
                // Удаляем зарегистрированного пользователя
                .then(() => repositoryUser.delete(user1))
                // Проверяем количество удалённых пользователей
                .then((count) => {
                    expect(count).toEqual(1);
                })
                // Тест успешно пройден
                .then(() => {
                    done();
                })
                // Тест не пройден
                .catch(err => {
                    if (err.response) {
                        // Был получен ответ
                        fail(`${err.message}, ${err.response.data.message}`);
                    } else if (err.response) {
                        // Был сделан запрос
                        fail(err);
                    } else {
                        // Запрос не был сделан
                        fail(err);
                    }
                });
        },
        timeoutIt
    );
});
