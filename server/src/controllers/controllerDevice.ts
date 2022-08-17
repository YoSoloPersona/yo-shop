// local
import { ModelProduct as Model, Product } from '../models';
import Controller from './controller';
import ErrorApi from '../errors/errorApi';

class ControllerDevice implements Controller<Product> {
    findAll(): Promise<Product[]> {
        return Model.findAll();
    }

    findOne(): Promise<Product | null> {
        return Model.findOne();
    }

    add(el: Product): Promise<Product> {
        return Model.create({ ...el });
    }

    remove(): Promise<number> {
        return Model.destroy();
    }
}

export default new ControllerDevice();
