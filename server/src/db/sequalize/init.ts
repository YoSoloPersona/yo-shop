// local
import { ModelUser } from './user/user.model';
import { ModelCategory } from './category/category.model';
import { ModelCart } from './basket/basket.model';
import { ModelProduct } from './product/product.model';
import { ModelBasketProducts } from './basketProduct/basketProduct.model';
import { ModelBrand } from './brand/brand.model';
import { ModelRating } from './rating/rating.model';
import { ModelProductInfo } from './productInfo/productInfo.model';
import { ModelTypeBrand } from './typeBrand/typeBrand.model';

// Связи
ModelUser.hasOne(ModelCart);
ModelCart.belongsTo(ModelUser);

ModelUser.hasMany(ModelRating);
ModelRating.belongsTo(ModelUser);

ModelCart.hasMany(ModelBasketProducts);
ModelBasketProducts.belongsTo(ModelCart);

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
