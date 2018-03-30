import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Dropdown, Icon, NavItem, Row, Input} from 'react-materialize'
import AddConsumables from './AddConsumables'
import UpdateConsumables from './UpdateConsumables'
import AssignConsumables from './AssignConsumable'
import './ListPage.css'
import $ from 'jquery'


class Consumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            consumableList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true,
            sort : 'default',
            minQuantity : '',
            maxQuantity : '',
            keyword : ''
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.setPage = this.setPage.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.minQuantity = this.minQuantity.bind(this)
        this.maxQuantity = this.maxQuantity.bind(this)
        this.searchKeyword = this.searchKeyword.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/consumables/list?page=${this.state.page}&keyword=${this.state.keyword}&sort=${this.state.sort}&min=${this.state.minQuantity}&max=${this.state.maxQuantity}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                consumableList : res.data.consumables,
                pagination : res.data.pagination,
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
            window.Materialize.toast('Consumable Deleted Successfully', 4000)
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

    setPage(e){
        this.setState({
            page : e,
            handleListRequest : true
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.handleListRequest === true){
            $(".modal-close").trigger('click')
        }
    }

    sortBy(e){
        this.setState({
            sort:e.target.value,
            handleListRequest : true
        })
    }

    minQuantity(e){
        if(e.target.value >= 0){
            this.setState({
                minQuantity: e.target.value,
                handleListRequest : true
            })
        }
        else{
            window.Materialize.toast('The Quantity cannot be negative', 4000)
        }
    }

    maxQuantity(e){
        if(e.target.value >=0){
            this.setState({
                maxQuantity: e.target.value,
                handleListRequest : true
            })
        }
        else{
            window.Materialize.toast('The Quantity cannot be negative', 4000)
        }
    }

    searchKeyword(e){
        this.setState({
            keyword : e.target.value,
            handleListRequest : true
        })
    }

    render(){
        return(
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <Row>
                <Input s={2} type='select' onChange={this.sortBy}>
                    <option value='default'>Sort By Quantity</option>
                    <option value='asc'>Low - High</option>
                    <option value='desc'>High - Low</option> 
                </Input>
                <Input s={2} type='text' label="Minimum Quantity" onChange={this.minQuantity}></Input>
                <Input s={2} type='text' label="Maximum Quantity" onChange={this.maxQuantity}></Input>
                <Input s={4} type='text' label="Search" onChange={this.searchKeyword}></Input>
                </Row>
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
                            return (<tr key={consumable.consumable_id}>
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
                                <Modal
                                    header='Assign Consumable'
                                    fixedFooter
                                    trigger={<NavItem>Assign</NavItem >}>
                                    <AssignConsumables consumable={consumable} setHandleListRequest={this.setHandleListRequest}/>
                                </Modal>
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
                    trigger={<Button floating large className = 'red addResourceButton' waves = 'light' icon = 'add' />}>
                    <AddConsumables setHandleListRequest={this.setHandleListRequest}/>
                </Modal>
                <div>
                    <Pagination items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />
                </div>
            </div>
        )
    }


}



export default Consumables