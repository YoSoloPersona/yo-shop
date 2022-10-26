import { URLSearchParams } from 'url';
import debug from 'debug';

// local
import { domain } from 'yo-shop-model';
import { FilterUser, User } from 'yo-shop-model';
import { Repository } from './repository';

const log = debug('test:repositoryUser');

type Answer = {
    token: string;
};

/**
 *
 */
class RepositoryUser extends Repository {
    /**
     * Отправляет данные для регистрации пользователя.
     * @param user данные регистрируемого пользователя.
     * @returns Promise.
     */
    registrate(user: User): Promise<Answer> {
        return (
            this.despatch
                .post<Answer>(
                    domain.api.user.registration.path,
                    JSON.stringify(user),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                // Вытаскиваем данные из ответа
                .then((res) => res.data)
        );
    }

    /**
     * Отправляет данные для авторизации пользователя.
     * @param user данные авторизируемого пользователя.
     * @returns Promise.
     */
    login(user: User): Promise<Answer> {
        return (
            this.despatch
                .post<Answer>(
                    domain.api.user.login.path,
                    JSON.stringify(user),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                // Вытаскиваем данные из ответа
                .then((res) => res.data)
        );
    }

    /**
     * Удаляет пользователей по указанному фильтру.
     * @param filter
     * @returns
     */
    delete(filter?: FilterUser): Promise<number> {
        const params = new URLSearchParams();

        for (const key in filter) {
            if (Object.prototype.hasOwnProperty.call(filter, key)) {
                params.append(key, filter[key]);
            }
        }

        return this.despatch
            .delete(`${domain.api.user.path}?${params}`)
            .then((res) => res.data.count);
    }

    /**
     *
     * @returns
     */
    clear(): Promise<number> {
        return this.despatch
            .delete(domain.api.user.path)
            .then((res) => res.data.count);
    }
}

export const repositoryUser = new RepositoryUser();
