import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Описание продукта. */
export type ProductInfo = InferAttributes<ModelProductInfo>;

/** Модель описания продукта. */
export class ModelProductInfo extends Model<
    ProductInfo,
    InferCreationAttributes<ModelProductInfo>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Заголовок. */
    declare title: string;

    /** Описание. */
    declare description: string;
}

/** Модель описания продукта. */
ModelProductInfo.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'productInfo'
    }
);
