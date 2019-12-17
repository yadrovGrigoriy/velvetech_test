import React, { Component } from 'react';
import { Container, Row, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.form = {
            email: '',
            password: ''
        };
    }
    onChange = event => {
        this.form[event.target.id] = event.target.value;
    };
    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.form);
        setTimeout(() => {
            this.props.history.push('/');
        }, 500);
    };

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <div className="title title--login">log In</div>
                </Row>
                <Row className="justify-content-md-center">
                    <Form className="auth-form" onSubmit={this.onSubmit} onChange={this.onChange}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">We'll share! your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-muted">And apssword to.</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => ({ authUser: state.authUser }),
    dispatch => ({
        onSubmit: form => {
            axios.get('http://localhost:3004/users').then(res => {
                const user = res.data.find(user => user.email === form.email && user.password === form.password);
                sessionStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: 'LOG_IN',
                    payload: user
                });
            });
        }
    })
)(withRouter(Auth));
