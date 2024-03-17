import {  Tab, Row, Col, Nav } from 'react-bootstrap';

// local
import EditorCategory from './admin/editorCategory';
import { Brand } from './admin/brand';
import { Product } from './admin/product';
import { repositoryCategory } from '@YoSoloPersona/yo-shop-api';

type Props = {};

export default function Admin(props: Props) {
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
                            <EditorCategory task={repositoryCategory.all} />
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
