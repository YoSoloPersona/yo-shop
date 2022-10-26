import querystring from 'querystring';

// local
import { despatch, despatchAuth } from './despatch';
import { domain } from './domain';
import { Category } from 'yo-shop-model';

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
        // Написал с использованием async, для разнообразия
        if (!category) {
            throw Error(`Попытка добавить пустую категорию товаров.`);
        }

        // Ожидаем ответ от сервера
        const res = await despatchAuth.post<Category>(
            domain.api.type.path,
            category
        );

        // Возвращаем информацию о добавленной категории
        return res.data;
    }

    /**
     * Удаляет категорию товаров.
     * @param category удаляемая категория товаров.
     * @returns Promise<number>.
     */
    remove(category: Category): Promise<number> {
        const params = new URLSearchParams();
        params.append('name', category.name);

        return despatch
            .delete<number>(`${domain.api.type.path}?${params}`)
            .then((res) => res.data);
    }

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

        return despatch
            .put(`${domain.api.type.path}?${params}`, newCategory)
            .then((res) => res.data);
    }
}

export const repositoryCategory = new RepositoryCategory();
