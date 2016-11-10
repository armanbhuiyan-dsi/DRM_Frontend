/**
 * Created by Arman on 10/25/2016.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ActionIco from './ActionIco';
import MenuItem from 'material-ui/MenuItem';

class AssetList extends Component {
    releaseAsset(asset){
        //console.log(asset);
        //this.props.callbacks.releaseAsset(asset);
    }

    renderEditAsset(assetId) {
        this.context.router.push('/edit/asset/' + assetId);
    }

    render() {
        let tableData = this.props.assetList;
        let context = this;
        
        if(this.props.assetCategoryID!=1000)
            tableData =  this.props.assetList.filter(function(asset){
                return asset.category_id == context.props.assetCategoryID ;
            });

        if(this.props.assetFilterText !=''){
            tableData =  tableData.filter(function(asset){
                return asset.name.indexOf(context.props.assetFilterText) !== -1;
            });
        }
        
        return (
            <div className="dataTable">
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll ={false} className="table-header">
                        <TableRow>
                            <TableHeaderColumn colSpan="6" tooltip="Asset Data" style={{textAlign: 'center'}}>
                                Asset Data
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Serial No">Serial No</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Available">Available</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Assigned To">Assigned To</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} className="table-body">
                        {tableData.map( (asset, index) => (
                            <TableRow key={index} selected={asset.selected}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>{asset.name}</TableRowColumn>
                                <TableRowColumn>{asset.serialNo}</TableRowColumn>
                                <TableRowColumn>{asset.available || asset.available == undefined?'Yes':'No'}</TableRowColumn>
                                <TableRowColumn>{
                                    asset.employees.length ?
                                    <span>{asset.employees[0].firstName+' '+asset.employees[0].lastName} </span>
                                    :
                                    <span>None</span>
                                } 
                                </TableRowColumn>
                                <TableRowColumn>
                                    <IconMenu
                                        iconButtonElement={<IconButton><ActionIco /></IconButton>}
                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        className="action-icon" >
                                        <MenuItem primaryText="Edit" onClick={this.renderEditAsset.bind(this, asset.id)}/>
                                        <MenuItem primaryText="Remove" onClick={this.props.showRemoveAlert.bind(null, asset, index)}></MenuItem>
                                    </IconMenu>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

AssetList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default AssetList