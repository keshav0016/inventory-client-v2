import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Dropdown, Icon, NavItem, Row, Input} from 'react-materialize'
import AddConsumables from './AddConsumables'
import UpdateConsumables from './UpdateConsumables'
import AssignConsumables from './AssignConsumable'
import DeleteConsumable from './DeleteConsumable'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
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
        this.checkForValidation = this.checkForValidation.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }

    checkForValidation(){
        if(this.state.minQuantity < 0){
            window.Materialize.toast('The minimum filter for quantity cannot be negative', 4000)
        }
        else if(this.state.maxQuantity < 0){
            window.Materialize.toast('The maximum filter for quantity cannot be negative', 4000)
        }
        else if(this.state.minQuantity > this.state.maxQuantity){
            window.Materialize.toast('The min filter should not be greater than the max filter', 4000)
        }
        else{
            this.setState({
                handleListRequest : true
            })
        }
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/consumables/list?page=${this.state.page}&keyword=${this.state.keyword}&sort=${this.state.sort}&min=${this.state.minQuantity}&max=${this.state.maxQuantity}`,
            withCredentials : true
        })
        .then(res => {
            if(res.data.consumables.length !== 0)
            {
                this.setState({
                    consumableList : res.data.consumables,
                    pagination : res.data.pagination,
                    handleListRequest : false
                })
            }
            else{
                this.setState({
                    consumableList : res.data.consumables,
                    pagination : res.data.pagination,
                    handleListRequest : false
                })
            }
        })
        .catch(error => {
            console.error(error)
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
            this.setState({
                minQuantity: e.target.value,
            })
    }

    maxQuantity(e){
            this.setState({
                maxQuantity: e.target.value,
            })
    }

    searchKeyword(e){
        this.setState({
            keyword : e.target.value,
            handleListRequest : true
        })
    }

    resetFilter(){
        this.setState({
            minQuantity:'',
            maxQuantity:'',
            handleListRequest:true
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
                <Input s={4} type='text' label="Search ( Case Sensitive )" onChange={this.searchKeyword}></Input>
                </Row>
                {this.state.consumableList.length === 0 
                    ?

                    <div className="noRecordsScreen">
                        No Records
                    </div>

                    :

                    <div>
                    <Table centered hoverable striped className="consumableTable">
                    <thead>
                        <tr>
                            <th data-field="consumable_id">Id</th>
                            <th data-field="name">Consumable Name</th>
                            <th data-field="quantity">Available Consumable Quantity</th>
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
                                    <UpdateConsumables consumable={consumable} />
                                </Modal>
                                <Modal
                                        header='Delete Asset'
                                        bottomSheet
                                        trigger={<NavItem>Delete</NavItem>}>
                                        <DeleteConsumable consumable = {consumable} setHandleListRequest={this.setHandleListRequest} />
                                </Modal>
                                <Modal
                                    header='Assign Consumable'
                                    fixedFooter
                                    trigger={<NavItem>Assign</NavItem >}>
                                    <AssignConsumables consumable={consumable} setHandleListRequest={this.setHandleListRequest}/>
                                </Modal>
                                <Link to={{ pathname : '/adminhomepage/consumables/history', consumable : consumable.consumable_id}}><NavItem href='/adminhomepage/consumables/history'>History</NavItem ></Link>
                                </Dropdown></td>
                            </tr>
                            )
                        },this)}
                    </tbody>
                </Table>
                </div>
                }
                <div className="filterContainer">
                    <Row>
                        <Input s={12} type='number' min={0} label="Minimum Quantity" value={this.state.minQuantity} onChange={this.minQuantity}></Input>
                        <Input s={12} type='number' min={0} label="Maximum Quantity" value={this.state.maxQuantity} onChange={this.maxQuantity}></Input>
                    </Row>
                        <Button onClick={this.checkForValidation} className="filterButton">Filter</Button>
                        <br />
                        <br />
                        <Button onClick={this.resetFilter} className="filterButton">Reset</Button>
                </div>                
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