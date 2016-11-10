/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';

class Logo extends Component {
    render() {
        return (
            <Paper className="app-logo-wrapper" zDepth={0}>
                <img src="./images/dsi.jpg" height="60" width="130"/>
            </Paper>
        );
    }
};

export default Logo;