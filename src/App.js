import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Auth}></Route>
                {/* <Route exact path="/products" component={ImageHandler}></Route> */}
                {/* <Route exact path="/categories" component={ApiHendler} /> */}
                {/* <Route component={NotFoundPage} /> */}
            </Switch>
        );
    }
}
