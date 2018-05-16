import React, { Component } from 'react'
import { Navbar, NavItem, Icon, SideNav, Button } from 'react-materialize'
import './MasterComponent.css';
import Assets from './Assets';
import Consumables from './Consumables';
import EmployeesList from './Employees';
import TicketsList from './TicketsList';
import HistoryConsumables from './HistoryConsumables';
import Admindashboard from './Admindashboard';
import AddConsumables from './AddConsumables';
import EntireHistoryConsumables from './EntireHistoryConsumables'
import {
    BrowserRouter as Router,
    Route,
    Link, Redirect
} from 'react-router-dom';
import EmployeeHistory from './EmployeeHistory';
import Vendor from './Vendor'
import History from './History'
import AddAsset from './AddAsset'
import RepairAsset from './RepairAsset'
import Tickets from './Tickets'
import LoginForm from './LoginForm';
import EmployeeAdd from './EmployeeAdd';
import AcceptAssetTicket from './AcceptAssetTicket'
import AssetType from './AssetType'
import MasterComponent from './MasterComponent';
import { parse as parseCookie } from 'cookie'

class Homepage extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ProtectedRoute/>
                    <Route exact path='/login' component={LoginForm} />

                </div>
            </Router>
        )
    }
}

class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let ck = parseCookie(document.cookie);
        return (
            <Route
                render={props =>
                    ck.token ? (
                        <MasterComponent/>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                }}
                            />
                        )
                }
            />
        );
    }
}



export default Homepage