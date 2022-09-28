export const config = {
    /** Хост на котором расположен сайт. */
    host: 'localhost',

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
