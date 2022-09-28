import 'jasmine';
import jwb, { JwtPayload } from 'jsonwebtoken';

// local
import { sequelize } from '../../db/sequelize';
import ControllerUser from '../../controllers/controllerUser';
import { user1 } from '../data/users';
import { OptionalUser } from '../../models';

/** Таймаут на одидание проверки одного уьверждения. */
const timeoutIt = 10000;

/**
 * Сравнивает данные из токена с данными пользователя.
 * @param token токен.
 * @param user пользователь.
 */
function compareTokenAndUser(token: string, user: OptionalUser) {
    expect(token).toBeDefined();
    const { email, role } = jwb.decode(token) as JwtPayload;
    expect(email).toEqual(user.email);
    expect(role).toEqual(user.role);
}

describe('Проверка контроллера для работы с пользователями.', () => {
    // Вначале соединимся с БД
    beforeAll(done => {
        sequelize.authenticate()
            .then(() => {
                done();
            })
            .catch(err => fail(err));
    });

    it(
        'Очистка таблицы с пользователями -> Добавление пользователя -> Запрос пользователя -> Удаление пользователя.',
        done => {
            ControllerUser
                // Очистка таблицы
                .clear()
                // Регистрация пользователя
                .then(() =>
                    ControllerUser.registration(
                        user1.email,
                        user1.password,
                        user1.role
                    )
                )
                // проверка
                .then(token => {
                    compareTokenAndUser(token, user1);
                })
                // Авторизация
                .then(() => ControllerUser.login(user1.email, user1.password))
                // Проверка
                .then(token => {
                    compareTokenAndUser(token, user1);
                })
                // Удаляем добавленного пользователя
                .then(() => ControllerUser.delete({ email: user1.email }))
                // Проверка
                .then(countDeleted => expect(countDeleted).toEqual(1))
                // Успешно завершили тест
                .then(done)
                // Обрабатываем ошибки
                .catch(err => fail(err));
        },
        timeoutIt
    );
});
