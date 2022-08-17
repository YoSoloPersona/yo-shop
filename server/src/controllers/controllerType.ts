// local
import Controller from './controller';
import { ModelCategory as Model, Category } from '../models';
import { DestroyOptions, FindOptions } from 'sequelize/types';

/** Класс контроллер для получения типов товаров. */
class ControllerType implements Controller<Category> {
    /**
     * Поолучение всех типов товаров.
     * @returns промис массива найденных типов товаров.
     */
    findAll(option?: FindOptions<Category>): Promise<Category[]> {
        return Model.findAll(option);
    }

    /**
     * Получение конктретного типа товаров.
     * @param option параметры поиска.
     * @returns промис найденного типа товаров либо null в противном случае. 
     */
    findOne(option?: FindOptions<Category>): Promise<Category | null> {
        return Model.findOne(option);
    }

    /**
     * Добавление нового типа товаров.
     * @param type добавлемое описание типа товаров.
     * @returns промис добавленного типа товаров с дополнительной информацией о добавлении.
     */
    add(type: Category): Promise<Category> {
        return Model.create({ ...type });
    }

    /**
     * Удаление типов товаров.
     * @param option параметры для поиска удаляемых типов товаров.
     * @returns количество удалённых типов товаров.
     */
    async remove(option?: DestroyOptions<Category>): Promise<number> {
        return Model.destroy(option);
    }
}

export default new ControllerType();
