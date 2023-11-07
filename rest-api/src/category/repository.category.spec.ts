import 'jasmine';

// locals
import { RepositoryCategory } from '..';
import { admin, root, user1 } from '../test/data/users';

// timeout
const timeoutIt = 5000;

xdescribe('#RepositoryCategory', () => {
    let repositoryCategory: RepositoryCategory;

    beforeAll(() => {
        repositoryCategory = new RepositoryCategory({});
    });

    xit(
        'crud',
        async () => {
            // arrange
            const categoruName = 'Category 1';
            await repositoryCategory.authorization({
                email: root.email,
                password: root.password
            }); // login as root

            // act
            const category = await repositoryCategory.create({
                name: categoruName
            });

            // arrange
            expect(category).toBeDefined();
            expect(category.name).toEqual('Категория1');
        },
        timeoutIt
    );
});
