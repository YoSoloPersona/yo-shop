// local
import { AxiosInstance } from 'axios';
import { getDespatch } from './despatch';

/**
 * Базовый абстрактный класс репозитория.
 * Реализует логику отправки д
 */
export abstract class Repository {
    /** Токен для выполнения операций требующих авторизации. */
    get token(): string {
        return this._token;
    }

    /** Авторизует для выполнения операций требующих дополнительных привелегий. */
    set token(value: string) {
        this._token = value;
        this._despatch = getDespatch(value);
    }

    /**  */
    get despatch(): AxiosInstance {
        return this._despatch;
    }

    private _token = '';

    private _despatch = getDespatch();
}
