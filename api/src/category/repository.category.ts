import debug from 'debug';
import { api, Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { Params } from '../despatch.js';
import { Repository } from '../repository.js';


// protocols
const log = debug('repository:category');
const error = debug('repository:category:error');

/**
 *  Product category repository class
 */
export class RepositoryCategory extends Repository {
    constructor({
        protocol = 'http',
        host = 'localhost',
        port = 3000
    }: Params) {
        super({
            protocol,
            host,
            port
        });
    }

    //#region create

    create(category: Category): Promise<Category> {
        if (!category) {
            throw Error(`Trying to add an empty category.`);
        }

        return this.axios
            .post<Category>(api.type.fullUrl, category)
            // 2xx
            .then((res) => res.data);
    }

    //#endregion

    //#region read

    read(): Promise<Category[]> {
        return this.axios
            .get<Category[]>(api.type.fullUrl)
            // 2xx
            .then((res) => res.data);
    }

    //#endregion

    //#region update

    update(
        oldCategory: Category,
        newCategory: Partial<Category>
    ): Promise<Category> {
        const params = new URLSearchParams();

        // Не используем !category.id на случай если id === 0
        if (oldCategory.id === undefined) {
            Promise.reject(
                'Отсутствует идентификатор модифицируемой категории.'
            );
        }

        params.append('id', oldCategory.id?.toString() || '');

        return this.axios
            .put(`${api.type.fullUrl}?${params}`, newCategory)
            .then((res) => res.data);
    }

    //#endregion

    //#region delete

    delete(category: Category): Promise<number> {
        const params = new URLSearchParams();
        params.append('name', category.name);

        return this.axios
            .delete<number>(`${api.type.fullUrl}?${params}`)
            .then((res) => res.data);
    }

    //#endregion
}
