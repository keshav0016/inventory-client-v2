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
            Confirm_Password: '',
            New_Password: '',
            user_id: this.props.location.user,
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
                    <Col s={4} offset={'s4'} style={{ marginTop: 0 }}>
                        <form onSubmit={this.handleSubmit}>
                            <Card className="z-depth-2" title="Reset your password" style={{ padding: '15px' }}>
                                <Row>
                                    <Input s={12} label="User Id" onChange={this.handleUserid} icon="account_box" autoFocus></Input>
                                </Row>
                                <Row>
                                    <Input s={12} type='password' onChange={this.handleNewPassword} label="New Password" icon="lock"></Input>
                                </Row>
                                <Row>
                                    <Input s={12} type='password' onChange={this.handleConfirmPassword} label="Confirm Password" icon="lock"></Input>
                                </Row>
                                <Row>
                                    <Col s={6} offset={'s3'}>
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
    handleUserid(e) {
        this.setState({
            user_id: e.target.value
        })
    }
    handleConfirmPassword(e) {
        this.setState({
            Confirm_Password: e.target.value
        })
    }
    handleNewPassword(e) {
        this.setState({
            New_Password: e.target.value
        })
    }
    componentDidMount() {
        $('label').addClass('active')
    }
    handleSubmit(e) {
        e.preventDefault()
        if (this.state.Confirm_Password === this.state.New_Password) {
            axios({
                method: 'post',
                url: `${baseUrl}/employee/ticket/changepassword`,
                data: {
                    user_id: this.state.user_id,
                    password: this.state.New_Password
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
        } else {
            window.Materialize.toast('passwords does not match', 4000)
        }

    }

}
export default PasswordChange