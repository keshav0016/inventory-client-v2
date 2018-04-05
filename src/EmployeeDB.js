import React, {Component} from 'react';
import {Navbar, NavItem,  Row, Col,CardPanel} from 'react-materialize'
import './MasterComponent.css';
import {
   BrowserRouter as Router,
   Route,
   Redirect
 } from 'react-router-dom';
import EmployeeTicketsList from './EmployeeTicketsList';
import axios from 'axios'



class EmployeeDB extends Component {
   constructor(props){
       super(props)
       this.state = {
           data: []
       }
   }
   render(){
       return(
           <Router>
           <div>
               <div className="masterComponentBackground">
               <div>
                   <Navbar className="masterComponentNavBar">
                       <NavItem href='/logout' className="masterComponentLogoutButton">LOGOUT</NavItem>
                   </Navbar>
                 
                   <Redirect to="/employeehomepage/list" />
                   <Row>
                  <Col m={4}>
                      <CardPanel className=" grey darken-3 white-text">
                          <label className="adminDashCardTitle">User Details</label>
                          <br />
                          <br />
                          <br />
                          <span>First Name: {this.state.data.first_name}</span>
                          <br />
                          <span>Last Name: {this.state.data.last_name}</span>
                      </CardPanel>
                  </Col>

                   </Row>
               </div>
               <div>
                   <Route exact path="/employeehomepage/list" component={EmployeeTicketsList} />
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
               data: res.data.currentUser

           })
       })
       .catch(error => {
           window.Materialize.toast('user details not found',3000)
       })
   }
}
export default EmployeeDB