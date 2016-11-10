/**
 * Created by DELL on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class AssetForm extends Component {
    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    handleEmpChange(event, index, value) {
        this.props.handleChange('employeeId', value);
    }

    handleCatChange(event, index, value) {
        this.props.handleChange('category_id', value);
    }
    
    handleClose(e) {
        e.preventDefault();
        this.props.handleClose();
    }

    componentWillMount(){
        
    }
    render() {
        let categoryList = this.props.categoryList.map(category => {
            return <MenuItem value={category.id}
                             key={category.id}
                             primaryText={category.name} />
        });

        let employeeList = this.props.employeeList.map(employee => {
            return <MenuItem value={employee.id}
                             key={employee.id}
                             primaryText={employee.firstName + ' ' + employee.lastName} />
        });

        return (
            <div>
                <div className="form create-edit-form">
                    <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <TextField
                            value={this.props.model.name}
                            hintText="Dell INSPIRON"
                            floatingLabelText="Asset Name"
                            autoFocus={true}
                            required={true}
                            onChange={this.handleChange.bind(this, 'name')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <TextField
                            value={this.props.model.serialNo}
                            hintText="INSPIRON N5110"
                            floatingLabelText="Serial No"
                            required={true}
                            onChange={this.handleChange.bind(this, 'serialNo')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <SelectField
                            value={this.props.model.category_id}
                            onChange={this.handleCatChange.bind(this)}
                            floatingLabelText="Category"
                            maxHeight={200}
                            className="form-input-wrapper create-form" >
                            {categoryList}
                        </SelectField><br/>
                        <SelectField
                            value={this.props.model.employeeId}
                            onChange={this.handleEmpChange.bind(this)}
                            floatingLabelText="Assign to User"
                            maxHeight={200}
                            className="form-input-wrapper create-form" >
                            {employeeList}
                        </SelectField><br/>
                        <RaisedButton
                            label={this.props.buttonLabel}
                            primary={true}
                            type="submit"
                            className="btn-save"
                        />
                        <RaisedButton
                            label="Cancel"
                            secondary={true}
                            className="btn-cancel"
                            onClick={this.handleClose.bind(this)}
                        /><br/>
                    </form>
                </div>
                <div className="overlay" onClick={this.handleClose.bind(this)}>
                </div>
            </div>
        );
    }
}

export default AssetForm;