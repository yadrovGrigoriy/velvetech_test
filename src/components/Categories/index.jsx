import React, { Component } from 'react';
import { Table, Button, Row, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ModalWindow from '../ModalWindow';
import CategoriesForm from './CategoriesForm';
import { connect } from 'react-redux';
import axios from 'axios';

class CaregoriesList extends Component {
    state = {
        modalWindowBody: ''
    };
    onNew = () => {
        this.setState({
            modalWindowBody: <CategoriesForm />
        });
        this.props.setStateModal(true);
    };

    onEdit = item => {
        this.setState({
            modalWindowBody: <CategoriesForm editedItem={{ ...item }} />
        });
        this.props.setStateModal(true);
    };
    onRemove = item => {
        this.props.onRemove(item);
        setTimeout(() => {
            this.props.fetchListItems('categories');
        }, 100);
    };
    componentDidMount() {
        this.props.fetchListItems('categories');
    }
    render() {
        return (
            <div className="categories">
                <Container>
                    <div className="title">Categories list</div>
                    <Row>
                        <Button variant="success" onClick={this.onNew}>
                            Добавить
                        </Button>
                    </Row>
                    <Table className="list" hover size="md">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.categories.map(item => (
                                <tr
                                    className="list__item"
                                    key={item.title + item.id}
                                    onClick={() => {
                                        this.props.history.push('./category/' + item.id);
                                    }}
                                >
                                    <td>{item.title}</td>
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
                            title="Category"
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
        categories: state.categories,
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
            axios.delete('http://localhost:3004/categories/' + item.id, item);
        }
    })
)(withRouter(CaregoriesList));
