import React, { Component } from 'react';
import './forgotpassword.css'
// import axios from 'axios';
import { Icon, Input, Button, Row } from 'react-materialize';
// import './Login.css';
// import './Employee.css'
// import {
 
//   Redirect
// } from 'react-router-dom';
// import Row from 'react-materialize/lib/Row';
// import PasswordChange from './PwdChange';
// import EmplooyeeDB from './EmplooyeeDB';
// import AdminHomepage from './AdminHomepage';
// import Homepage from './Homepage';

class ForgotPasswordForm extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       user_id: '',
//       password: '',
//       admin: false,
//       employee: false,
//       login: true
//     }
//     this.getUserid = this.getUserid.bind(this);
//     this.getPassword = this.getPassword.bind(this);
//     this.verifyCredentials = this.verifyCredentials.bind(this);
//   }

//   //function to fetch the username from the username textfield
//   getUserid(event) {
//     this.setState({
//       user_id: event.target.value
//     })
//   }

//   //function to fetch the password from the password textfield
//   getPassword(event) {
//     this.setState({
//       password: event.target.value
//     })
//   }
//   // componentDidMount(){
//   //   $('label').addClass('active')
//   // }
//   //function to check the credentials provided  by the user
//   verifyCredentials() {
//       axios({
//         method: 'post',
//         url: 'http://localhost:3001/user/login',
//         data: {
//           user_id: this.state.user_id,
//           password: this.state.password
//         },
//         withCredentials: true
//       })
//       .then((res) => {
//         if(res.data.passwordSame === true){
//           this.setState({
//             change: true,
//             admin: false
//           })
//         }else if(res.data.passwordSame === false && res.data.user.role === 'Admin'){
//           this.setState({
//             admin: true

//           })
//         }else {
//           this.setState({
//             employee : true
//           })
//         }
//       })
//       .catch(() =>{
//         window.Materialize.toast('wrong password',3000)

//       })
//   }


  render() {
      return(
          <div className="forgotPasswordContainer">
            <form className="formContainer">
                <p className="resetPasswordTitle"><b>Reset  Your  Password</b></p>
                <p className="resetPasswordMessage">It is often forgotten that password thing.
                Enter your email address below and click on the <b>'Request password Reset'</b> Button.
                We will contact you shortly.</p>
                <Row>
                <Input s={11} className="resetPasswordEmailField" placeholder="Email"><Icon tiny left>email</Icon></Input>
                </Row>
                <Button className="resetPassword">Request Password Reset</Button>
            </form>
          </div>
      )
  }
}

export default ForgotPasswordForm;
