import { despatch } from './despatch';
import { domain } from './domain';
import { Category } from '../../../server/src/models';

type Answer = Category[];

/**
 *
 */
class RepositoryDevice {
    getTypes() {
        return despatch
            .get<Answer>(domain.api.type.path)
            .then((res) => res.data);
    }
}

export const repositoryDevice = new RepositoryDevice();
