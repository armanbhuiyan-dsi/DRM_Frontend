/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Preview from 'material-ui/svg-icons/image/remove-red-eye';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ActionIco from './ActionIco';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

class EmployeeList extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            open: false,
            assetList: []
        };
    }

    handleTouchTap (assetList, open) {
        this.setState({
            assetList,
            open,
            anchorEl: arguments[2].target
        });
    }

    handleRequestClose (open) {
        this.setState({
            open
        });
    }

    renderEditEmployee(employeeId) {
        this.context.router.push('/edit/employee/' + employeeId);
    }

    render() {
        let tableData = this.props.employeeList;
        let context = this;
        
        if(this.props.employeeFilterText !=''){
            tableData =  this.props.employeeList.filter(function(employee){
                let fullName = employee.firstName+ " " + employee.lastName+" "+employee.nickName;
                return fullName.indexOf(context.props.employeeFilterText) !== -1;
            });
        }
        
        return (
            <div className="dataTable">
            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll ={false} className="table-header">
                    <TableRow>
                        <TableHeaderColumn colSpan="8" tooltip="Employee Data" style={{textAlign: 'center'}}>
                            Employee Data
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip="First Name">First Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Last Name">Last Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Nick Name">Nick Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Phone">Phone</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Assets">Assets</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} className="table-body">
                    {tableData.map( (employee, index) => (
                        <TableRow key={index} selected={employee.selected}>
                            <TableRowColumn>{index + 1}</TableRowColumn>
                            <TableRowColumn>{employee.firstName}</TableRowColumn>
                            <TableRowColumn>{employee.lastName}</TableRowColumn>
                            <TableRowColumn>{employee.nickName}</TableRowColumn>
                            <TableRowColumn>{employee.phone}</TableRowColumn>
                            <TableRowColumn>{employee.email}</TableRowColumn>
                            <TableRowColumn>
                                <Preview
                                    onTouchTap={this.handleTouchTap.bind(this, employee.assets, true)}
                                    label="Click me"
                                    className="preview"
                                />
                             </TableRowColumn>
                            <TableRowColumn>
                                <IconMenu
                                    iconButtonElement={<IconButton><ActionIco /></IconButton>}
                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    className="action-icon" >
                                    <MenuItem primaryText="Edit" onClick={this.renderEditEmployee.bind(this, employee.id)}/>
                                    <MenuItem primaryText="Remove" onClick={this.props.showRemoveAlert.bind(null, employee, index)}></MenuItem>
                                </IconMenu>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this, false)}
                >
                    <List>
                        {
                            this.state.assetList.length ? this.state.assetList.map((asset,index)=>(<ListItem key={index}  primaryText={asset.name} />)) :(<ListItem key={0}  primaryText="No Asset Data Found!" />)
                        }
                    </List>
                </Popover>
            </div>
        );
    }
}

EmployeeList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default EmployeeList;