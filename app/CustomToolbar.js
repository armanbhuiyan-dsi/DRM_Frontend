/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class CustomToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    renderCreateEmployee() {
        this.context.router.push('/create/employee');
    }

    renderCreateAsset() {
        this.context.router.push('/create/asset');
    }

    goTo() {
        this.context.router.push('/');
    }

    handleChange(event, index, value){
        this.setState({value});
    }

    render() {
        return (
            <div className="toolbar custom-toolbar">
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconMenu
                            iconButtonElement={<FloatingActionButton mini={true}><ContentAdd /></FloatingActionButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            className="action-add" >
                            <MenuItem primaryText="Create Asset" onClick={this.renderCreateAsset.bind(this)}/>
                            <MenuItem primaryText="Create Employee" onClick={this.renderCreateEmployee.bind(this)}/>
                        </IconMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarSeparator />
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <MenuItem primaryText="Settings" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" onClick={this.goTo.bind(this)}/>
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

CustomToolbar.contextTypes = {
    router: PropTypes.object.isRequired
};

export default CustomToolbar;