import axios from 'axios';

// local
import { domain } from './domain';

// Создаём объекты для запросов с базовыми настройками, для того чтобы не конфигурировать каждый раз заного.

/** Объект для запросов данных с сервера не требующих авторизации. */
export const despatch = axios.create({
    timeout: 2000
});

/** Объект для запросов данных с сервера требующих авторизации. */
export const despatchAuth = axios.create({
    timeout: 2000
});

// Перед каждой отправкой добавляем токен
despatchAuth.interceptors.request.use(config => {
    config.headers && (config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`);

    return config;
});
