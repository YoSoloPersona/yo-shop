import {
    DataTypes,
    Model
} from 'sequelize';
import { ProductInfo } from 'yo-shop-model';

// local
import { sequelize } from '../db';

/** Модель описания продукта. */
export class ModelProductInfo
    extends Model<
        ProductInfo,
        ProductInfo
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
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        title: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        description: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }
    },
    {
        sequelize,
        tableName: 'productInfo'
    }
);
