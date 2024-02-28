import { Sequelize } from 'sequelize';
import debug from 'debug';

// locals
import config from '../config';

// Protocols
const log = debug('db:log');
const error = debug('db:error');

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

/**
 * Connect to the database.
 * @returns Promise<Sequelize>
 */
export function db(): Promise<Sequelize> {
    log(`connect to ${config.db.host}:${config.db.port}`);
    
    return (
        sequelize
            // authenticate
            .authenticate()
            .then(() => log('successful authentication'))
            // sync
            .then(() => sequelize.sync())
            .then(sequelize => {
                log('successful synchronization');

                return sequelize;
            })
    );
}
