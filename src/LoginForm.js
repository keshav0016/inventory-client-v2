import React, { Component } from 'react';
import axios from 'axios';
import { Icon, Input, Button } from 'react-materialize';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
// import PasswordChange from './PwdChange';
// import EmplooyeeDB from './EmplooyeeDB';
// import AdminHomepage from './AdminHomepage';
// import Homepage from './Homepage';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      password: '',
      admin: false,
      employee: false,
      login: true
    }
    this.getUserid = this.getUserid.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.verifyCredentials = this.verifyCredentials.bind(this);
  }

  //function to fetch the username from the username textfield
  getUserid(event) {
    this.setState({
      user_id: event.target.value
    })
  }

  //function to fetch the password from the password textfield
  getPassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  //function to check the credentials provided  by the user
  verifyCredentials() {
    if (this.state.user_id === 'admin' && this.state.password === 'admin') {
      this.setState({ admin: true })

    } else if (this.state.user_id === this.state.password) {
      axios({
        method: 'post',
        url: 'http://localhost:3001/user/login',
        data: {
          user_id: this.state.user_id,
          password: this.state.password
        },
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        if(res.data.passwordSame === true){
          this.setState({
            change: true,
            admin: false
          })
        }
        // if (res.data.success === true) {
        //   this.setState({
        //     employee: true,
        //     admin: false,
        //     login: false
        //   })
        // }
      })
    }else  {
      axios({
        method: 'post',
        url: 'http://localhost:3001/user/login',
        data: {
          user_id: this.state.user_id,
          password: this.state.password
        },
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        if(res.data.passwordSame === true){
          this.setState({
            change: true,
            admin: false
          })
        }else{
          this.setState({
            employee: true
          })
        }
        // if (res.data.success === true) {
        //   this.setState({
        //     employee: true,
        //     admin: false,
        //     login: false
        //   })
        // }
      })
    }
  }


  render() {
    var loginform = (
      <div>
        <div className="loginBackground">
          <div className="z-depth-4 loginForm">
            <div className="loginBanner">
              <p className="loginBannerText">My Account</p>
            </div>
            <div className="loginFormIcon">
              <Icon className="medium material-icons white-text">account_circle</Icon>
            </div>
            <div className="z-depth-4 loginFormCredentialContainer">
              <div className="row loginFormUsernameMargin">
                <div className="input-field col s12 loginFormUsernameFieldContainer">
                  <Input s={12} onChange={this.getUserid} label="User Id" icon='account_box' />
                </div>
              </div>
              <div className="row loginFormPasswordMargin">
                <div className="input-field col s12 loginFormUsernameFieldContainer">
                  <Input type="password" s={12} onChange={this.getPassword} label="password" icon='lock' />
                </div>
              </div>
              <Button className="btn waves-effect waves-teal loginFormButton z-depth-4" onClick={this.verifyCredentials}>LOGIN</Button>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
    return (
      <div>
        {this.state.login ? loginform : null}
        {this.state.change ? (<Redirect push to ='/user/passwordchange'  user_id={this.state.user_id}/>) : null}
        {this.state.employee ? (<Redirect push to ='/employeehomepage'  user_id={this.state.user_id}/>) : null}
        {this.state.admin ? (<Redirect push to ='/adminhomepage'/>): null}
      </div>


    )
  }
}

export default LoginForm;
