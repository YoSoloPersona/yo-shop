import { Category } from 'yo-shop-model';

// local
import Controller from './controller';
import { ModelCategory, FindCategory, WhereCategory } from '../models';

/**
 * Класс контроллер для получения типов товаров.
 */
class ControllerCategory implements Controller<ModelCategory> {
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
     * @param options параметры поиска.
     * @returns промис найденного типа товаров либо null в противном случае.
     */
    findOne(options?: FindCategory): Promise<Category | null> {
        return ModelCategory.findOne(options).then(category =>
            category ? category?.toJSON() : null
        );
    }

    /**
     * Добавление нового типа товаров.
     * @param categoty добавлемое описание типа товаров.
     * @returns промис добавленного типа товаров с дополнительной информацией о добавлении.
     */
    add(categoty: Category): Promise<Category> {
        return ModelCategory.create(categoty).then(modelCategory =>
            modelCategory.toJSON()
        );
    }

    /**
     * Удаление типов товаров.
     * @param option параметры для поиска удаляемых типов товаров.
     * @returns количество удалённых типов товаров.
     */
    async remove(option?: WhereCategory): Promise<number> {
        return ModelCategory.destroy({ where: option });
    }
}

export default new ControllerCategory();
