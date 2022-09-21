import { getDespatch } from './despatch';
import { domain } from '../helpers/domain';
import { User } from '../../../server/src/models';
import { URLSearchParams } from 'url';
import { InferAttributes, WhereOptions } from 'sequelize/types';

type Answer = {
    token: string;
};

const despatch = getDespatch();

/**
 *
 */
class RepositoryUser {
    /**
     * Отправляет данные для регистрации пользователя.
     * @param user данные регистрируемого пользователя.
     * @returns Promise.
     */
    registrate(user: User): Promise<Answer> {
        return (
            despatch
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
                .then(res => res.data)
        );
    }

    /**
     * Отправляет данные для авторизации пользователя.
     * @param user данные авторизируемого пользователя.
     * @returns Promise.
     */
    login(user: User): Promise<Answer> {
        return (
            despatch
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
                .then(res => res.data)
        );
    }

    delete(
        options?: WhereOptions<
            InferAttributes<
                User,
                {
                    omit: never;
                }
            >
        >
    ): Promise<number> {
        const params = new URLSearchParams();

        return despatch.delete(`${domain.api.user.path}?${params}`);
    }

    clear(): Promise<number> {
        return despatch.delete(domain.api.user.path);
    }
}

export const repositoryUser = new RepositoryUser();
