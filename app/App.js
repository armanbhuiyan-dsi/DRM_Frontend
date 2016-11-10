/**
 * Created by Arman on 10/25/2016.
 */
"use strict";

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginContainer from './LoginContainer';
import AppContainer from './AppContainer';
import NewEmployee from './NewEmployee';
import NewAsset from './NewAsset';
import EditEmployee from './EditEmployee';
import EditAsset from './EditAsset';
import Dashboard from './Dashboard';

injectTapEventPlugin();
render((
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={LoginContainer} />
            <Route path="/dashboard" component={Dashboard}>
                <IndexRoute component={AppContainer} />
                <Route component={AppContainer}>
                    <Route path="/create/employee" component={NewEmployee} />
                    <Route path="/create/asset" component={NewAsset} />
                    <Route path="/edit/employee/:employee_id" component={EditEmployee} />
                    <Route path="/edit/asset/:asset_id" component={EditAsset} />
                </Route>
            </Route>
        </Router>
    </MuiThemeProvider>
), document.getElementById('root'));