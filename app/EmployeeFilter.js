/**
 * Created by Arman on 10/27/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';

class EmployeeFilter extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleChange(event) {
        this.props.filterEmployee(event.target.value)
    };

    render() {

        return (
            <div className="filter">
            <TextField
                hintText="Filter by employee name..."
                onChange={this.handleChange.bind(this)}
            />
            </div>
        );
    }
}

export default EmployeeFilter;