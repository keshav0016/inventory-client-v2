import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'



class UpdateConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable.consumable_id,
            name : this.props.consumable.name,
            quantity : this.props.consumable.quantity,
            updateConsumableRequest : false
        }

        this.setConsumableName=this.setConsumableName.bind(this)
        this.setConsumableQuantity=this.setConsumableQuantity.bind(this)
        this.UpdateConsumable=this.UpdateConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }

    checkForValidation(){
        if(this.state.quantity <= 0){
            window.Materialize.toast('The quantity cannot be negative', 4000)
        }
        else{
            this.setState({
                updateConsumableRequest : true
            })
        }
    }


    setConsumableName(e) {
        this.setState({
            name : e.target.value
        })
    }

    setConsumableQuantity(e) {
        this.setState({
            quantity : e.target.value
        })
    }

    UpdateConsumable() {
        axios({
            method: 'post',
            url: 'http://localhost:3001/consumables/update',
            data: {
                consumable_id : this.state.consumable_id,
                name : this.state.name,
                quantity : this.state.quantity
            }
        })
        .then(obj => {
            this.setState({
                updateConsumableRequest : false
            })
            window.Materialize.toast('Consumable Updated Successfully', 4000)
            this.props.setHandleListRequest()
        })
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Input s={6} label="Consumable Name" value={this.state.name} onChange={this.setConsumableName} />
                    <Input s={6} label="Consumable Quantity" type="number" min={0} value={this.state.quantity} onChange={this.setConsumableQuantity} />
                </Row>
                <Button waves='light' onClick={this.checkForValidation}>Update</Button>
                {this.state.updateConsumableRequest ? this.UpdateConsumable () : null}
            </div>
        )
    }
}

export default UpdateConsumables