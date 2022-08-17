import { Col, Container, Row } from 'react-bootstrap';

// local
import TypeBar from './typeBar';

type Props = {};

const Shop = (props: Props) => {
    return (
        <Container>
            <Row>
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
};

export default Shop;
