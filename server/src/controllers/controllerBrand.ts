// local
import { ModelBrand as Model, Brand } from "../models";
import Controller from './controller';
import ErrorApi from "../errors/errorApi";
import e from 'express';


class ControllerBrand implements Controller<Brand> {
    findAll(): Promise<Brand[]> {
        return Model.findAll();
    }

    findOne(): Promise<Brand | null> {
        return Model.findOne()
    }

    add(el: Brand): Promise<Brand> {
        return Model.create({...el});
    }

    async remove(): Promise<number> {
        return Model.destroy();
    }
}

export default new ControllerBrand();
