import querystring from 'querystring';

// local
import { despatch, despatchAuth } from './despatch';
import { domain } from './domain';
import { Category } from '../../../server/src/models';

/**
 *
 */
class RepositoryCategory {
    /**
     * Возвращает список категорий товаров.
     * @returns Promise<Category[]>.
     */
    all() {
        return despatch
            .get<Category[]>(domain.api.type.path)
            .then((res) => res.data);
    }

    /**
     * Добавляет новую категорию товаров.
     * @param category добавляемая категория товаров.
     * @returns Promise<Category>.
     */
    async push(category: Category): Promise<Category> {
        if (!category) {
            throw Error(`Попытка добавить пустую категорию товаров.`);
        }

        const res = await despatchAuth.post<Category>(
            domain.api.type.path,
            category
        );

        return res.data;
    }

    remove(category: Category): Promise<number> {
        const params = new URLSearchParams();
        params.append('name',  category.name);
        return despatch
            .delete<number>(
                `${domain.api.type.path}?${params}`
            )
            .then((res) => res.data);
    }
}

export const repositoryCategory = new RepositoryCategory();
