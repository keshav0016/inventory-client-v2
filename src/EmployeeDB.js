import React, {Component} from 'react';
import {Navbar, NavItem, Icon, SideNav, SideNavItem, Button} from 'react-materialize'
import './MasterComponent.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
  } from 'react-router-dom';
import Tickets from './Tickets';
import EmployeeTicketsList from './EmployeeTicketsList';


class EmployeeDB extends Component {
    render(){
        return(
            <Router>
            <div>
                <div className="masterComponentBackground">
                <div>
                    <Navbar className="masterComponentNavBar">
                        <NavItem href='/logout' className="masterComponentLogoutButton">LOGOUT</NavItem>
                    </Navbar>
                    <SideNav className="masterComponentSideBar" trigger={<Button className="red lighten-2 masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to="/employeehomepage/list"><SideNavItem className="masterComponentSideBarItem">TicketsList</SideNavItem></Link>
                    
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/employeehomepage/list" component={EmployeeTicketsList} />
                </div>
                </div>
            </div>
        </Router>
        )
    }
}
export default EmployeeDB