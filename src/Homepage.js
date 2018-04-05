import React, {Component} from 'react'
import {Navbar, NavItem, Icon, SideNav, Button} from 'react-materialize'
import './MasterComponent.css';
import Assets from './Assets';
import Consumables from './Consumables';
import EmployeesList from './Employees';
import TicketsList from './TicketsList';
import HistoryConsumables from './HistoryConsumables';
import Admindashboard from './Admindashboard'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import EmployeeHistory from './EmployeeHistory';
import Vendor from './Vendor'
import History from './History'
import AddAsset from './AddAsset'
import RepairAsset from './RepairAsset'

import LoginForm from './LoginForm';

class Homepage extends Component{
    render(){
        return(
            <Router>
            <div>
                <div className="masterComponentBackground">
                <div>
                    <Navbar>
                        <NavItem href="/" className="masterComponentLogoutButton">LOGOUT</NavItem>
                    </Navbar>
                    <SideNav className="masterComponentSideBar" trigger={<Button className="red btn-flat lighten-2 masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to="/adminhomepage">Dashboard</Link>
                    <Link to="/adminhomepage/assets">Assets</Link>
                    <Link to="/adminhomepage/consumables">Consumables</Link>
                    <Link to="/adminhomepage/employees">Employees</Link>
                    <Link to="/adminhomepage/tickets">Tickets</Link>
                    <Link to="/adminhomepage/vendor">Vendor</Link>
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/adminhomepage" component={Admindashboard} />
                    <Route exact path="/adminhomepage/assets" component={Assets} />
                    <Route exact path="/adminhomepage/consumables" component={Consumables} />
                    <Route exact path="/adminhomepage/employees" component={EmployeesList} />
                    <Route exact path="/adminhomepage/tickets" component={TicketsList} />
                    <Route exact path="/adminhomepage/consumables/history" component={HistoryConsumables}/>
                    <Route  exact path ='/adminhomepage/employees/history' component={EmployeeHistory}/>
                    <Route  exact path ='/adminhomepage/vendor' component={Vendor}/>
                    <Route  exact path ='/adminhomepage/assets/history' component={History}/>
                    <Route  exact path ='/adminhomepage/assets/create' component={AddAsset}/>
                    <Route  exact path ='/adminhomepage/assets/repair' component={RepairAsset}/>
                    
                </div>
                </div>
                <Route  path ='/login' component={LoginForm}/>
                
                
            </div>
            </Router>
        )
    }
}


export default Homepage