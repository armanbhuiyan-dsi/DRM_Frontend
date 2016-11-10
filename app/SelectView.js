"use strict";

import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectView extends Component {

  	handleChange(event, index, value) {
		this.props.handleViewChange(value);
  	};

    render() {
        return (
        	 <div className="select-view emp-asset-selector">
               <SelectField
		          value={this.props.model.view}
		          onChange={this.handleChange.bind(this)}
		          className="select-view" >
		          <MenuItem key={1} value="asset" primaryText="Asset" />
		          <MenuItem key={2} value="employee" primaryText="Employee" />
		        </SelectField>
		      </div>
        );
    }
}

export default SelectView;