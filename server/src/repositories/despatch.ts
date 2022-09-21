import axios, { AxiosInstance } from 'axios';

// Создаём объекты для запросов с базовыми настройками, для того чтобы не конфигурировать каждый раз заного.

/** Объект для запросов данных с сервера не требующих авторизации. */
const despatch = axios.create({
    timeout: 4000
});

/**  */
const listAxios = new Map<string, AxiosInstance>([['', despatch]]);

/**
 *
 * @param token
 */
export function getDespatch(token = '') {
    let despatch= listAxios.get(token);

    if (!despatch)  {
        /** Объект для запросов данных с сервера требующих авторизации. */
        despatch = axios.create({
            timeout: 4000
        });

        // Перед каждой отправкой добавляем токен
        despatch.interceptors.request.use(config => {
            if (config.headers) {
                config.headers.authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    return despatch;
}
