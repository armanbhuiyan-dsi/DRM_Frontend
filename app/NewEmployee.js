/**
 * Created by Arman on 10/25/2016.
 */
"use strict";
import React,{Component, PropTypes} from 'react';
import EmployeeForm from './EmployeeForm';

class NewEmployee extends Component {
    componentWillMount() {
        this.setState({
            firstName: '',
            lastName: '',
            nickName: '',
            phone: '',
            email: '',
            designation: '',
            assetId: []
        });
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSelect(arr) {
        var options = arr.map((obj) => obj.value);
        this.setState({assetId: options});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.callbacks.addEmployee(this.state);
        this.context.router.push('/dashboard');
    }

    handleClose(e) {
        this.context.router.push('/dashboard');
    }

    render() {
        return (
            <EmployeeForm model={this.state}
                          assetList={this.props.assetList}
                          buttonLabel="Create Employee"
                          handleChange={this.handleChange.bind(this)}
                          handleSelect={this.handleSelect.bind(this)}
                          handleSubmit={this.handleSubmit.bind(this)}
                          handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewEmployee.propTypes = {
    callBacks: PropTypes.object
};

NewEmployee.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NewEmployee;