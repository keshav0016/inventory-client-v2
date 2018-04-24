import React, { Component } from 'react';
import './forgotpassword.css'
import axios from 'axios';
import { Input, Button, Row, Col, Card } from 'react-materialize';
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
            user_id: {
                value:'',
                error:'',
                showError:false
            },
            email: {
                value:'',
                error:'',
                showError:false
            }
            ,redirect : false
        }
        this.getUserid = this.getUserid.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.verifyCredentials = this.verifyCredentials.bind(this);
    }

    //function to fetch the username from the username textfield
    getUserid(event) {
        this.setState({
            user_id:  Object.assign(this.state.user_id, {
                value : event.target.value
            })
        })
    }

    //function to fetch the password from the password textfield
    getEmail(event) {
        this.setState({
            email:  Object.assign(this.state.email, {
                value : event.target.value
            })
        })
    }

    verifyCredentials(e) {
        e.preventDefault();
        
        var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(!reg.test(this.state.email.value)){
            this.setState({
                email: Object.assign(this.state.email, {
                    error:'Enter Valid Email',
                    showError:true
                }),
            })
        }
        else{
            this.setState({
                email: Object.assign(this.state.email, {
                    showError:false
                }),
            })
        }

        if(!this.state.user_id.value){
            this.setState({
                user_id: Object.assign(this.state.user_id, {
                    error:'Enter the User Id',
                    showError:true
                }),
            })
        }
        else{
            this.setState({
                user_id: Object.assign(this.state.user_id, {
                    showError:false
                }),
            })
        }

        if(!this.state.email.showError && !this.state.user_id.showError){
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
                window.Materialize.toast(res.data.message, 4000)
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
    }


    render() {
        return (
            <div className="teal" style={{height: '100vh', position: 'relative'}}>
                <Row>
                    <Col s={4} offset={'s4'} style={{marginTop:'90.67px'}}>
                        <form onSubmit={this.verifyCredentials}>
                            <Card className="z-depth-2" title="Reset your password" style={{padding: "30px",height:'450.5px'}}>
                            <Row>
                                <Input autoFocus s={12} onChange={this.getUserid} label="Employee ID" icon="account_box" error={this.state.user_id.showError ? this.state.user_id.error : null}/>
                            </Row>
                            <Row>
                                <Input s={12} type="email" onChange={this.getEmail} label="Email" icon="email" error={this.state.email.showError ? this.state.email.error : null}></Input>
                            </Row>
                            <Row>
                                <Col s={6} offset={'s3'}>
                                    <Button className="teal" type="submit" style={{width:'100%'}}>Reset</Button>
                                </Col>
                            </Row>
                            {this.state.redirect ? <Redirect push to={`/user/reset/${this.state.user_id.value}`} /> : null}
                            </Card>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ForgotPasswordForm;
