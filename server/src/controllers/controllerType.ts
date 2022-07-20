// local
import Controller from './controller';
import { ModelType as Model, Type } from '../models/models';
import { DestroyOptions, FindOptions } from 'sequelize/types';

/** Класс контроллер для получения типов товаров. */
class ControllerType implements Controller<Type> {
    /**
     * Поолучение всех типов товаров.
     * @returns промис массива найденных типов товаров.
     */
    findAll(option?: FindOptions<any>): Promise<Type[]> {
        return Model.findAll(option);
    }

    /**
     * Получение конктретного типа товаров.
     * @param option параметры поиска.
     * @returns промис найденного типа товаров либо null в противном случае. 
     */
    findOne(option?: FindOptions<any>): Promise<Type | null> {
        return Model.findOne(option);
    }

    /**
     * Добавление нового типа товаров.
     * @param type добавлемое описание типа товаров.
     * @returns промис добавленного типа товаров с дополнительной информацией о добавлении.
     */
    add(type: Type): Promise<Type> {
        return Model.create({ ...type });
    }

    /**
     * Удаление типов товаров.
     * @param option параметры для поиска удаляемых типов товаров.
     * @returns количество удалённых типов товаров.
     */
    async remove(option?: DestroyOptions<any>): Promise<number> {
        return Model.destroy(option);
    }
}

export default new ControllerType();
