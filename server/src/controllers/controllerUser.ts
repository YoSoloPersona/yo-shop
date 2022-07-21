import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// locals
import { ModelUser, User } from '../models/models';

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
        role: string
    ): Promise<string> {
        if (!email || !password) {
            throw new Error('Не указан email или пароль.');
        }

        // Ищем пользователя с указанными email
        const candidate = await ModelUser.findOne({ where: { email } });

        if (candidate) {
            throw new Error('Пользователь с таким email уже зарегистрирован.');
        }

        // Получаем hash пароля
        const hashPassword = await bcrypt.hash(password, 5);

        // Регистрируем пользователя
        const user = await ModelUser.create({
            email,
            role,
            password: hashPassword,
        });

        // Возвращаем jwt токен
        return jwt.sign(
            { id: user.id, email, role },
            process.env.SECRET_KEY as string,
            { expiresIn: '24h' }
        );
    }

    async login(email: string, password: string): Promise<string> {
        // Получаем hash пароля
        const user = await ModelUser.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error(
                'Не удалось авторизоваться, указан неверный email.'
            );
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error(
                'Не удалось авторизоваться, указан неверный пароль.'
            );
        }

        return jwt.sign(
            { id: user.id, email, role: user.role },
            process.env.SECRET_KEY as string,
            { expiresIn: '24h' }
        );
    }

    auth(): void {
        throw new Error('Метод ещё не реализован.');
    }

    delete(): void {
        throw new Error('Метод ещё не реализован.');
    }
}

export default new ControllerUser();
