import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Pagination, Row, Input} from 'react-materialize'
import moment from 'moment'


class TicketsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            ticketsList:[],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,     
            handleListRequest : true,
            isPendingChecked : true,
            isAcceptedChecked : false,
            isRejectedChecked : false,
        }
        this.setPage = this.setPage.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.handleList = this.handleList.bind(this)
        this.setPendingChecked = this.setPendingChecked.bind(this)
        this.setAcceptedChecked = this.setAcceptedChecked.bind(this)
        this.setRejectedChecked = this.setRejectedChecked.bind(this)

    }

    setPendingChecked(){
        this.setPage(1)
        this.setState({
            isPendingChecked : !this.state.isPendingChecked,
        })
    }

    setAcceptedChecked(){
        this.setPage(1)
        this.setState({
            isAcceptedChecked : !this.state.isAcceptedChecked,
        })
    }

    setRejectedChecked(){
        this.setPage(1)
        this.setState({
            isRejectedChecked : !this.state.isRejectedChecked,
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

    handleList(){
        if(!this.state.isPendingChecked && !this.state.isAcceptedChecked && !this.state.isRejectedChecked){
            axios({
                method : 'get',
                url : `http://localhost:3001/admin/ticket/list?page=${this.state.page}`,
                withCredentials : true
            })
            .then(res => {
                this.setState({
                    ticketsList : res.data.tickets,
                    pagination : res.data.pagination,
                    handleListRequest : false
                })
            })
            .catch(error => {
                console.error(error)
            })
        }
        else{
            axios({
                method : 'get',
                url : `http://localhost:3001/admin/ticket/list?page=${this.state.page}&Accepted=${this.state.isAcceptedChecked}&Pending=${this.state.isPendingChecked}&Rejected=${this.state.isRejectedChecked}`,
                withCredentials : true
            })
            .then(res => {
                this.setState({
                    ticketsList : res.data.tickets,
                    pagination : res.data.pagination,
                    handleListRequest : false
                })
            })
            .catch(error => {
                console.error(error)
            })
        }
        
    }

    acceptTicket(ticket_number){
        axios({
            method:'post',
            url:'http://localhost:3001/admin/ticket/accept',
            data:{
                ticket_number:ticket_number
            },
            withCredentials:true
        })
        .then(res =>{
            this.setState({
                handleListRequest:true
            })
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
            },
            withCredentials:true
        })
        .then(res =>{
            this.setState({
                handleListRequest:true
            })
            window.Materialize.toast(res.data.message,4000)
        })
        .catch(error =>{
            window.Materialize.toast(error.data.error,4000)
        })
    }

    render(){
        return(
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <Row>
                    <Input name='filter' type='checkbox' value='red' label='Pending' onClick = {this.setPendingChecked} checked={this.state.isPendingChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Accepted' onClick = {this.setAcceptedChecked} checked={this.state.isAcceptedChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Rejected' onClick = {this.setRejectedChecked} checked={this.state.isRejectedChecked} />
                </Row>
                <Table centered>
                    <thead>
                        <tr>
                            <th data-field="ticket_number">Ticket Number</th>
                            <th data-field="employeeName">Employee Name</th>
                            <th data-field="date">Requested Date</th>
                            <th data-field="requestedItem">Requested Item</th>
                            {/* <th data-field="requested_asset_id">Requested Asset Id</th>
                            <th data-field="requested_consumable_id">Requested Consumable Id</th>
                            <th data-field="item_type">Resource Type</th> */}
                            <th data-field="quantity">Quantity</th>
                            <th data-field="status">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.ticketsList.map((ticket, index) => {
                            return (<tr key={ticket.ticket_number}>
                            <td>{ticket.ticket_number}</td>
                            <td>{ticket.user.first_name + " " + ticket.user.last_name}</td>
                            <td>{moment(ticket.date).format('DD - MM - YYYY')}</td>
                            <td>{ticket.requested_asset_item ? ticket.request_asset_item + " " + ticket.item_type : ticket.requested_consumable_item + " " + "[ "+ticket.item_type+" ]"}</td>
                            {/* <td>{ticket.requested_asset_id}</td>
                            <td>{ticket.requested_consumable_id}</td>
                            <td>{ticket.item_type}</td> */}
                            <td>{ticket.quantity}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.status === 'Pending' ? <Button onClick={this.acceptTicket.bind(this,ticket.ticket_number)}>Accept</Button> : null}</td>
                            <td>{ticket.status === 'Pending' ? <Button onClick={this.rejectTicket.bind(this,ticket.ticket_number)}>Reject</Button> : null}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <Pagination items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />
                </div>
            </div>
        )
    }


}



export default TicketsList