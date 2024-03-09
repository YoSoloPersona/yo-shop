import { Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { orm, Repository } from '../../db';

describe('#CategoryRepository', () => {
    let categoryRepository: Repository<Category>;

    beforeAll(async () => {
        // connect to database
        await orm.init();

        // create test repository
        categoryRepository = orm.createRepositoryCategory();
    });

    it('create', async () => {
        // Arrange
        const categoryComputers: Category = {
            name: 'Computers'
        };

        // Act
        const categoryFromAnswer = await categoryRepository.create(
            categoryComputers
        );

        // Assert
        console.log(categoryFromAnswer);
        expect(categoryFromAnswer).toContain(categoryComputers);
    });
});
