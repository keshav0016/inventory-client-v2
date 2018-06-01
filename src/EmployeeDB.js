import React, { Component } from 'react';
import { Button, SideNav, Icon, Row, Col } from 'react-materialize'
import './MasterComponent.css';
import {
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
            (
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
                                            <Row>
                                            <div fixed className="white lighten-1 z-depth-2 navbar col s12" style={{ overflow: 'hidden',position: 'fixed', width:'100%', zIndex: 997}}>
                                                    <a href="/employee/Profile"><Col s={2} m={2} l={2} offset={"s5 m5 l6"} ><img className="navbarImage" src={logo} alt="WAL Logo" /></Col></a>
                                                    <div><a href="/logout"><b className="masterComponentLogoutButton">LOGOUT</b></a></div>
                                            </div>
                                            </Row>
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
            ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
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