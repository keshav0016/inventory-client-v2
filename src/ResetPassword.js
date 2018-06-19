import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button, Row, Icon, Col, Card } from 'react-materialize'
import {
    Redirect
} from 'react-router-dom';
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import logo from './LOGO.png';
import swal from 'sweetalert';

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Confirm_Password: {
                value: '',
                error: '',
                showError: false
            },
            New_Password: {
                value: '',
                error: '',
                showError: false
            },
            user_id: this.props.match.params.user,
            emailPassword: {
                value: '',
                error: '',
                showError: false
            },
            change: true
            , employee: false
        }
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
        this.setEmailPassword = this.setEmailPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserid = this.handleUserid.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }
    render() {
        var change = (
            <div className='white' style={{ height: '100vh', position: 'relative' }}>
                <div className='header1' style={{ padding: 0, color: 'white', textAlign: 'center' }}>
                    <Col s={2} offset={"m2"}>
                        <img height='200px' width='200px' s={2} alt="wal" src={logo} />
                    </Col>
                    <h4 style={{ marginTop: 0, textAlign: 'center', fontWeight: 300, color: 'black' }}>Inventory Management System </h4>
                </div>
                <Row>
                    <Col s={12} m={6} l={4} offset={'m3 l4'} style={{ marginTop: 0 }}>
                        <form onSubmit={this.checkForValidation}>
                            <Card className="z-depth-2" title="Reset your password" style={{ padding: "30px" }}>
                                <p>Check Your Email For Secret Password</p>
                                <Row>
                                    <Input autoFocus s={12} error={this.state.emailPassword.showError ? this.state.emailPassword.error : null} label="Secret Password*" type='password' onChange={this.setEmailPassword} icon='lock' />
                                </Row>
                                <Row>
                                    <Input s={12} error={this.state.New_Password.showError ? this.state.New_Password.error : null} type='password' onChange={this.handleNewPassword} label="New Password" ><Icon>lock</Icon></Input>
                                </Row>
                                <Row>
                                    <Input s={12} error={this.state.Confirm_Password.showError ? this.state.Confirm_Password.error : null} type='password' onChange={this.handleConfirmPassword} label="Confirm Password"><Icon>lock</Icon></Input>
                                </Row>
                                <Row>
                                    <Col offset={'s3'}>
                                        <Button className='submitbtn' type="submit">Submit</Button>
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

    checkForValidation(e) {
        e.preventDefault()
        if (!this.state.Confirm_Password.value) {
            this.setState({
                Confirm_Password: Object.assign(this.state.Confirm_Password, {
                    error: 'The confirm password should not be empty',
                    showError: true
                })
            })
        }
        if (this.state.Confirm_Password.value && this.state.Confirm_Password.value === this.state.New_Password.value) {
            this.setState({
                Confirm_Password: Object.assign(this.state.Confirm_Password, {
                    error: '',
                    showError: false
                })
            })
        }
        if (this.state.New_Password.value.length < 6) {
            this.setState({
                New_Password: Object.assign(this.state.New_Password, {
                    error: 'The new password should be minimum 6 letters',
                    showError: true
                })
            })
        }
        if (this.state.New_Password.value.length >= 6) {
            this.setState({
                New_Password: Object.assign(this.state.New_Password, {
                    error: '',
                    showError: false
                })
            })
        }
        if (!this.state.emailPassword.value) {
            this.setState({
                emailPassword: Object.assign(this.state.emailPassword, {
                    error: 'The secret key should not be empty',
                    showError: true
                })
            })
        }
        if (this.state.emailPassword.value) {
            this.setState({
                emailPassword: Object.assign(this.state.emailPassword, {
                    error: '',
                    showError: false
                })
            })
        }
        if (this.state.New_Password.value !== this.state.Confirm_Password.value) {
            this.setState({
                Confirm_Password: Object.assign(this.state.Confirm_Password, {
                    error: 'The passwords does not match',
                    showError: true
                })
            })
        }
        // if (this.state.New_Password.value === this.state.Confirm_Password.value) {
        //     this.setState({
        //         Confirm_Password: Object.assign(this.state.Confirm_Password, {
        //             error: '',
        //             showError: false
        //         })
        //     })
        // }
        if (this.state.Confirm_Password.value && this.state.New_Password.value && this.state.emailPassword.value && this.state.New_Password.value === this.state.Confirm_Password.value) {
            this.handleSubmit()
        }
    }

    setEmailPassword(e) {
        this.setState({
            emailPassword: Object.assign(this.state.emailPassword, {
                value: e.target.value
            })
        })
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

    componentDidUpdate(){
        $('label').addClass('active')
    }

    handleSubmit() {
        if (this.state.Confirm_Password.value === this.state.New_Password.value) {
            axios({
                method: 'post',
                url: `${baseUrl}/employees/reset`,
                data: {
                    user_id: this.state.user_id,
                    password: this.state.New_Password.value
                    , emailPassword: this.state.emailPassword.value
                },
                withCredentials: true
            })
                .then((res) => {
                    if (res.data.message === 'password has been changed') {
                        // window.Materialize.toast('password has been changed', 4000)
                        swal("password has been changed",{
                            buttons: false,
                            timer: 2000,
                          })
                        this.setState({
                            employee: true
                        })
                    }
                })
        } else {
            // window.Materialize.toast('passwords does not match', 4000)
            swal("passwords does not match",{
                buttons: false,
                timer: 2000,
              })
        }

    }

}
export default ResetPassword