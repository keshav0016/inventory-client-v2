import React, { Component } from 'react';
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
    Route, Redirect,
    Link
} from 'react-router-dom';
import EmployeeHistory from './EmployeeHistory';
import Vendor from './Vendor'
import History from './History'
import AddAsset from './AddAsset'
import RepairAsset from './RepairAsset'
import Tickets from './Tickets'
import EmployeeAdd from './EmployeeAdd';
import AcceptAssetTicket from './AcceptAssetTicket'
import AssetType from './AssetType'
import axios from 'axios';
import { baseUrl } from './config';
import NotFound from './NotFound';
import logo from './LOGO.png'

class MasterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unauth: false,
        }
    }
    componentDidMount(){
        axios({
            method : 'get',
            url : `${baseUrl}/admin/ticket/dashboard`,
            withCredentials : true
        })
        .catch(error=>{
            this.setState({
                unauth: error.response.status === 401 || error.response.status === 403
            })
        })
    }
    render() {
        let menuButton = <Button className="white lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>;
        
        return (
            <React.Fragment>
                <Route path='/unauthorized' component={NotFound} />
                
                {this.state.unauth ? <Redirect to="/unauthorized" /> : (
                    <div className="masterComponentBackground">
                        <div>
                            <Navbar fixed className="white lighten-1" style={{ overflow: 'hidden' }}>
                                <NavItem className='logo' href="/admin">
                                    <img style={{ height: '64px', width: '64px', marginLeft: '65px' }} src={logo} alt="WAL Logo" />
                                </NavItem>
                                <NavItem href="/logout" className="masterComponentLogoutButton" style={{ fontFamily: 'Roboto', fontWeight: 400 }}><b>LOGOUT</b></NavItem>

                            </Navbar>
                            <SideNav className="masterComponentSideBar" trigger={menuButton} options={{ closeOnClick: true }}>
                                <Link to="/admin">Dashboard</Link>
                                <Link to="/admin/assets">Assets</Link>
                                <Link to="/admin/assetType">Asset Types</Link>
                                <Link to="/admin/consumables">Consumables</Link>
                                <Link to="/admin/consumables/history">Consumable History</Link>
                                <Link to="/admin/employees">Employees</Link>
                                <Link to="/admin/tickets">Tickets</Link>
                                <Link to="/admin/vendor">Vendor</Link>
                            </SideNav>
                        </div>
                        <div>
                            
                            <Route exact path="/admin" component={Admindashboard} />
                            <Route exact path="/admin/assets" component={Assets} />
                            <Route exact path="/admin/consumables" component={Consumables} />
                            <Route exact path="/admin/employees" component={EmployeesList} />
                            <Route exact path="/admin/tickets" component={TicketsList} />
                            <Route exact path="/admin/consumables/history/:consumable" component={HistoryConsumables} />
                            <Route exact path='/admin/consumables/add' component={AddConsumables} />
                            <Route exact path='/admin/employees/details/:employee' component={EmployeeHistory} />
                            <Route exact path='/admin/vendor' component={Vendor} />
                            <Route exact path='/admin/assets/history/:asset' component={History} />
                            <Route exact path='/admin/assets/create' component={AddAsset} />
                            <Route exact path='/admin/assets/repair/:asset' component={RepairAsset} />
                            <Route exact path='/employee/RequestTicket' component={Tickets} />
                            <Route exact path='/admin/employees/create' component={EmployeeAdd} />
                            <Route exact path='/admin/tickets/asset/accept/:ticket' component={AcceptAssetTicket} />
                            <Route exact path="/admin/consumables/history" component={EntireHistoryConsumables} />
                            <Route exact path="/admin/assetType" component={AssetType} />
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}



export default MasterComponent;

