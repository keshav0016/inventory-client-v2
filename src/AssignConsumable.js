import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'



class AssignConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable.consumable_id,
            user_id : '',
            quantity : '',
            assignConsumableRequest : false
        }

        this.setEmployeeId=this.setEmployeeId.bind(this)
        this.setConsumableQuantity=this.setConsumableQuantity.bind(this)
        this.AssignConsumable=this.AssignConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }

    checkForValidation(){
        if(this.state.quantity <= 0){
            window.Materialize.toast('The quantity cannot be negative', 4000)
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


    setEmployeeId(e) {
        this.setState({
            user_id : e.target.value
        })
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
                    <Input s={6} label="Employee Id" value={this.state.user_id} onChange={this.setEmployeeId} />
                    <Input s={6} label="Consumable Quantity" type="number" min={0} value={this.state.quantity} onChange={this.setConsumableQuantity} />
                </Row>
                <Button waves='light' onClick={this.checkForValidation}>Assign Consumable</Button>
                {this.state.assignConsumableRequest ? this.AssignConsumable () : null}
            </div>
        )
    }
}

export default AssignConsumables