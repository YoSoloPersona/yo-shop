/**
 * Users type
 */
export type Role = 'root' | 'user' | 'admin';

/**
 * Authorization and registration response type
 */
export type AuthorizationResponse = {
    token: string;
};

/** User interface */
export interface User {
    /**
     * Id
     */
    id?: number;

    /**
     * Email
     */
    email: string;

    /**
     * Role
     */
    role: Role;

    /**
     * Password hash
     */
    password: string;
}
