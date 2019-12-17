import React, { Component } from 'react';
import { Table, Button, Row, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import ModalWindow from '../ModalWindow';
import { connect } from 'react-redux';
import axios from 'axios';

class PoductsList extends Component {
    state = {
        modalWindowBody: ''
    };
    onNew = () => {
        this.setState({
            modalWindowBody: <ProductForm />
        });
        this.props.setStateModal(true);
    };

    onEdit = item => {
        this.setState({
            modalWindowBody: <ProductForm editedItem={{ ...item }} />
        });
        this.props.setStateModal(true);
    };
    onRemove = item => {
        this.props.onRemove(item);
        setTimeout(() => {
            this.props.fetchListItems('products');
        }, 100);
    };
    componentDidMount() {
        this.props.fetchListItems('products');
    }
    render() {
        return (
            <div className="products">
                <Container>
                    <div className="title">Products list</div>
                    <Row>
                        <Button variant="success" onClick={this.onNew}>
                            Добавить
                        </Button>
                    </Row>
                    <Table className="list" hover size="md">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Shelf Life</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.products.map(item => (
                                <tr
                                    className="list__item"
                                    key={item.title + item.id}
                                    onClick={() => {
                                        this.props.history.push('./product/' + item.id);
                                    }}
                                >
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{new Date(item.shelfLife).toLocaleDateString()}</td>
                                    <td>{item.category}</td>
                                    <td
                                        className="list__item-action-buttons"
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Button size="sm" variant="warning" onClick={() => this.onEdit(item)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => this.onRemove(item)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <ModalWindow
                            show={this.props.showModal}
                            onHide={() => this.props.setStateModal(false)}
                            title="Product"
                            body={this.state.modalWindowBody}
                        />
                    </Table>
                </Container>
            </div>
        );
    }
}

export default connect(
    state => ({
        products: state.products,
        showModal: state.showModal
    }),
    dispatch => ({
        setStateModal: state => {
            dispatch({
                type: 'SET_STATE_MODAL',
                payload: state
            });
        },
        fetchListItems: title => {
            axios.get('http://localhost:3004/' + title).then(res => {
                dispatch({
                    type: 'SET_STATE',
                    payload: { item: title, data: res.data }
                });
            });
        },

        onRemove: item => {
            axios.delete('http://localhost:3004/products/' + item.id, item);
        }
    })
)(withRouter(PoductsList));
