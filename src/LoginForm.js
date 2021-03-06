import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button,Col, Card } from 'react-materialize';
import './Login.css';
import './Employee.css'
import {
  Link,
  Redirect
} from 'react-router-dom';
import Row from 'react-materialize/lib/Row';
import { baseUrl } from './config';
import logo from './LOGO.png';
import swal from 'sweetalert';
import $ from 'jquery'


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: {
        value:'',
        error:'',
        showError:false
      },
      password: {
        value:'',
        error:'',
        showError:false
      },
      admin: false,
      employee: false,
      login: true,
      userRole : ''
    }
    this.getUserid = this.getUserid.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.verifyCredentials = this.verifyCredentials.bind(this);
    this.checkForValidation = this.checkForValidation.bind(this)
  }

  

  checkForValidation(e){
    // var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
    e.preventDefault();
    if(!this.state.user_id.value){
      this.setState({
        user_id:Object.assign(this.state.user_id, {
          error: 'The User Id should not be empty',
          showError: true
        })
      })
    }
    if(this.state.user_id.value){
      this.setState({
        user_id:Object.assign(this.state.user_id, {
          error: '',
          showError: false
        })
      })
    }
    if(!this.state.password.value){
      this.setState({
        password:Object.assign(this.state.password, {
          error: 'The password should not be empty',
          showError: true
        })
      })
    }
    if(this.state.password.value){
      this.setState({
        password:Object.assign(this.state.password, {
          error: '',
          showError: false
        })
      })
    }
    if(this.state.user_id.value && this.state.password.value){
      this.verifyCredentials()
    }
  }

  //function to fetch the username from the username textfield
  getUserid(event) {
    this.setState({
      user_id: Object.assign(this.state.user_id, {
        value: event.target.value
      })
    })
  }

  //function to fetch the password from the password textfield
  getPassword(event) {
    this.setState({
      password: Object.assign(this.state.password, {
        value: event.target.value
      })
    })
  }
  // componentDidMount(){
  //   $('label').addClass('active')
  // }
  //function to check the credentials provided  by the user
  verifyCredentials() {
      axios({
        method: 'post',
        url: `${baseUrl}/user/login`,
        data: {
          user_id: this.state.user_id.value,
          password: this.state.password.value
        },
        withCredentials: true
      })
      .then((res) => {
        if(res.data.message === 'user not found'){
          return Promise.reject('Wrong credentials');
          // swal("Wrong Credentials",{
          //   buttons: false,
          //   timer: 2000,
          // })
        }if(res.data.message === 'User is disabled'){
          return Promise.reject('Your account has been suspended, contact your administrator or HR department')
         
        }
        if(res.data.admin){
          if(res.data.passwordSame === true && res.data.admin.firstLogin === 1){
            this.setState({
              change: true,
              admin: false,
              userRole: "Admin"

            })
          }
          if(res.data.passwordSame === true && res.data.admin.firstLogin === 0){
            this.setState({
              change: false,
              admin: true,
            })
          }
        }
        if(res.data.user){

          if (res.data.passwordSame === true && res.data.user.first_login === 1) {
            this.setState({
              change: true,
              admin: false,
              userRole: res.data.user.role
            })
          } else if (res.data.passwordSame === true && res.data.isEmployee === true && res.data.user.user_id && res.data.user.first_login === 0) {
            this.setState({
              employee: true
  
            })
          }
          else if(res.data.user.role === 'Admin' && res.data.isEmployee === false ){
            this.setState({
              admin: true
            })
          }
        }
      })
      .catch((error) => {
        if(error === "Your account has been suspended, contact your administrator or HR department"){
          swal("Your account has been suspended, contact your administrator or HR department",{
            buttons: false,
            timer: 2000,
          })
        }
        if(error === "Wrong Credentials"){
          swal("Wrong Credentials",{
            buttons: false,
            timer: 2000,
          })
        }
        if(error.response.status === 401){
          swal("Wrong Credentials",{
            buttons: false,
            timer: 2000,
          })
        }
  
        
      })
  }

  componentDidMount(){
    // console.log(querystring.parse())
    if(this.props.location.search ==="?sessionExpired=true"){
      swal('Your Session has expired, login again to continue',{
        buttons: false,
        timer: 2000,
      })
    }
    $(document).ready(function(){
      $('label').addClass('active');
    }) 
  }
  componentDidUpdate(){
      $(document).ready(function(){
        $('label').addClass('active');
    }) 
  }

  render() {
    var loginform = (
      <div className='background white' style={{height: '100vh', position: 'relative'}}>
        <div className='header1' style={{padding: '20px 0', color: 'white', textAlign : 'center'}}>
          <Col s={2} offset={"m2"}>
            <img height='200px' width='200px' s={2} alt="wal" src={logo}/>
          </Col>
          <h4 style={{marginTop: 0, textAlign: 'center', fontWeight: 300, color : 'black'}}>Inventory Management System </h4>
        </div> 
        <div>
        <Row>
          <Col s={12} m={6} l={4} offset={'m3 l4'}>
            <form onSubmit={this.checkForValidation}>
              <Card className="z-depth-2" title="Login" style={{padding: "30px", marginTop: 0}}>
                {/* <h4>Login</h4> */}
                <Row>
                  {/* <Icon className="medium material-icons white-text loginFormIcon">account_circle</Icon> */}
                  {/* <div className='fields'> */}
                    <Input s={12} onChange={this.getUserid} label="Employee Id" icon='account_box' autoFocus error={this.state.user_id.showError ? this.state.user_id.error : null} />
                    {/* <Button className='submitbtn' onClick={this.verifyCredentials}>LOGIN</Button> */}
                  {/* </div> */}
                </Row>
                <Row>
                    <Input type="password" s={12} onChange={this.getPassword} label="Password" error={this.state.password.showError ? this.state.password.error : null} icon='lock'/>

                </Row>
                <Row>
                <Col s={3} offset={''}>
                  <Link to='/forgotpassword' className='loginFormForgotLink' style={{whiteSpace:'nowrap'}}>Forgot Password ?</Link>
                </Col>
                    <Col s={3} offset={"s5"}>
                      <Button className='submitbtn' type="submit">LOGIN</Button>
                    </Col>
                </Row>
              </Card>

            </form>
          </Col>
          </Row>
        </div>
      </div>
    );
    return (
      <div>
        {this.state.login ? loginform : null}
        {this.state.change ? (<Redirect  to ={{pathname:'/user/passwordchange/' , state:{user_id:this.state.user_id.value, role: this.state.userRole}}}/>) : null}
        {this.state.employee ? (<Redirect  to ={{pathname:`/employee/Profile/` , user:{user_id:this.state.user_id.value}}}/>) : null}
        {this.state.admin ? (<Redirect push to ='/admin'/>): null}
      </div>


    )
  }
}

export default LoginForm;
