/**
 * Created by Arman on 11/10/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';

class ActionIco extends Component {
    render() {
        return (
            <Paper className="app-logo-wrapper" zDepth={0}>
                <img src="./images/action.png" height="20" width="20"/>
            </Paper>
        );
    }
};

export default ActionIco;