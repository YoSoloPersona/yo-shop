import React from 'react';
import { NavLink } from 'react-router-dom';

// i18
import { useTranslation } from 'react-i18next';

// bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// local
import { Api } from '../info';

type Props = {};

const Menu = (props: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink to={Api.shop.url}>{t('menu.title')}</NavLink>
                <Nav className="ml-auto">
                    <Nav.Link href={Api.user.admin.url}>{t('menu.admin')}</Nav.Link>
                    <Nav.Link href={Api.user.registration.url}>{t('menu.registration')}</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Menu;
