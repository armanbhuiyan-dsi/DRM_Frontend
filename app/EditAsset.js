/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React,{Component, PropTypes} from 'react';
import AssetForm from './AssetForm';

class EditAsset extends Component {
    componentWillMount(){
        let context = this;
        let asset = this.props.assetList.filter(asset=>{return asset.id == context.props.params.asset_id});
        this.setState({
            id:asset[0].id,
            name: asset[0].name,
            serialNo: asset[0].serialNo,
            category_id: asset[0].category_id,
            employeeId: asset[0].employees.length>0 ? asset[0].employees[0].id:'',
            employees:asset[0].employees,
            previousEmployeeId:asset[0].employees.length>0 ? asset[0].employees[0].id:-1,
        });
    }

    handleChange(field, value){
        this.setState({[field]: value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.callbacks.editAsset(this.state);
        this.context.router.push('/dashboard');
    }

    handleClose(e){
        this.context.router.push('/dashboard');
    }

    render(){
        return (
            <AssetForm draftValue={this.state}
                          buttonLabel="Edit Asset"
                          model={this.state}
                          handleChange={this.handleChange.bind(this)}
                          handleSubmit={this.handleSubmit.bind(this)}
                          handleClose={this.handleClose.bind(this)} 
                          categoryList={this.props.categoryList}
                          employeeList={this.props.employeeList}/>
        );
    }
}

EditAsset.propTypes = {
    callBacks: PropTypes.object,
};

EditAsset.contextTypes = {
    router: PropTypes.object.isRequired
};

export default EditAsset;