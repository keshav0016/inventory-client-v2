import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'



class AssignConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable.consumable_id,
            quantity : '',
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
        if(this.state.quantity <= 0){
            window.Materialize.toast('The quantity cannot be negative', 4000)
        }
        else if(this.props.consumable.quantity < this.state.quantity){
            window.Materialize.toast('The Requested quantity is greater than the Available quantity', 4000)
        }
        else if(!this.state.user_id){
            window.Materialize.toast('The Employee Id field cannot be empty', 4000)
        }
        else{
            this.setState({
                assignConsumableRequest : true
            })
        }
    }


    setConsumableQuantity(e) {
        this.setState({
            quantity : e.target.value
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
                quantity : this.state.quantity
            }
        })
        .then(obj => {
            this.setState({
                user_id:'',
                quantity:'',
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
                    <Input s={6} label="Consumable Quantity" type="number" min={0} value={this.state.quantity} onChange={this.setConsumableQuantity} />
                </Row>
                <Button waves='light' onClick={this.checkForValidation}>Assign Consumable</Button>
                {this.state.fetchEmployeeList ? this.getEmployeeList() : null}
                {this.state.assignConsumableRequest ? this.AssignConsumable () : null}
            </div>
        )
    }
}

export default AssignConsumables