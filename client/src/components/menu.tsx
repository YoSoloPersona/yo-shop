import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

// i18
import { useTranslation } from 'react-i18next';

// bootstrap
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

// local
import { RootState, setAuthAction } from '../reducer';
import { domain } from '../domain';

// Вытаскиваем из хранилища необходимые данные (авторизация)
const mapState = (state: RootState) => state.auth;

//
const mapDispatch = {
    exit: setAuthAction
}

// Объединяем наше меню с данными
const connector = connect(mapState, mapDispatch);

type Props = {} & ConnectedProps<typeof connector>;

/**
 * Главное меню.
 * @param props
 * @returns JSX.Element.
 */
const Menu = (props: Props) => {
    const { t } = useTranslation();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={domain.shop.url}>{t('menu.title')}</NavLink>
                {props.user ? (
                    // Если пользователь авторизован
                    <Nav className="ml-auto">
                        {/* Админимстрирование */}
                        <Nav.Link href={domain.user.admin.url}>
                            {t('menu.admin')}
                        </Nav.Link>
                        {/* Выход */}
                        <Button onClick={() => props.exit({user: undefined, token: ''})}>
                            {t('menu.exit')}
                        </Button>
                    </Nav>
                ) : (
                    // Если пользователь не авторизован
                    <Nav className="ml-auto">
                        {/* Авторизация */}
                        <Nav.Link href={domain.user.login.url}>
                            {t('menu.login')}
                        </Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
};

export default connector(Menu);
