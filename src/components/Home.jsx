import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col>
                            <div className="title title--home">Welcome</div>
                        </Col>
                    </Row>
                    {sessionStorage.user ? (
                        <Row className="justify-content-md-between">
                            <Col>
                                <NavLink className="link" to="/products">
                                    <Button variant="info" block>
                                        Products
                                    </Button>
                                </NavLink>
                            </Col>
                            <Col>
                                <NavLink className="link" to="/categories">
                                    <Button variant="info" block>
                                        Categories
                                    </Button>
                                </NavLink>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <div className="home__notice">
                                In order to access the content you need to <NavLink to="/login">Log in!!</NavLink>
                            </div>
                        </Row>
                    )}
                </Container>
            </div>
        );
    }
}

export default Home;
