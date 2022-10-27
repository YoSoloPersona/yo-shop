import { Brand } from 'yo-shop-model';

// local
import { ModelBrand, FindBrand, WhereBrand } from '../models';
import Controller from './controller';

/**
 *
 */
class ControllerBrand implements Controller<ModelBrand> {
    /**
     * Ищет брэнды по указанным параметрам.
     * @param options параметры поиска.
     * @returns массив наденных брэндов.
     */
    findAll(options?: FindBrand): Promise<Brand[]> {
        return ModelBrand.findAll(options).then(listModelBrand =>
            listModelBrand.map(modelBrand => modelBrand.toJSON())
        );
    }

    /**
     * Ищет брэнд по указанным параметрам.
     * @param options параметры поиска.
     * @returns найденный брэнд.
     */
    findOne(options?: FindBrand): Promise<Brand | null> {
        return ModelBrand.findOne(options).then(modelBrand =>
            modelBrand ? modelBrand?.toJSON() : null
        );
    }

    /**
     * Добавлеят брэнд.
     * @param brand добавляемый брэнд.
     * @returns добавленный брэнд с дополнительными данными о добавлении.
     */
    add(brand: Brand): Promise<Brand> {
        return ModelBrand.create(brand);
    }

    /**
     * Удаляет брэнды по указанным параметрам.
     * @param options параметры поиска.
     * @returns количество удалённых брэндов.
     */
    remove(options?: WhereBrand): Promise<number> {
        return ModelBrand.destroy({where: options});
    }
}

export default new ControllerBrand();
