import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import LoginForm from './LoginForm';
// import Adminhomepage from './Adminhomepage';
// import EmployeesList from './Employees';
// import EmployeeAdd from './EmployeeAdd';
import Homepage from './Homepage';
import Tickets from './Tickets'

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Link to="/adminhomepage"></Link>
            <Link to="/employee/tickets"></Link>
            <Route path="/adminhomepage" component={Homepage} />
            <Route path="/employee/tickets" component={Tickets} />
          </div>
      </Router>
    );
  }
}

export default App;