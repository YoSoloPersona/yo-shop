// local
import Controller from './controller';
import { ModelCategory, FindCategory } from '../models';
import { DestroyOptions, FindOptions } from 'sequelize/types';

/** Класс контроллер для получения типов товаров. */
class ControllerCategory implements Controller<ModelCategory> {
    /**
     * Поолучение всех типов товаров.
     * @returns промис массива найденных типов товаров.
     */
    findAll(option?: FindCategory): Promise<ModelCategory[]> {
        return ModelCategory.findAll(option);
    }

    /**
     * Получение конктретного типа товаров.
     * @param option параметры поиска.
     * @returns промис найденного типа товаров либо null в противном случае. 
     */
    findOne(option?: FindCategory): Promise<ModelCategory | null> {
        return ModelCategory.findOne(option);
    }

    /**
     * Добавление нового типа товаров.
     * @param type добавлемое описание типа товаров.
     * @returns промис добавленного типа товаров с дополнительной информацией о добавлении.
     */
    add(type: ModelCategory): Promise<ModelCategory> {
        return ModelCategory.create({ ...type });
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
