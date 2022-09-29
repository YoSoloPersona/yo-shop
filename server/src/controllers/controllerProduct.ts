// local
import { ModelProduct, OptionalProduct } from '../models';
import Controller from './controller';
import ErrorApi from '../errors/errorApi';


class ControllerDevice implements Controller<ModelProduct> {
    findAll(): Promise<ModelProduct[]> {
        return ModelProduct.findAll();
    }

    findOne(): Promise<ModelProduct | null> {
        return ModelProduct.findOne();
    }

    add(el: OptionalProduct): Promise<ModelProduct> {
        return ModelProduct.create(el);
    }

    remove(): Promise<number> {
        return ModelProduct.destroy();
    }
}

export default new ControllerDevice();
