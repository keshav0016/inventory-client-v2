import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
 import LoginForm from './LoginForm';
// import Adminhomepage from './Adminhomepage';
// import EmployeesList from './Employees';
// import EmployeeAdd from './EmployeeAdd';
import Homepage from './Homepage';
import PasswordChange from './PwdChange'
import EmployeeDB from './EmployeeDB';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Link to ='/login'></Link>
            <Link to="/adminhomepage"></Link>
            <Link to="/user/passwordchange"></Link>
            <Link to='/user'></Link>
            <Route path = '/login' component = {LoginForm}/>
            <Route path="/adminhomepage" component={Homepage} />
            <Route path="/user/passwordchange" component={PasswordChange} />
            <Route path ='/employeehomepage' component={EmployeeDB}/>
            
          </div>
      </Router>
    );
  }
}

export default App;
