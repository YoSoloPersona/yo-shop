import { DestroyOptions, FindOptions } from 'sequelize/types';

export default interface Controller<T> {
    /** Ищет необходимые элементы. */
    findAll(): Promise<T[]>;

    /** Ищет необходимый элемент. */
    findOne(option?: FindOptions): Promise<T | null>;

    /** Добавляет элемент. */
    add(el: T): Promise<T>;

    /** Удаляет элемент. */
    remove(option?: DestroyOptions<any>): Promise<number>;
}
