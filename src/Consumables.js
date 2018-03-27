import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal} from 'react-materialize'
import AddConsumables from './AddConsumables'


class Consumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            consumableList : [],
            handleListRequest : true
        }
        this.handleList = this.handleList.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : 'http://localhost:3001/consumables/list',
            withCredentials : true
        })
        .then(res => {
            this.setState({
                consumableList : res.data.consumables,
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <Table centered>
                    <thead>
                        <tr>
                            <th data-field="consumable_id">Consumable Id</th>
                            <th data-field="name">Consumable Name</th>
                            <th data-field="quantity">Consumable Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.consumableList.map((consumable, index) => {
                            return <tr key={consumable.consumable_id}>
                            <td>{consumable.consumable_id}</td>
                            <td>{consumable.name}</td>
                            <td>{consumable.quantity}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                
                <Modal
                    header='Add Consumable'
                    fixedFooter
                    trigger={<Button floating large className = 'red' waves = 'light' icon = 'add' />}>
                    <AddConsumables />
                </Modal>
            </div>
        )
    }


}



export default Consumables