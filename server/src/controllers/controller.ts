import { DestroyOptions, FindOptions } from 'sequelize/types';

export default interface Controller<T> {
    /** Ищет необходимые элементы. */
    findAll(option?: FindOptions<T>): Promise<T[]>;

    /** Ищет необходимый элемент. */
    findOne(option?: FindOptions<T>): Promise<T | undefined>;

    /** Добавляет элемент. */
    add(el: T): Promise<T>;

    /** Удаляет элемент. */
    remove(option?: DestroyOptions<T>): Promise<number>;
}
