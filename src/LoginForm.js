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
// import PasswordChange from './PwdChange';
// import EmplooyeeDB from './EmplooyeeDB';
// import AdminHomepage from './AdminHomepage';
// import Homepage from './Homepage';

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
      login: true
    }
    this.getUserid = this.getUserid.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.verifyCredentials = this.verifyCredentials.bind(this);
    this.checkForValidation = this.checkForValidation.bind(this)
  }

  checkForValidation(e){
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
        }
        if (res.data.passwordSame === true) {
          this.setState({
            change: true,
            admin: false
          })
        } else if (res.data.passwordSame === false && res.data.user.role === 'Admin') {
          this.setState({
            admin: true

          })
        } else {
          this.setState({
            employee: true
          })
        }
      })
      .catch(() => {
        window.Materialize.toast('wrong password', 3000)

      })
  }


  render() {
    var loginform = (
      <div className='background teal' style={{height: '100vh', position: 'relative'}}>
        <div className='header1' style={{padding: '20px 0', color: 'white'}}>
          <h4 style={{marginTop: 0, textAlign: 'center', fontWeight: 300}}>Inventory Management System </h4>
        </div> 
        <Row>
          <Col s={2} offset={"m2"}>
            <img s={2} alt="wal" src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/202930-f19ff2e90358dfd16343b9dbe24c31d4-medium_jpg.jpg?buster=1457063274"/>
          </Col>
          <Col s={4}>
            <form onSubmit={this.checkForValidation}>
              <Card className="z-depth-2" title="Login" style={{padding: "30px", marginTop: 0}}>
                {/* <h4>Login</h4> */}
                <Row>
                  {/* <Icon className="medium material-icons white-text loginFormIcon">account_circle</Icon> */}
                  {/* <div className='fields'> */}
                    <Input s={12} onChange={this.getUserid} label="User Id" icon='account_box' autoFocus error={this.state.user_id.showError ? this.state.user_id.error : null} />
                    {/* <Button className='submitbtn' onClick={this.verifyCredentials}>LOGIN</Button> */}
                  {/* </div> */}
                </Row>
                <Row>
                    <Input type="password" s={12} onChange={this.getPassword} label="Password" error={this.state.password.showError ? this.state.password.error : null} icon='lock'/>

                </Row>
                <Row>
                    <Col s={3} offset={"m7"}>
                      <Button className='submitbtn' type="submit">LOGIN</Button>
                    </Col>
                </Row>
                <Col s={6} offset={'s7'}>
                  <Link to='/forgotpassword' className='loginFormForgotLink'>Forgot Password ?</Link>
                </Col>
              </Card>

            </form>
          </Col>
          </Row>
      </div>
    );
    return (
      <div>
        {this.state.login ? loginform : null}
        {this.state.change ? (<Redirect  to ={{pathname:'/user/passwordchange' , user:{user_id:this.state.user_id.value}}}/>) : null}
        {this.state.employee ? (<Redirect  to ={{pathname:`/employee/Profile/` , user:{user_id:this.state.user_id.value}}}/>) : null}
        {this.state.admin ? (<Redirect push to ='/admin'/>): null}
      </div>


    )
  }
}

export default LoginForm;
