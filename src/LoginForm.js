import React, { Component } from 'react';
import axios from 'axios';
import { Icon, Input, Button } from 'react-materialize';
import './Login.css';
import './Employee.css'
import {
 
  Redirect
} from 'react-router-dom';
import Row from 'react-materialize/lib/Row';
import $ from 'jquery'
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
  componentDidMount(){
    $('label').addClass('active')
  }
  //function to check the credentials provided  by the user
  verifyCredentials() {
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
        }else if(res.data.passwordSame === false && res.data.user.role === 'Admin'){
          this.setState({
            admin: true

          })
        }else {
          this.setState({
            employee : true
          })
        }
      })
      .catch(() =>{
        window.Materialize.toast('wrong password',3000)

      })
  }


  render() {
    var loginform = (
      <div className='background'>
          <div className ='header1 white-text'>
              <h4>Inventory Management System </h4>
          </div> 
      <div class='passwordchangeform'>
          <Row>
            <Icon className="medium material-icons white-text loginFormIcon">account_circle</Icon>
            <div className='fields'>
            <Input s={10} onChange={this.getUserid} label="User Id" icon='account_box' />
            <Input type="password" s={10} onChange={this.getPassword} label="password" icon='lock' />
            <Button className ='submitbtn'onClick={this.verifyCredentials}>LOGIN</Button>
            </div>
          </Row>
      </div>
      </div>
    );
    return (
      <div>
        {this.state.login ? loginform : null}
        {this.state.change ? (<Redirect  to ={{pathname:'/user/passwordchange' , user:{user_id:this.state.user_id}}}/>) : null}
        {this.state.employee ? (<Redirect  to ={{pathname:'/employeehomepage' , user:{user_id:this.state.user_id}}}/>) : null}
        {this.state.admin ? (<Redirect push to ='/adminhomepage'/>): null}
      </div>


    )
  }
}

export default LoginForm;
