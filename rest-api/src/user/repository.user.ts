import debug from 'debug';
import { api, User, AuthorizationResponse } from '@YoSoloPersona/yo-shop-model';
import { URLSearchParams } from 'url';

// locals
import { Params } from '../despatch';
import { Repository } from '../repository';

// protocols
const log = debug('repository:user');
const error = debug('repository:user:error');

/**
 * User repository class
 */
export class RepositoryUser extends Repository {
    constructor({
        protocol = 'http',
        host = 'localhost',
        port = 3000
    }: Params) {
        super({
            protocol,
            host,
            port
        });
    }

    //#region create

    /**
     * Registers a user
     * @param user user
     * @returns jsonwebtoken
     */
    registration(user: User): Promise<AuthorizationResponse> {
        return (
            this.axios
                .post<AuthorizationResponse>(
                    api.user.fullUrl,
                    JSON.stringify(user),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                // successfully 2xx
                .then((res) => res.data)
        );
    }

    //#endregion

    //#region read

    //#endregion

    //#region update

    //#endregion

    //#region delete

    /**
     * Deletes all users
     * @returns count of deleted users
     */
    deleteAll(): Promise<number> {
        return (
            this.axios
                .delete(api.user.fullUrl)
                // successfully 2xx
                .then((res) => res.data)
        );
    }

    /**
     * Deletes users using the filter
     * @param filter filter
     * @returns number of deleted users
     */
    delete(filter?: Omit<User, 'password' | 'role'> & {[key: string]: any}): Promise<number> {
        const params = new URLSearchParams();

        for (const key in filter) {
            if (Object.prototype.hasOwnProperty.call(filter, key)) {
                params.append(key, filter[key]);
            }
        }

        return (
            this.axios
                .delete(`${api.user.fullUrl}?${params}`)
                // successfully 2xx
                .then((res) => res.data)
        );
    }

    //#endregion
}
