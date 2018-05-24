import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button, Row, Col, Card } from 'react-materialize'
import {
    Redirect
} from 'react-router-dom';
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import logo from './LOGO.png'

class PasswordChange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Confirm_Password: { 
                value: '',
                showError: false,
                error: ""
            },
            New_Password:  { 
                value: '',
                showError: false,
                error: ""
            },
            user_id:  { 
                value: '',
                showError: false,
                error: ""
            },
            change: true
        }
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserid = this.handleUserid.bind(this)
    }
    render() {
        var change = (
            <div className='white' style={{ height: '100vh', position: 'relative' }}>
                <div className='header1' style={{ padding: '20px 0', color: 'white', textAlign: 'center' }}>
                    <Col s={2} offset={"m2"}>
                        <img height='200px' width='200px' s={2} alt="wal" src={logo} />
                    </Col>
                    <h4 style={{ marginTop: 0, textAlign: 'center', fontWeight: 300, color: 'black' }}>Inventory Management System </h4>
                </div>
                <Row>
                    <Col s={12} m={6} l={4} offset={'m3 l4'} style={{ marginTop: 0 }}>
                        <form onSubmit={this.handleSubmit}>
                            <Card className="z-depth-2" title="Reset your password" style={{ padding: '15px' }}>
                                <Row>
                                    <Input s={12} label="User Id" onChange={this.handleUserid} error={this.state.user_id.showError ? this.state.user_id.error : null}icon="account_box" autoFocus></Input>
                                </Row>
                                <Row>
                                    <Input s={12} type='password' onChange={this.handleNewPassword} error={this.state.New_Password.showError ? this.state.New_Password.error : null}label="New Password" icon="lock"></Input>
                                </Row>
                                <Row>
                                    <Input s={12} type='password' onChange={this.handleConfirmPassword} error={this.state.Confirm_Password.showError ? this.state.Confirm_Password.error : null}label="Confirm Password" icon="lock"></Input>
                                </Row>
                                <Row>
                                    <Col s={6} m={6} l={4} offset={'s3 m3 l4'}>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </form>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div>
                {this.state.change ? change : null}
                {this.state.employee ? (<Redirect push to='/login' />) : null}
            </div>
        )
    }
    handleUserid(e) {
        this.setState({
            user_id: Object.assign(this.state.user_id, {
                value: e.target.value
            })
        })
        
    }
    handleConfirmPassword(e) {
        this.setState({
            Confirm_Password: Object.assign(this.state.Confirm_Password, {
                value: e.target.value
            })
        })
    }
    handleNewPassword(e) {
        this.setState({
            New_Password: Object.assign(this.state.New_Password, {
                value: e.target.value
            })
        })
    }
    componentDidMount() {
        $('label').addClass('active')
    }
    handleSubmit(e) {
        e.preventDefault()
        if(!this.state.user_id.value){
            this.setState({
                user_id: Object.assign(this.state.user_id, {
                    error: 'User Id is Required',
                    showError: true
                }),
            })
           
        }else{
            this.setState({
                user_id: Object.assign(this.state.user_id, {
                    error: '',
                    showError: false
                }),
            })
        }
        if(this.state.New_Password.value.length === 0){
            this.setState({
                New_Password: Object.assign(this.state.New_Password, {
                    error: 'New Password is Required',
                    showError: true
            }),
        })
        }else{
            this.setState({
                New_Password: Object.assign(this.state.New_Password, {
                    error: '',
                    showError: false
                }),
            })
        }if(this.state.Confirm_Password.value.length === 0){
            this.setState({
                Confirm_Password: Object.assign(this.state.Confirm_Password, {
                    error: 'Confirm Password is Required',
                    showError: true
                }),
            })
        }else{
            this.setState({
                Confirm_Password: Object.assign(this.state.Confirm_Password, {
                    error: '',
                    showError: false
                }),
            })
        }
        if(this.state.New_Password.value.length < 6){
            this.setState({
                New_Password: Object.assign(this.state.New_Password, {
                    error: 'Minimum 6 letters password required',
                    showError: true
                }),
            })
        }else{
                this.setState({
                    New_Password: Object.assign(this.state.New_Password, {
                        error: '',
                        showError: false
                    }),
                })
        }
            
        if(this.state.New_Password.value !== this.state.Confirm_Password.value){
            this.setState({
                Confirm_Password: Object.assign(this.state.Confirm_Password, {
                    error: 'Passwords do not match',
                    showError: true
                }),
            })
        }
        // else{
        //     this.setState({
        //         Confirm_Password: Object.assign(this.state.Confirm_Password, {
        //             error: '',
        //             showError: false
        //         }),
        //     })
        // }
        if (this.state.Confirm_Password.value === this.state.New_Password.value && this.state.Confirm_Password.value.length >= 6) {
            axios({
                method: 'post',
                url: `${baseUrl}/employee/ticket/changepassword`,
                data: {
                    user_id: this.state.user_id.value,
                    password: this.state.New_Password.value
                    , email: this.state.email
                },
                withCredentials: true
            })
                .then((res) => {
                    if (res.data.message === 'password has been changed') {
                        window.Materialize.toast('password has been changed', 4000)
                        this.setState({
                            employee: true
                        })
                    }
                })
        } 
        // else {
        //     this.setState({
        //         Confirm_Password: Object.assign(this.state.Confirm_Password, {
        //             error: 'Passwords does not match',
        //             showError: true
        //         }),
        //         New_Password:Object.assign(this.state.New_Password, {
        //             error: 'Passwords does not match',
        //             showError: true
        //         })
        //     })
        // }

    }

}
export default PasswordChange