// local
import Controller from './controller';
import { ModelCategory, Category, FindCategory } from 'yo-shop-model';
import { DestroyOptions } from 'sequelize/types';

/** Класс контроллер для получения типов товаров. */
class ControllerCategory implements Controller<Category> {
    /**
     * Получение всех типов товаров.
     * @returns промис массива найденных типов товаров.
     */
    findAll(options?: FindCategory): Promise<Category[]> {
        return ModelCategory.findAll(options).then(listCategory =>
            listCategory.map(modelCategory => modelCategory.toJSON())
        );
    }

    /**
     * Получение конктретного типа товаров.
     * @param option параметры поиска.
     * @returns промис найденного типа товаров либо null в противном случае.
     */
    findOne(option?: FindCategory): Promise<Category | null> {
        return ModelCategory.findOne(option).then(category =>
            category ? category?.toJSON() : null
        );
    }

    /**
     * Добавление нового типа товаров.
     * @param categoty добавлемое описание типа товаров.
     * @returns промис добавленного типа товаров с дополнительной информацией о добавлении.
     */
    add(categoty: Category): Promise<Category> {
        return ModelCategory.create({ ...categoty }).then(category =>
            category.toJSON()
        );
    }

    /**
     * Удаление типов товаров.
     * @param option параметры для поиска удаляемых типов товаров.
     * @returns количество удалённых типов товаров.
     */
    async remove(option?: DestroyOptions<ModelCategory>): Promise<number> {
        return ModelCategory.destroy(option);
    }
}

export default new ControllerCategory();
