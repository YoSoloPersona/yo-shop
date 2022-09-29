// local
import { ModelUser } from './user';
import { ModelBasket } from './basket';
import { ModelCategory } from './category';
import { ModelProduct } from './product';
import { ModelBasketProducts } from './basketProduct';
import { ModelBrand } from './brand';
import { ModelRating } from './rating';
import { ModelProductInfo } from './productInfo';
import { ModelTypeBrand } from './typeBrand';

// описание таблиц
export { Role, OptionalUser, FilterUser, ModelUser } from './user';
export { ModelBasket } from './basket';
export { ModelProduct, FindProduct, OptionalProduct } from './product';
export { ModelCategory, FindCategory, OptionalCategory } from './category';
export { ModelBrand, FindBrand, OptionalBrand } from './brand';
export { ModelBasketProducts } from './basketProduct';
export { ModelRating } from './rating';
export { ModelProductInfo } from './productInfo';
export { ModelTypeBrand } from './typeBrand';


// Связи
ModelUser.hasOne(ModelBasket);
ModelBasket.belongsTo(ModelUser);

ModelUser.hasMany(ModelRating);
ModelRating.belongsTo(ModelUser);

ModelBasket.hasMany(ModelBasketProducts);
ModelBasketProducts.belongsTo(ModelBasket);

ModelCategory.hasMany(ModelProduct);
ModelProduct.belongsTo(ModelCategory);

ModelBrand.hasMany(ModelProduct);
ModelProduct.belongsTo(ModelBrand);

ModelProduct.hasMany(ModelRating);
ModelRating.belongsTo(ModelProduct);

ModelProduct.hasMany(ModelBasketProducts);
ModelBasketProducts.belongsTo(ModelProduct);

ModelProduct.hasMany(ModelProductInfo);
ModelProductInfo.belongsTo(ModelProduct);

ModelCategory.belongsToMany(ModelBrand, { through: ModelTypeBrand });
ModelBrand.belongsToMany(ModelCategory, { through: ModelTypeBrand });
