import React, { Component } from 'react';
import { Navbar, NavItem, Button, SideNav, Icon } from 'react-materialize'
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
import NotFound from './NotFound';
import { parse as parseCookie } from 'cookie'
import logo from './LOGO.png'

class EmployeeDB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: [],
            data: [],
            handleList: true,
            history: [],
            historyAssets: [],
            redirect: 0
        }
    }
    render() {
        let ck = parseCookie(document.cookie);        
        return (
            ck.token ? 
            (<Router>
                <React.Fragment>
                    {this.state.redirect === 403 ? <Redirect to="/unauthorized" /> : null}
                    {this.state.redirect === 401 ? <Redirect to="/unauthorized" /> : null}
                    <Route path='/unauthorized' component={NotFound} />
                    <div>
                        <div className="masterComponentBackground">
                            <div>
                                {
                                    this.state.redirect === 0 ? (
                                        <React.Fragment>
                                            <div>
                                                <Navbar fixed className="white lighten-1" style={{ overflow: 'hidden' }}>
                                                    <NavItem className='logo' href="/employee/Profile/">
                                                        <img style={{ height: '64px', width: '64px', marginLeft: '65px' }} src={logo} alt="WAL Logo" />
                                                    </NavItem>
                                                    <NavItem href="/logout" className="masterComponentLogoutButton" style={{ fontFamily: 'Roboto', fontWeight: 400 }}><b>LOGOUT</b></NavItem>
                                                </Navbar>
                                                <SideNav className="masterComponentSideBar" trigger={<Button className="white lighten-1 btn-flat masterComponentMenuButton"><Icon>menu</Icon></Button>} options={{ closeOnClick: true }}>
                                                    <Link to={`/employee/Profile/`}>Profile</Link>
                                                    <Link to={`/employee/list`}>Tickets List</Link>
                                                </SideNav>
                                            </div>

                                            <Route exact path="/employee/list" component={EmployeeTicketsList} />
                                            <Route exact path="/employee/RequestTicket" component={Tickets} />
                                            <Route exact path="/employee/Profile/" component={Profile} />
                                        </React.Fragment>
                                    ) : null
                                }
                            </div>
                        </div>

                    </div>

                </React.Fragment>
            </Router>) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                }}
                            />
                        )
        )
    }
    componentDidMount() {
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
                    redirect: error.response.status
                })
            })
    }
}


export default EmployeeDB