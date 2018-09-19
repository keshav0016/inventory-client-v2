import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Dropdown, Icon, NavItem, Row, Input, Preloader, Col, CardPanel} from 'react-materialize'
// import AddConsumables from './AddConsumables'
import AssignConsumables from './AssignConsumable'
import DisableConsumable from './DisableConsumable'
import {Link, Redirect} from 'react-router-dom';
import './ListPage.css'
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import EnableConsumable from './EnableConsumable';
import moment from 'moment'
import './MasterComponent.css'
import UpdateConsumables from './UpdateConsumables'
import DeleteConsumable from './DeleteConsumable'

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
            keyword : '',
            redirect : false
            ,showModal : false
            ,currentItem : null
            ,purchaseDetails : []
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
        this.renderDropdown = this.renderDropdown.bind(this)
        this.handleUpdateModalClose = this.handleUpdateModalClose.bind(this)

    }
    

    handleUpdateModalClose(){
        this.setState({
            showModal : false
            ,currentItem : null
        })
    }
    checkForValidation(){
        if(Number(this.state.minQuantity.value) < 0){
            this.setState({
                minQuantity: Object.assign(this.state.minQuantity, {
                    error:'The Min Quantity is -ve',
                    showError:true
                }),
                handleListRequest : false
            })
        }
        if(Number(this.state.minQuantity.value) >= 0){
            this.setState({
                minQuantity: Object.assign(this.state.minQuantity, {
                    error:'',
                    showError:false
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.maxQuantity.value) < 0){
            this.setState({
                maxQuantity: Object.assign(this.state.maxQuantity, {
                    error:'The Max Quantity is -ve',
                    showError:true
                }),
                handleListRequest : false
            })
        }
        if(Number(this.state.minQuantity) >=0 && Number(this.state.maxQuantity.value) >= 0){
            this.setState({
                maxQuantity: Object.assign(this.state.maxQuantity, {
                    error:'',
                    showError:false
                }),
                handleListRequest : true
            })
        }
        if(Number(this.state.minQuantity.value) > Number(this.state.maxQuantity.value)){
            if(this.state.maxQuantity.value === ''){
                this.setState({
                    minQuantity: Object.assign(this.state.minQuantity, {
                        error:'',
                        showError:false
                    }),
                    handleListRequest : true
                })
            }
            if(this.state.maxQuantity.value !== ''){
                if(this.state.minQuantity.value === ''){
                    this.setState({
                        minQuantity: Object.assign(this.state.minQuantity, {
                            error:'',
                            showError:false
                        }),
                        handleListRequest : true
                    })
                }
                if(this.state.minQuantity.value !== ''){
                    this.setState({
                        minQuantity: Object.assign(this.state.minQuantity, {
                            error:'The Min Quantity > the Max Quantity',
                            showError:true
                        }),
                        handleListRequest : false
                    })
                }
            }
            }
        if(Number(this.state.minQuantity.value) <= Number(this.state.maxQuantity.value) && Number(this.state.minQuantity.value)>0){
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
            $('.modal-overlay').trigger('click')
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
                    if(res.data.consumables !== 'No Consumables'){
                        this.setState({
                            consumableList : res.data.consumables,
                            pagination : res.data.pagination,
                            handleListRequest : false,
                        })
                    }
                    if(res.data.consumables === 'No Consumables'){
                        this.setState({
                            consumableList:[],
                            pagination : {totalPage : 1, currentPage : 1},
                            handleListRequest : false
                        })
                    }
                }
                else{
                    this.setState({
                        consumableList : res.data.consumables,
                        pagination : res.data.pagination,
                        handleListRequest : false,
                    })
                }
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.setState({
                        redirect: true
                    })
                }
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
        $('.modal-overlay').trigger('click')
    }

    renderDropdown(consumable){

        let assign_modal = ''
        if(consumable.quantity > 0){
            assign_modal = <Modal
            modalOptions={{dismissible: false}}
            actions={null}
            trigger={<NavItem>Assign</NavItem >}>
            <AssignConsumables consumable={consumable} setHandleListRequest={this.setHandleListRequest}/>
            </Modal>
        }

        return consumable.disable === 1 ? 
        <Dropdown trigger={
            <Button> <Icon>more_vert</Icon></Button>
            }><Modal
            modalOptions={{dismissible: false}}
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
            <button className="editButton" onClick={() => {this.setState({
                showModal : true
                , currentItem : consumable
            })}}>Edit</button>
            <Modal 
                    modalOptions={{dismissible: false}}
                    actions={null}
                    trigger={<NavItem>Disable</NavItem>}>
                    <DisableConsumable consumable = {consumable} setHandleListRequest={this.setHandleListRequest} />
            </Modal>
            {assign_modal}
            <NavItem href={`/admin/consumables/history/${consumable.consumable_id}`}>History</NavItem >
            <Modal 
                    modalOptions={{dismissible: false}}
                    actions={null}
                    trigger={<NavItem>Delete</NavItem>}>
                    <DeleteConsumable consumable = {consumable} setHandleListRequest={this.setHandleListRequest} />
            </Modal>
        </Dropdown>
    }

    render(){
        let filterSlideButton = <Button floating large className = 'teal filterContainerSliderButton' waves = 'light' icon = 'filter_list'></Button>;
        let filterPane = <div className="filterContainer">
            <Row>
                <Input style={{color:'white'}} s={12} type='number' min={0} label="Minimum Quantity" value={this.state.minQuantity.value} onChange={this.minQuantity} error={this.state.minQuantity.showError ? this.state.minQuantity.error : null} ></Input>
                <Input style={{color:'white'}} s={12} type='number' min={0} label="Maximum Quantity" value={this.state.maxQuantity.value} onChange={this.maxQuantity} error={this.state.maxQuantity.showError ? this.state.maxQuantity.error : null} ></Input>
            </Row>
                <Button onClick={this.checkForValidation} className="filterButton">Apply</Button>
                <br />
                <br />
                <Button onClick={this.resetFilter} className="filterButton">Reset</Button>
        </div>
        return(
            <div className="listComponent">
                {this.state.redirect? <Redirect
                to={{
                    pathname: "/login",
                    search: '?sessionExpired=true'
                }}/>: null}
                {this.state.handleListRequest ? this.handleList() : null}
                <Modal
                actions={null}
                trigger={filterSlideButton}>
                <div>
                <Row>
                <Input style={{color:'black'}} s={6} type='number' min={0} label="Minimum Quantity" value={this.state.minQuantity.value} onChange={this.minQuantity} error={this.state.minQuantity.showError ? this.state.minQuantity.error : null} ></Input>
                <Input style={{color:'black'}} s={6} type='number' min={0} label="Maximum Quantity" value={this.state.maxQuantity.value} onChange={this.maxQuantity} error={this.state.maxQuantity.showError ? this.state.maxQuantity.error : null} ></Input>
                </Row>
                <div className='splitModalButtons' >
                <Button onClick={this.checkForValidation}>Apply</Button>
                <Button onClick={this.resetFilter} >Reset</Button>
                </div>
                </div>
                </Modal>
                <h3 className="title">List of Consumables</h3>
                <Row>
                <Input className='consumableSorting' label='Sort By' s={12} l={3} m={3} type='select' onChange={this.sortBy}>
                    {/* <option value='default'>Sort By</option> */}
                    <option value='purchasedAsc'>Purchase Date [New - Old]</option>
                    <option value='purchasedDesc'>Purchase Date [Old - New]</option> 
                    <option value='quantityAsc'>Quantity [Low - High]</option>
                    <option value='quantityDesc'>Quantity [High - Low]</option>
                </Input>
                <Input s={12} l={3} m={3} type='text' label="Search by consumable name" onChange={this.searchKeyword}></Input>
                </Row>
                {this.state.handleListRequest ? <Row><Preloader size='small' /></Row> :
                (this.state.consumableList.length === 0 
                    ?

                    <div className="noRecordsScreen">
                        No Records
                    </div>

                    :

                    <div>
                    <Table centered className="consumableTable listTable desktopView" style={{fontFamily: 'Roboto', fontWeight: 350}} >
                    <thead>
                        <tr>
                            <th data-field="consumable_id">Cons. Id</th>
                            <th data-field="name">Consumable Name</th>
                            <th data-field="description">Description</th>
                            <th data-field="quantity">Available Consumable Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.consumableList.map((consumable, index) => {
                            return (<tr key={consumable.consumable_id} className={consumable.disable === 1 ? 'disabled' : 'enabled'} >
                            <td >{consumable.consumable_id}</td>
                            <td >{consumable.name}</td>
                            <td style={{wordBreak : 'break-word', width: '40%'}}>{consumable.description}</td>
                            <td >{consumable.quantity}</td>
                            <td>{this.renderDropdown(consumable)}</td>
                            </tr>
                            )
                        },this)}
                    </tbody>
                </Table>

                <Col s={12} m={12} className='mobileView listTable'>
                        {this.state.consumableList.map((item, index) => {
                            return <CardPanel key = {index} className={item.disable === 1 ? 'disabled' : 'enabled' } >
                                        <div style={{float : 'right'}}>
                                            {this.renderDropdown(item)}
                                        </div>
                                        <div className='historyCards'  >
                                            <div style={{float : 'left'}} >                                
                                                <h6><b>Consumable Id</b> : {item.consumable_id}</h6>
                                                <h6><b>Consumable Name</b> : {item.name}</h6>
                                                <h6><b>Description</b> : {item.description}</h6>
                                            </div>
                                            <div style={{float : 'right'}}>
                                                <h6><b>Quantity</b> : {item.quantity}</h6>
                                                <h6><b>Purchase Date</b> : {moment(item.createdAt).format('DD MMM YYYY')}</h6>
                                            </div>
                                        </div>
                                    </CardPanel>
                        })}
                    </Col>

                {this.state.pagination.totalPage > 1 ? <Pagination className='pagination filterPadding' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} /> : null }
                </div>)
                }
                {filterPane}
                <Link to={{ pathname : '/admin/consumables/add', setHandleListRequest : this.setHandleListRequest}}><Button floating fab="vertical" large className = 'red addVendorButton' waves = 'light' icon = 'add' /></Link>
                {this.state.showModal ? (
                    <Modal
                        modalOptions={{ dismissible: false }}
                        open={this.state.showModal}
                        actions={null}
                        className='editAssetBottomPadding'>
                        <UpdateConsumables onFinish={this.handleUpdateModalClose} consumable={this.state.currentItem} purchaseDetails={this.state.purchaseDetails} setHandleListRequest={this.setHandleListRequest} />
                    </Modal>

                ) : null}
            </div>
        )
    }


}



export default Consumables