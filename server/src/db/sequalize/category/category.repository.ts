import { Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { Repository } from '../../interfaces';
import { ModelCategory } from './category.model';

export class CategoryRepository implements Repository<Category> {
    //#region Create

    /**
     * Create a category to the repository
     * @param category category
     * @returns Promise<Category>.
     */
    async create(category: Category): Promise<Category> {
        if (!category) {
            throw Error(
                'Error when adding a category, the category is passed as category null or undenfined!'
            );
        }

        return (await ModelCategory.create(category))?.get();
    }

    //#endregion

    //#region Read

    /**
     * Reads all categories from the repository
     * @returns Promise<Category[]>
     */
    async readAll(): Promise<Category[]> {
        return (await ModelCategory.findAll()).map(model => model.get());
    }

    /**
     * Reads a category from the repository with the id
     * @param id id 
     * @returns 
     */
    async readById(id: number): Promise<Category | undefined> {
        if (!id || typeof id !== 'number' || isNaN(id)) {
            return undefined;
        }

        return (await ModelCategory.findOne({ where: { id } }))?.get();
    }

    //#endregion

    //#region Update

    /**
     * Updates a category from the repository with the id
     * @param id 
     * @param values 
     * @returns 
     */
    async update(
        id: number,
        values: Partial<Omit<Category, 'id'>> = {}
    ): Promise<number> {
        if (!id || typeof id !== 'number' || isNaN(id)) {
            return 0;
        }

        const [countAffected] = await ModelCategory.update(values, { where: { id } });
        
        return countAffected;
    }

    //#endregion

    //#region Delete

    /**
     * Removes all categories from the repository
     * @returns 
     */
    deleteAll(): Promise<number> {
        return ModelCategory.destroy();
    }

    /**
     * Removes a catogory from the repository with the id
     * @param id 
     * @returns 
     */
    deleteById(id: number): Promise<number> {
        if (!id || typeof id !== 'number' || isNaN(id)) {
            return Promise.resolve(0);
        }

        return ModelCategory.destroy({ where: { id } });
    }

    //#endregion
}
