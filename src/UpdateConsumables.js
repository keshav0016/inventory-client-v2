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
        }

        this.setConsumableName=this.setConsumableName.bind(this)
        this.setConsumableQuantity=this.setConsumableQuantity.bind(this)
        this.UpdateConsumable=this.UpdateConsumable.bind(this)
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
        .then(res => {
            console.log(res.data.message)
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
                    <Input s={6} label="Consumable Name" defaultValue={this.state.name} onChange={this.setConsumableName} />
                    <Input s={6} label="Consumable Quantity" defaultValue={this.state.quantity} onChange={this.setConsumableQuantity} />
                </Row>
                <Button waves='light' onClick={this.UpdateConsumable}>Update</Button>
            </div>
        )
    }
}

export default UpdateConsumables