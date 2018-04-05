import React, {Component} from 'react';
import {Navbar, NavItem, Icon, SideNav, SideNavItem, Button} from 'react-materialize'
import './MasterComponent.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
  } from 'react-router-dom';
import Tickets from './Tickets';
import TicketsList from './TicketsList';


class EmployeeDB extends Component {
    render(){
        return(
            <Router>
            <div>
                <div className="masterComponentBackground">
                <div>
                    <Navbar className="masterComponentNavBar">
                       <Link to='/logout'> <NavItem className="masterComponentLogoutButton">LOGOUT</NavItem></Link>
                    </Navbar>
                    <SideNav className="masterComponentSideBar" trigger={<Button className="red lighten-2 masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to="/employeehomepage/list"><SideNavItem className="masterComponentSideBarItem">TicketsList</SideNavItem></Link>
                    
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/employeehomepage/list" component={TicketsList} />
                </div>
                </div>
            </div>
        </Router>
        )
    }
}
export default EmployeeDB