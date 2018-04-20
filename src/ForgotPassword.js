import React, { Component } from 'react';
import './forgotpassword.css'
import axios from 'axios';
import { Icon, Input, Button, Row, Col, Card } from 'react-materialize';
// import './Login.css';
// import './Employee.css'
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

    verifyCredentials(e) {
        e.preventDefault();
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
            <div className="teal" style={{height: '100vh', position: 'relative'}}>
                <Row>
                    <Col s={4} offset={'s4'} style={{marginTop:'90.67px'}}>
                        <form onSubmit={this.verifyCredentials}>
                            <Card className="z-depth-2" title="Reset your password" style={{padding: "30px",height:'450.5px'}}>
                            <Row>
                                <Input s={12} onChange={this.getUserid} placeholder="Employee ID" icon="account_box" />
                            </Row>
                            <Row>
                                <Input s={12} type="email" onChange={this.getEmail} placeholder="Email" icon="email"></Input>
                            </Row>
                            <Row>
                                <Col s={6} offset={'s3'}>
                                    <Button className="teal" type="submit" style={{width:'100%'}}>Reset</Button>
                                </Col>
                            </Row>
                            {this.state.redirect ? <Redirect push to={`/user/reset/${this.state.user_id}`} /> : null}
                            </Card>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ForgotPasswordForm;
