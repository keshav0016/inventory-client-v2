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
        <div>
      <Router>
        {/* <Route exact path="/" component={Homepage}/> */}
        {/* <Route exact path="/loginform" component={LoginForm}/> */}
        {/* <Route exact path="/adminhomepage" component={Adminhomepage} /> */}
        {/* <Route exact path="/employee" component={EmployeesList}/> */}
        {/* <Route exact path="/employee/add" component={EmployeeAdd}/> */}
        <Route exact path="/consumables" component={Consumables} />
      </Router>
        
        
        </div>
    );
  }
}

export default App;