import { Category, Role, User } from '@YoSoloPersona/yo-shop-model';

/**
 * The type of existing repositories
 */
type Repositories = {
    /**
     * User repository
     */
    user: RepositoryUser;

    /**
     * Product categories repository
     */
    category: Repository<Category>;
};

/**
 * Repository interface for describing common methods
 */
export interface Repository<T> {
    //#region create

    /**
     * Adds an element to the repository
     * @param el added element
     */
    create(el: T): Promise<T>;

    //#endregion

    //#region read

    /**
     * Reads all elements from the repository
     */
    readAll(): Promise<T[]>;

    /**
     * Reads the element with the specified id
     * @param id id of the searched element
     */
    readById(id: number): Promise<T | null>;

    //#endregion

    //#region update

    /**
     * Modifies an element with the specified id
     * @param id id of the element to be modified
     * @param values new field values
     */
    update(id: number, values: Partial<Omit<T, 'id'>>): Promise<number | undefined>;

    //#endregion

    //#region delete

    /**
     * Deletes all items from the repository
     */
    deleteAll(): Promise<number>;

    /**
     * Deletes an item with the specified id
     * @param id deleted item id
     */
    deleteById(id: number): Promise<number>;

    //#endregion
}

/**
 * Abstract factory interface for creating repositories
 */
type FactoryRepositories = {
    [Property in keyof Repositories as `createRepository${Capitalize<
        string & Property
    >}`]: () => Repositories[Property];
};

/**
 * Abstract factory interface for ORM initialization and creation of corresponding repositories
 */
export interface FactoryORM extends FactoryRepositories {
    init: () => Promise<void>;
}

/**
 * User repository interface
 */
export interface RepositoryUser extends Repository<User> {
    readByEmail(email: string): Promise<User | null>;

    readByRole(role: Role): Promise<User[] | null>;
}
