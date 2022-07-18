export default interface Controller<T> {
    /** Ищет необходимые элементы. */
    findAll(): Promise<T[]>;

    /** Ищет необходимый элемент. */
    findOne(): Promise<T | null>;

    /** Добавляет элемент. */
    add(el: T): Promise<T>;

    /** Удаляет элемент. */
    remove(): Promise<number>;
}
