import { Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { orm, Repository } from '../../db';

describe('#CategoryRepository', () => {
    let repositoryCategory: Repository<Category>;

    beforeAll(async () => {
        // connect to database
        await orm.init();

        // create test repository
        repositoryCategory = orm.createRepositoryCategory();
    });

    it('create read update delete', async () => {
        // Arrange
        const categoryComputers: Category = {
            name: 'Computers'
        };
        const categoryComputersNew: Category = {
            name: 'ComputersNew'
        };

        // Act
        // create
        const categoryComputersCreated = await repositoryCategory.create(
            categoryComputers
        );
        // read
        const categoryComputersReaded = await repositoryCategory.readById(
            categoryComputersCreated.id ?? -1
        );
        // update
        const countUpdated = await repositoryCategory.update(
            categoryComputersCreated.id ?? -1,
            categoryComputersNew
        );
        // read updated
        const categoryComputersUpdated = await repositoryCategory.readById(
            categoryComputersCreated.id ?? -1
        );
        // delete
        const countDeleted = await repositoryCategory.deleteById(
            categoryComputersUpdated?.id ?? 0
        );

        // Assert
        expect(categoryComputersCreated).toEqual(
            jasmine.objectContaining(categoryComputers)
        );
        expect(categoryComputersReaded).toEqual(categoryComputersCreated);
        expect(countUpdated).toEqual(1);
        expect(categoryComputersUpdated).toEqual(
            jasmine.objectContaining(categoryComputersNew)
        );
        expect(countDeleted).toEqual(1);
    });

    it('create => empty category', async () => {
        await expectAsync(
            repositoryCategory.create({ name: '' })
        ).toBeRejected();
    });
});
