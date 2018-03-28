import React, {Component} from 'react'
import {Navbar, NavItem, Icon, SideNav, SideNavItem, Button} from 'react-materialize'
import './MasterComponent.css';
import Assets from './Assets';
import Consumables from './Consumables';
import EmployeesList from './Employees';
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
                        <NavItem className="masterComponentLogoutButton">LOGOUT</NavItem>
                    </Navbar>
                    <SideNav className="masterComponentSideBar" trigger={<Button className="red lighten-2 masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to="/adminhomepage/assets"><SideNavItem className="masterComponentSideBarItem">Assets</SideNavItem></Link>
                    <Link to="/adminhomepage/consumables"><SideNavItem className="masterComponentSideBarItem">Consumables</SideNavItem></Link>
                    <Link to="/adminhomepage/employees"><SideNavItem className="masterComponentSideBarItem">Employees</SideNavItem></Link>
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/adminhomepage/assets" component={Assets} />
                    <Route exact path="/adminhomepage/consumables" component={Consumables} />
                    <Route exact path="/adminhomepage/employees" component={EmployeesList} />
                </div>
                </div>
            </div>
            </Router>
        )
    }
}


export default Homepage