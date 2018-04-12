import React, {Component} from 'react';
import {Navbar, NavItem, Button, SideNav, SideNavItem, Icon} from 'react-materialize'
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
                   <SideNav
                        trigger={<Button className="teal lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>}
                        options={{ closeOnClick: true }}
                        >
                        <SideNavItem userView
                            user={{
                            background: 'img/office.jpg',
                            name : this.state.profile.first_name + this.state.profile.last_name,
                            // UserId : this.state.user_id,
                            }}
                        />
                        <SideNavItem >User Id : {this.state.profile.user_id}</SideNavItem>
                        <SideNavItem >No of Assets held: {this.state.assetsCount}</SideNavItem>
                        <SideNavItem >No of Consumables held: {this.state.consumablesCount}</SideNavItem>


                    </SideNav>
                   <Redirect to="/employeehomepage/list" />
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