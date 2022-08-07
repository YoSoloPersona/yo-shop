import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Form, Card, Button, Row, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// local
import { useUser } from '../hooks/userHook';
import { domain } from '../domain';
import { repositoryUser } from '../repositories/repositoryUser';

/**
 * Форма для регистрации и авторизации.
 * @returns Auth.
 */
export function Auth() {
    const location = useLocation();
    // Данные для регистрации пользователя
    const [data, setData] = useState({
        email: '',
        password: '',
        role: 'USER'
    });

    const { t } = useTranslation();
    const [error, setError] = useState<string | undefined>(); // Ошибки
    const { user } = useUser(); // Данные о пользователе
    const isLogin = location.pathname !== domain.user.registration.url; // Определяем где мы находимся, на регистрации или авторизации
    const action = isLogin ? 'authorization' : 'registration';

    // Ввод адреса почты
    const emailChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        setData({ ...data, email: e.target.value });

    // Ввод пароля
    const passwordChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        setData({ ...data, password: e.target.value });

    // Регистрируем пользователя
    const registrate: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        repositoryUser
            // Отправляем данные на сервер
            .registrate(data)
            // Обрабатываем полученный ответ
            .then((answer) => {
                // Сохраням токен
                user.token = answer.token;
            })
            // Обрабатываем ошибку при отправке запроса
            .catch((err: Error) => {
                setError(`Возникла ошибка при регистрации.`);
            });
    };

    // Авторизирует пользователя
    const login: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        repositoryUser
            .login(data)
            .then((answer) => {
                console.log(answer);
                user.token = answer.token;
            })
            .catch((err: Error) => {
                setError(`Возникла ошибка при авторизации.`);
            });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card>
                <Card.Header>{t(`auth.${action}.title`)}</Card.Header>
                <Card.Body>
                    {/* Форма */}
                    <Form className="dflex flex-column">
                        {/* email */}
                        <Form.Control
                            className="mt-3"
                            placeholder={t(`auth.${action}.email.placeholder`)}
                            onChange={emailChanged}
                        />
                        {/* password */}
                        <Form.Control
                            className="mt-3"
                            placeholder={t(
                                `auth.${action}.password.placeholder`
                            )}
                            type="password"
                            onChange={passwordChanged}
                        />
                        <Row className="d-flex flex-column justify-content-between mt-3">
                            <div className="d-flex justify-content-around">
                                {t(`auth.${action}.answer`)}
                                <NavLink to={domain.user.registration.path}>
                                    {t(`auth.${action}.invitation`)}
                                </NavLink>
                            </div>

                            {/* Message error */}
                            <Alert variant="danger" hidden={!error}>
                                {error}
                            </Alert>

                            {/* action */}
                            <Button
                                variant="outline-secondary"
                                onClick={isLogin ? login : registrate}
                            >
                                {t(`auth.${action}.action`)}
                            </Button>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
