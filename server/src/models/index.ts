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

// local
export { ModelUser, FindUser, WhereUser } from './user';
export { ModelBasket } from './basket';
export { ModelCategory, FindCategory, WhereCategory } from './category';
export { ModelProduct, FindProduct, WhereProduct } from './product';
export { ModelBasketProducts } from './basketProduct';
export { ModelBrand, FindBrand, WhereBrand } from './brand';
export { ModelRating } from './rating';
export { ModelProductInfo } from './productInfo';
export { ModelTypeBrand, FindTypeBrand, WhereTypeBrand } from './typeBrand';

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
