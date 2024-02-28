import { Op, WhereOptions } from 'sequelize';
import { User, Role } from '@YoSoloPersona/yo-shop-model';

// locals
import { injectable } from '../../helpers/decorators';
import { ModelUser } from '../../models';

@injectable
export class UserRepository {
    //#region Create

    async create(user: User): Promise<User> {
        if (!user) {
            throw Error('Error when creating a user, null or undenfined is passed as user!');
        }

        if (!user.email) {
            throw Error('Error during user creation, null, undenfined or empty string is passed as users e-mail!');
        }

        if (!user.password) {
            throw Error('Error during user creation, null, undenfined or empty string is passed as users password!');
        }

        return (await ModelUser.create(user)).get();
    }

    //#endregion

    //#region Read

    async readAll(): Promise<User[]> {
        return (await ModelUser.findAll()).map(model => model.get());
    }

    async readById(id: number): Promise<User | undefined> {
        return (await ModelUser.findOne({ where: { id } }))?.get();
    }

    async readByEmail(email: string): Promise<User | undefined> {
        return (await ModelUser.findOne({ where: { email } }))?.get();
    }

    //#endregion

    //#region Update

    async update(
        id: number,
        values: Partial<Omit<User, 'id'>> = {}
    ): Promise<number | undefined> {
        return (await ModelUser.update(values, { where: { id } })).at(0);
    }

    //#endregion

    //#region Delete

    deleteAll(): Promise<number> {
        return ModelUser.destroy({
            where: {
                role: {
                    [Op.ne]: 'root'
                }
            }
        });
    }

    deleteById(id: number): Promise<number> {
        return ModelUser.destroy({
            where: {
                [Op.and]: [
                    { id },
                    {
                        role: {
                            [Op.ne]: 'root'
                        }
                    }
                ]
            }
        });
    }

    //#endregion
}
