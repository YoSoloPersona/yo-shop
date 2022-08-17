import { despatch } from './despatch'
import { domain } from './domain';
import { User } from '../../../server/src/models';

type Answer = {
    'token': string
}

/**
 *  
 */
class RepositoryUser {

    /**
     * Отправляет данные для регистрации пользователя.
     * @param user данные регистрируемого пользователя.
     * @returns Promise.
     */
    registrate(user: User) {
        return despatch
            .post<Answer>(domain.api.user.registration.path, JSON.stringify(user), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // Вытаскиваем данные из ответа
            .then(res => res.data);
    }

    /**
     * Отправляет данные для авторизации пользователя.
     * @param user данные авторизируемого пользователя.
     * @returns Promise.
     */
    login(user: User) {
        return despatch.post(domain.api.user.login.path, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Вытаскиваем данные из ответа
        .then(res => res.data);
    }
}

export const repositoryUser = new RepositoryUser();