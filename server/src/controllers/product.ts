import { Product } from 'yo-shop-model';

// local
import { ModelProduct, FindProduct, WhereProduct } from '../models';
import Controller from './controller';

/**
 *
 */
class ControllerDevice implements Controller<ModelProduct> {
    /**
     *
     * @param options
     * @returns
     */
    findAll(options?: FindProduct): Promise<Product[]> {
        return ModelProduct.findAll().then(listProduct =>
            listProduct.map(modelProduct => modelProduct.toJSON())
        );
    }

    /**
     *
     * @param options
     * @returns
     */
    findOne(options?: FindProduct): Promise<Product | null> {
        return ModelProduct.findOne(options).then(
            modelProduct => modelProduct?.toJSON() ?? null
        );
    }

    /**
     *
     * @param product
     * @returns
     */
    add(product: Product): Promise<Product> {
        return ModelProduct.create(product).then(modelProduct =>
            modelProduct.toJSON()
        );
    }

    /**
     *
     * @param options
     * @returns
     */
    remove(options?: WhereProduct): Promise<number> {
        return ModelProduct.destroy({ where: options });
    }
}

export default new ControllerDevice();
