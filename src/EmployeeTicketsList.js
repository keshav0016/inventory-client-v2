import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Pagination, Row, Input} from 'react-materialize'
import moment from 'moment';
import {Link} from 'react-router-dom'
import './Employee.css'
import './ListPage.css'
import $ from 'jquery'
import './TicketsList.css'
import { baseUrl } from './config';


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
        }
        this.setAssetPage = this.setAssetPage.bind(this)
        this.setConsumablePage = this.setConsumablePage.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.handleList = this.handleList.bind(this)
        this.setPendingChecked = this.setPendingChecked.bind(this)
        this.setAcceptedChecked = this.setAcceptedChecked.bind(this)
        this.setRejectedChecked = this.setRejectedChecked.bind(this)
    }
    setPendingChecked(){
        this.setAssetPage(1)
        this.setConsumablePage(1)
        this.setState({
            isPendingChecked : !this.state.isPendingChecked,
        })
    }
    setAcceptedChecked(){
        this.setAssetPage(1)
        this.setConsumablePage(1)
        this.setState({
            isAcceptedChecked : !this.state.isAcceptedChecked,
        })
    }
    setRejectedChecked(){
        this.setAssetPage(1)
        this.setConsumablePage(1)
        this.setState({
            isRejectedChecked : !this.state.isRejectedChecked,
        })
    }
    setHandleListRequest(){
        this.setState({
            handleListRequest : true
        })

    }
    setAssetPage(e){
        this.setState({
            assetpage : e,
            handleListRequest : true
        })
    }
    setConsumablePage(e){
        this.setState({
            consumablepage : e,
            handleListRequest : true
        })
    }
    handleList(){
        if(!this.state.isPendingChecked && !this.state.isAcceptedChecked && !this.state.isRejectedChecked){
            axios({
                method : 'get',
                url : `${baseUrl}/employee/ticket/list?page=${this.state.page}`,
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
                console.error(error)
            })
        }
        else{
            axios({
                method : 'get',
                url : `${baseUrl}/employee/ticket/list?page=${this.state.page}&Accepted=${this.state.isAcceptedChecked}&Pending=${this.state.isPendingChecked}&Rejected=${this.state.isRejectedChecked}`,
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
                console.error(error)
            })
        }
        
    }
    
    render(){
        return(
            <div style={{marginLeft : '30px', marginRight : '30px'}}>
                <h3 className='heading' style={{fontFamily : 'Roboto', fontWeight : 250}}>Employee Tickets List</h3>
                {this.state.handleListRequest ? this.handleList() : null}

                <div className="filterContainer">
                <p style={{color:'white'}} className="adminDashboardTitle">Status Filters</p>
                    <Row className="ticketListCheckbox">
                        <Input className="pendingCheckbox" name='filter' type='checkbox' value='red' label='Pending' onClick = {this.setPendingChecked} checked={this.state.isPendingChecked} />
                        <Input name='filter' type='checkbox' value='red' label='Accepted' onClick = {this.setAcceptedChecked} checked={this.state.isAcceptedChecked} />
                        <Input name='filter' type='checkbox' value='red' label='Rejected' onClick = {this.setRejectedChecked} checked={this.state.isRejectedChecked} />
                    </Row>
                </div>
               
               <Tabs className='tabs' tabHeaders={['Assets', 'Consumables']} selectedIndex={0}>
                    <div className = "assetTab">
                        {this.state.AssetsticketsList.length === 0 ? <div className="noRecordsScreen">No Asset Tickets</div> :
                        <div>
                            <Table className="consumableTable" style={{fontFamily : 'Roboto', fontWeight : 350}} >
                                <thead>
                                    <tr>
                                    <th data-field="ticket_number">Ticket Number</th>
                                    <th data-field="date">Requested Date</th>
                                    <th data-field="requestedItem">Requested Item</th>
                                    <th data-field="quantity">Quantity</th>
                                    <th data-field="status">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.AssetsticketsList.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{moment(ticket.date).format('DD - MM - YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item} [${ticket.item_type}]`: `${ticket.requested_consumable_item} [${ticket.item_type}]`}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            
                            <Pagination items={this.state.assetPagination.totalPage} activePage={this.state.assetPage} maxButtons={5} onSelect = {this.setAssetPage} />
                        </div>}
                            <Link to={{ pathname : '/employee/RequestTicket'}}><Button style={{position : 'fixed'}} floating large className = 'red addVendorButton' waves = 'light' icon = 'add' /></Link>
                    </div>

                    <div className = "consumableTab">
                        {this.state.ConsumablesticketsList.length === 0 ? <div className="noRecordsScreen">No Consumable Tickets</div> :
                        <div>
                            <Table style={{marginLeft:'1%'}}  className="consumableTable">
                                <thead>
                                    <tr>
                                    <th data-field="ticket_number">Ticket Number</th>
                                    <th data-field="date">Requested Date</th>
                                    <th data-field="requestedItem">Requested Item</th>
                                    <th data-field="quantity">Quantity</th>
                                    <th data-field="status">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.ConsumablesticketsList.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{moment(ticket.date).format('DD - MM - YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item} [${ticket.item_type}]`: `${ticket.requested_consumable_item} [${ticket.item_type}]`}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <Pagination items={this.state.consumablePagination.totalPage} activePage={this.state.consumablePage} maxButtons={5} onSelect = {this.setConsumablePage} />
                        </div>}
                            <Link to={{ pathname : '/employee/RequestTicket'}}><Button style={{position : 'fixed'}} floating large className = 'red addVendorButton' waves = 'light' icon = 'add' /></Link>
                    </div>

                    {/* <Tab title="" disabled></Tab> */}
                </Tabs>
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

        this.setActiveTab = this.setActiveTab.bind(this);
    }
    setActiveTab(index) {
        this.setState({selectedIndex: index})
    }
    render(){
        return (<div>
            <div style={{display : 'flex'}} className="tabs z-depth-1 flow-text">
                {
                    this.props.tabHeaders.map((tab, index) => <Tab onClick={this.setActiveTab} key={index} index={index}>{tab}</Tab>)
                }
            </div>
            <div className="content">
                {this.props.children[this.state.selectedIndex]}
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
        return <div className={this.props.index === 0 ? 'activeTab' : ''} style={{width : '30%', paddingLeft : '1%', cursor : 'pointer'}} onClick={this.handleClick}>{this.props.children}</div>
    }
}

export default EmployeeTicketsList

