import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import { baseUrl } from './config';
import $ from 'jquery';
import swal from 'sweetalert'
import {
    Redirect
  } from 'react-router-dom';

import DateInput from './shared/DateInput';
import moment from 'moment'
class AssignAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            assignAssetRequest : false,
            assignAssetFormRequest : false,
            user_id : {
                value: 'Select',
                error: '',
                showError: false
            },
            from : {
                value: '',
                error: '',
                showError: false
            },
            expected_recovery : {
                value: '',
                error: '',
                showError: false
            },
            employees : [],
            assets : []
            ,assignForce : false,
            redirect : false
        }
        this.assignAssetIntoDb = this.assignAssetIntoDb.bind(this)
        this.setFrom = this.setFrom.bind(this)
        this.setExpectedRecovery = this.setExpectedRecovery.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setEmployee = this.setEmployee.bind(this)
        this.clearFields = this.clearFields.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.from.value !== this.state.from.value){
            this.forceUpdate()
        }
    }

    checkForValidation(){
        // if(this.state.user_id === 'Select' || !this.state.from || !this.state.expected_recovery){
        //     window.Materialize.toast('All the * marked fields are required', 4000)
        // }
        // else{
        //     if(new Date(this.state.from) > new Date(this.state.expected_recovery)){
        //         window.Materialize.toast('Expected Recovery cannot be less than FROM', 4000)
        //     }
        //     else{
        //         this.setState({
        //             assignAssetRequest : true
        //         })
        //     }
        // }
        if(this.state.user_id.value === 'Select'){
            this.setState({
                user_id:Object.assign(this.state.user_id, {
                    error: 'Select an Employee',
                    showError: true
                })
            })
        }
        if(this.state.user_id.value !== 'Select'){
            this.setState({
                user_id:Object.assign(this.state.user_id, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.from.value){
            this.setState({
                from:Object.assign(this.state.from, {
                    error: 'The FROM date is required',
                    showError: true
                })
            })
        }
        if(this.state.from.value){
            this.setState({
                from:Object.assign(this.state.from, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.expected_recovery.value){
            this.setState({
                expected_recovery:Object.assign(this.state.expected_recovery, {
                    error: 'The Expected Recovery date is required',
                    showError: true
                })
            })
        }
        if(this.state.expected_recovery.value){
            this.setState({
                expected_recovery:Object.assign(this.state.expected_recovery, {
                    error: '',
                    showError: false
                })
            })
        }
        if(new Date(this.state.from.value) > new Date(this.state.expected_recovery.value)) {
            this.setState({
                expected_recovery: Object.assign(this.state.expected_recovery, {
                    error: 'The Expected Recovery cannot be before the FROM date',
                    showError: true
                })
            })
        }
        if(new Date(this.state.from.value) <= new Date(this.state.expected_recovery.value)) {
            this.setState({
                expected_recovery: Object.assign(this.state.expected_recovery, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.user_id.value!=='Select' && this.state.from.value && this.state.expected_recovery.value && new Date(this.state.from.value) <= new Date(this.state.expected_recovery.value)) {
            this.setState({
                assignAssetRequest : true
            })
        }
    }

    assignAssetIntoDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/assign`,
            data : {
                asset_id : this.props.asset,
                user_id : this.state.user_id.value,
                from : this.state.from.value,
                expected_recovery : this.state.expected_recovery.value
                ,assignForce : this.state.assignForce
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assignAssetRequest : false
            })
            swal(res.data.message,{
                buttons: false,
                timer: 2000,
              })
              $('.modal').hide()
              $('.modal-overlay').hide()


            if(res.data.requireAssignForce){
                this.setState({
                    assignForce : true
                })
            }
            else{
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect: true
                })
            }
        })
    }

    setEmployeeDropdown(){
        var employeesArr = []
        employeesArr.push(<option key='Select' value='Select'>Select</option>)
        this.state.employees.forEach(employee => {
            employeesArr.push(<option key={employee.user_id} value={employee.user_id}>{`${employee.first_name} ${employee.last_name}`}</option>)
        });
        return employeesArr
    }

    setEmployee(e){
        this.setState({
            user_id : Object.assign(this.state.user_id, {
                value: e.target.value
            })
        })
    }

    setFrom(e){
        this.setState({
            from : Object.assign(this.state.from, {
                value: e.target.value
            })
        })
    }
    
    setExpectedRecovery(e){
        this.setState({
            expected_recovery : Object.assign(this.state.expected_recovery, {
                value: e.target.value
            })
        })
    }

    componentDidMount(){
        axios({
            method : 'get',
            url : `${baseUrl}/asset/assign-form`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                employees : res.data.employees,
                assets : res.data.assets
            })
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect: true
                })
            }
        })
    }
    clearFields(){
        this.setState({
            user_id : {
                value: 'Select',
                error: '',
                showError: false
            },
            from : {
                value: '',
                error: '',
                showError: false
            },
            expected_recovery : {
                value: '',
                error: '',
                showError: false
            }
        })
        $(".modal-overlay").trigger('click');
    }

    render(){
        return(
            <div className="no-footer">
                {this.state.assignAssetRequest ? this.assignAssetIntoDb() : null}
                <h5 className="title">Assign Asset</h5>
                <Row>
                    <Input s={12} type="select" label="Assign to*" onChange = {this.setEmployee} value={this.state.user_id.value} error={this.state.user_id.showError ? this.state.user_id.error : null}>{this.setEmployeeDropdown()}</Input>
                    {/* <Input s={12} type='date' label="From *" 
                    value = {this.state.from.value} onChange = {this.setFrom} 
                    error={this.state.from.showError ? this.state.from.error : null} 
                    /> */}
                     <DateInput
                        label="From *" 
                        options={{max: moment(new Date(), "D MMMM, YYYY").toDate()}}
                        value = {this.state.from.value} 
                        onChange = {this.setFrom} 
                        error={this.state.from.showError ? this.state.from.error : null} 
                    />
                    <DateInput
                        label="Expected Recovery*" 
                        options={{min: moment(this.state.from.value, "D MMMM, YYYY").toDate()}}
                        value = {this.state.expected_recovery.value} 
                        onChange = {this.setExpectedRecovery} 
                        error={this.state.expected_recovery.showError ? this.state.expected_recovery.error : null} 
                    />
                    {/* <Input s={12} 
                        type='date' label="Expected Recovery*" 
                        min={this.state.from.value} 
                        options={{min: moment(this.state.from.value, "D MMMM, YYYY").toDate()}}
                        className='datepicker' 
                        value = {this.state.expected_recovery.value} 
                        onChange = {this.setExpectedRecovery} 
                        error={this.state.expected_recovery.showError ? this.state.expected_recovery.error : null} 
                    /> */}
                </Row>
                <div className="splitModalButtons">
                    <Button waves='light' onClick = {this.checkForValidation} >{this.state.assignForce ? "Assign Anyway" : "Submit"}</Button>
                    <Button className="cancelButton modal-close" onClick ={this.clearFields} >Cancel</Button>
                </div>
                {this.state.assignForce ? <p style={{color : 'red'}}>This Employee Already has this type of Asset</p> : null}
                {this.state.redirect ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />: null}
            </div>
        )
    }

}

export default AssignAsset