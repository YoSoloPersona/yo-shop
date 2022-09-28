import { Sequelize } from 'sequelize';

// local
import { config } from '../config';

export const sequelize = new Sequelize(
    config.db.name,
    process.env.DB_USER || '',
    process.env.DB_PASSWORD || '',
    {
        dialect: 'postgres',
        host: config.db.host,
        port: config.db.port,
        pool: {
            max: 10,
            evict: 5000
        }
    }
);
