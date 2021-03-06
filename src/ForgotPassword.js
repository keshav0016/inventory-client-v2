import React, { Component } from 'react';
import './forgotpassword.css'
import axios from 'axios';
import { Input, Button, Row, Col, Card } from 'react-materialize';
import {

    Redirect, Link
} from 'react-router-dom';
import { baseUrl } from './config';
import logo from './LOGO.png';
import swal from 'sweetalert';

class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: {
                value: '',
                error: '',
                showError: false
            },
            email: {
                value: '',
                error: '',
                showError: false
            }
            , redirect: false,
            login : false
        }
        this.getUserid = this.getUserid.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.verifyCredentials = this.verifyCredentials.bind(this);
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
    getEmail(event) {
        this.setState({
            email: Object.assign(this.state.email, {
                value: event.target.value
            })
        })
    }

    verifyCredentials(e) {
        e.preventDefault();

        var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;

        if (!reg.test(this.state.email.value)) {
            this.setState({
                email: Object.assign(this.state.email, {
                    error: "Enter Valid West Agile Lab's Email",
                    showError: true
                }),
            })
        }
        else {
            this.setState({
                email: Object.assign(this.state.email, {
                    showError: false
                }),
            })
        }

        if (!this.state.user_id.value) {
            this.setState({
                user_id: Object.assign(this.state.user_id, {
                    error: 'Enter the User Id',
                    showError: true
                }),
            })
        }
        else {
            this.setState({
                user_id: Object.assign(this.state.user_id, {
                    showError: false
                }),
            })
        }

        if (!this.state.email.showError && !this.state.user_id.showError) {
            axios({
                method: 'post',
                url: `${baseUrl}/user/forgotPassword`,
                data: {
                    user_id: this.state.user_id.value,
                    email: this.state.email.value
                },
                withCredentials: true
            })
                .then((res) => {
                    if(res.data.message === "User is Disabled"){
                        swal('Your Account has been disabled. You can not access the tool anymore',{
                            buttons: false,
                            timer: 2000,
                          })
                    }
                    if(res.data.message === 'user ID and Email does not match'){
                        swal('Enter Correct credentials',{
                            buttons: false,
                            timer: 2000,
                        })
                    }
                    if(res.data.message === 'admin not found'){
                        swal('There is no admin with this email',{
                            buttons: false,
                            timer: 2000,
                        })
                    }
                    if (res.data.message === 'Check Your Email') {
                        swal(res.data.message,{
                            buttons: false,
                            timer: 2000,
                        })
                        this.setState({
                            redirect: true
                        })
                    }else{
                        this.setState({
                            redirect: false
                        })
                    }
                })
                .catch((error) => {
                    if(error.response.status === 401){
                        this.setState({
                            login: true
                        })
                    }
                    console.log(error)
                })
        }
    }


    render() {
        return (
            
            <div className="white" style={{ height: '100vh', position: 'relative' }}>
                <div className='header1' style={{ padding: '20px 0', color: 'white', textAlign: 'center' }}>
                    <Col s={2} offset={"m2"}>
                        <img height='200px' width='200px' s={2} alt="wal" src={logo} />
                    </Col>
                    <h4 style={{ marginTop: 0, textAlign: 'center', fontWeight: 300, color: 'black' }}>Inventory Management System </h4>
                </div>
                <Row>
                    <Col s={12} m={6} l={4} offset={'m3 l4'} style={{ marginTop: 0 }}>
                        <form onSubmit={this.verifyCredentials}>
                            <Card className="z-depth-2" title="Reset your password" style={{ padding: "30px", marginTop : 0 }}>
                                <Row>
                                    <Input autoFocus s={12} onChange={this.getUserid} label="Employee ID" icon="account_box" error={this.state.user_id.showError ? this.state.user_id.error : null} />
                                </Row>
                                <Row>
                                    <Input s={12} type="email" onChange={this.getEmail} label="Email" icon="email" error={this.state.email.showError ? this.state.email.error : null}></Input>
                                </Row>
                                <Row>
                                <Col s={3}>
                                <Link to='/login' className='loginFormForgotLink' style={{whiteSpace:'nowrap'}}>Go back to Login ?</Link>
                                </Col>
                                    <Col s={3} offset={"s5"}>
                                    <Button className='submitbtn' type="submit">Reset</Button>
                                    </Col>
                                </Row>
                                {/* <Row> */}
                                    {/* <Col s={8} m={6} l={8} offset={'s2 m3 l2'}>
                                        <Button className="teal" type="submit" style={{ width: '100%' }}>Reset</Button>
                                    </Col> */}
                                {/* </Row> */}
                                {this.state.redirect ? <Redirect push to={{pathname : `/user/reset/${this.state.user_id.value}`, email: this.state.email.value}} /> : null}
                                {this.state.login? <Redirect
                                    to={{
                                        pathname: "/login",
                                        search: '?sessionExpired=true'
                                    }}/>: null}
                            </Card>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ForgotPasswordForm;
