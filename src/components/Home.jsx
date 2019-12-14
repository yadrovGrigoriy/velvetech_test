import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <header></header>

            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <div className="title title--home">Welcome</div>
                    </Col>
                </Row>
                <Row className="justify-content-md-between">
                    <Col>
                        <Button variant="info" block>
                            Products
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="info" block>
                            Categories
                        </Button>
                    </Col>
                </Row>
            </Container>
            {/* <footer></footer> */}
        </div>
    );
};

export default Home;
