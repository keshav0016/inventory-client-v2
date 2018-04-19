import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'



class AssignConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable.consumable_id,
            quantity : {
                value : '',
                error: '',
                showError: false
            },
            employeesList: [],
            fetchEmployeeList: true,
            user_id:'',
            assignConsumableRequest : false
        }

        this.setConsumableQuantity=this.setConsumableQuantity.bind(this)
        this.AssignConsumable=this.AssignConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.getEmployeeList = this.getEmployeeList.bind(this)
        this.assignedEmployee = this.assignedEmployee.bind(this)
    }

    getEmployeeList(){
        axios({
            method:'get',
            url:'http://localhost:3001/admin/ticket/listEmployee',
            withCredentials:true
        })
        .then(employeeList => {
            this.setState({
                employeesList: employeeList.data.employeeList,
                fetchEmployeeList: false
            })
        })
        .catch(error => {
            console.log(error)
        })
       }
    
       assignedEmployee(e){
           this.setState({
               user_id:this.state.employeesList[e.target.value].user_id
           })
       }

    checkForValidation(){
        if(Number(this.state.quantity.value) === 0){
            // window.Materialize.toast('The quantity cannot be negative', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error: 'The Assigning quantity should not be zero',
                    showError: true
                })
            })
        }
        if(Number(this.state.quantity.value) < 0){
            // window.Materialize.toast('The quantity cannot be negative', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error: 'The Assigning quantity should not be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.quantity.value) > 0){
            // window.Materialize.toast('The quantity cannot be negative', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error: '',
                    showError: false
                })
            })
        }
        if(Number(this.props.consumable.quantity) < Number(this.state.quantity.value)){
            // window.Materialize.toast('The Requested quantity is greater than the Available quantity', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error: 'Cannot Assign quantity greater than Available quantity',
                    showError:true
                })
            })
        }
        if(Number(this.props.consumable.quantity) > Number(this.state.quantity.value)){
            // window.Materialize.toast('The Requested quantity is greater than the Available quantity', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error: '',
                    showError:false
                })
            })
        }
        if(!this.state.user_id){
            window.Materialize.toast('The Employee Id field cannot be empty', 4000)
        }
        if(this.state.user_id && Number(this.state.quantity.value) > 0 && Number(this.props.consumable.quantity) > Number(this.state.quantity.value)){
            this.setState({
                assignConsumableRequest : true
            })
        }
    }


    setConsumableQuantity(e) {
        this.setState({
            quantity : Object.assign(this.state.quantity, {
                value: e.target.value
            })
        })
    }

    AssignConsumable() {
        axios({
            method: 'post',
            url: 'http://localhost:3001/consumables/assign',
            data: {
                consumable_id : this.state.consumable_id,
                user_id: this.state.user_id,
                assigned_date:Date.now(),
                quantity : this.state.quantity.value
            },
            withCredentials:true
        })
        .then(obj => {
            this.setState({
                user_id:'',
                quantity:{
                    value:'',
                    error:'',
                    showError:false
                },
                assignConsumableRequest : false
            })
            this.props.setHandleListRequest()
            window.Materialize.toast('Consumable Assigned Successfully', 4000)
        })
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Input s={5} type='select' onChange={this.assignedEmployee}>
                        {this.state.employeesList.map((element,index)=>{
                            return( 
                                <option key={index} value={index}>{element.first_name + " " + element.last_name}</option>
                            )
                        })}
                    </Input>
                    <Input s={6} label="Consumable Quantity" type="number" min={0} value={this.state.quantity.value} onChange={this.setConsumableQuantity} error={this.state.quantity.showError ? this.state.quantity.error : null} />
                </Row>
                <Button waves='light' onClick={this.checkForValidation}>Assign Consumable</Button>
                {this.state.fetchEmployeeList ? this.getEmployeeList() : null}
                {this.state.assignConsumableRequest ? this.AssignConsumable () : null}
            </div>
        )
    }
}

export default AssignConsumables