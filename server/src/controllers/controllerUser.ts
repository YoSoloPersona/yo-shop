import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import debug from 'debug';

// locals
import { ModelUser, Role } from '../models';
import ErrorApi from '../errors/errorApi';
import { InferAttributes, Op, WhereOptions } from 'sequelize';

const log = debug('controllers:user');

/**
 * Класс для работы с пользователями.
 */
class ControllerUser {
    /**
     * Регистрирует пользователя в БД.
     * @param email электронная почта.
     * @param password пароль.
     * @param role тип пользователя.
     * @returns jsonwebtoken зарегистрированного пользователя.
     */
    async registration(
        email: string,
        password: string,
        role: Role
    ): Promise<string> {
        if (!email || !password) {
            throw ErrorApi.badRequest('Не указан email или пароль.');
        }

        // Ищем пользователя с указанными email
        const candidate = await ModelUser.findOne({ where: { email } });

        if (candidate) {
            throw ErrorApi.accountAlreadyExists(
                'Пользователь с таким email уже зарегистрирован.'
            );
        }

        // Получаем hash пароля
        const hashPassword = await bcrypt.hash(password, 5);

        // Регистрируем пользователя
        const user = (await ModelUser.create({
            email,
            role,
            password: hashPassword
        })).toJSON();

        // Возвращаем jwt токен
        return jwt.sign(
            { id: user.id, email, role },
            process.env.SECRET_KEY as string,
            { expiresIn: '24h' }
        );
    }

    /**
     * Авторизует пользователя.
     * @param email электронная почта.
     * @param password пароль.
     * @returns jsonwebtoken авторизованного пользователя.
     */
    async login(email: string, password: string): Promise<string> {
        const user = (
            await ModelUser.findOne({
                where: {
                    email
                }
            })
        )?.toJSON();

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw ErrorApi.badRequest(
                'Не удалось авторизоваться, указан неверный email или пароль.'
            );
        }

        return jwt.sign(
            { id: user.id, email, role: user.role },
            process.env.SECRET_KEY as string,
            { expiresIn: '24h' }
        );
    }

    /**
     * Удаляет всех пользователей за исключением root.
     * @returns Promise<number> количество удалённых пользователей.
     */
    clear(): Promise<number> {
        return ModelUser.destroy({
            where: {
                role: {
                    [Op.ne]: 'root'
                }
            }
        });
    }

    /**
     * Удаляет пользователей с указанными параметрами.
     * @param filter параметры поиска удаляемых пользователей.
     * @returns количество удалённых пользователей.
     */
    delete(filter?: WhereOptions<InferAttributes<ModelUser>>) {
        return ModelUser.destroy({
            where: {
                [Op.and]: [
                    {
                        role: {
                            [Op.ne]: 'root'
                        }
                    }
                ]
            }
        });
    }
}

export default new ControllerUser();
