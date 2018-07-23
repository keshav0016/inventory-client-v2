import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
 import LoginForm from './LoginForm';
 import Logout from './Logout';
import Homepage from './Homepage';
import Tickets from './Tickets'
import PasswordChange from './PwdChange'
import EmployeeDB from './EmployeeDB';
import StartPage from './StartPage';
import ForgotPasswordForm from './ForgotPassword'
import ResetPassword from './ResetPassword'
import './materialize-overrides.css';
import NotFound from './NotFound';
import axios from 'axios';
import changePassword from './ChangePassword'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect : false,
      routes : true
    }
  }

  componentDidMount(){
    axios.interceptors.response.use(function(res){
      if(res.status === 401){
        this.setState({
          redirect : true,
          routes: false
        })
      }
      return res;
    })
  }
    

  render() {
    return (
      <div>
      <Router>
          <div>
            <Route path="/admin" component={Homepage} />
            <Route path="/employee/tickets" component={Tickets} />
            <Route path = '/login' component = {LoginForm}/>
            <Route path = '/logout' component = {Logout}/>            
            <Route path="/user/passwordchange" component={PasswordChange} />
            <Route path ='/employee' component={EmployeeDB}/>
            <Route  exact path ='/' component={StartPage}/>
            <Route  exact path ='/forgotpassword' component={ForgotPasswordForm}/>
            <Route  exact path ='/user/reset/:user' component={ResetPassword}/>    
            <Route path='/unauthorized' component={NotFound} />
            <Route exact path = '/changepassword' component = {changePassword}/>
                    
              {this.state.redirect? <Redirect
              to={{
                  pathname: "/login",
                  search: '?sessionExpired=true'
              }}/>: null}
          </div>
      </Router>
     
      </div>
     
     
    );
  }
}

export default App;
