import { Model, DataTypes } from 'sequelize';
import { Category } from '@YoSoloPersona/yo-shop-model';

// local
import { sequelize } from '../db';

/** Модель категории продуктов. */
export class ModelCategory
    extends Model<Category, Category>
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
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'category'
    }
);
