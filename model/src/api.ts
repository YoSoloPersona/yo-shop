/** Version API */
const version = 1;

/**
 * A class to describe a part of the API path
 */
class UrlNode {
    /**
     * Creates part of the API path
     * @param _url part
     */
    private constructor(private _url = '') {}

    /**
     * Creates part of the API path
     * @param _url part
     * @param children API child nodes
     * @returns UrlNode
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

        return Object.assign(parent, { ...(children ?? {}) });
    }

    /**
     * Returns the full path to the node.
     * @returns string
     */
    toString(): string {
        return this._parent ? this._parent.toString() + this._url : this._url;
    }

    /**
     * Returns the full path to the node
     * @returns string
     */
    get fullUrl(): string {
        return this._parent ? this._parent.toString() + this._url : this._url;
    }

    /**
     * Returns the relative path to the node
     * @returns string
     */
    get currentUrl() {
        return this._url;
    }

    /**
     * Parent node
     */
    protected _parent: UrlNode | null = null;
}


const init = UrlNode.init;

export const api = init(`/api/v${version}`, {
    /** Users */
    user: init(`/user`, {
        /** Registration */
        registration: init('/registration', {}),

        /** Authorization */
        authorization: init('/authorization', {})
    }),
    /** Brands */
    brand: init('/brand', {}),

    /** Categories */
    type: init('/category', {}),

    /** Cart */
    basket: init('/cart', {}),

    /** Shop */
    shop: init('/shop', {}),

    /** Devices */
    device: init('/device', {})
})
