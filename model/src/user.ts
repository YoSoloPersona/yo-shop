/** Типы пользователей. */
export type Role = 'root' | 'user' | 'admin';

/** Пользователь. */
export interface User {
    /** Идентификатор в БД. */
    id?:number;

    /** Электронаня почта. */
    email: string;

    /** Тип. */
    role: Role;

    /** Хэш пароля. */
    password: string;
}