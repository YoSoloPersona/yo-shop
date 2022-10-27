import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    FindOptions,
    WhereOptions,
    DataTypes
} from 'sequelize';
import { Category } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Параметры поиска категории товаров. */
export type FindCategory = FindOptions<ModelCategory>;

/** Параметры удаления категории товаров. */
export type WhereCategory = WhereOptions<ModelCategory>;

/** Модель категории продуктов. */
export class ModelCategory
    extends Model<
        InferAttributes<ModelCategory>,
        InferCreationAttributes<ModelCategory>
    >
    implements Category
{
    /** Идентификатор в БД. */
    declare id?: number;

    /** Наименование. */
    declare name: string;
}

/** Инициализация в БД. */
ModelCategory.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    {
        sequelize,
        tableName: 'category'
    }
);
