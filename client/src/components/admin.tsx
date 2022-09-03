import React from 'react';
import { Button, Container, Tab, Row, Col, Navbar, Nav } from 'react-bootstrap';

// local
import { Repository } from './repository';
import EditCategory from './admin/editCategory';
import { Brand } from './admin/brand';
import { Product } from './admin/product';

type Props = {};

export default function Admin({}: Props) {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Категории</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Бренды</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="thrid">Товары</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <EditCategory />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Brand />
                        </Tab.Pane>
                        <Tab.Pane eventKey="thrid">
                            <Product />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}
