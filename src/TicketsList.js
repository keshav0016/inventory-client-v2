import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Pagination, Row, Input, Modal} from 'react-materialize'
import moment from 'moment'
import './ListPage.css'
import './TicketsList.css'
import $ from 'jquery'
import {Link} from 'react-router-dom'

class TicketsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetsTicket:[],
            consumableTicket : [],
            assetPagination : {totalPage : 1, currentPage : 1},
            assetPage : 1,
            consumablePagination : {totalPage : 1, currentPage : 1},
            consumablePage : 1,     
            handleListRequest : true,
            isPendingChecked : true,
            isAcceptedChecked : false,
            isRejectedChecked : false,
            checkAll : false,
            expected_recovery : ''
            ,reason : ''
        }
        this.setAssetPage = this.setAssetPage.bind(this)
        this.setConsumablePage = this.setConsumablePage.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.handleList = this.handleList.bind(this)
        this.setPendingChecked = this.setPendingChecked.bind(this)
        this.setAcceptedChecked = this.setAcceptedChecked.bind(this)
        this.setRejectedChecked = this.setRejectedChecked.bind(this)
        this.setCheckAll = this.setCheckAll.bind(this)
        this.handleExpected = this.handleExpected.bind(this)
        this.setReason = this.setReason.bind(this)
    }

    setPendingChecked(){
        this.setAssetPage(1)
        this.setConsumablePage(1)
        this.setState({
            isPendingChecked : !this.state.isPendingChecked,
        })
    }
    handleExpected(e){
        this.setState({
            expected_recovery : e.target.value
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

    setCheckAll(){
        this.setAssetPage(1)
        this.setConsumablePage(1)
        if(!this.state.checkAll){
            $('input:checkbox:not(:checked)').click()
            this.setState({
                checkAll : true
            })
        }
        else{
            $('input:checkbox').click()
            this.setState({
                checkAll : false
            })
        }
    }

    setAssetPage(e){
        this.setState({
            assetPage : e,
            handleListRequest : true
        })
    }

    setConsumablePage(e){
        this.setState({
            consumablePage : e,
            handleListRequest : true
        })
    }

    setReason(e){
        this.setState({
            reason : e.target.value
        })
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/admin/ticket/list?assetPage=${this.state.assetPage}&consumablePage=${this.state.consumablePage}&Accepted=${this.state.isAcceptedChecked}&Pending=${this.state.isPendingChecked}&Rejected=${this.state.isRejectedChecked}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetsTicket : res.data.assetsTicket,
                assetPagination : res.data.assetPagination,
                consumableTicket : res.data.consumableTicket,
                consumablePagination : res.data.consumablePagination,
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    acceptTicket(ticket_number){
        axios({
            method:'post',
            url:'http://localhost:3001/admin/ticket/accept',
            data:{
                ticket_number:ticket_number,
                expected_recovery : this.state.expected_recovery
                ,reason : this.state.reason
            },
            withCredentials:true
        })
        .then(res =>{
            this.setState({
                handleListRequest:true
                ,reason : ''
            })
            if(res.data.message === 'Requested Quantity greater than available'){
                window.Materialize.toast('Requested Quantity greater than available', 4000)
            }
            else{
                window.Materialize.toast('Ticket Accepted', 4000)
                $(".modal-overlay").click()        
            }
            console.log('success')
        })
        .catch(error =>{
            console.log('error')
        })
    }

    rejectTicket(ticket_number){
        axios({
            method:'post',
            url:'http://localhost:3001/admin/ticket/reject',
            data:{
                ticket_number:ticket_number
                ,reason : this.state.reason
            },
            withCredentials:true
        })
        .then(res =>{
            this.setState({
                handleListRequest:true
                ,reason : ''
            })
            window.Materialize.toast(res.data.message,4000)
            $(".modal-overlay").click()        

        })
        .catch(error =>{
            window.Materialize.toast(error.data.error,4000)
        })
    }

    render(){
        return(
            <div>
                <h3 className = "heading">Ticket list</h3>
                {this.state.handleListRequest ? this.handleList() : null}
                <Tabs tabHeaders={['Assets', 'Consumables']} selectedIndex={0}>
                    <div className = "assetTab">
                        {this.state.assetsTicket.length === 0 ? <div className="noRecordsScreen">No Asset Tickets</div> :
                        <div>
                            <Table style={{marginLeft:'1%'}}  className="consumableTable">
                                <thead>
                                    <tr>
                                        <th data-field="ticket_number">Ticket Number</th>
                                        <th data-field="employeeName">Employee Name</th>
                                        <th data-field="date">Requested Date</th>
                                        <th data-field="requestedItem">Requested Item</th>
                                        <th data-field="quantity">Quantity</th>
                                        <th data-field="status">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.assetsTicket.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{ticket.user.first_name + " " + ticket.user.last_name}</td>
                                        <td>{moment(ticket.date).format('DD - MM - YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item} [${ticket.item_type}]`: `${ticket.requested_consumable_item} [${ticket.item_type}]`}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.status === 'Pending' ?  <Link  to={`/admin/tickets/asset/accept/${ticket.ticket_number}`}><Button>Accept</Button></Link> : null }</td>
                                        <td>{ticket.status === 'Pending' ? <Modal
                                            header='Remarks for rejection'
                                            trigger={ <Button style={{backgroundColor:'#212121'}} >Reject</Button> }>
                                            <Row>
                                            <Input s={12} onChange = {this.setReason} label="Remarks" value={this.state.reason} />
                                            <Button  onClick={this.rejectTicket.bind(this,ticket.ticket_number)} >Submit</Button> 
                                            </Row>
                                        </Modal> : null}</td>
                                        </tr>
                                        )
                                    })} 
                                </tbody>
                            </Table>
                            <Pagination items={this.state.assetPagination.totalPage} activePage={this.state.assetPage} maxButtons={5} onSelect = {this.setAssetPage} />
                        </div>}
                    </div>

                    <div className = "consumableTab">
                        {this.state.consumableTicket.length === 0 ? <div className="noRecordsScreen">No Consumable Tickets</div> :
                        <div>
                            <Table style={{marginLeft:'1%'}}  className="consumableTable">
                                <thead>
                                    <tr>
                                        <th data-field="ticket_number">Ticket Number</th>
                                        <th data-field="employeeName">Employee Name</th>
                                        <th data-field="date">Requested Date</th>
                                        <th data-field="requestedItem">Requested Item</th>
                                        <th data-field="quantity">Quantity</th>
                                        <th data-field="status">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.consumableTicket.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{ticket.user.first_name + " " + ticket.user.last_name}</td>
                                        <td>{moment(ticket.date).format('DD - MM - YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item} [${ticket.item_type}]`: `${ticket.requested_consumable_item} [${ticket.item_type}]`}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.status === 'Pending' ? <Modal
                                            header='Remarks'
                                            trigger={ <Button>Accept</Button> }>
                                            <Row>
                                            <Input s={12} onChange = {this.setReason} label="Remarks" value={this.state.reason} />
                                            <Button onClick={this.acceptTicket.bind(this,ticket.ticket_number)}>Submit</Button>
                                            </Row>
                                        </Modal> : null }</td>
                                        <td>{ticket.status === 'Pending' ? <Modal
                                            header='Remarks for rejection'
                                            trigger={ <Button style={{backgroundColor:'#212121'}} >Reject</Button> }>
                                            <Row>
                                            <Input s={12} onChange = {this.setReason} label="Remarks" value={this.state.reason} />
                                            <Button onClick={this.rejectTicket.bind(this,ticket.ticket_number)}>Submit</Button>
                                            </Row>
                                        </Modal> : null}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <Pagination items={this.state.consumablePagination.totalPage} activePage={this.state.consumablePage} maxButtons={5} onSelect = {this.setConsumablePage} />
                        </div>}
                    </div>

                </Tabs>
                <div className="filterContainer">
                <p style={{color:'white'}} className="adminDashboardTitle">Status Filters</p>
                    <Row className="ticketListCheckbox">
                        <Input className="pendingCheckbox" name='filter' type='checkbox' value='red' label='Pending' onClick = {this.setPendingChecked} checked={this.state.isPendingChecked} />
                        <Input name='filter' type='checkbox' value='red' label='Accepted' onClick = {this.setAcceptedChecked} checked={this.state.isAcceptedChecked} />
                        <Input name='filter' type='checkbox' value='red' label='Rejected' onClick = {this.setRejectedChecked} checked={this.state.isRejectedChecked} />
                        <Input name='filter' type='checkbox' value='red' label='Select All' onClick = {this.setCheckAll} checked={this.state.checkAll} />
                    </Row>
                </div>
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


export default TicketsList