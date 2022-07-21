import { CreationOptional, DataTypes, Model } from 'sequelize';

// local
import sequelize from '../db/db';

// описание таблиц
// пользователь
export interface User extends Model {
    id: number;
    email: string;
    role: string;
    password: string;
}

export const ModelUser = sequelize.define<User>('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false},
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

// корзина
export interface Basket extends Model {
    id: number;
}

export const ModelBasket = sequelize.define<Basket>('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

export interface BasketDevice extends Model {
    id: number;
}

export const ModelBasketDevice = sequelize.define<BasketDevice>('basketDevice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// устройство
export interface Device extends Model {
    id: number;
    name: string;
    price: string;
    rating: number;
    img: string;
}

export const ModelDevice = sequelize.define<Device>('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.STRING, unique: true, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// тип устройства
export interface Type extends Model {
    id: number;
    name: string;
}

export const ModelType = sequelize.define<Type>('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// брэнд
export interface Brand extends Model {
    id: number;
    name: string;
}

export const ModelBrand = sequelize.define<Brand>('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// рейтинг
interface Rating extends Model {
    id: number;
    rate: number;
}

export const ModelRating = sequelize.define<Rating>('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
});

// описание устройства
interface DeviceInfo extends Model {
    id: number;
    title: string;
    description: string;
}

export const ModelDeviceInfo = sequelize.define<DeviceInfo>('deviceInfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
});

//
interface TypeBrand extends Model {
    id: number;
}

const ModelTypeBrand = sequelize.define<TypeBrand>('typeBrand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Связи
ModelUser.hasOne(ModelBasket);
ModelBasket.belongsTo(ModelUser);

ModelUser.hasMany(ModelRating);
ModelRating.belongsTo(ModelUser);

ModelBasket.hasMany(ModelBasketDevice);
ModelBasketDevice.belongsTo(ModelBasket);

ModelType.hasMany(ModelDevice);
ModelDevice.belongsTo(ModelType);

ModelBrand.hasMany(ModelDevice);
ModelDevice.belongsTo(ModelBrand);

ModelDevice.hasMany(ModelRating);
ModelRating.belongsTo(ModelDevice);

ModelDevice.hasMany(ModelBasketDevice);
ModelBasketDevice.belongsTo(ModelDevice);

ModelDevice.hasMany(ModelDeviceInfo);
ModelDeviceInfo.belongsTo(ModelDevice);

ModelType.belongsToMany(ModelBrand, { through: ModelTypeBrand });
ModelBrand.belongsToMany(ModelType, { through: ModelTypeBrand });
