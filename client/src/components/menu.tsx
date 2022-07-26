import React from 'react';
import { NavLink } from 'react-router-dom';

// bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// local
import { Api } from '../info';

type Props = {};

const Menu = (props: Props) => {
    return <Navbar bg="light" variant="light">
    <Container>
      <NavLink to={Api.shop.url}>Купи девайс</NavLink>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Container>
  </Navbar>;
};

export default Menu;
