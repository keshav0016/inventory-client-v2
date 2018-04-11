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
           profile: [],
        //    user_id: this.props.location.user.user_id,
           data: [],
           assetsCount: '',
           consumablesCount: '',
           handleList : true,
           history : [],
           historyAssets :[],
       }
       this.handleList = this.handleList.bind(this)
   }
   render(){
       return(
           <Router>
           <div>
               {this.state.handleList ? this.handleList() : null}
               <div className="masterComponentBackground">
               <div>
                   <Navbar className="teal lighten-1 masterComponentNavBar">
                       <NavItem href='/logout' className="masterComponentLogoutButton">LOGOUT</NavItem>
                   </Navbar>
                 
                   <Redirect to="/employeehomepage/list" />
                   <div className = 'profilebtn'> 
                <Modal 
                    header='Profile'
                    trigger={<Button className = 'black' onClick={this.handleList}  icon='person' >User Profile</Button>}>
                    <p>Name: {this.state.profile.first_name} {this.state.profile.last_name} </p>
                    <p>User Id: {this.state.profile.user_id}</p> 
                    <p>No of Assets held: {this.state.assetsCount}</p>
                    <p>No of Consumables held: {this.state.consumablesCount}</p>
                    {/* <Table >
                        <thead>
                            <tr>
                                <th data-field="item"> Item</th>
                                <th data-field="quantity">Quantity</th>
                            
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.asset_id ? item.asset_name + " " + "[" + "Asset" + "]" : item.name + " " + "[ "+"consumable"+" ]"}</td>
                                    <td>{item.asset_id ? "1": item.quantity}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table> */}
                    
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
    handleList(){
        axios({
            method:'get',
            url : 'http://localhost:3001/employee/ticket/count',
            withCredentials:true
        })
        .then((res) => {
            this.setState({
                assetsCount : res.data.assetsCount,
                consumablesCount : res.data.consumablesCount,
                // history : res.data.history,
                // historyAssets : res.data.historyAssets,
                // data : res.data.historyAssets.concat(res.data.history).sort((a,b) => b.id - a.id), 
                handleList : false

            })
        })
       
    }
}
export default EmployeeDB