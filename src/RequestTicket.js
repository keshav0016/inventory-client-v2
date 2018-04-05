import React, { Component } from 'react';
import axios from 'axios';
import './Employee.css';
import {Button, Icon, Dropdown, Input, Row } from 'react-materialize'

class RequestTicket extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: '',
            item_type: '',
            quantity: '',
            department:'HR/Admin',
            status: 'pending'
        }
        // this.handleDate = this.handleDate.bind(this)
        // this.handleItemType = this.handleItemType.bind(this)
        // this.handleQuantity = this.handleQuantity.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        return(
            <div >
                <Row>
                    <Input label='Id' s={6} defaultValue=''/>
                    <Input name='on' type='date' label = 'Date'onChange={this.handleDate} />
                    <Input s={6} type='select' label="* Item_type" onChange={this.handleItemtype}defaultValue='Other'>
                        <option id='Assets' value='Assets'>Assets</option>
                        <option value='Consumables'>Consumables</option>
                        <option value='Other'>Other</option>

                    </Input>
                    <Input s={6} type='number' min='1' label="* Quantity" onChange={this.handleQuantity}/>
                    <Input type="text" label="* Department" defaultValue='HR/Admin's={6} />
                </Row>
                <Button onClick={this.handleCreate}>Add</Button>
              
            </div>
        )
    }
}
export default RequestTicket