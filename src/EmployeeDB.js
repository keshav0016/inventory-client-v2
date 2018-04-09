import React, {Component} from 'react';
import {Navbar, NavItem, Modal, Button} from 'react-materialize'
import './MasterComponent.css';
import {
   BrowserRouter as Router,
   Route,
   Redirect
 } from 'react-router-dom';
import EmployeeTicketsList from './EmployeeTicketsList';
import axios from 'axios'
import Tickets from './Tickets'



class EmployeeDB extends Component {
   constructor(props){
       super(props)
       this.state = {
           profile: []
       }
   }
   render(){
       return(
           <Router>
           <div>
               <div className="masterComponentBackground">
               <div>
                   <Navbar className="teal lighten-1 masterComponentNavBar">
                       <NavItem href='/logout' className="masterComponentLogoutButton">LOGOUT</NavItem>
                   </Navbar>
                 
                   <Redirect to="/employeehomepage/list" />
                   <div className = 'profilebtn'> 
                <Modal 
                    header='Profile'
                    trigger={<Button className = 'red' floating large  waves = 'light' icon = 'person'  />}>
                    <p>Name: {this.state.profile.first_name} {this.state.profile.last_name} </p>
                    <p>UserId: {this.state.profile.user_id}</p>
                </Modal>
               </div>
               </div>
               <div>
                   <Route exact path="/employeehomepage/list" component={EmployeeTicketsList} />
                   <Route exact path="/employeehomepage/RequestTicket" component={Tickets} />

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