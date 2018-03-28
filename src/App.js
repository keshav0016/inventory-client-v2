import React, { Component } from 'react';
import './App.css';
import './Consumable.css'
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

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Link to="/adminhomepage"></Link>
            <Route path="/adminhomepage" component={Homepage} />
          </div>
      </Router>
    );
  }
}

export default App;