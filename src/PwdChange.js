import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Row, Icon} from 'react-materialize'
import {
   Redirect
  } from 'react-router-dom';
import './Employee.css'
class PasswordChange extends Component {
    constructor(props){
        super(props)
        this.state = {
            Confirm_Password : '',
            New_Password : '',
            user_id: this.props.location.user,
            change: true
            
        }
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserid = this.handleUserid.bind(this)
    }
    render(){
        var change =(
            <div className='background'>
            <div class='passwordchangeform'>
                <Row>
                    <div className ='header'>
                        <h4>Reset Password</h4>
                    </div>
                    <div className='fields'>
                    <Input s={10}  label="User Id" onChange={this.handleUserid}><Icon>account_circle</Icon></Input>
                    <Input s={10}  type='password'onChange={this.handleNewPassword} label="New Password" ><Icon>lock</Icon></Input>
                    <Input s={10} type='password' onChange={this.handleConfirmPassword} label="Confirm Password"><Icon>lock</Icon></Input>
                    {/* <Input name='group1' type='checkbox' value='yes' label='Remember me' /> */}
                    <Button onClick={this.handleSubmit}className='submitbtn'>Submit</Button>
                    </div>

                </Row>
            </div>
            </div>
        );
        return ( 
            <div>
                {this.state.change ? change : null}
                {this.state.employee ? (<Redirect push to = '/employeehomepage'/>): null}
            </div>
        )
    }
    handleUserid(e){
        this.setState({
            user_id : e.target.value
        })
    }
    handleConfirmPassword(e){
        this.setState({
            Confirm_Password: e.target.value
        })
    }
    handleNewPassword(e){
        this.setState({
            New_Password: e.target.value
        })
    }
    handleSubmit(){
        if(this.state.Confirm_Password === this.state.New_Password){
            axios({
                method: 'post',
                url: 'http://localhost:3001/employee/ticket/changepassword',
                data: {
                    user_id: this.state.user_id,
                    password: this.state.New_Password
                },
                withCredentials : true
            })
            .then((res) => {
                if(res.data.message === 'password has been changed'){
                    window.Materialize.toast('password has been changed',4000)
                    this.setState({
                        employee: true
                    })
                }
            })
        }else{
            window.Materialize.toast('passwords does not match',4000)
        }
       
    }
}
export default PasswordChange