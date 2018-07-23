import React, { Component } from 'react'
import './MasterComponent.css';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import MasterComponent from './MasterComponent';
import { parse as parseCookie } from 'cookie';
import LoginForm from './LoginForm'

class Homepage extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ProtectedRoute/>
                    <Route exact path='/login' component={LoginForm} />
                </div>
            </Router>
        )
    }
}

class ProtectedRoute extends Component {
    render() {
        let ck = parseCookie(document.cookie);
        return (
            <Route
                render={props =>
                    ck.token ? (
                        <MasterComponent/>
                    ) : (
                            ck.passwordChange ? 
                            <React.Fragment>
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        search: '?sessionExpired=true'
                                    }}
                                />
                            </React.Fragment>
                            : <Redirect to='/login'/>
                            
                        )
                }
            />
        );
    }
}



export default Homepage