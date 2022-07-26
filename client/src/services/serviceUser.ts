export default class ServiceUser {
    private _isAuth = false;

    get isAuth() {
        return this._isAuth;
    }

    set isAuth(value) {
        this._isAuth = value;
    }

    private _user?: { email: string; role: string };

    get user(): { email: string; role: string } | undefined {
        return this._user;
    }

    set user(value: { email: string; role: string } | undefined) {
        this._user = value;
    }
}
