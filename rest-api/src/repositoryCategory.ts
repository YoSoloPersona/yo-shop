// local
import { getDespatch } from './despatch';
import { domain } from 'yo-shop-model';
import { Category } from 'yo-shop-model';

/**
 *
 */
class RepositoryCategory {
    /**
     * Авторизует для выполнения операций требующих дополнительных привелегий.
     * @param token токен получении при авторизации.
     */
    login(token: string) {
        this._token = token;
        this._despatch = getDespatch(token);
    }

    /**
     * Возвращает список категорий товаров.
     * @returns Promise<Category[]>.
     */
    all(): Promise<Category[]> {
        return this._despatch
            .get<Category[]>(domain.api.type.path)
            .then((res) => res.data);
    }

    /**
     * Добавляет новую категорию товаров.
     * @param category добавляемая категория товаров.
     * @returns Promise<Category>.
     */
    push(category: Category): Promise<Category> {
        // Написал с использованием async, для разнообразия
        if (!category) {
            throw Error(`Попытка добавить пустую категорию товаров.`);
        }

        // Ожидаем ответ от сервера
        return this._despatch.post<Category>(
            domain.api.type.path,
            category
        ).then(res => res.data);
    }

    /**
     * Удаляет категорию товаров.
     * @param category удаляемая категория товаров.
     * @returns Promise<number>.
     */
    remove(category: Category): Promise<number> {
        const params = new URLSearchParams();
        params.append('name', category.name);

        return this._despatch
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

        return this._despatch
            .put(`${domain.api.type.path}?${params}`, newCategory)
            .then((res) => res.data);
    }

    /** Токен для выполнения операций требующих авторизации. */
    private _token = '';

    private _despatch = getDespatch();
}

export const repositoryCategory = new RepositoryCategory();
