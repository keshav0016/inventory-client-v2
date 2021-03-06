import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Pagination, Row, Input, Modal, Preloader, Col, CardPanel} from 'react-materialize'
import moment from 'moment'
import './ListPage.css'
import './TicketsList.css'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom'

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
            expected_recovery : '',
            redirect: false
            ,reason : {
                value : ''
                , showError : false
                , error : ''
            }
            ,selectedIndex : this.props.location.hash ? (this.props.location.hash === '#asset' ? 0 : 1) : 0
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
        this.renderAcceptAssetTicket = this.renderAcceptAssetTicket.bind(this)
        this.renderRejectAssetTicket = this.renderRejectAssetTicket.bind(this)
        this.cancelReason = this.cancelReason.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(index) {
        this.setState({selectedIndex: index})
    }

    setPendingChecked(){
        this.setState({
            isPendingChecked : !this.state.isPendingChecked
            ,assetPage : 1
            ,consumablePage : 1
            ,handleListRequest : true
        })
    }
    handleExpected(e){
        this.setState({
            expected_recovery : e.target.value
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

    setCheckAll(){
        this.setState({
            checkAll : !this.state.checkAll
            ,assetPage : 1
            ,consumablePage : 1
            ,handleListRequest : true
        })
    }

    setAssetPage(e){
        this.setState({
            assetPage : e,
            handleListRequest : true
            ,selectedIndex : 0
        })
    }

    setConsumablePage(e){
        this.setState({
            consumablePage : e,
            handleListRequest : true
            ,selectedIndex : 1
        })
    }

    setReason(e){
        this.setState({
            reason : {
                ...this.state.reason
                , value : e.target.value
                , showError : false
            }
        })
    }

    cancelReason(){
        this.setState({
            reason: {
                ...this.state.reason
                , value : ''
                , showError : false
            }
        })
        $('.modal-overlay').trigger('click')
    }
    
    handleList(){
        axios({
            method : 'get',
            url : this.state.checkAll ? `${baseUrl}/admin/ticket/list?assetPage=${this.state.assetPage}&consumablePage=${this.state.consumablePage}&Accepted=true&Pending=true&Rejected=true` :`${baseUrl}/admin/ticket/list?assetPage=${this.state.assetPage}&consumablePage=${this.state.consumablePage}&Accepted=${this.state.isAcceptedChecked}&Pending=${this.state.isPendingChecked}&Rejected=${this.state.isRejectedChecked}`,
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
            // $('.modal-overlay').trigger('click')
        })
        .catch(error => {

            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
            console.error(error)
        })
    }

    acceptTicket(ticket_number){
        axios({
            method:'post',
            url:`${baseUrl}/admin/ticket/accept`,
            data:{
                ticket_number:ticket_number,
                expected_recovery : this.state.expected_recovery
                ,reason : this.state.reason.value
            },
            withCredentials:true
        })
        .then(res =>{
            this.setState({
                handleListRequest:true
                ,reason : {
                    ...this.state.reason
                    , value : ''
                }
            })
            $('.modal-close').trigger('click')
            // $('.modal-overlay').trigger('click')            
            // $('.modal-overlay').hide()
            
            if(res.data.message === 'Requested Quantity greater than available'){
                // window.Materialize.toast('Requested Quantity greater than available', 4000)
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
                //   $('.modal').hide()
                //   setTimeout((function() {
                    //     window.location.reload();
                    // }), 2100);
                }
                else{
                    if(res.data.message === 'Requested item is disabled'){
                        // window.Materialize.toast('Requested item is disabled', 4000)
                        swal(res.data.message,{
                            buttons: false,
                            timer: 2000,
                        })
                        
                        //   setTimeout((function() {
                            //     window.location.reload();
                            // }), 2100);
                        }
                        else{
                            swal('Ticket Accepted',{
                                buttons: false,
                                timer: 2000,
                            })
                            // $('.modal-overlay').trigger('click')
                            //   $('.modal').hide()
                            //   $('.modal-overlay').hide()
                            // $(".modal-overlay").click()      
                        }
                    }
                    // $('.swal-overlay').hide()
            console.log('success')
            $('.modal-overlay').remove()
            $('body').removeAttr( 'style' )
        })
        .catch(error =>{

            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
            console.log('error')
        })
    }

    rejectTicket(ticket_number){
        if(this.state.reason.value.length === 0 || (this.state.reason.value.length > 0 && this.state.reason.value.trim().length === 0)){
            this.setState({
                reason : {
                    ...this.state.reason
                    , showError : true
                    , error : 'Reason is required'
                }
            })
        }

        else{
            axios({
                method:'post',
                url:`${baseUrl}/admin/ticket/reject`,
                data:{
                    ticket_number:ticket_number
                    ,reason : this.state.reason.value
                },
                withCredentials:true
            })
            .then(res =>{
                $('.modal-close').trigger('click')
                this.setState({
                    handleListRequest:true
                    ,reason : {
                        ...this.state.reason
                        , value : ''
                    }
                })
                $('.modal-overlay').trigger('click')
                
                // window.Materialize.toast(res.data.message,4000)
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                  })
                //   $('.modal').hide()
                //   $('.modal-overlay').hide()
                //   setTimeout((function() {
                //     window.location.reload();
                // }), 2100);
                //   this.setHandleListRequest()
                // $(".modal-overlay").click()   
                     
    
            })
            .catch(error =>{
    
                if(error.response.status === 401){
                    $('.modal-overlay').remove()
                    $('body').removeAttr( 'style' )
                    this.setState({
                        redirect: true
                    })
                }else{

                    swal(error.data.error,{
                        buttons: false,
                        timer: 2000,
                    })
                }
                // window.Materialize.toast(error.data.error,4000)
            })
        }
    }

    fetchAvailableAssets(ticket){
        axios({
            method : 'get'
            ,url : `${baseUrl}/admin/ticket/available?ticket=${ticket.ticket_number}`
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.assets.length){
                return true
            }
            else{
                return false
            }
        })
        .catch(error => {

            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
            console.error(error)
        })
    }

    async renderAcceptAssetTicket(ticket){
        let response = await axios({
            method : 'get'
            ,url : `${baseUrl}/admin/ticket/available?ticket=${ticket.ticket_number}`
            ,withCredentials : true
        })

        if(response.data.assets.length){
            window.location = `/admin/tickets/asset/accept/${ticket.ticket_number}?asset=${ticket.asset_name}`
        }
        else{
            swal("No available Asset for this Type",{
                buttons: false,
                timer: 2000,
            })
        }
    }

    renderRejectAssetTicket(ticket){
        return ticket.status === 'Pending' && ticket.user !== null ? <Modal
            modalOptions={{dismissible:false}}
            actions={null}
            trigger={<Button style={{ backgroundColor: '#212121' }} floating icon='clear'></Button>}>
            <Row className="no-footer" >
                <h5 className="title">Remarks for rejection</h5>
                <Input s={12} onChange={this.setReason} label="Remarks*" value={this.state.reason.value} error = {this.state.reason.showError ? this.state.reason.error : null}/>
                <div className='splitModalButtons'>
                    <Button onClick={this.rejectTicket.bind(this, ticket.ticket_number)} >Reject</Button>
                    <Button onClick={this.cancelReason} className="cancelButton modal-close" >Cancel</Button>
                </div>
            </Row>
        </Modal> : null
    }

    renderAcceptConsumableTicket(ticket){
        return ticket.status === 'Pending' ? <Modal className="modal"
            modalOptions={{dismissible:false}}
            actions={null}
            trigger={<Button floating icon='done'></Button>}>
            <Row className="no-footer" >
                <h5 className="title">Remarks for acceptance</h5>
                <Input s={12} onChange={this.setReason} value={this.state.reason.value} label="Remarks" />
                <div className='splitModalButtons'>
                    <Button onClick={this.acceptTicket.bind(this, ticket.ticket_number)}>Accept</Button>
                    <Button onClick={this.cancelReason} className="cancelButton modal-close" >Cancel</Button>
                </div>
            </Row>
        </Modal> : null 
    }

    renderRejectConsumableTicket(ticket){
        return ticket.status === 'Pending' ? <Modal
            modalOptions={{dismissible:false}}
            actions={null}
            trigger={<Button style={{ backgroundColor: '#212121' }} floating icon='clear' ></Button>}>
            <Row className="no-footer" >
                <h5 className="title">Remarks for rejection</h5>
                <Input s={12} onChange={this.setReason} value={this.state.reason.value}  error = {this.state.reason.showError ? this.state.reason.error : null} label="Remarks*" />
                <div className='splitModalButtons'>
                    <Button onClick={this.rejectTicket.bind(this, ticket.ticket_number)}>Reject</Button>
                    <Button onClick={this.cancelReason} className="cancelButton modal-close" >Cancel</Button>
                </div>
            </Row>
        </Modal> : null
    }

    render(){
        let filterPane = <div className="filterContainer">
            <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'white' }} className="adminDashboardTitle">Status Filters</p>
            <Row className="ticketListCheckbox">
                <Input className="pendingCheckbox" name='filter' type='checkbox' value='red' label='Pending' onClick={this.setPendingChecked} checked={this.state.isPendingChecked} disabled={this.state.checkAll}/>
                <Input name='filter' type='checkbox' value='red' label='Accepted' onClick={this.setAcceptedChecked} disabled={this.state.checkAll} />
                <Input name='filter' type='checkbox' value='red' label='Rejected' onClick={this.setRejectedChecked} disabled={this.state.checkAll} />
                <Input name='filter' type='checkbox' value='red' label='Select All' onClick={this.setCheckAll}  />
           </Row>
        </div>

        let filterSlideButton = <Button floating large className = 'teal filterContainerSliderButton' waves = 'light' icon = 'filter_list' style={{top : '64px'}}></Button>;
        
        return(
            <div className="listComponent" >
            {this.state.redirect? <Redirect
              to={{
                  pathname: "/login",
                  search: '?sessionExpired=true'
              }}/>: null}
                <h3 className="title">Ticket List</h3>
                <Modal 
                modalOptions={{dismissible:false}}
                id='mobileAssetFilters'
                actions={null}
                trigger={filterSlideButton}>
                <div>
                    <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'black' }} className="adminDashboardTitle">Status Filters</p>
                    <Row className="miniTicketListCheckbox">
                        <Input className="pendingCheckbox" name='filter' type='checkbox' value='red' label='Pending' onClick={this.setPendingChecked} checked={this.state.isPendingChecked} disabled={this.state.checkAll}/>
                        <Input name='filter' type='checkbox' value='red' label='Accepted' onClick={this.setAcceptedChecked} disabled={this.state.checkAll} />
                        <Input name='filter' type='checkbox' value='red' label='Rejected' onClick={this.setRejectedChecked} disabled={this.state.checkAll} />
                        <Input name='filter' type='checkbox' value='red' label='Select All' onClick={this.setCheckAll}  />
                    </Row>
                    <div style={{textAlign: "center"}}>
                        <Col>
                            <Button style={{position: "relative",marginBottom: "8px"}} className='modal-close' >Close</Button>
                        </Col>
                    </div>
                </div>
                </Modal>
                {this.state.handleListRequest ? this.handleList() : null}                
                {this.state.handleListRequest ? <Row><Preloader size='small' /></Row> :
                <Tabs tabHeaders={['Assets', 'Consumables']} selectedIndex={this.state.selectedIndex} setActiveTab={this.setActiveTab}>
                    <div className = "assetTab">
                        {this.state.assetsTicket.length === 0 ? <div className="noRecordsScreen">No Asset Tickets</div> : 
                        <div>
                            <Table  centered hoverable style={{marginLeft:'1%'}}  className="consumableTable desktopView">
                                <thead>
                                    <tr>
                                        <th data-field="ticket_number">Ticket No.</th>
                                        <th data-field="employeeName">Employee</th>
                                        <th data-field="date">Request Date</th>
                                        <th data-field="requestedItem">Item</th>
                                        <th data-field="requestedAsset">Requested Asset</th>
                                        <th data-field="quantity">Quantity</th>
                                        <th data-field="status">Status</th>
                                        <th data-field='adminName'>Admin Name</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.assetsTicket.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{ticket.user !== null? ticket.user.first_name + " " + ticket.user.last_name : <b style={{color:'teal'}}>Employee has left</b>}</td>
                                        <td>{moment(ticket.date).format('DD MMM YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item} `: `${ticket.requested_consumable_item} `}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.asset_name}` : `-`}</td>    
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.status === 'Accepted' || ticket.status === 'Rejected' ? ticket.adminName : null}</td>
                                        <td>{ticket.status === 'Pending' && ticket.user !== null ? <Button onClick = {async () => {await this.renderAcceptAssetTicket(ticket)}} floating icon='done'></Button> : null}</td>
                                        <td>{this.renderRejectAssetTicket(ticket)}</td>
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
                                        {this.state.assetsTicket.map((item, index) => {
                                            return <CardPanel key={index}>
                                                <div style={{ float: 'right' }}>
                                                {item.status === 'Pending' && item.user !== null ? <Button onClick = {async () => {await this.renderAcceptAssetTicket(item)}} floating icon='done'></Button> : null}
                                                    <Row></Row>
                                                    {this.renderRejectAssetTicket(item)}
                                                </div>
                                                <div className='historyCards'  >
                                                    <div style={{ float: 'left' }} >
                                                        <h6><b>Ticket No.</b> : {item.ticket_number}</h6>
                                                        <h6><b>Employee</b> : {item.user !== null ? item.user.first_name + " " + item.user.last_name : <b style={{ color: 'teal' }}>Employee has left</b>}</h6>
                                                        <h6><b>Request Date</b> : {moment(item.date).format('DD MMM YYYY')}</h6>
                                                        <h6><b>Item</b> : {item.requested_asset_item ? `${item.requested_asset_item} ` : `${item.requested_consumable_item} `}</h6>
                                                        <h6><b>Requested Asset</b> : {item.requested_asset_item ? `${item.asset_name}` : `-`}</h6>
                                                    </div>
                                                    <div style={{ float: 'right' }}>
                                                        <h6><b>Quantity</b> : {item.quantity}</h6>
                                                        <h6><b>Status</b> : {item.status}</h6>
                                                        <h6><b>Admin Name</b> : {item.status === 'Accepted' || item.status === 'Rejected' ? item.adminName : null}</h6>
                                                    </div>
                                                </div>
                                            </CardPanel>
                                        })}
                            </Col>
                            {this.state.assetPagination.totalPage > 1 ? <Pagination className='pagination filterPadding' items={this.state.assetPagination.totalPage} activePage={this.state.assetPage} maxButtons={5} onSelect = {this.setAssetPage} /> : null}
                        </div>}
                    </div>

                    <div className = "consumableTab">
                        {this.state.consumableTicket.length === 0 ? <div className="noRecordsScreen">No Consumable Tickets</div> : 
                        <div>
                            <Table centered hoverable style={{marginLeft:'1%'}}  className="consumableTable desktopView">
                                <thead>
                                    <tr>
                                        <th data-field="ticket_number">Ticket No.</th>
                                        <th data-field="employeeName">Employee</th>
                                        <th data-field="date">Request Date</th>
                                        <th data-field="requestedItem">Item</th>
                                        <th data-field="quantity">Quantity</th>
                                        <th data-field="status">Status</th>
                                        <th data-field='adminName'>Admin Name</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.consumableTicket.map((ticket, index) => {
                                        return (<tr key={ticket.ticket_number}>
                                        <td>{ticket.ticket_number}</td>
                                        <td>{ticket.user !== null ? ticket.user.first_name + " " + ticket.user.last_name : <b style={{color:'teal'}}>Employee has left</b>}</td>
                                        <td>{moment(ticket.date).format('DD MMM YYYY')}</td>
                                        <td>{ticket.requested_asset_item ? `${ticket.requested_asset_item} `: `${ticket.requested_consumable_item} `}</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.status === 'Accepted' || ticket.status === 'Rejected' ? ticket.adminName : null}</td>
                                        <td>{this.renderAcceptConsumableTicket(ticket)}</td>
                                        <td>{this.renderRejectConsumableTicket(ticket)}</td>
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
                                        {this.state.consumableTicket.map((item, index) => {
                                            return <CardPanel key={index}>
                                                <div style={{ float: 'right' }}>
                                                    {this.renderAcceptConsumableTicket(item)}
                                                    <Row></Row>
                                                    {this.renderRejectConsumableTicket(item)}
                                                </div>
                                                <div className='historyCards'  >
                                                    <div style={{ float: 'left' }} >
                                                        <h6><b>Ticket No.</b> : {item.ticket_number}</h6>
                                                        <h6><b>Employee</b> : {item.user !== null ? item.user.first_name + " " + item.user.last_name : <b style={{ color: 'teal' }}>Employee has left</b>}</h6>
                                                        <h6><b>Request Date</b> : {moment(item.date).format('DD MMM YYYY')}</h6>
                                                        <h6><b>Item</b> : {item.requested_asset_item ? `${item.requested_asset_item} ` : `${item.requested_consumable_item} `}</h6>
                                                    </div>
                                                    <div style={{ float: 'right' }}>
                                                        <h6><b>Quantity</b> : {item.quantity}</h6>
                                                        <h6><b>Status</b> : {item.status}</h6>
                                                        <h6><b>Admin Name</b> : {item.status === 'Accepted' || item.status === 'Pending' ? item.adminName : null}</h6>
                                                    </div>
                                                </div>
                                            </CardPanel>
                                        })}
                            </Col>
                            {this.state.consumablePagination.totalPage > 1 ? <Pagination className='pagination filterPadding' items={this.state.consumablePagination.totalPage} activePage={this.state.consumablePage} maxButtons={5} onSelect = {this.setConsumablePage} /> : null}
                        </div>}
                    </div>

                </Tabs>}
                {filterPane}
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


export default TicketsList
