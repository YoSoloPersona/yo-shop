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
export { Role, FilterUser, ModelUser } from './user';
export { ModelBasket, Basket } from './basket';
export { ModelProduct, Product, FindProduct } from './product';
export { ModelCategory, Category, FindCategory } from './category';
export { ModelBrand, Brand, FindBrand } from './brand';
export { ModelBasketProducts, BasketProducts } from './basketProduct';
export { ModelRating, Rating } from './rating';
export { ModelProductInfo, ProductInfo } from './productInfo';
export { ModelTypeBrand, TypeBrand } from './typeBrand';


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
