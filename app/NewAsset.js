/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React,{Component, PropTypes} from 'react';
import AssetForm from './AssetForm';

class NewAsset extends Component {
    componentWillMount() {
        this.setState({
            name: '',
            serialNo: '',
            category_id: '',
            employeeId: ''
        });
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.callbacks.addAsset(this.state);
        this.context.router.push('/dashboard');
    }

    handleClose(e) {
        this.context.router.push('/dashboard');
    }

    render() {
        return (
            <AssetForm    model={this.state}
                          categoryList={this.props.categoryList}
                          employeeList={this.props.employeeList}
                          buttonLabel="Create Asset"
                          handleChange={this.handleChange.bind(this)}
                          handleSubmit={this.handleSubmit.bind(this)}
                          handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewAsset.propTypes = {
    callBacks: PropTypes.object
};

NewAsset.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NewAsset;