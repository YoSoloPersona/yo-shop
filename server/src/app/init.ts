import debug from 'debug';

// locals
import { UserRepository } from '../components/user/user.repository';

// protocols
const log = debug('app:log');
const error = debug('app:error');

/**
 * Initzializes the application
 */
export async function init(): Promise<void> {
    const reposotiry = new UserRepository();
    const email = process.env.APP_USER || '';
    const password = process.env.APP_PASSWORD || '';

    
    const root = await reposotiry.readByEmail(email);

    // add if not available
    if (null == root) {
        log('root user is unavailable, add to repository');

        const user = await reposotiry.create({
            email,
            password,
            role: 'root'
        });
        log('root user successfully added');
    } else {
        log('root user is already in the repository');
    }
}
