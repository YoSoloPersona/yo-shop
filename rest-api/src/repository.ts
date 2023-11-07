import { User, api, AuthorizationResponse } from 'yo-shop-model';

// locals
import { AxiosInstance } from 'axios';
import { Params, factory } from './despatch';

/**
 * Abstract repository class, implements authorization on the server
 */
export abstract class Repository {
    /**
     * Jsonwebtoken
     */
    private _token = '';

    /**
     * Current axios for interacting with the server
     */
    private _axios: AxiosInstance;

    /**
     *  A factory for getting the necessary axios
     */
    private _getAxios: ReturnType<typeof factory>;

    /**
     * Constructor
     * @param param0 
     */
    constructor({
        protocol = 'http',
        host = 'localhost',
        port = 3000
    }: Params) {
        this._getAxios = factory({ protocol, host, port });
        this._axios = this._getAxios('');
    }

    /**
     * Authorizes the user on the server
     * @param user user email and password 
     * @returns jsonwebtoken
     */
    authorization(user: Pick<User, 'email' | 'password'>): Promise<AuthorizationResponse> {
        return (
            this.axios
                .post<AuthorizationResponse>(
                    api.user.authorization.fullUrl,
                    JSON.stringify(user),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                // successfully 2xx
                .then((res) => {
                    // save the token
                    this.token = res.data.token;

                    return res.data;
                })
        );
    }

    /** Get a token which sends authorized requests */
    private get token(): string {
        return this._token;
    }

    /**
     * Saves the token and receives axios which sends authorized requests
     */
    private set token(value: string) {
        this._token = value;
        this._axios = this._getAxios(value);
    }

    /**
     * Gets the axios for interacting with the server
     */
    protected get axios(): AxiosInstance {
        return this._axios;
    }
}
