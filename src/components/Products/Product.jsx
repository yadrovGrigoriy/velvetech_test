import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class Product extends Component {
    render() {
        const { id } = this.props.match.params;
        const product = this.props.products.find(product => product.id === parseInt(id));
        return (
            <div className="product">
                <Container>
                    <Card>
                        <Card.Header>Featured</Card.Header>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            {product && (
                                <div>
                                    <p> Title: {product.title}</p>
                                    <p> Price: {product.price}</p>
                                    <p>Shelf Life Date: {new Date(product.shelfLife).toLocaleDateString()}</p>
                                    <p> Category:{product.category}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default connect(
    state => ({
        products: state.products
    }),
    dispatch => ({
        findById: id => {}
    })
)(Product);
