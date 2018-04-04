import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon} from 'react-materialize'


class AssignAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            assignAssetRequest : false,
            assignAssetFormRequest : false,
            user_id : 'Select',
            from : '',
            expected_recovery : '',
            employees : [],
            assets : []
        }
        this.assignAssetIntoDb = this.assignAssetIntoDb.bind(this)
        this.setFrom = this.setFrom.bind(this)
        this.setExpectedRecovery = this.setExpectedRecovery.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setEmployee = this.setEmployee.bind(this)
    }

    checkForValidation(){
        if(this.state.user_id === 'Select' || !this.state.from || !this.state.expected_recovery){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            if(new Date(this.state.from) > new Date(this.state.expected_recovery)){
                window.Materialize.toast('Expected Recovery cannot be less than FROM', 4000)
            }
            else{
                this.setState({
                    assignAssetRequest : true
                })
            }
        }
    }

    assignAssetIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/assign',
            data : {
                asset_id : this.props.asset,
                user_id : this.state.user_id,
                from : this.state.from,
                expected_recovery : this.state.expected_recovery
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assignAssetRequest : false
            })
            window.Materialize.toast('Asset Assigned', 4000)
            this.props.setHandleListRequest()
        })
    }

    setEmployeeDropdown(){
        var employeesArr = []
        employeesArr.push(<option key='Select' value='Select'>Select</option>)
        this.state.employees.forEach(employee => {
            employeesArr.push(<option key={employee.id} value={employee.id}>{`${employee.first_name} ${employee.last_name}`}</option>)
        });
        return employeesArr
    }

    setEmployee(e){
        this.setState({
            user_id : e.target.value
        })
    }

    setFrom(e){
        this.setState({
            from : e.target.value
        })
    }

    setExpectedRecovery(e){
        this.setState({
            expected_recovery : e.target.value
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
                    <Input s={12} type="select" label="Assign to*" onChange = {this.setEmployee}>{this.setEmployeeDropdown()}</Input>
                    <Input s={12} type='date' label="From *" value = {this.state.from} onChange = {this.setFrom} />
                    <Input s={12} type='date' label="Expected Recovery*" value = {this.state.expected_recovery} onChange = {this.setExpectedRecovery} />
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
            </div>
        )
    }

}

export default AssignAsset