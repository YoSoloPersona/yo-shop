import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import debug from 'debug';
import { User } from 'yo-shop-model';

// locals
import ErrorApi from '../../errors/errorApi';
import { controller, inject, post, del } from '../../helpers/decorators';
import { UserRepository } from './user.repository';

// protocols
const log = debug('app:controllers:user');
const error = debug('app:controllers:user');

/**
 * Class user controller
 */
@controller({ path: '/user' })
export class ControllerUser {
    /**
     * User repository
     */
    @inject(UserRepository) private _userRepository: UserRepository;

    /**
     *
     * @param param0
     * @returns jsonwebtoken
     */
    @post()
    async registration({ email, password, role }: User): Promise<string> {
        log(`registration email: ${email}, role: ${role}`);

        if (!email || !password) {
            const message = 'Email or password not provided';
            error(message);
            throw ErrorApi.badRequest(message);
        }

        // looking for a user with the specified email
        const candidate = await this._userRepository.readByEmail(email);

        if (candidate) {
            const message =
                'A user with this email address is already registered';
            error(message);
            throw ErrorApi.accountAlreadyExists(message);
        }

        // get the hash of the password
        const hashPassword = await bcrypt.hash(password, 5);

        // registering a user
        const user = await this._userRepository.create({
            email,
            role,
            password: hashPassword
        });

        // return jsonwebtoken
        return jwt.sign(
            // data
            { id: user.id, email, role },
            // key
            process.env.SECRET_KEY as string,
            // expiration date
            { expiresIn: '24h' }
        );
    }

    /**
     * Authorizes the user
     * @param email email
     * @param password password
     * @returns jsonwebtoken.
     */
    @post({ path: '/authorization' })
    async authorization({ email, password }: User): Promise<string> {
        log(`authorization email: ${email}`);

        if (!email || !password) {
            const message = 'Email or password not provided';
            error(message);
            throw ErrorApi.badRequest(message);
        }

        // looking for a user with the specified email
        const user = await this._userRepository.readByEmail(email);

        // checking the password
        if (!user || !bcrypt.compareSync(password, user.password)) {
            const message =
                'Failed to log in, incorrect email or password provided.';
            error(message);
            throw ErrorApi.badRequest(message);
        }

        return jwt.sign(
            { id: user.id, email, role: user.role },
            process.env.SECRET_KEY as string,
            { expiresIn: '24h' }
        );
    }

    /**
     * Removes all users except root
     * @returns Promise<number> number of deleted users
     */
    @del()
    deleteAll(): Promise<number> {
        return this._userRepository.deleteAll();
    }

    /**
     * Deletes a user with the specified id.
     * @param id user id
     * @returns  Promise<number> number of deleted users
     */
    @del({ params: '/:id' })
    deletebyId(id: number): Promise<number> {
        return this._userRepository.deleteById(id);
    }
}
