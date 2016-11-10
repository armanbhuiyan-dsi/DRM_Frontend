/**
 * Created by Arman on 10/25/2016.
 */
"use strict";
import React,{Component, PropTypes} from 'react';
import EmployeeForm from './EmployeeForm';

class EditEmployee extends Component {
    componentWillMount(){
        
        let context = this;
        let employee = this.props.employeeList.filter(employee=>{return employee.id == context.props.params.employee_id});
        let assetIds = employee[0].assets.map(asset=>{return asset.id});
        
        this.setState({
            id : employee[0].id,
            firstName: employee[0].firstName,
            lastName: employee[0].lastName,
            nickName: employee[0].nickName,
            phone: employee[0].phone,
            email: employee[0].email,
            designation: employee[0].designation,
            assetId: assetIds,
            employeeAssets : employee[0].assets
        });
    }

    handleChange(field, value){
        this.setState({[field]: value});
    }

    handleSelect(arr) {
        var options = arr.map((obj) => obj.value);
        this.setState({assetId: options});
    }

   handleSubmit(e) {
        e.preventDefault();
        this.props.callbacks.editEmployee(this.state);
        this.context.router.push('/dashboard');
    }

    handleClose(e){
        this.context.router.push('/dashboard');
    }

    render(){
        return (
            <EmployeeForm draftValue={this.state}
                     buttonLabel="Edit Employee"
                     handleChange={this.handleChange.bind(this)}
                     model={this.state}
                     handleSelect={this.handleSelect.bind(this)}
                     handleSubmit={this.handleSubmit.bind(this)}
                     handleClose={this.handleClose.bind(this)}
                     assetList={this.props.assetList} />
        );
    }
}

EditEmployee.propTypes = {
    callBacks: PropTypes.object,
};

EditEmployee.contextTypes = {
    router: PropTypes.object.isRequired
};

export default EditEmployee;