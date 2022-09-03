import axios from 'axios';

// local


// Создаём объекты для запросов с базовыми настройками, для того чтобы не конфигурировать каждый раз заного.

/** Объект для запросов данных с сервера не требующих авторизации. */
export const despatch = axios.create({
    timeout: 4000
});

/** Объект для запросов данных с сервера требующих авторизации. */
export const despatchAuth = axios.create({
    timeout: 4000
});

// Перед каждой отправкой добавляем токен
despatchAuth.interceptors.request.use(config => {
    if (config.headers) {
        config.headers.authorization = `Bearer ${localStorage.getItem('user.token')}`;
    }

    return config;
});
