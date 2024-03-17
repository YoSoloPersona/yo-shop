import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Form, Card, Button, Row, Alert } from 'react-bootstrap';

// i18
import { useTranslation } from 'react-i18next';

// local
import { User } from '@YoSoloPersona/yo-shop-model';
import { RootState, setUserAction } from '../reducer';
import { domain } from '../domain';
import { RepositoryUser } from '@YoSoloPersona/yo-shop-api';

// Вытаскивае необходимые данные из хранилища (авторизация)
const mapState = (state: RootState) => state.auth;

// Необходимые команды
const mapDispatch =  {
    setUser: setUserAction
};

// Оборачиваем наш компонент
const connector = connect(mapState, mapDispatch);

type Props = {} & ConnectedProps<typeof connector>;

/**
 * Форма для регистрации и авторизации.
 * @param props
 * @returns JSX.Element.
 */
function Auth(props: Props) {
    const location = useLocation();
    // Данные для регистрации пользователя
    const [data, setData] = useState<User>({
        id: 0,
        email: '',
        password: '',
        role: 'user'
    });

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>(); // Ошибки
    const isLogin = location.pathname !== domain.user.registration.url; // Определяем где мы находимся, на регистрации или авторизации
    const action = isLogin ? 'authorization' : 'registration';

    const repositoryUser = new RepositoryUser({

    });

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
            .registration(data)
            // Обрабатываем полученный ответ
            .then((answer) => {
                data.password = '';
                props.setUser({ email: data.email, token: answer.token }); // Сохраням данные
                navigate(domain.shop.url); // Возвращаемся на главную страницу
            })
            // Обрабатываем ошибку при отправке запроса
            .catch((err: Error) => {
                setError(`Возникла ошибка при регистрации.`);
            });
    };

    // Авторизирует пользователя
    const login: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        repositoryUser
            .authorization(data)
            .then((answer) => {
                data.password = '';
                props.setUser({ email: data.email, token: answer.token }); // Сохраням данные
                navigate(domain.shop.url); // Возвращаемся на главную страницу
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
                                <NavLink to={domain.user.registration.url}>
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

export default connector(Auth);
