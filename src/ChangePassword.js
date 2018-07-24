import React, {Component} from 'react';
import axios from 'axios'
import {Button,Row, Input} from 'react-materialize';
import logo from './LOGO.png';
import {Redirect} from 'react-router-dom';
import $ from 'jquery'
import {baseUrl} from './config';
import swal from 'sweetalert';


class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentPassword : {
                value : '',
                error : '',
                showError : false
            },
            newPassword : {
                value : '',
                error : '',
                showError : false
            },
            dashboard : false,
            redirect : false,
            login : false,
            change : false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
        this.handleCurrentPassword = this.handleCurrentPassword.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.checkValidation = this.checkValidation.bind(this)
    }

    handleCancel(){
        this.setState({
            currentPassword : {
                value : '',
                error : '',
                showError : false
            },
            newPassword : {
                value : '',
                error : '',
                showError : false
            },
        })
        $(".modal-overlay").trigger('click');        

    }

    checkValidation(){
        if(!this.state.currentPassword.showError && !this.state.newPassword.showError){
            this.setState({
                change : true
            })
        }
    }

    handleSubmit(){
        axios({
            method : 'post',
            url : `${baseUrl}/user/changespassword`,
            data : {
                password : this.state.newPassword.value,
                currentPassword : this.state.currentPassword.value
            },
            withCredentials : true
        })
        .then(res => {
            if(res.data.message === 'Current password is wrong'){
                this.setState({
                    currentPassword: Object.assign(this.state.currentPassword, {
                        error: 'Enter correct password',
                        showError: true
                    }),
                    change : false
                })
            }else{

                swal('Password has been changed', {
                    buttons : false,
                    timer : 2000
                })
                this.setState({
                    login : true
                })
                $('.modal-close').trigger('click')
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect: true
                })
            }
            console.error(error)
        })
    }

    handleCurrentPassword(e){
        if(e.target.value.length >= 6){
            this.setState({
                currentPassword: Object.assign(this.state.currentPassword, {
                    value: e.target.value,
                    showError: false
                })
            })
        }else if(e.target.value.length < 6){
            this.setState({
                currentPassword: Object.assign(this.state.currentPassword, {
                    error: 'Enter valid password with min length of 6',
                    showError: true
                })
            })
        }
    }
    handleNewPassword(e){
        if(e.target.value.length >= 6){
            this.setState({
                newPassword: Object.assign(this.state.newPassword, {
                    value: e.target.value,
                    showError: false
                })
            })
        }else if(e.target.value.length < 6){
            this.setState({
                newPassword: Object.assign(this.state.newPassword, {
                    error: 'Enter valid password with min length of 6',
                    showError: true
                })
            })
        }
    }

    render(){
        return (
            <div className="no-footer">
                <h5 className='title'>Change Password</h5 >
                <Row>

                    <Input s={6} type='password' onChange={this.handleCurrentPassword} error={this.state.currentPassword.showError ? this.state.currentPassword.error : null}label="Current Password" icon="lock"></Input>
                    <Input s={6} type='password' onChange={this.handleNewPassword} error={this.state.newPassword.showError ? this.state.newPassword.error : null}label="New Password" icon="lock"></Input>
                    <div className='splitModalButtons'>
                        <Button style={{bottom: '0%'}} waves='light' onClick = {this.checkValidation} >Submit</Button>
                        <Button onClick={this.handleCancel} className="modal-close vendorclosebutton cancelButton">Cancel</Button>
                    </div>

                </Row>
                {this.state.change ? this.handleSubmit() : null}
                {this.state.redirect? <Redirect
                    to={{
                        pathname: "/login",
                        search: '?sessionExpired=true'
                    }}/>: null
                }
                {this.state.login ? <Redirect to = {{pathname : '/login'}}/> : null}
            </div>
        )
    }
}

export default ChangePassword