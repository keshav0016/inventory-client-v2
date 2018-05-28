import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Dropdown, Icon, NavItem, Row, Input, Preloader} from 'react-materialize'
// import AddConsumables from './AddConsumables'
import AssignConsumables from './AssignConsumable'
import DeleteConsumable from './DeleteConsumable'
import {Link} from 'react-router-dom';
import './ListPage.css'
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import EnableConsumable from './EnableConsumable';
import moment from 'moment'

class Consumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            consumableList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true,
            sort : 'default',
            minQuantity : {
                value:'',
                error:'',
                showError:false
            },
            maxQuantity : {
                value:'',
                error:'',
                showError:false
            },
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
        if(Number(this.state.minQuantity.value) < 0){
            // window.Materialize.toast('The minimum filter for quantity cannot be negative', 4000)
            this.setState({
                minQuantity: Object.assign(this.state.minQuantity, {
                    error:'The Min Quantity is -ve',
                    showError:true
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.minQuantity.value) >= 0){
            // window.Materialize.toast('The minimum filter for quantity cannot be negative', 4000)
            this.setState({
                minQuantity: Object.assign(this.state.minQuantity, {
                    error:'',
                    showError:false
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.maxQuantity.value) < 0){
            // window.Materialize.toast('The maximum filter for quantity cannot be negative', 4000)
            this.setState({
                maxQuantity: Object.assign(this.state.maxQuantity, {
                    error:'The Max Quantity is -ve',
                    showError:true
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.maxQuantity.value) >= 0){
            // window.Materialize.toast('The maximum filter for quantity cannot be negative', 4000)
            this.setState({
                maxQuantity: Object.assign(this.state.maxQuantity, {
                    error:'',
                    showError:false
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.minQuantity.value) > Number(this.state.maxQuantity.value)){
            // window.Materialize.toast('The min filter should not be greater than the max filter', 4000)
            this.setState({
                minQuantity: Object.assign(this.state.minQuantity, {
                    error:'The Min Quantity > the Max Quantity',
                    showError:true
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.minQuantity.value) <= Number(this.state.maxQuantity.value) && Number(this.state.minQuantity.value)>0){
            // window.Materialize.toast('The min filter should not be greater than the max filter', 4000)
            this.setState({
                minQuantity: Object.assign(this.state.minQuantity, {
                    error:'',
                    showError:false
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.minQuantity.value) >= 0 && Number(this.state.maxQuantity.value) >= 0 && Number(this.state.minQuantity.value) <= Number(this.state.maxQuantity.value)){
            this.setState({
                handleListRequest : true
            })
        }
    }

    handleList(){
        if(this.state.minQuantity.value >= 0){
            axios({
                method : 'get',
                url : `${baseUrl}/consumables/list?page=${this.state.page}&keyword=${this.state.keyword}&sort=${this.state.sort}&min=${this.state.minQuantity.value}&max=${this.state.maxQuantity.value}`,
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
        else{
            this.setState({
                consumableList:[],
                pagination : {totalPage : 1, currentPage : 1},
                handleListRequest : false
            })
        }
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
                minQuantity: Object.assign(this.state.minQuantity, {
                    value:e.target.value
                })
            })
    }

    maxQuantity(e){
            this.setState({
                maxQuantity: Object.assign(this.state.maxQuantity, {
                    value: e.target.value
                }),
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
            minQuantity:{
                value:'',
                error:'',
                showError:false
            },
            maxQuantity:{
                value:'',
                error:'',
                showError:false
            },
            handleListRequest:true
        })
    }

    render(){
        return(
            <div className="listComponent">
                {this.state.handleListRequest ? this.handleList() : null}
                <h3 style={{fontFamily : 'Roboto', fontWeight : 250}}>List of Consumables</h3>
                <Row>
                <Input s={3} type='select' onChange={this.sortBy}>
                    <option value='default'>Sort By</option>
                    <option value='quantityAsc'>Quantity [Low - High]</option>
                    <option value='quantityDesc'>Quantity [High - Low]</option>
                    <option value='purchasedAsc'>Purchase Date [New - Old]</option>
                    <option value='purchasedDesc'>Purchase Date [Old - New]</option> 
                </Input>
                <Input s={4} type='text' label="Search by consumable name" onChange={this.searchKeyword}></Input>
                </Row>
                {this.state.handleListRequest ? <Preloader size='small' /> : (this.state.consumableList.length === 0 
                    ?

                    <div className="noRecordsScreen">
                        No Records
                    </div>

                    :

                    <div>
                    <Table className="consumableTable" hoverable style={{fontFamily: 'Roboto', fontWeight: 350}} >
                    <thead>
                        <tr>
                            <th data-field="consumable_id">Id</th>
                            <th data-field="name">Consumable Name</th>
                            <th data-field="quantity">Available Consumable Quantity</th>
                            <th data-field="purchaseDate">Purchase Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.consumableList.map((consumable, index) => {
                            return (<tr key={consumable.consumable_id}>
                            <td >{consumable.consumable_id}</td>
                            <td >{consumable.name}</td>
                            <td >{consumable.quantity}</td>
                            <td>{moment(consumable.createdAt).format('DD MMM YYYY')}</td>
                            <td>{consumable.disable === 1 ? 
                            <Dropdown trigger={
                                <Button> <Icon>more_vert</Icon></Button>
                                }><Modal
                                style={{width : '70%'}}
                                actions={null}
                                trigger={<NavItem>Enable</NavItem> }>
                                {<EnableConsumable  consumable={consumable} setHandleListRequest={this.setHandleListRequest} />}
                            </Modal>
                            </Dropdown>:<Dropdown trigger={
                                    <Button><Icon tiny>more_vert</Icon></Button>
                                }>
                                {/* <Modal
                                    header='Edit Consumable'
                                    fixedFooter
                                    trigger={<NavItem>Edit</NavItem >}>
                                    <UpdateConsumables consumable={consumable} setHandleListRequest={this.setHandleListRequest}/>
                                </Modal> */}
                                <Modal style={{width:'70%'}}
                                        actions={null}
                                        trigger={<NavItem>Disable</NavItem>}>
                                        <DeleteConsumable consumable = {consumable} setHandleListRequest={this.setHandleListRequest} />
                                </Modal>
                                <Modal
                                    actions={null}
                                    trigger={<NavItem>Assign</NavItem >}>
                                    <AssignConsumables consumable={consumable} setHandleListRequest={this.setHandleListRequest}/>
                                </Modal>
                                <NavItem href={`/admin/consumables/history/${consumable.consumable_id}`}>Details</NavItem >
                            </Dropdown>}</td>
                            </tr>
                            )
                        },this)}
                    </tbody>
                </Table>
                {this.state.pagination.totalPage > 1 ? <Pagination className='pagination filterPadding' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} /> : null }
                </div>)
                }
                <div className="filterContainer" style={{height: '100vh', position: 'fixed'}}>
                    <Row>
                        <Input style={{color:'white'}} s={12} type='number' min={0} label="Minimum Quantity" value={this.state.minQuantity.value} onChange={this.minQuantity} error={this.state.minQuantity.showError ? this.state.minQuantity.error : null} ></Input>
                        <Input style={{color:'white'}} s={12} type='number' min={0} label="Maximum Quantity" value={this.state.maxQuantity.value} onChange={this.maxQuantity} error={this.state.maxQuantity.showError ? this.state.maxQuantity.error : null} ></Input>
                    </Row>
                        <Button onClick={this.checkForValidation} className="filterButton">Filter</Button>
                        <br />
                        <br />
                        <Button onClick={this.resetFilter} className="filterButton">Reset</Button>
                </div>                
                <Link to={{ pathname : '/admin/consumables/add', setHandleListRequest : this.setHandleListRequest}}><Button floating fab="vertical" large className = 'red addVendorButton' waves = 'light' icon = 'add' /></Link>
            </div>
        )
    }


}



export default Consumables