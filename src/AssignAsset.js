import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon} from 'react-materialize'


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
            ,assignForce : false
        }
        this.assignAssetIntoDb = this.assignAssetIntoDb.bind(this)
        this.setFrom = this.setFrom.bind(this)
        this.setExpectedRecovery = this.setExpectedRecovery.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setEmployee = this.setEmployee.bind(this)
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
                    error: 'The from date is required',
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
                    error: 'The expected delivery date is required',
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
                from:Object.assign(this.state.from, {
                    error: 'The delivery date cannot be before the from date',
                    showError: true
                })
            })
        }
        if(new Date(this.state.from.value) < new Date(this.state.expected_recovery.value)) {
            this.setState({
                from:Object.assign(this.state.from, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.user_id.value!=='Select' && this.state.from.value && this.state.expected_recovery.value && new Date(this.state.from.value) < new Date(this.state.expected_recovery.value)) {
            this.setState({
                assignAssetRequest : true
            })
        }
    }

    assignAssetIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/assign',
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
            window.Materialize.toast(res.data.message, 4000)
            if(res.data.requireAssignForce){
                this.setState({
                    assignForce : true
                })
            }
            else{
                this.props.setHandleListRequest()
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
            url : 'http://localhost:3001/asset/assign-form',
            withCredentials : true
        })
        .then(res => {
            this.setState({
                employees : res.data.employees,
                assets : res.data.assets
            })
        })
    }

    render(){
        return(
            <div>
                {this.state.assignAssetRequest ? this.assignAssetIntoDb() : null}
                <Row>
                    <br />
                    <br />
                    <Input s={12} type="select" label="Assign to*" onChange = {this.setEmployee} error={this.state.user_id.showError ? this.state.user_id.error : null}>{this.setEmployeeDropdown()}</Input>
                    <Input s={12} type='date' label="From *" value = {this.state.from.value} onChange = {this.setFrom} error={this.state.from.showError ? this.state.from.error : null} />
                    <Input s={12} type='date' label="Expected Recovery*" value = {this.state.expected_recovery.value} onChange = {this.setExpectedRecovery} error={this.state.expected_recovery.showError ? this.state.expected_recovery.error : null} />
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >{this.state.assignForce ? "Assign Anyway" : "Submit"} <Icon small right>send</Icon></Button>
                {this.state.assignForce ? <p style={{color : 'red'}}>This Employee Already has this type of Asset</p> : null}
            </div>
        )
    }

}

export default AssignAsset