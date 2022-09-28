import 'jasmine';
import debug from 'debug';

// local
import { repositoryUser, repositoryCategory } from '../../repositories';
import { admin, user1 } from '../data/users';

// Таймаут на выполнение утверждения
const timeoutIt = 3000;

xdescribe('#Проверка работы с категориями ', () => {
    let token = '';

    // Для работы с категориями товаров, необходимо авторизоваться под админом
    Promise.resolve(
        xit(
            'Авторизация пользователя',
            done => {
                repositoryUser
                    .login(admin)
                    .then(answer => {
                        expect(answer).toBeDefined(); // Ответ дожлен содержать объект
                        expect(answer.token).toBeDefined(); // В объекте должен быть определено поле с jsonwebtoken
                        token = answer.token;
                        done();
                    })
                    .catch(err => {
                        fail(err);
                    });
            },
            timeoutIt
        )
    ).then(() => {
        xit('Добавление категории', done => {
            repositoryCategory
                .push({ name: 'Категория1' })
                .then(category => {
                    expect(category).toBeDefined(); // Ответ дожлен содержать объект
                    expect(category.name).toEqual('Категория1'); // В объекте должен быть определено
                    done();
                })
                .catch(err => {
                    fail(err);
                });
        });
    });
});
