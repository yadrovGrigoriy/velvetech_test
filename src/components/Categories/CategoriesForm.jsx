import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class CategoriesForm extends Component {
    state = {
        form: {
            title: ''
        },
        validated: false,
        isEdit: false
    };
    onChange = event => {
        this.setState({
            form: { ...this.state.form, [event.target.id]: event.target.value }
        });
    };
    onSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.props.onSubmit(this.state.form, this.state.isEdit);
            setTimeout(() => {
                this.props.fetchListItems('categories');
            }, 100);
        }

        this.setState({
            validated: true
        });
    };
    componentDidMount() {
        if (this.props.editedItem) this.setState({ form: { ...this.props.editedItem }, isEdit: true });
    }

    render() {
        return (
            <div>
                <Form className="form " noValidate validated={this.state.validated} onSubmit={this.onSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter title"
                            value={this.state.form.title}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback type="invalid"> Field is required </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" block>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onSubmit: (form, isEdit = false) => {
            if (isEdit) {
                axios.patch('http://localhost:3004/categories/' + form.id, form);
            } else {
                axios.post('http://localhost:3004/categories', form);
            }
            dispatch({
                type: 'SET_STATE_MODAL',
                payload: false
            });
        },
        fetchListItems: title => {
            axios.get('http://localhost:3004/' + title).then(res => {
                dispatch({
                    type: 'SET_STATE',
                    payload: { item: title, data: res.data }
                });
            });
        }
    })
)(CategoriesForm);
