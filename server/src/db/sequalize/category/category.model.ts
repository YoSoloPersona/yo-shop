import { Model, DataTypes, CreationOptional } from 'sequelize';
import { Category } from '@YoSoloPersona/yo-shop-model';

// locals
import { sequelize } from '../';

/** Category model */
export class ModelCategory
    extends Model<Category, Category>
    implements Category
{
    declare id: CreationOptional<number>;

    /**
     * Name
     */
    declare name: string;
}

ModelCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'categories'
    }
);
