import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import LoginForm from './LoginForm';
// import Adminhomepage from './Adminhomepage';
// import EmployeesList from './Employees';
// import EmployeeAdd from './EmployeeAdd';
import Consumables from './Consumables';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Link to="/consumables"></Link>
            <Route exact path="/consumables" component={Consumables} />
          </div>
      </Router>
    );
  }
}

export default App;