// local
import { ModelProduct, Product, FindProduct } from 'yo-shop-model';
import Controller from './controller';
import ErrorApi from '../errors/errorApi';


class ControllerDevice implements Controller<Product> {
    findAll(options?: FindProduct): Promise<Product[]> {
        return ModelProduct.findAll().then(listProduct => listProduct.map(modelProduct => modelProduct.toJSON()));
    }

    findOne(options?: FindProduct): Promise<Product | null> {
        return ModelProduct.findOne().then(modelProduct => modelProduct?.toJSON() ?? null);
    }

    add(product: Product): Promise<ModelProduct> {
        return ModelProduct.create(product);
    }

    remove(): Promise<number> {
        return ModelProduct.destroy();
    }
}

export default new ControllerDevice();
