import React, { Component } from 'react';
import './forgotpassword.css'
import axios from 'axios';
import { Icon, Input, Button, Row } from 'react-materialize';
import {

  Redirect
} from 'react-router-dom';
import { baseUrl } from './config';

class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            email: ''
            ,redirect : false
        }
        this.getUserid = this.getUserid.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.verifyCredentials = this.verifyCredentials.bind(this);
    }

    //function to fetch the username from the username textfield
    getUserid(event) {
        this.setState({
            user_id: event.target.value
        })
    }

    //function to fetch the password from the password textfield
    getEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    verifyCredentials() {
        axios({
            method: 'post',
            url: `${baseUrl}/user/forgotPassword`,
            data: {
                user_id: this.state.user_id,
                email: this.state.email
            },
            withCredentials: true
        })
            .then((res) => {
                if (res.data.message === 'Check Your Email') {
                    this.setState({
                        redirect: true
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render() {
        return (
            <div className="forgotPasswordContainer">
                <form className="formContainer">
                    <p className="resetPasswordTitle"><b>Reset  Your  Password</b></p>
                    <p className="resetPasswordMessage">It is often forgotten that password thing.
                Enter your email address below and click on the <b>'Request password Reset'</b> Button.
                We will contact you shortly.</p>
                    <Row>
                        <Input style={{ marginLeft: '45px' }} s={10} onChange={this.getUserid} className="resetPasswordEmailField" placeholder="Employee ID" />
                        <Input s={11} type="email" onChange={this.getEmail} className="resetPasswordEmailField" placeholder="Email"><Icon tiny left>email</Icon></Input>
                    </Row>
                    <Button className="resetPassword" type="button" onClick={this.verifyCredentials}>Request Password Reset</Button>
                </form>
                {this.state.redirect ? <Redirect push to={`/user/reset/${this.state.user_id}`} /> : null}
            </div>
        )
    }
}

export default ForgotPasswordForm;
