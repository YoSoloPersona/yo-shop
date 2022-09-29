import querystring from 'querystring';

// local
import { getDespatch } from './despatch';
import { domain } from '../helpers/domain';
import { ModelCategory, OptionalCategory } from '../../../server/src/models';

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
    all() {
        console.log(`Получение списка категорий `);
        return this._despatch
            .get<ModelCategory[]>(domain.api.type.path)
            .then((res) => res.data);
    }

    /**
     * Добавляет новую категорию товаров.
     * @param category добавляемая категория товаров.
     * @returns Promise<Category>.
     */
    async push(category: OptionalCategory): Promise<ModelCategory> {
        // Написал с использованием async, для разнообразия
        if (!category) {
            throw Error(`Попытка добавить пустую категорию товаров.`);
        }

        // Ожидаем ответ от сервера
        const res = await this._despatch.post<ModelCategory>(
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
    remove(category: ModelCategory): Promise<number> {
        const params = new URLSearchParams();
        params.append('name', category.name);

        return this._despatch
            .delete<number>(`${domain.api.type.path}?${params}`)
            .then((res) => res.data);
    }

    update(
        oldCategory: ModelCategory,
        newCategory: Partial<ModelCategory>
    ): Promise<ModelCategory> {
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
