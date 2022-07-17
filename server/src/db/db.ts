import { Sequelize } from 'sequelize';

export default new Sequelize(
    process.env.DB_NAME || 'shop_db',
    process.env.DB_USER || 'admin',
    process.env.DB_PASSWORD || '1234',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432
    }
);
