import { Request, Response } from 'express';

// local
import Controller from './controller';
import ErrorApi from '../errors/errorApi';
import { ModelType as Model, Type } from '../models/models';

class ControllerType implements Controller<Type> {
    findAll(): Promise<Type[]> {
        return Model.findAll();
    }

    findOne(): Promise<Type | null> {
        return Model.findOne();
    }

    add(el: Type): Promise<Type> {
        return Model.create({ ...el });
    }

    async remove(): Promise<number> {
        return Model.destroy();
    }
}

export default new ControllerType();
