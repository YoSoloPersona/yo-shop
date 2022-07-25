const version = 1;

/**
 * ОБъект с информацией о URL API.
 */
export const Api = {
    url: `/api/v${version}`,
    user: {
        url: '/user',
        registration: { url: '/registration' },
        login: { url: '/login' },
        auth: { url: '/auth' },
        admin: { url: '/admin' }
    },
    type: {
        url: '/type'
    },
    basket: {
        url: '/basket'
    },
    shop: {
        url: '/shop'
    },
    device: {
        url: '/device'
    },
};
