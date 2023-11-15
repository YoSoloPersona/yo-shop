import debug from 'debug';

// protocols
const log = debug('decorators:meta');

export const { setMeta, getMeta } = (function () {
    const store = new Map<object, { [key: string | symbol]: any }>();

    /**
     * Adds meta information with the specified key to the source object
     * @param source source object
     * @param key key
     * @param meta meta information
     */
    function setMeta(source: object, key: string | symbol, meta: any) {
        const kvp = store.get(source) ?? {};
        kvp[key] = meta;

        store.set(source, kvp);
        log('set metadata', source, kvp);
    }

    /**
     * Reads meta information with the specified key from the souce object
     * @param source souce object
     * @param key key
     * @returns meta information
     */
    function getMeta<T = any>(source: object, key?: string | symbol): T {
        const result = !key ? store.get(source) : store.get(source)?.[key];
        log('get metadata', source, result);

        return result;
    }

    return { setMeta, getMeta };
})();
