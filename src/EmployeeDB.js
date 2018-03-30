import React, {Component} from 'react';
import {Navbar, NavItem, Icon, SideNav, SideNavItem, Button} from 'react-materialize'
import './MasterComponent.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';
import Tickets from './Tickets';


class EmployeeDB extends Component {
    render(){
        return(
            <Router>
            <div>
                <div className="masterComponentBackground">
                <div>
                    <Navbar className="masterComponentNavBar">
                       <Link to='/login'> <NavItem className="masterComponentLogoutButton">LOGOUT</NavItem></Link>
                    </Navbar>
                    <SideNav className="masterComponentSideBar" trigger={<Button className="red lighten-2 masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to="/employeehomepage/tickets"><SideNavItem className="masterComponentSideBarItem">Tickets</SideNavItem></Link>
                    {/* <Link to="/employeehomepage/consumables"><SideNavItem className="masterComponentSideBarItem">Consumables</SideNavItem></Link>
                    <Link to="/employeehomepage/employees"><SideNavItem className="masterComponentSideBarItem">Employees</SideNavItem></Link> */}
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/employeehomepage/tickets" component={Tickets} />
                    {/* <Route exact path="/adminhomepage/consumables" component={Consumables} />
                    <Route exact path="/adminhomepage/employees" component={EmployeesList} /> */}
                </div>
                </div>
            </div>
        </Router>
        )
    }
}
export default EmployeeDB