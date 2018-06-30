import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Pagination, Row, Input, Col, CardPanel, Preloader, Modal} from 'react-materialize'
import moment from 'moment';
// import {Link} from 'react-router-dom'
import './Employee.css'
import './ListPage.css'
import $ from 'jquery'
import './TicketsList.css'
import { baseUrl } from './config';
import Tickets from './Tickets'
import {
    Redirect
  } from 'react-router-dom';

class EmployeeTicketsList extends Component{
    constructor(props){
        super(props)
        this.state = {   
            assetPagination : {totalPage : 1, currentPage : 1},
            assetPage : 1,
            consumablePagination : {totalPage : 1, currentPage : 1},
            consumablePage : 1, 
            AssetsticketsList : [],
            ConsumablesticketsList : [],    
            handleListRequest : true,
            isPendingChecked : true,
            isAcceptedChecked : false,
            isRejectedChecked : false,
            selectedIndex : 0,
            redirect : false
        }
        this.setAssetPage = this.setAssetPage.bind(this)
        this.setConsumablePage = this.setConsumablePage.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.handleList = this.handleList.bind(this)
        this.setPendingChecked = this.setPendingChecked.bind(this)
        this.setAcceptedChecked = this.setAcceptedChecked.bind(this)
        this.setRejectedChecked = this.setRejectedChecked.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(index) {
        this.setState({selectedIndex: index})
    }

    setPendingChecked(){
        this.setState({
            isPendingChecked : !this.state.isPendingChecked,
            assetPage : 1
            ,consumablePage : 1
            ,handleListRequest : true
        })
    }
    setAcceptedChecked(){
        this.setState({
            isAcceptedChecked : !this.state.isAcceptedChecked,
            assetPage : 1
            ,consumablePage : 1
            ,handleListRequest : true
        })
    }
    setRejectedChecked(){
        this.setState({
            isRejectedChecked : !this.state.isRejectedChecked,
            assetPage : 1
            ,consumablePage : 1
            ,handleListRequest : true
        })
    }
    setHandleListRequest(){
        this.setState({
            handleListRequest : true
        })

    }
    setAssetPage(e){
        this.setState({
            assetPage : e,
            selectedIndex : 0,
            handleListRequest : true
        })
    }
    setConsumablePage(e){
        this.setState({
            consumablePage : e,
            selectedIndex : 1,
            handleListRequest : true
        })
    }
    handleList(){
        if(!this.state.isPendingChecked && !this.state.isAcceptedChecked && !this.state.isRejectedChecked){
            axios({
                method : 'get',
                url : `${baseUrl}/employee/ticket/list?assetPage=${this.state.assetPage}&consumablePage=${this.state.consumablePage}`,
                withCredentials : true
            })
            .then(res => {
                this.setState({
                    assetPagination : res.data.assetPagination,
                    consumablePagination : res.data.consumablePagination,
                    AssetsticketsList : res.data.ticketsAssetsListing,
                    ConsumablesticketsList : res.data.ticketsConsumableListing,
                    handleListRequest : false
                })
                // if(this.state.ticketsList.length === 0){
                //     window.Materialize.toast("no tickets to show", 4000)
                // }
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.setState({
                        redirect : true
                    })
                }
                console.error(error)
            })
        }
        else{
            axios({
                method : 'get',
                url : `${baseUrl}/employee/ticket/list?assetPage=${this.state.assetPage}&consumablePage=${this.state.consumablePage}&Accepted=${this.state.isAcceptedChecked}&Pending=${this.state.isPendingChecked}&Rejected=${this.state.isRejectedChecked}`,
                withCredentials : true
            })
            .then(res => {
                this.setState({
                    assetPagination : res.data.assetPagination,
                    consumablePagination : res.data.consumablePagination,
                    AssetsticketsList : res.data.ticketsAssetsListing,
                    ConsumablesticketsList : res.data.ticketsConsumableListing,
                    handleListRequest : false
                })
                
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.setState({
                        redirect : true
                    })
                }
                console.error(error)
            })
        }
        
    }
    
    render(){
        let filterSlideButton = <Button floating large className = 'teal filterContainerSliderButton' waves = 'light' icon = 'filter_list' style={{top : '64px'}}></Button>;
        let filterPane = <div className="filterContainer" style={{ zIndex: 1 }}>
            <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'white' }} className="adminDashboardTitle">Filter By Status</p>
            <Row className="ticketListCheckbox">
                <Input className="pendingCheckbox" name='filter' type='checkbox' value='red' label='Pending' onClick={this.setPendingChecked} checked={this.state.isPendingChecked} />
                <Input name='filter' type='checkbox' value='red' label='Accepted' onClick={this.setAcceptedChecked} checked={this.state.isAcceptedChecked} />
                <Input name='filter' type='checkbox' value='red' label='Rejected' onClick={this.setRejectedChecked} checked={this.state.isRejectedChecked} />
            </Row>
        </div>

        return(
            <div className="listComponent" >
                <h4 className="title">Employee Tickets List</h4>
                {this.state.redirect ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
                {this.state.handleListRequest ? this.handleList() : null}
                {filterSlideButton}
                {/* <SideNav className="filterSliderPane" trigger={filterSlideButton} options={{ closeOnClick: true, edge: 'right' }}>
                    {filterPane}
                </SideNav> */}
                <Modal 
                modalOptions={{ dismissible: false }}
                id='mobileAssetFilters'
                actions={null}
                trigger={filterSlideButton}>
                <div>
                    <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'black' }} className="adminDashboardTitle">Status Filters</p>
                    <Row className="miniTicketListCheckbox">
                        <Input className="pendingCheckbox" name='filter' type='checkbox' value='red' label='Pending' onClick={this.setPendingChecked} checked={this.state.isPendingChecked} disabled={this.state.checkAll}/>
                        <Input name='filter' type='checkbox' value='red' label='Accepted' onClick={this.setAcceptedChecked} disabled={this.state.checkAll} />
                        <Input name='filter' type='checkbox' value='red' label='Rejected' onClick={this.setRejectedChecked} disabled={this.state.checkAll} />
                    </Row>
                    <div className="splitModalButtons">
                        <Button  className='modal-close' >Close</Button>
                    </div>
                </div>
                </Modal>
                {filterPane}
               {this.state.handleListRequest ? <Row><Preloader size='small' /></Row> :
               <Tabs tabHeaders={['Assets', 'Consumables']} selectedIndex={this.state.selectedIndex} setActiveTab={this.setActiveTab}>
                    <div className = "assetTab">
                        {this.state.AssetsticketsList.length === 0 ? <Row className="noRecordsScreen"><h4>You do not have any tickets for now</h4></Row> :
                        <div>
                            <Table centered className="consumableTable desktopView" >
                                <thead>
                                    <tr>
                                    <th data-field="ticket_number">Ticket Number</th>
                                    <th data-field="date">Requested Date</th>
                                    <th data-field="requestedItem">Requested Item</th>
                                    <th data-field="quantity">Quantity</th>
                                    <th data-field="status">Status</th>
                                    <th data-field='remarks'>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.AssetsticketsList.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{moment(ticket.date).format('DD MMM YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item}`: `${ticket.requested_consumable_item}`}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.status !== 'Pending' ? `${ticket.reason}` : '-'}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            
                            <Row className='mobileView'>
                                {
                                    // Had to make a empty row, otherwise abrupt behaviour of the custom tabs
                                }
                            </Row>
                            <Col s={12} m={12} className='mobileView'>
                                        {this.state.AssetsticketsList.map((item, index) => {
                                            return <CardPanel key={index}>
                                                <div style={{ float: 'right' }}>
                                                </div>
                                                <div className='historyCards'  >
                                                    <div style={{ float: 'left' }} >
                                                        <h6><b>Ticket No.</b> : {item.ticket_number}</h6>
                                                        <h6><b>Request Date</b> : {moment(item.date).format('DD MMM YYYY')}</h6>
                                                        <h6><b>Item</b> : {item.requested_asset_item ? `${item.requested_asset_item} ` : `${item.requested_consumable_item} `}</h6>
                                                    </div>
                                                    <div style={{ float: 'right' }}>
                                                        <h6><b>Quantity</b> : {item.quantity}</h6>
                                                        <h6><b>Status</b> : {item.status}</h6>
                                                        <h6><b>Remarks</b> : {item.status !== 'Pending' ? `${item.reason}` : '-'}</h6>                                                        
                                                    </div>
                                                </div>
                                            </CardPanel>
                                        })}
                            </Col>
                            {this.state.assetPagination.totalPage > 1 ? <Pagination  items={this.state.assetPagination.totalPage} activePage={this.state.assetPage} maxButtons={5} onSelect = {this.setAssetPage} /> : null}
                        </div>}
                    </div>

                    <div className = "consumableTab">
                        {this.state.ConsumablesticketsList.length === 0 ? <div className="noRecordsScreen flow-text" ><h4>You do not have any tickets for now</h4></div> :
                        <div>
                            <Table centered className="consumableTable desktopView">
                                <thead>
                                    <tr>
                                    <th data-field="ticket_number">Ticket Number</th>
                                    <th data-field="date">Requested Date</th>
                                    <th data-field="requestedItem">Requested Item</th>
                                    <th data-field="quantity">Quantity</th>
                                    <th data-field="status">Status</th>
                                    <th data-field='remarks'>Remarks</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.ConsumablesticketsList.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{moment(ticket.date).format('DD MMM YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item}`: `${ticket.requested_consumable_item}`}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.status !== 'Pending' ? `${ticket.reason}` : '-'}</td>

                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                                    
                            <Row className='mobileView'>
                                {
                                    // Had to make a empty row, otherwise abrupt behaviour of the custom tabs
                                }
                            </Row>
                            <Col s={12} m={12} className='mobileView'>
                                        {this.state.ConsumablesticketsList.map((item, index) => {
                                            return <CardPanel key={index}>
                                                <div style={{ float: 'right' }}>
                                                </div>
                                                <div className='historyCards'  >
                                                    <div style={{ float: 'left' }} >
                                                        <h6><b>Ticket No.</b> : {item.ticket_number}</h6>
                                                        <h6><b>Request Date</b> : {moment(item.date).format('DD MMM YYYY')}</h6>
                                                        <h6><b>Item</b> : {item.requested_asset_item ? `${item.requested_asset_item} ` : `${item.requested_consumable_item} `}</h6>
                                                    </div>
                                                    <div style={{ float: 'right' }}>
                                                        <h6><b>Quantity</b> : {item.quantity}</h6>
                                                        <h6><b>Status</b> : {item.status}</h6>
                                                        <h6><b>Remarks</b> : {item.status !== 'Pending' ? `${item.reason}` : '-'}</h6>                                                        
                                                    </div>
                                                </div>
                                            </CardPanel>
                                        })}
                            </Col>
                            {this.state.consumablePagination.totalPage > 1 ? <Pagination items={this.state.consumablePagination.totalPage} activePage={this.state.consumablePage} maxButtons={5} onSelect = {this.setConsumablePage} /> : null}
                        </div>}
                    </div>
                </Tabs>}
                <Modal 
                    modalOptions={{ dismissible: false }}
                    actions={null}
                    trigger={<a><Button fab='vertical' floating large className = 'red' waves = 'light' icon = 'add'></Button></a>}>
                    <Tickets setHandleListRequest={this.setHandleListRequest}/>
                </Modal>
                {/* <Link to={{ pathname : '/employee/RequestTicket'}}><Button fab='vertical' floating large className = 'red' waves = 'light' icon = 'add' /></Link>                 */}
            </div>
        )
    }
    
}
class Tabs extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedIndex: this.props.selectedIndex || 0,
        }

    }
   
    render(){
        return (<div>
            <div style={{display : 'flex'}} className="tabs z-depth-1 flow-text">
                {
                    this.props.tabHeaders.map((tab, index) => <Tab onClick={this.props.setActiveTab} selectedIndex={this.props.selectedIndex} key={index} index={index}>{tab}</Tab>)
                }
            </div>
            <div className="content">
                {this.props.children[this.props.selectedIndex]}
            </div>
        </div>)
    }
}

class Tab extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onClick(this.props.index)
        $(`.tabs div`).removeClass('activeTab')
        $(`.tabs div:nth-child(${this.props.index+1})`).addClass('activeTab')
    }
    render(){
        return <div className={this.props.index === this.props.selectedIndex ? 'activeTab' : ''} style={{ paddingLeft : '1%', cursor : 'pointer'}} onClick={this.handleClick}>{this.props.children}</div>
    }
}

export default EmployeeTicketsList
