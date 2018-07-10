import React, { Component } from 'react';
import { Icon, SideNav, Button, Row} from 'react-materialize'
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
import EmployeeUpdate from './EmployeeUpdate'
import AcceptAssetTicket from './AcceptAssetTicket'
import AssetType from './AssetType'
import axios from 'axios';
import { baseUrl } from './config';
import NotFound from './NotFound';
import logo from './LOGO.png'
import './MasterComponent.css'
import $ from 'jquery'
import UpdateAsset from './UpdateAsset';


class MasterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unauth: false,
            redirect: false
        }
    }
    componentDidMount(){
        axios.interceptors.response.use(function(res){
            if(res.status === 401){
              this.setState({
                redirect : true,
                // routes: false
              })
            }
            return res;
        })
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

        // var $a = $('.masterComponentSideBar a').click(function() {
        //     $a.removeClass('selected');
        //     $(this).addClass('selected');
        // })
    }

    render() {
        let menuButton = <Button className="white lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>;
        
        return (
            <React.Fragment>
                <Route path='/unauthorized' component={NotFound} />
                {this.state.redirect? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />
                    :null}
                {this.state.unauth ? <Redirect to="/unauthorized" /> : (
                    <div className="masterComponentBackground">
                        <div>
                            <Row>
                            <div className="white lighten-1 z-depth-2 navbar col s12" style={{ overflow: 'hidden',position: 'fixed', width:'100%', zIndex: 997}}>
                                <a className="logo-wrapper" >
                                    <a href='/admin'><img className="navbarImage" src={logo} alt="WAL Logo" /></a>
                                </a>
                                <div>
                                    <a href="/logout"><Icon className="masterComponentLogoutButton">power_settings_new</Icon></a>
                                </div>
                            </div>
                            </Row>
                            <SideNav className="masterComponentSideBar" trigger={menuButton} options={{ closeOnClick: true }}>
                                <Link className={window.location.pathname === '/admin' ? 'selected' : null} to="/admin">Dashboard</Link>
                                <Link className={window.location.pathname === '/admin/assets' ? 'selected' : null} to="/admin/assets">Assets</Link>
                                <Link className={window.location.pathname === '/admin/assetType' ? 'selected' : null} to="/admin/assetType">Asset Types</Link>
                                <Link className={window.location.pathname === '/admin/consumables' ? 'selected' : null} to="/admin/consumables">Consumables</Link>
                                {/* <Link to="/admin/consumables/history">Consumable History</Link> */}
                                <Link className={window.location.pathname === '/admin/employees' ? 'selected' : null} to="/admin/employees">Employees</Link>
                                <Link className={window.location.pathname === '/admin/tickets' ? 'selected' : null} to="/admin/tickets">Tickets</Link>
                                <Link className={window.location.pathname === '/admin/vendor' ? 'selected' : null} to="/admin/vendor">Vendors</Link>
                            </SideNav>
                        </div>
                        <div>
                            
                            <Route exact path="/admin" component={Admindashboard} />
                            <Route exact path="/admin/consumables" component={Consumables} />
                            <Route exact path="/admin/consumables/history/:consumable" component={HistoryConsumables} />
                            <Route exact path='/admin/consumables/add' component={AddConsumables} />
                            <Route exact path="/admin/consumables/history" component={EntireHistoryConsumables} />
                            <Route exact path="/admin/employees" component={EmployeesList} />
                            <Route exact path='/admin/employees/details/:employee' component={EmployeeHistory} />
                            <Route exact path='/admin/employees/create' component={EmployeeAdd} />
                            <Route exact path='/admin/employees/update' component={EmployeeUpdate} />
                            <Route exact path="/admin/tickets" component={TicketsList} />
                            <Route exact path='/admin/vendor' component={Vendor} />
                            <Route exact path="/admin/assets" component={Assets} />
                            <Route exact path='/admin/assets/history/:asset' component={History} />
                            <Route exact path='/admin/assets/create' component={AddAsset} />
                            <Route exact path='/admin/assets/repair/:asset' component={RepairAsset} />
                            <Route exact path='/employee/RequestTicket' component={Tickets} />
                            <Route exact path='/admin/tickets/asset/accept/:ticket' component={AcceptAssetTicket} />
                            <Route exact path="/admin/assetType" component={AssetType} />
                            <Route exact path="/admin/assets/update" component={UpdateAsset} />
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}



export default MasterComponent;

