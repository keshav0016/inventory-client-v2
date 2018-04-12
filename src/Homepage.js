import React, {Component} from 'react'
import {Navbar, NavItem, Icon, SideNav, Button} from 'react-materialize'
import './MasterComponent.css';
import Assets from './Assets';
import Consumables from './Consumables';
import EmployeesList from './Employees';
import TicketsList from './TicketsList';
import HistoryConsumables from './HistoryConsumables';
import Admindashboard from './Admindashboard';
import AddConsumables from './AddConsumables';
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
import Tickets from './Tickets'
import LoginForm from './LoginForm';
import EmployeeAdd from './EmployeeAdd';

class Homepage extends Component{
    render(){
        return(
            <Router>
            <div>
                <div className="masterComponentBackground">
                <div>
                    <Navbar className="teal lighten-1">
                        <NavItem ><img width="60px" height="60px" style={{marginLeft : '70px', marginTop : '2px'}} src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/202930-f19ff2e90358dfd16343b9dbe24c31d4-medium_jpg.jpg?buster=1457063274" alt="WAL Logo" /></NavItem>                        
                        <NavItem href="/" className="masterComponentLogoutButton"><b>LOGOUT</b></NavItem>
                    </Navbar>
                    <SideNav className="masterComponentSideBar" trigger={<Button className="teal lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/assets">Assets</Link>
                    <Link to="/admin/consumables">Consumables</Link>
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
                    <Route exact path="/admin/consumables/history/:consumable" component={HistoryConsumables}/>
                    <Route exact path ='/admin/consumables/add' component={AddConsumables}/>
                    <Route  exact path ='/admin/employees/details/:employee' component={EmployeeHistory}/>
                    <Route  exact path ='/admin/vendor' component={Vendor}/>
                    <Route  exact path ='/admin/assets/history/:asset' component={History}/>
                    <Route  exact path ='/admin/assets/create' component={AddAsset}/>
                    <Route  exact path ='/admin/assets/repair/:asset' component={RepairAsset}/>
                    <Route  exact path ='/employeehomepage/RequestTicket' component={Tickets}/>
                    <Route  exact path ='/admin/employees/create' component={EmployeeAdd}/>

                    
                    
                </div>
                </div>
                <Route  path ='/login' component={LoginForm}/>
                
                
            </div>
            </Router>
        )
    }
}


export default Homepage