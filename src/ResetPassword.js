import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Row, Icon, Col, Card} from 'react-materialize'
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
            <div className='teal' style={{height: '100vh', position: 'relative'}}>
                <Row>
                    <Col s={4} offset={'s4'} style={{marginTop:'90.67px'}}>
                        <form onSubmit={this.handleSubmit}>
                            <Card className="z-depth-2" title="Reset your password" style={{padding: "30px"}}>
                                <p>Check Your Email For Secret Password</p>
                                <Row>
                                    <Input autoFocus s={12}  placeholder="Secret Password*" type='password' onChange={this.setEmailPassword} icon='lock' />
                                </Row>
                                <Row>
                                    <Input s={12}  type='password'onChange={this.handleNewPassword} placeholder="New Password" ><Icon>lock</Icon></Input>
                                </Row>
                                <Row>
                                    <Input s={12} type='password' onChange={this.handleConfirmPassword} placeholder="Confirm Password"><Icon>lock</Icon></Input>
                                </Row>
                                <Row>
                                    <Col offset={'s3'}>
                                        <Button className='submitbtn'type="submit">Submit</Button>
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
    handleSubmit(e){
        e.preventDefault();
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