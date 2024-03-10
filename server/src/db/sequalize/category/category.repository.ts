import { Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { Repository } from '../../interfaces';
import { ModelCategory } from './category.model';

export class CategoryRepository implements Repository<Category> {
    //#region Create

    /**
     * Add a category to the repository.
     * @param category category
     * @returns Promise<Category>.
     */
    async create(category: Category): Promise<Category> {
        if (!category) {
            throw Error(
                'Error when adding a category, the category is passed as category null or undenfined!'
            );
        }

        const model = await ModelCategory.create(category);

        return model.get({ plain: true });
    }

    //#endregion

    //#region Read

    readAll(): Promise<Category[]> {
        return ModelCategory.findAll();
    }

    readById(id: number): Promise<Category | null> {
        return ModelCategory.findOne({ where: { id } });
    }

    //#endregion

    //#region Update

    async update(
        id: number,
        values: Partial<Omit<Category, 'id'>> = {}
    ): Promise<number | undefined> {
        return (await ModelCategory.update(values, { where: { id } })).at(0);
    }

    //#endregion

    //#region Delete

    deleteAll(): Promise<number> {
        return ModelCategory.destroy();
    }

    deleteById(id: number): Promise<number> {
        return ModelCategory.destroy({ where: { id } });
    }

    //#endregion
}
