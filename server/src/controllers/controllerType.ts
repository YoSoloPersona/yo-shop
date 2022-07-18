import { Request, Response } from 'express';

// local
import Controller from './controller';
import { ModelType as Model, Type } from '../models/models';
import { DestroyOptions, FindOptions } from 'sequelize/types';

class ControllerType implements Controller<Type> {
    findAll(): Promise<Type[]> {
        return Model.findAll();
    }

    findOne(option?: FindOptions<any>): Promise<Type | null> {
        return Model.findOne(option);
    }

    add(el: Type): Promise<Type> {
        return Model.create({ ...el });
    }

    async remove(option?: DestroyOptions<any>): Promise<number> {
        return Model.destroy(option);
    }
}

export default new ControllerType();
