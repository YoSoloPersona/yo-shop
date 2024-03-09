import { Sequelize } from 'sequelize';
import debug from 'debug';
import { Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { FactoryORM, Repository, RepositoryUser } from '../interfaces';
import { CategoryRepository } from './category/category.repository';
import { UserRepository } from './user/user.repository';

// locals
import config from '../../config';

// Protocols
const log = debug('orm:sequalize:log');
const error = debug('orm:sequalize:error');

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

export class SequelizeFactory implements FactoryORM {
    /**
     * Connect to the database
     * @returns Promise<Sequelize>
     */
    init(): Promise<void> {
        log(`connect to ${config.db.host}:${config.db.port}`);

        return (
            sequelize
                // authenticate
                .authenticate()
                .then(() => log('successful authentication'))
                // sync
                .then(() => sequelize.sync())
                .then(() => log('successful synchronization'))
        );
    }

    createRepositoryUser(): RepositoryUser {
        return new UserRepository();
    }

    createRepositoryCategory(): Repository<Category> {
        return new CategoryRepository();
    }
}
