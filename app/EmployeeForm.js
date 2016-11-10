/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';

class EmployeeForm extends Component {
    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    handleAssetChange(event, index, value) {
        this.props.handleChange('assetId', value);
    }

    handleClose(e) {
        e.preventDefault();
        this.props.handleClose();
    }
    handleSelect(arr) {
        this.props.handleSelect(arr);
    }

    render() {
        let availableAssets = this.props.assetList.filter(asset =>{
                return asset.available == true;
        });
        if(this.props.model.employeeAssets){
            availableAssets = availableAssets.concat(this.props.model.employeeAssets);   
        }
        let assetList = availableAssets.map(asset => ({ value: asset.id, label: asset.name }));
        
        return (
            <div>
                <div className="form create-edit-form">
                    <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <TextField
                            value={this.props.model.firstName}
                            hintText="John"
                            floatingLabelText="First Name"
                            autoFocus={true}
                            required={true}
                            onChange={this.handleChange.bind(this, 'firstName')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <TextField
                            value={this.props.model.lastName}
                            hintText="Doe"
                            floatingLabelText="Last Name"
                            required={true}
                            onChange={this.handleChange.bind(this, 'lastName')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <TextField
                            value={this.props.model.nickName}
                            hintText="John"
                            floatingLabelText="Nick Name"
                            required={true}
                            onChange={this.handleChange.bind(this, 'nickName')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <TextField
                            value={this.props.model.phone}
                            hintText="+8801736..."
                            floatingLabelText="Phone Number"
                            required={true}
                            onChange={this.handleChange.bind(this, 'phone')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <TextField
                            value={this.props.model.email}
                            hintText="john@doe.com"
                            floatingLabelText="Email Address"
                            required={true}
                            onChange={this.handleChange.bind(this, 'email')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <TextField
                            value={this.props.model.designation}
                            hintText="SQA"
                            floatingLabelText="Designation"
                            required={true}
                            onChange={this.handleChange.bind(this, 'designation')}
                            className="form-input-wrapper create-form"
                        /><br/>
                        <Select
                            name="form-field-name"
                            value={this.props.model.assetId}
                            multi={true}
                            options={assetList}
                            onChange={this.handleSelect.bind(this)}
                            className="form-input-wrapper create-form"
                            placeholder="Assign Asset"
                        /><br/>
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

export default EmployeeForm;