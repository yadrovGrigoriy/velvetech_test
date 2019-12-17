import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Products from './components/Products';
import Product from './components/Products/Product';
import Categories from './components/Categories';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Auth}></Route>
                <PrivateRoute exact path="/products" component={Products}></PrivateRoute>
                <PrivateRoute exact path="/product/:id" component={Product}></PrivateRoute>
                <PrivateRoute exact path="/categories" component={Categories} />
            </Switch>
        );
    }
}
