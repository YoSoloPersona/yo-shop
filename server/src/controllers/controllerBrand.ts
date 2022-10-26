// local
import { ModelBrand, Brand, FindBrand } from 'yo-shop-model';
import Controller from './controller';

class ControllerBrand implements Controller<Brand> {
    findAll(option?: FindBrand): Promise<Brand[]> {
        return ModelBrand.findAll(option).then(listModelBrand =>
            listModelBrand.map(modelBrand => modelBrand.toJSON())
        );
    }

    findOne(option?: FindBrand): Promise<Brand | null> {
        return ModelBrand.findOne(option).then(modelBrand =>
            modelBrand ? modelBrand?.toJSON() : null
        );
    }

    add(el: Brand): Promise<Brand> {
        return ModelBrand.create(el);
    }

    remove(): Promise<number> {
        return ModelBrand.destroy();
    }
}

export default new ControllerBrand();
