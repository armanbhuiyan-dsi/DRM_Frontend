/**
 * Created by Arman on 10/3/2016.
 */
"use strict";

import React, { Component } from 'react';
import {throttle} from './utils';
import 'whatwg-fetch';
import 'babel-polyfill';
import update from 'react-addons-update';
import MainComponent from './MainComponent';

const API_URL = 'http://127.0.0.1:3000';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'any-string-you-like'// The Authorization is not needed for local server
};

class AppContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            employeeList: [],
            categoryList: [],
            assetList: []
        };
    }

    componentDidMount() {
        this.fetchEmployeeList();
        this.fetchAssetList();
        this.fetchCategoryList();
    }

    showConfirmation(message) {
        this.props.callbacks.showSnackbar(message);
    }

    fetchEmployeeList() {
        fetch(`${API_URL}/employee`, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({employeeList: responseData});
                window.state = this.state;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    fetchAssetList() {
        fetch(`${API_URL}/asset`, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({assetList: responseData});
                window.state = this.state;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    fetchCategoryList() {
        fetch(`${API_URL}/category`, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({categoryList: responseData});
                window.state = this.state;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    addAsset(asset) {
        let prevState = this.state;
        let assignedToIndex = -1;
        asset['employees'] = [];

        if(asset.employeeId){
            let newEmployee = this.state.employeeList.filter((employee,index)=>{
                if(employee.id == asset.employeeId){
                    assignedToIndex = index;
                    return true;
                }
            });
            asset.employees[0]=newEmployee[0];
            asset.employeeChanged = true;
            asset.available=false;
            let nextEmployeeState = update(this.state.employeeList, {
                                                [assignedToIndex]: { assets: {$push:[asset]} }
                                           });
            this.setState({employeeList: nextEmployeeState});
        }

        let nextState = update(this.state.assetList, { $push: [asset] });
        this.setState({assetList: nextState});
        
        fetch(`${API_URL}/asset`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(asset)
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Server response wasn't OK")
            }
        })
        .then((responseData) => {
            
            asset.id = responseData.id;
            if(!asset.employeeId) asset.available=true;
            this.setState({assetList: nextState});
            this.showConfirmation('Asset has been added successfully.');
        })
        .catch((error) => {
            this.setState(prevState);
            this.showConfirmation("Asset couldn't be added.");
        });
    }
    
    addEmployee(employee) {
        let prevState = this.state;
        let nextAssetListState =[];
        let assignedAssets =[];
        employee['assets'] = [];
        
        if(employee.assetId.length>0){
            nextAssetListState = this.state.assetList.map(asset=>{
                if(employee.assetId.indexOf(asset.id)>-1)  {
                    assignedAssets.push(asset);
                    asset["employees"][0] = employee;
                    asset.available = false;
                }
                return asset;
            });
            this.setState({assetList:nextAssetListState});
        }
        employee['assets'] = assignedAssets;
        
        let nextState = update(this.state.employeeList, { $push: [employee] });
        this.setState({employeeList:nextState});
        let employeeCopy = Object.assign({}, employee);
        employeeCopy.assets = Object.assign({}, employee.assets);    
        delete employeeCopy.assets;

        fetch(`${API_URL}/employee`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(employeeCopy)
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Server response wasn't OK")
            }
        })
        .then((responseData) => {
            employee.id = responseData.id;
            this.setState({employeeList:nextState});
            this.showConfirmation('Employee has been added successfully.');
        })
        .catch((error) => {
            this.setState(prevState);
            this.showConfirmation("Employee couldn't be added.");
        });
    }

    editEmployee(employee) {
        let prevState = this.state;
        let employeeIndex = this.state.employeeList.findIndex((p)=>p.employee_id == employee.employee_id);
        let previousAssets = [];
        let removedAssets = [];
        if(employee.employeeAssets.length>0) 
            previousAssets = employee.employeeAssets.map(asset=>{return asset.id});
 
        if(previousAssets.sort().join(',') !== employee.assetId.sort().join(',')){
            //update asset status
            let nextAssetListState =[];
            let assignedAssets =[];

            nextAssetListState = this.state.assetList.map(asset=>{
                    if(employee.assetId.indexOf(asset.id)>-1)  {
                        assignedAssets.push(asset);
                        asset["employees"][0] = employee;
                        asset.available = false;
                    }else if(previousAssets.indexOf(asset.id)>-1 ){
                        removedAssets.push(asset.id);
                        asset.available = true;
                        asset["employees"] =[];
                    }
                    return asset;
            });
            this.setState({assetList:nextAssetListState});

            employee['assets'] = assignedAssets;
            employee['assetsUpdated'] = true;
        }else{
            employee['assets'] = employee.employeeAssets;
        }


        let nextState = update(
            this.state.employeeList, {
                [employeeIndex]: { $set: employee }
            });
        this.setState({employeeList:nextState});
        employee["removedAssets"] = removedAssets;

        let employeeCopy = Object.assign({}, employee);
        employeeCopy.assets = Object.assign({}, employee.assets);
        employeeCopy.employeeAssets = Object.assign({}, employee.employeeAssets);    
        delete employeeCopy.assets;
        delete employeeCopy.employeeAssets;

        fetch(`${API_URL}/employee/update`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(employeeCopy)
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Server response wasn't OK")
            }
        })
        .then((responseData) => {
            this.setState({employeeList:nextState});
            this.showConfirmation('Employee successfully updated.');
        })
        .catch((error) => {
            console.error("Update error:",error);
            this.setState(prevState);
            this.showConfirmation("Employee couldn't be updated.");
        });
    }

    removeEmployee(employee) {
        let prevState = this.state;
        let employeeIndex = this.state.employeeList.findIndex((p)=>p.employee_id == employee.employee_id);
        let nextState = update(this.state.employeeList, { $splice: [[employeeIndex,1]] });
        this.setState({employeeList: nextState});

        if(employee.assets.length>0){
            let employeeAssets = employee.assets.map(asset=>{return asset.id});
            let nextAssetListState = this.state.assetList.map(asset=>{
                        if(employeeAssets.indexOf(asset.id)>-1 ){
                            asset.available = true;
                            asset["employees"] =[];
                        }
                        return asset;
                    });
            this.setState({assetList:nextAssetListState});
            employee["assetIds"] = employeeAssets;
        } 
            
        fetch(`${API_URL}/employee/remove`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(employee)
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Server response wasn't OK");
            }
        })
        .then((responseData) => {
            this.setState({employeeList:nextState});
            this.showConfirmation('Employee removed.');
        })
        .catch((error) => {
            this.setState(prevState);
            this.showConfirmation("Employee couldn't be removed.");
        });
    }

    editAsset(asset) {
        let prevState = this.state;
        let assignedToIndex = -1;
        let assetIndex = this.state.assetList.findIndex((p)=>p.id == asset.id);
        
        if(asset.employeeId){
            let newEmployee = this.state.employeeList.filter((employee,index)=>{
                assignedToIndex = index;
                return employee.id == asset.employeeId
            });
            asset.employees[0]=newEmployee[0];
            if(asset.previousEmployeeId != newEmployee[0].id){
                asset.employeeChanged = true;
                let assetCopy = Object.assign({}, asset);
                assetCopy.employees = Object.assign({}, assetCopy.employees);
                delete assetCopy.employees;
                let nextEmployeeState = update(this.state.employeeList, {[assignedToIndex]: { assets: {$push:[assetCopy]} }});
                this.setState({employeeList: nextEmployeeState});
            }
            asset.available=false;
        }
        
        let nextState = update(
            this.state.assetList, {
                [assetIndex]: { $set: asset }
            });
        this.setState({assetList:nextState});
        fetch(`${API_URL}/asset/update`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(asset)
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Server response wasn't OK");
            }
        }).then((responseData) => {
            this.setState({assetList:nextState});
            this.showConfirmation('Asset successfully updated.');
        })
        .catch((error) => {
            console.error("Fetch error:",error);
            this.setState(prevState);
            this.showConfirmation("Asset couldn't be updated.");
        });
    }

    removeAsset(asset) {
        let prevState = this.state;
        let assetIndex = this.state.assetList.findIndex((p)=>p.id == asset.id);
        
        let nextState = update(this.state.assetList, {$splice: [[assetIndex, 1]]});
        this.setState({assetList: nextState});
        
        if(asset.employees.length>0){
            let employeeIndex = this.state.employeeList.findIndex((p)=>p.id == asset.employees[0].id);
            let employee = this.state.employeeList.filter(employee=>{return employee.id == asset.employees[0].id });
            let employeeAssetIndex = employee[0].assets.findIndex((p)=>p.id == asset.id);

            employee[0].assets.splice(employeeAssetIndex, 1);
            
            let nextEmployeeListState =  update(this.state.employeeList, {[employeeIndex]: { $set: employee[0] }});
            this.setState({employeeList: nextEmployeeListState});
            asset["employeeId"] = employee[0].id;
        }

        fetch(`${API_URL}/asset/remove`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(asset)
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Server response wasn't OK");
            }
        })
        .then((responseData) => {
            this.setState({assetList:nextState});
            this.showConfirmation('Asset successfully removed.');
        })
        .catch((error) => {
            this.setState(prevState);
            this.showConfirmation("Asset couldn't be removed.");
        });
    }

    filterAsset(text){
        this.setState({assetFilterText: text});
    }

    render() {
        let childModal = this.props.children && React.cloneElement(this.props.children, {
                assetList: this.state.assetList,
                categoryList: this.state.categoryList,
                employeeList: this.state.employeeList,
                callbacks: {
                    addAsset: this.addAsset.bind(this),
                    editAsset:this.editAsset.bind(this),
                    addEmployee: this.addEmployee.bind(this),
                    editEmployee: this.editEmployee.bind(this)
                }
            });

        return (
            <div className="main-component">
                <MainComponent
                    employeeList={this.state.employeeList}
                    assetList={this.state.assetList}
                    assetFilterText ={this.state.assetFilterText}
                    assetCategory={this.state.assetCategory}
                    categoryList={this.state.categoryList}
                    assetCategoryID={this.state.assetCategoryID}
                    callbacks={{
                        removeEmployee: this.removeEmployee.bind(this),
                        removeAsset: this.removeAsset.bind(this)
                    }}
                />
                {childModal}
            </div>
        );
    }
}

export default AppContainer;