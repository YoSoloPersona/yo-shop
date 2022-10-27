import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import debug from 'debug';

const log = debug('axios');

// Создаём объекты для запросов с базовыми настройками, для того чтобы не конфигурировать каждый раз заного.

// Базовая конфигурация
const baseConfig: AxiosRequestConfig = {
    timeout: 4000
};

/**
 * Добавляем протоколирование.
 * @param despatch 
 * @returns 
 */
function addLog(despatch: AxiosInstance): AxiosInstance {
    despatch.interceptors.response.use(res => {
        // log(`ответ ${res.status};${res.data.toString()}`);

        return res;
    });

    return despatch;
}

/** Объект для запросов данных с сервера не требующих авторизации. */
const despatch = addLog(axios.create(baseConfig));

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
        despatch = axios.create(baseConfig);

        // Перед каждой отправкой добавляем токен
        despatch.interceptors.request.use(config => {
            if (config.headers) {
                config.headers.authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    return addLog(despatch);
}
