"use strict";

import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class AssetFilter extends Component {
	
	constructor(props, context) {
	    super(props, context);
	    this.state = {
			category_id: 1000
		}
    }

	handleCatChange(event,index, value) {
    	this.setState({
			category_id: value
		});
		this.props.onAssetCategoryChange(value);
  	};

  	onTextChange(event){
  		this.props.filterAsset(event.target.value);
  	}

    render() {
		let categoryList = this.props.categoryList.map(category => {
			return <MenuItem value={category.id}
							 key={category.id}
							 primaryText={category.name} />
		});
		categoryList.splice(0,0,<MenuItem value={1000}
							 key={1000}
							 primaryText={'All'} />)
        return (
			<div className="filter filter-asset">
				<SelectField
					value={this.state.category_id}
					onChange={this.handleCatChange.bind(this)}
					floatingLabelText="Category"
					maxHeight={200}
					className="filter-category" >
					{categoryList}
				</SelectField>
				{' '}
				 <TextField
				      onChange={this.onTextChange.bind(this)}
				      hintText="Filter by asset name"/>
			</div>
        );
    }
};

AssetFilter.propTypes = {
    callBacks: PropTypes.object
};

export default AssetFilter;