/** Версия API. */
const version = 1;

/**
 * Класс, описывает узел API.
 */
class UrlNode {
    /**
     * Создаёт узел API.
     * @param _url часть пути API за которую отвечает узел.
     */
    private constructor(private _url = '') {}

    /**
     * Создаёт узел API.
     * @param _url часть пути API за которую отвечает узел.
     * @param children объект с дочерними узлами API.
     * @returns UrlNode.
     */
    public static init<T>(
        _url = '',
        children: { [P in keyof T]: T[P] }
    ): UrlNode & { [P in keyof T]: T[P] } {
        const parent = new UrlNode(_url);

        for (const key in children) {
            if (Object.prototype.hasOwnProperty.call(children, key)) {
                const prop = children[key];

                if (prop instanceof UrlNode) {
                    prop._parent = parent;
                }
            }
        }

        return Object.assign(parent, { ...children });
    }

    /**
     * Возвращает полный путь до узла.
     * @returns
     */
    toString(): string {
        return this._parent ? this._parent.toString() + this._url : this._url;
    }

    /**
     * Родительский узел.
     */
    protected _parent: UrlNode | null = null;
}

const init = UrlNode.init;

// параметры
const protocol = 'http';
const host = 'localhost';
const port = 3000;

/**
 * Объект с информацией о URL API.
 */
export const api = init(`${protocol}://${host}:${port}/api/v1`, {
    protocol,

    host,

    port,

    /** Пользователи. */
    user: init(`/user`, {
        /** Регистрация. */
        registration: init('/registration', {}),

        /** Авторизация. */
        login: init('/login', {}),

        auth: init('/auth', {})
    }),
    /** Типы товаров. */
    type: init('/type', {}),

    /** Корзина. */
    basket: init('/basket', {}),

    /** Магазин. */
    shop: init('/shop', {}),

    /** Описание товара. */
    device: init('/device', {})
});
