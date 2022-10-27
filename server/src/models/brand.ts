import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    FindOptions,
    DataTypes,
    WhereOptions
} from 'sequelize';
import { Brand } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Параметры для поиска брэндов. */
export type FindBrand = FindOptions<ModelBrand>;

/**  */
export type WhereBrand = WhereOptions<ModelBrand>;

/** Модель брэнда. */
export class ModelBrand
    extends Model<
        InferAttributes<ModelBrand>,
        InferCreationAttributes<ModelBrand>
    >
    implements Brand
{
    /** Идентификатор в БД. */
    declare id?: number;

    /** Наименование. */
    declare name: string;
}

// Инициализация в БД.
ModelBrand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    { sequelize, tableName: 'brand' }
);
