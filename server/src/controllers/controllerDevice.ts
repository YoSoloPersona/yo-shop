// local
import { ModelDevice as Model, Device } from '../models/models';
import Controller from './controller';
import ErrorApi from '../errors/errorApi';

class ControllerDevice implements Controller<Device> {
    findAll(): Promise<Device[]> {
        return Model.findAll();
    }

    findOne(): Promise<Device | null> {
        return Model.findOne();
    }

    add(el: Device): Promise<Device> {
        return Model.create({ ...el });
    }

    remove(): Promise<number> {
        return Model.destroy();
    }
}

export default new ControllerDevice();
