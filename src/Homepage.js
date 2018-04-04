import React, {Component} from 'react'
import {Navbar, NavItem, Icon, SideNav, Button} from 'react-materialize'
import './MasterComponent.css';
import Assets from './Assets';
import Consumables from './Consumables';
import EmployeesList from './Employees';
import TicketsList from './TicketsList';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

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
                    <Link to="/adminhomepage/assets">Assets</Link>
                    <Link to="/adminhomepage/consumables">Consumables</Link>
                    <Link to="/adminhomepage/employees">Employees</Link>
                    <Link to="/adminhomepage/tickets">Tickets</Link>
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/adminhomepage/assets" component={Assets} />
                    <Route exact path="/adminhomepage/consumables" component={Consumables} />
                    <Route exact path="/adminhomepage/employees" component={EmployeesList} />
                    <Route exact path="/adminhomepage/tickets" component={TicketsList} />
                </div>
                </div>
            </div>
            </Router>
        )
    }
}


export default Homepage