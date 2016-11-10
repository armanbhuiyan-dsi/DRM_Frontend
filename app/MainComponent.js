"use strict";

import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectView from './SelectView';
import AssetList from './AssetList';
import EmployeeList from './EmployeeList';
import AssetFilter from './AssetFilter';
import EmployeeFilter from './EmployeeFilter';

const customContentStyle = {
    width: '35%',
    maxWidth: 'none'
};

class MainComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            view: 'asset',
            assetCategoryID:1000,
            assetFilterText:'',
            employeFilterText:'',
            alertOpen:false,
            itemToRemove:null   
        }
    }

    handleViewChange(view) {
        this.setState({view});
    };

    onAssetCategoryChange(categoryId){
        this.setState({assetCategoryID: categoryId});
    }

    filterAsset(text){
        this.setState({assetFilterText: text});
    }

    filterEmployee(text){
        this.setState({employeFilterText: text});
    }
    
    showAlert(item){
        this.state.itemToRemove = item;
        this.setState({alertOpen: true});
    }

    removeAsset(){
        this.props.callbacks.removeAsset(this.state.itemToRemove);
        this.setState({alertOpen: false});
    }

    removeEmployee(){
        this.props.callbacks.removeEmployee(this.state.itemToRemove);
        this.setState({alertOpen: false});
    }

    discardAlert(){
        this.state.itemToRemove = null;
        this.setState({alertOpen: false});
    }

    render() {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.discardAlert.bind(this)}
          />,
          <FlatButton
            label="Yes"
            primary={true}
            onTouchTap={this.state.view === 'asset'? this.removeAsset.bind(this):this.removeEmployee.bind(this)}
          />,
        ];
        return (
            <Paper zDepth={5} className="component-holder">
                <SelectView handleViewChange={this.handleViewChange.bind(this)} model={this.state} />
                {
                    this.state.view === 'asset' ?
                        <div className="asset-view">
                            <AssetFilter
                                categoryList={this.props.categoryList}
                                filterAsset={this.filterAsset.bind(this)}
                                onAssetCategoryChange = {this.onAssetCategoryChange.bind(this)}
                            />
                            <AssetList
                                assetList={this.props.assetList}
                                assetFilterText = {this.state.assetFilterText}
                                assetCategoryID={this.state.assetCategoryID}
                                showRemoveAlert={this.showAlert.bind(this)}
                                callbacks={this.props.callbacks}
                            />
                        </div>
                        :
                        <div className="employee-view">
                            <EmployeeFilter
                                filterEmployee={this.filterEmployee.bind(this)}
                            />
                            <EmployeeList
                                employeeList={this.props.employeeList}
                                employeeFilterText = {this.state.employeFilterText}
                                showRemoveAlert={this.showAlert.bind(this)}
                                callbacks={this.props.callbacks}
                            />
                        </div>
                }
                <Dialog
                    className="alert-dialog"
                    actions={actions}
                    contentStyle={customContentStyle}
                    modal={true}
                    open={this.state.alertOpen}
                    onRequestClose={this.discardAlert.bind(this)}>
                Are you sure you want to remove this?
                </Dialog>
            </Paper>
        );
    }
}

export default MainComponent;