/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <LoginForm
                    loginCallBacks={this.props.loginCallBacks}
                />
            </div>
        );
    }
};

export default LoginPage;