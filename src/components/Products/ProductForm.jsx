import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                price: '',
                shelfLife: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate() + 1}`,
                category: ''
            },
            validated: false,
            isEdit: false
        };
        console.log(props);
    }

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
                this.props.fetchListItems('products');
            }, 100);
        }

        this.setState({
            validated: true
        });
    };
    componentDidMount() {
        this.props.fetchListItems('categories');
        if (this.props.editedItem) this.setState({ form: { ...this.props.editedItem }, isEdit: true });
    }

    render() {
        return (
            <div>
                <Form noValidate className="form" validated={this.state.validated} onSubmit={this.onSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            minLength="5"
                            maxLength="40"
                            type="text"
                            placeholder="Enter title"
                            value={this.state.form.title}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback type="invalid"> Length value less 5 </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            required
                            min="1"
                            type="number"
                            placeholder="Enter Price"
                            value={this.state.form.price}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback type="invalid"> Need more than 0 </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="shelfLife">
                        <Form.Label>Shelf Life</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            min={this.state.form.shelfLife}
                            value={this.state.form.shelfLife}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={this.state.form.category} onChange={this.onChange}>
                            {this.props.categories.map(option => (
                                <option key={option.id}>{option.title}</option>
                            ))}
                        </Form.Control>
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
    state => ({
        categories: state.categories
    }),
    dispatch => ({
        onSubmit: (form, isEdit = false) => {
            if (isEdit) {
                axios.patch('http://localhost:3004/products/' + form.id, form);
            } else {
                axios.post('http://localhost:3004/products', form);
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
)(ProductForm);
