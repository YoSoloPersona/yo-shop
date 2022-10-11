// local
import Controller from './controller';
import { ModelCategory, Category, FindCategory } from '../models';
import { DestroyOptions, FindOptions } from 'sequelize/types';

/** Класс контроллер для получения типов товаров. */
class ControllerCategory implements Controller<Category> {
    /**
     * Получение всех типов товаров.
     * @returns промис массива найденных типов товаров.
     */
    findAll(option?: FindCategory): Promise<Category[]> {
        return ModelCategory.findAll(option);
    }

    /**
     * Получение конктретного типа товаров.
     * @param option параметры поиска.
     * @returns промис найденного типа товаров либо null в противном случае. 
     */
    findOne(option?: FindCategory): Promise<Category | undefined> {
        return ModelCategory.findOne(option).then(category => category?.toJSON());
    }

    /**
     * Добавление нового типа товаров.
     * @param type добавлемое описание типа товаров.
     * @returns промис добавленного типа товаров с дополнительной информацией о добавлении.
     */
    add(type: ModelCategory): Promise<Category> {
        return ModelCategory.create({ ...type }).then(category => category.toJSON());
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
