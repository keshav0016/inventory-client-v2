import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Dropdown, Icon, NavItem} from 'react-materialize'
import AddConsumables from './AddConsumables'
import UpdateConsumables from './UpdateConsumables'


class Consumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            consumableList : [],
            handleListRequest : true
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
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

    handleDelete(index){
        axios({
            method : 'post',
            url : 'http://localhost:3001/consumables/delete',
            data : {
                consumable_id : this.state.consumableList[index].consumable_id
            }
        })
        .then(obj => {
            console.log(obj.data.message)
        })
        .catch(error => {
            console.log(error)
        })
    }

    setHandleListRequest(){
        this.setState({
            handleListRequest : true
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
                            return (<tr key={index}>
                            <td>{consumable.consumable_id}</td>
                            <td>{consumable.name}</td>
                            <td>{consumable.quantity}</td>
                            <td><Dropdown trigger={
                                <Button> <Icon>more_vert</Icon></Button>
                                }>
                                <Modal
                                    header='Edit Consumable'
                                    fixedFooter
                                    trigger={<NavItem>Edit</NavItem >}>
                                    <UpdateConsumables consumable={consumable} setHandleListRequest={this.setHandleListRequest}/>
                                </Modal>
                                <NavItem onClick={this.handleDelete.bind(this,index)}>Delete</NavItem>
                                <NavItem>History</NavItem>
                                </Dropdown></td>
                            </tr>
                            )
                        },this)}
                    </tbody>
                </Table>
                
                <Modal
                    header='Add Consumable'
                    fixedFooter
                    trigger={<Button floating large className = 'red addConsumableButton' waves = 'light' icon = 'add' />}>
                    <AddConsumables setHandleListRequest={this.setHandleListRequest}/>
                </Modal>
            </div>
        )
    }


}



export default Consumables