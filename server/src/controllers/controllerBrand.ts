// local
import { ModelBrand, OptionalBrand } from "../models";
import Controller from './controller';
import ErrorApi from "../errors/errorApi";
import e from 'express';


class ControllerBrand implements Controller<ModelBrand> {
    findAll(): Promise<ModelBrand[]> {
        return ModelBrand.findAll();
    }

    findOne(): Promise<ModelBrand | null> {
        return ModelBrand.findOne()
    }

    add(el: OptionalBrand): Promise<ModelBrand> {
        return ModelBrand.create(el);
    }

    async remove(): Promise<number> {
        return ModelBrand.destroy();
    }
}

export default new ControllerBrand();
