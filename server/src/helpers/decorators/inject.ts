import debug from 'debug';

// protocols
const log = debug('decorators:inject');
const error = debug('decorators:inject:error');

export const { injectable, inject } = (function get() {
    // Objects store
    const store = new Map<new (...args: any[]) => any, object | undefined>();

    /**
     * Registers a class for dependency injection
     * @param className class
     * @param context class context
     * @returns void
     */
    function injectable(
        className: new (...args: any[]) => any,
        context: ClassDecoratorContext
    ): void {
        if (context.kind !== 'class') {
            error(`${className} is not a class (${context.kind})`);

            return;
        }

        log(`Class ${className} registered`);
        store.set(className, undefined);
    }

    /**
     * Injects an object of the specified class
     * @param className class
     * @returns object 
     */
    function inject<TField extends {}, This>(
        className: new (...args: any[]) => TField
    ) {
        return function (
            field: undefined,
            { kind }: ClassFieldDecoratorContext<This, TField>
        ): void | ((this: This, value: TField) => TField) {
            if (kind === 'field' && store.has(className)) {
                // an instance of the class has not yet been created
                if (!store.get(className)) {
                    store.set(className, new className());
                }

                return function (this: This, initValue: TField) {
                    log(`Object class ${className} inject in ${this}`);

                    return store.get(className) as TField;
                };
            }
        };
    }

    return { injectable, inject };
})();
