import React, {Component} from 'react'
import {Navbar, NavItem, Icon, SideNav, SideNavItem, Button} from 'react-materialize'
import './MasterComponent.css';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Assets from './Assets';
import Consumables from './Consumables';
import EmployeesList from './Employees';
import EmployeeHistory from './EmployeeHistory';


import LoginForm from './LoginForm';


class Homepage extends Component{
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
                    <Link to="/adminhomepage/assets"><SideNavItem className="masterComponentSideBarItem">Assets</SideNavItem></Link>
                    <Link to="/adminhomepage/consumables"><SideNavItem className="masterComponentSideBarItem">Consumables</SideNavItem></Link>
                    <Link to="/adminhomepage/employees"><SideNavItem className="masterComponentSideBarItem">Employees</SideNavItem></Link>
                    </SideNav>
                </div>
                <div>
                    <Route exact path="/adminhomepage/assets" component={Assets} />
                    <Route exact path="/adminhomepage/consumables" component={Consumables} />
                    <Route exact path="/adminhomepage/employees" component={EmployeesList} />
                    <Route  exact path ='/adminhomepage/employees/history' component={EmployeeHistory}/>
                    
                    
                </div>
                </div>
                <Route  path ='/login' component={LoginForm}/>
                
                
            </div>
            </Router>
        )
    }
}


export default Homepage