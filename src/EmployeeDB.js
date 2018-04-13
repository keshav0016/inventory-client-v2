import React, {Component} from 'react';
import {Navbar, NavItem, Button, SideNav,  Icon} from 'react-materialize'
import './MasterComponent.css';
import {
   BrowserRouter as Router,
   Route,
   Redirect,
   Link
 } from 'react-router-dom';
import EmployeeTicketsList from './EmployeeTicketsList';
import axios from 'axios'
import Tickets from './Tickets'
import Profile from './Profile.js'


class EmployeeDB extends Component {
   constructor(props){
       super(props)
       this.state = {
           profile: [],
           data: [],
           handleList : true,
           history : [],
           historyAssets :[],
       }
   }
   render(){
       return(
           <Router>
           <div>
               <div className="masterComponentBackground">
               <div>
               <Navbar className="teal lighten-1">
               <NavItem style={{height:'60px',width:'60px'}} ><img width="60px" height="60px" style={{marginLeft : '70px', marginTop : '2px'}} src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/202930-f19ff2e90358dfd16343b9dbe24c31d4-medium_jpg.jpg?buster=1457063274" alt="WAL Logo" /></NavItem>                        
               <NavItem href="/logout" className="masterComponentLogoutButton"><b>LOGOUT</b></NavItem>
           </Navbar>
           <SideNav className="masterComponentSideBar" trigger={<Button className="teal lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                    <Link to={`/employeehomepage/profile/${this.state.profile.user_id}`}>Profile</Link>
                    <Link to={`/employeehomepage/list`}>Tickets List</Link>

                    </SideNav>
                   {/* <Redirect to="/employeehomepage/list" /> */}
               </div>
               <div>
                   <Route exact path="/employeehomepage/list" component={EmployeeTicketsList} />
                   <Route exact path="/employeehomepage/RequestTicket" component={Tickets} />
                   <Route exact path="/employeehomepage/Profile/:employee" component={Profile} />
                   

               </div>
               </div>
           </div>
       </Router>
       )
   }
   componentDidMount(){
    axios({
        method: 'get',
        url: 'http://localhost:3001/employee/ticket/current',
        withCredentials: true
    })
    .then((res) => {
        this.setState({
            profile: res.data.currentUser

        })
    })
    .catch(error => {
        window.Materialize.toast('user details not found',3000)
    })
    }
}
export default EmployeeDB