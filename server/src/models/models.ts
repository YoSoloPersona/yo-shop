//
import { basename } from 'path';
import { DataTypes } from 'sequelize';

// local
import sequelize from '../db/db';

// описание таблиц
// пользователь
export const user = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

// корзина
export const basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});


export const basketDevice = sequelize.define('basketDevice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// устройство
export const device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false},
    price: { type: DataTypes.STRING, unique: true, allowNull: false},
    rating: { type: DataTypes.STRING, defaultValue: 0},
    img: { type: DataTypes.STRING, unique: true, allowNull: false},
});

// тип устройства
export const type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false}
});

// брэнд
export const brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false}
});

// рейтинг
export const rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false}
});

// описание устройства
export const deviceInfo = sequelize.define('deviceInfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.STRING, allowNull: false}
});

// 
const typeBrand = sequelize.define('typeBrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Связи
user.hasOne(basket);
basket.belongsTo(user);

user.hasMany(rating);
rating.belongsTo(user);

basket.hasMany(basketDevice);
basketDevice.belongsTo(basket);

type.hasMany(device);
device.belongsTo(type);

brand.hasMany(device);
device.belongsTo(brand);

device.hasMany(rating);
rating.belongsTo(device);

device.hasMany(basketDevice);
basketDevice.belongsTo(device);

device.hasMany(deviceInfo);
deviceInfo.belongsTo(device);

type.belongsToMany(brand, { through: typeBrand }); 
brand.belongsToMany(type, { through: typeBrand });

