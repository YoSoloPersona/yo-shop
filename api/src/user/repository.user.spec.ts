import 'jasmine';

// locals
import { user1, root } from '../test/data/users.js';
import { RepositoryUser } from '../index.js';
import { User } from '@YoSoloPersona/yo-shop-model';

// timeout
const timeoutIt = 5000;

describe('#RepositoryUser', () => {
    let repositoryUser: RepositoryUser;

    // prepare repository
    beforeAll(() => {
        repositoryUser = new RepositoryUser({
            host: process.env.SHOP_HOST || 'localhost',
            port: Number(process.env.SHOP_PORT) || 3000
        });
    });

    it(
        'crud',
        async () => {
            // arrange
            await repositoryUser.authorization({
                email: process.env.SHOP_USER || '',
                password: process.env.SHOP_PASSWORD || ''
            }); // login as root
            await repositoryUser.deleteAll();

            // act
            const { token } = await repositoryUser.registration(user1);
            const countDeleted = await repositoryUser.delete(user1);

            // assert
            expect(token).toBeDefined();
            expect(countDeleted).toEqual(1);
        },
        timeoutIt
    );
});
