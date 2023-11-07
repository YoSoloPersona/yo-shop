import 'jasmine';

// locals
import { user1, root } from '../test/data/users';
import { RepositoryUser } from '..';

// timeout
const timeoutIt = 5000;

describe('#RepositoryUser', () => {
    let repositoryUser: RepositoryUser;

    beforeAll(() => {
        repositoryUser = new RepositoryUser({});
    });

    it(
        'crud',
        async () => {
            // arrange
            await repositoryUser.authorization({
                email: root.email,
                password: root.password
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
