import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Form, Card, Button, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// local
import { useUser } from '../hooks/userHook';
import { Api } from '../info';
import { repositoryUser } from '../repositories/repositoryUser'

/**
 * Форма для регистрации и авторизации.
 * @returns Auth.
 */
export function Auth() {
    // Данные для регистрации пользователя
    const [ data, setData ] = useState({
        email: '', 
        password: '',
        role: 'USER'
    });

    const { t } = useTranslation();

    // Данные о пользователе
    const { user } = useUser();
    const isLogin = false;
    const action = isLogin ? 'authorization' : 'registration';

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
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                        {/* password */}
                        <Form.Control
                            className="mt-3"
                            placeholder={t(`auth.${action}.password.placeholder`)}
                            onChange={(e) => setData({...data, password: e.target.value})}
                        />
                        <Row className="d-flex flex-column justify-content-between mt-3">
                            <div className="d-flex justify-content-around">
                                {t(`auth.${action}.answer`)} 
                                <NavLink to={Api.user.registration.url}>{t(`auth.${action}.invitation`)}</NavLink>
                            </div>
                            {/* action */}
                            <Button
                                variant="outline-secondary"
                                onClick={(e) => {
                                    repositoryUser.registrate(data);
                                }}
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