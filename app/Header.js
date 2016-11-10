/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';

class Header extends Component {
    render() {
        return (
            <Paper className="header-wrapper" zDepth={2}>
                <h1>DSi Resource Management System.</h1>
            </Paper>
        );
    }
};

export default Header;