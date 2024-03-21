import 'jasmine';

// locals
import { RepositoryCategory, RepositoryUser } from '../index.js';
import { admin, root, user1 } from '../test/data/users.js';
import { User } from '@YoSoloPersona/yo-shop-model';

// timeout
const timeoutIt = 5000;

describe('#RepositoryCategory', () => {
    let repositoryCategory: RepositoryCategory;

    beforeAll(() => {
        repositoryCategory = new RepositoryCategory({
            host: process.env.SHOP_HOST || 'localhost',
            port: Number(process.env.SHOP_PORT) || 3000
        });
    });

    it(
        'crud',
        async () => {
            // arrange
            await repositoryCategory.authorization({
                email: process.env.SHOP_USER || '',
                password: process.env.SHOP_PASSWORD || ''
            }); // login as root

            // act
            const category = await repositoryCategory.create({
                name: 'Category 1'
            });

            // arrange
            expect(category).toBeDefined();
            expect(category.name).toEqual('Категория1');
        },
        timeoutIt
    );

    it(
        'create with the user role',
        async () => {
            // arrange
            const repositoryUser = new RepositoryUser({
                host: process.env.SHOP_HOST || 'localhost',
                port: Number(process.env.SHOP_PORT) || 3000
            });
            await repositoryUser.authorization({
                email: process.env.SHOP_USER || '',
                password: process.env.SHOP_PASSWORD || ''
            });

            // prepare the user for authorization
            const man: Omit<User, 'role'> = {
                email: 'user@gmail.com',
                password: '1234'
            };
            const { token } = await repositoryUser.registration(man);

            const repositoryUserMan = new RepositoryUser({
                host: process.env.SHOP_HOST || 'localhost',
                port: Number(process.env.SHOP_PORT) || 3000
            });
            

            // Act
            await repositoryUserMan.authorization(man);

            // try adding a category with insufficient permissions
            expectAsync(await repositoryCategory.create({
                name: ''
            })).toBeRejected()


        },
        timeoutIt
    );
});
