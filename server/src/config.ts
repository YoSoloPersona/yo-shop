const config = {
    mode:
        process.env.NODE_ENV || ('development' as 'development' | 'production'),
    /**
     * Хост на котором расположен сайт.
     */
    server: {
        /**
         * Server address.
         */
        host: process.env.SERVER_HOST || 'localhost',

        /**
         * Server port.
         */
        port: Number(process.env.SERVER_PORT) || 3000
    },

    /** Конфигурация базы данных. */
    db: {
        /** Хост на котором расположена база данных. */
        host: process.env.DB_HOST || 'localhost',

        /** Порт на кором висит база данных. */
        port: Number(process.env.DB_PORT) || 5432,

        /** Имя базы данных. */
        name: process.env.DB_NAME || 'shop_db'
    }
};

export default config;