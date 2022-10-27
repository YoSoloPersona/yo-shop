import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import { ProductInfo } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Модель описания продукта. */
export class ModelProductInfo
    extends Model<
        InferAttributes<ModelProductInfo>,
        InferCreationAttributes<ModelProductInfo>
    >
    implements ProductInfo
{
    /** Идентификатор в БД. */
    declare id: number;

    /** Заголовок. */
    declare title: string;

    /** Описание. */
    declare description: string;
}

/** Инициализация в БД. */
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
