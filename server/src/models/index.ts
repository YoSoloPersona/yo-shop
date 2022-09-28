import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
    WhereOptions
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

// описание таблиц

/** Типы пользователей. */
export type Role = 'root' | 'user' | 'admin';

/** Пользователь. */
export type OptionalUser = Optional<
InferCreationAttributes<
    ModelUser,
    {
        omit: never;
    }
>,
'id'
>;

/** Фильтр для получения пользователей. */
export type FilterUser = WhereOptions<
InferAttributes<
    ModelUser,
    {
        omit: never;
    }
>
>

/** Модель пользователя. */
export class ModelUser extends Model<
    InferAttributes<ModelUser>,
    InferCreationAttributes<ModelUser>
> {
    declare id: CreationOptional<number>;

    /** Электронаня почта. */
    declare email: string;

    /** Тип. */
    declare role: Role;

    /** Хэш пароля. */
    declare password: string;
}

ModelUser.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: 'user' }
    },
    {
        sequelize: sequelize,
        tableName: 'users'
    }
);

/** Корзина. */
export interface Basket {
    /** Идентификатор в БД. */
    id: number;
}

/** Модель корзины. */
export const ModelBasket = sequelize.define<Basket & Model>('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

/**  */
export interface BasketProduct {
    /** Идентификатор в БД. */
    id: number;
}

/**  */
export const ModelBasketDevice = sequelize.define<BasketProduct & Model>(
    'basketProduct',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    }
);

/** Продукт. */
export interface Product {
    /** Идентификатор в БД. */
    id: number;

    /** Наименование. */
    name: string;

    /** Цена. */
    price: string;

    /** Рейтинг. */
    rating: number;

    /** Картинка. */
    img: string;
}

/** Модель продукта. */
export const ModelProduct = sequelize.define<Product & Model>('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.STRING, unique: true, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, unique: true, allowNull: false }
});

/** Категория продуктов. */
export interface Category {
    /** Идентификатор в БД. */
    id?: number;

    /** Наименование. */
    name: string;
}

/** Модель категории продуктов. */
export const ModelCategory = sequelize.define<Category & Model>('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

/** Бренд. */
export interface Brand {
    /** Идентификатор в БД. */
    id: number;

    /** Наименование. */
    name: string;
}

/** Модель бренда. */
export const ModelBrand = sequelize.define<Brand & Model>('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

/** Рейтинг. */
interface Rating {
    /** Идентификатор в БД. */
    id: number;

    /** Рейтинг. */
    rate: number;
}

/** Модель рейтинга. */
export const ModelRating = sequelize.define<Rating & Model>('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
});

/** Описание продукта. */
interface ProductInfo {
    /** Идентификатор в БД. */
    id: number;

    /** Заголовок. */
    title: string;

    /** Описание. */
    description: string;
}

/** Модель описания продукта. */
export const ModelProductInfo = sequelize.define<ProductInfo & Model>('productInfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
});

/**  */
interface TypeBrand {
    id: number;
}

const ModelTypeBrand = sequelize.define<TypeBrand & Model>('typeBrand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Связи
ModelUser.hasOne(ModelBasket);
ModelBasket.belongsTo(ModelUser);

ModelUser.hasMany(ModelRating);
ModelRating.belongsTo(ModelUser);

ModelBasket.hasMany(ModelBasketDevice);
ModelBasketDevice.belongsTo(ModelBasket);

ModelCategory.hasMany(ModelProduct);
ModelProduct.belongsTo(ModelCategory);

ModelBrand.hasMany(ModelProduct);
ModelProduct.belongsTo(ModelBrand);

ModelProduct.hasMany(ModelRating);
ModelRating.belongsTo(ModelProduct);

ModelProduct.hasMany(ModelBasketDevice);
ModelBasketDevice.belongsTo(ModelProduct);

ModelProduct.hasMany(ModelProductInfo);
ModelProductInfo.belongsTo(ModelProduct);

ModelCategory.belongsToMany(ModelBrand, { through: ModelTypeBrand });
ModelBrand.belongsToMany(ModelCategory, { through: ModelTypeBrand });
