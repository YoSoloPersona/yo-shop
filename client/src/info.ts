const version = 1;

/**
 * Объект с информацией о URL API.
 */
export const Api = {
    /** Путь к корню api. */
    url: `/api/v${version}`,

    /** Путь к странице для работы с пользователями. */
    user: {
        url: '/user',
        registration: { url: '/registration' },
        login: { url: '/login' },
        auth: { url: '/auth' },
        admin: { url: '/admin' }
    },

    /** Путь к странице с описаниями товаров. */
    type: {
        url: '/type'
    },

    /** Путь к странице с корзиной. */
    basket: {
        url: '/basket'
    },

    /** Путь к странице магазина. */
    shop: {
        url: '/shop'
    },

    /** Путь к странице просмотра товара. */
    device: {
        url: '/device'
    },
};
