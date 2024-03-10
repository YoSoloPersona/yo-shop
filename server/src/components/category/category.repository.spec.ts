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

    it('crud', async () => {
        // Arrange
        const categoryComputers: Category = {
            name: 'Computers'
        };

        // Act
        // create
        const categoryComputersCreated = await categoryRepository.create(
            categoryComputers
        );


        // Assert
        expect(categoryComputersCreated).toEqual(
            jasmine.objectContaining(categoryComputers)
        );
    });
});
