import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
 import LoginForm from './LoginForm';
 import Logout from './Logout';
import Homepage from './Homepage';
import Tickets from './Tickets'
import PasswordChange from './PwdChange'
import EmployeeDB from './EmployeeDB';
import StartPage from './StartPage';
import './materialize-overrides.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Route path="/admin" component={Homepage} />
            <Route path="/employee/tickets" component={Tickets} />
            <Route path = '/login' component = {LoginForm}/>
            <Route path = '/logout' component = {Logout}/>            
            <Route path="/user/passwordchange" component={PasswordChange} />
            <Route path ='/employeehomepage' component={EmployeeDB}/>
            <Route  exact path ='/' component={StartPage}/>
          </div>
      </Router>
    );
  }
}

export default App;
