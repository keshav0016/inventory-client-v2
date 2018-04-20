import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Row, Icon} from 'react-materialize'
import {
   Redirect
  } from 'react-router-dom';
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';

class ResetPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            Confirm_Password : '',
            New_Password : '',
            user_id: this.props.match.params.user,
            emailPassword : '',
            change: true
            ,employee : false
        }
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
        this.setEmailPassword = this.setEmailPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserid = this.handleUserid.bind(this)
    }
    render(){
        var change =(
            <div className='background'>
            <div class='passwordchangeform1'>
                <Row>
                    <div className ='header'>
                        <h4>Reset Password</h4>
                    </div>
                    <div className='fields1'>
                    <Input s={12}  label="email Password*" type='password' onChange={this.setEmailPassword} icon='lock' />
                    <Input s={12}  type='password'onChange={this.handleNewPassword} label="New Password" ><Icon>lock</Icon></Input>
                    <Input s={12} type='password' onChange={this.handleConfirmPassword} label="Confirm Password"><Icon>lock</Icon></Input>
                    <Button className='submitbtn'onClick={this.handleSubmit}>Submit</Button>
                    </div>

                </Row>
            </div>
            </div>
        );
        return ( 
            <div>
                {this.state.change ? change : null}
                {this.state.employee ? (<Redirect push to = '/login'/>): null}
            </div>
        )
    }

    setEmailPassword(e){
        this.setState({
            emailPassword : e.target.value
        })
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
    componentDidMount(){
        $('label').addClass('active')
    }
    handleSubmit(){
        if(this.state.Confirm_Password === this.state.New_Password){
            axios({
                method: 'post',
                url: `${baseUrl}/employees/reset`,
                data: {
                    user_id: this.state.user_id,
                    password: this.state.New_Password
                    ,emailPassword : this.state.emailPassword
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
export default ResetPassword