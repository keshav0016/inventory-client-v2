import React, {Component} from 'react';
import {Navbar, NavItem, Button, SideNav,  Icon} from 'react-materialize'
import './MasterComponent.css';
import {
   BrowserRouter as Router,
   Route,
   Link,
   Redirect
 } from 'react-router-dom';
import EmployeeTicketsList from './EmployeeTicketsList';
import axios from 'axios'
import Tickets from './Tickets'
import Profile from './Profile.js'
import { baseUrl } from './config';


class EmployeeDB extends Component {
   constructor(props){
       super(props)
       this.state = {
           profile: [],
           data: [],
           handleList : true,
           history : [],
           historyAssets :[],
           redirect : 0
       }
   }
   render(){
       return(
           <Router>
           <div>
           <div className="masterComponentBackground">
           <div>
               <Navbar fixed className="teal lighten-1" style={{overflow: 'hidden'}}>
                   <NavItem href="/admin">
                       <img style={{height: '64px', width: '64px', marginLeft: '65px'}} src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/202930-f19ff2e90358dfd16343b9dbe24c31d4-medium_jpg.jpg?buster=1457063274" alt="WAL Logo" />
                   </NavItem>                        
                   <NavItem href="/logout" className="masterComponentLogoutButton" style={{fontFamily: 'Roboto',fontWeight: 400}}><b>LOGOUT</b></NavItem>
               </Navbar>
           <SideNav className="masterComponentSideBar" trigger={<Button className="teal lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to={`/employee/Profile/`}>Profile</Link>
                    <Link to={`/employee/list`}>Tickets List</Link>

                    </SideNav>
               </div>
               <div>
                   <Route exact path="/employee/list" component={EmployeeTicketsList} />
                   <Route exact path="/employee/RequestTicket" component={Tickets} />
                   <Route  path="/employee/Profile/" component={Profile} />
                   

               </div>
               </div>
               {this.state.redirect === 403 ? <Redirect  to = '/admin' /> : null}
                {this.state.redirect === 401 ? <Redirect  to = '/login' /> : null}
           </div>
       </Router>
       )
   }
   componentDidMount(){
    axios({
        method: 'get',
        url: `${baseUrl}/employee/ticket/current`,
        withCredentials: true
    })
    .then((res) => {
        this.setState({
            profile: res.data.currentUser

        })
    })
    .catch(error => {
        // window.Materialize.toast('user details not found',3000)
        this.setState({
            redirect : error.response.status
        })
    })
    }
}
export default EmployeeDB