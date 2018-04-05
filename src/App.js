import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
 import LoginForm from './LoginForm';
 import Logout from './Logout';
// import Adminhomepage from './Adminhomepage';
// import EmployeesList from './Employees';
// import EmployeeAdd from './EmployeeAdd';
import Homepage from './Homepage';
import Tickets from './Tickets'
import PasswordChange from './PwdChange'
import EmployeeDB from './EmployeeDB';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Link to ='/login'></Link>
            <Link to ='/logout'></Link>
            <Link to="/adminhomepage"></Link>
            <Link to="/employee/tickets"></Link>
            <Route path="/adminhomepage" component={Homepage} />
            <Route path="/employee/tickets" component={Tickets} />
            <Link to="/user/passwordchange"></Link>
            <Link to='/user'></Link>
            <Route path = '/login' component = {LoginForm}/>
            <Route path = '/logout' component = {Logout}/>            
            <Route path="/user/passwordchange" component={PasswordChange} />
            <Route path ='/employeehomepage' component={EmployeeDB}/>
            
          </div>
      </Router>
    );
  }
}

export default App;
