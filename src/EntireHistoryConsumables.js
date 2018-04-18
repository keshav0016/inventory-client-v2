import React, {Component} from 'react';
import axios from 'axios'
import {Col, CardPanel, Row, Input} from 'react-materialize'
import moment from 'moment'
import './Employee.css'
import './ListPage.css'

class EntireHistoryConsumables extends Component{
   constructor(props){
       super(props)
       this.state = {
           history : [],
           fetchHistory : true,
           isPurchased : false,
           isAssigned : false
       }
       this.getHistory = this.getHistory.bind(this)
       this.setPurchased = this.setPurchased.bind(this)
       this.setAssigned = this.setAssigned.bind(this)
   }

   getHistory(){
       axios({
           method : 'get',
           url : `http://localhost:3001/consumables/entirehistory?purchased=${this.state.isPurchased}&assigned=${this.state.isAssigned}`,
           withCredentials : true
       })
       .then(res => {
           this.setState({
               history : res.data.history,
               fetchHistory : false
           })
       })
       .catch(error => {
           console.error(error)
       })
   }

   setPurchased(){
       this.setState({
           isPurchased : !this.state.isPurchased,
           fetchHistory : true
       })
   }

   setAssigned(){
       this.setState({
           isAssigned : !this.state.isAssigned,
           fetchHistory : true
       })
   }


   render(){
       return(
           <div style={{marginLeft : '1%',marginRight : '1%'}}>
            {this.state.fetchHistory ? this.getHistory() : null}
            <h3 className='heading'>Consumable History</h3>
            {this.state.history.map((consumable, index) => {
                return <Col s={12} m={12} key={index}>
                            {consumable.vendor_name ? 
                            ( consumable.consumable ?
                            (
                                <CardPanel className='z-depth-2 consumableTable'>
                            <div> 
                                <h5><u>Purchased</u></h5>
                                <div style={{display : 'flex'}} >
                                    <div style={{float : 'left', width : '50%'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>Vendor Name</b> : {consumable.vendor_name}</h6>
                                        <h6><b>Purchase Date</b> : {moment(consumable.purchase_date).format('DD MMM YYYY')}</h6>
                                        {consumable.purchase_date ? <h6><b>Purchased Quantity</b> : {consumable.quantity}</h6> : null}
                                    </div>
                                    <div style={{float: 'right', width : '50%'}} >
                                        <h6><b>Individual Price</b> : ₹{consumable.item_price.toFixed(2)}</h6>
                                        <h6><b>Collective Price</b> : ₹{consumable.whole_price.toFixed(2)}</h6>
                                        <h6><b>Discount</b> : {consumable.discount}%</h6>
                                        <h6><b>GST</b> : {consumable.gst}%</h6>
                                        <h6><b>Total</b> : ₹{consumable.total.toFixed(2)}</h6>
                                    </div>
                                </div>
                            </div>
                            </CardPanel>
                            )
                            :
                            null
                            )
                             :
                             ( 
                                 consumable.consumable ? 
                             (
                                <CardPanel className='z-depth-2 consumableTable'>
                             <div>
                                <h5><u>Assigned</u></h5>
                                <div style={{display : 'flex'}} >
                                    <div style={{float: 'left', width : '50%'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>User Name</b> : {consumable.user.first_name + " " + consumable.user.last_name}</h6>
                                        <h6><b>Assigned Date</b> : {moment(consumable.assigned_date).format('DD MMM YYYY')}</h6>
                                    </div>
                                    <div style={{float: 'right', width : '50%'}} >
                                        {consumable.ticket_number ? (<h6><b>Ticket</b> : {consumable.quantity}</h6>) : 'Assigned by Admin'}
                                        {consumable.assigned_date ? (<h6><b>Assigned Quantity</b> : {consumable.quantity}</h6>) : null}
                                    </div>
                                </div>
                             </div>
                             </CardPanel>)
                             :
                            null )}
                    </Col>
                       })}
                <div className="filterContainerConsumableHistory">
                <p style={{color:'white'}} className="adminDashboardTitle">History Filters</p>
                    <Row className="ticketListCheckbox">
                        <Input name='filter' type='checkbox' value='red' label='Purchased' onClick = {this.setPurchased} checked={this.state.isPurchased} />
                        <Input name='filter' type='checkbox' value='red' label='Assigned' onClick = {this.setAssigned} checked={this.state.isAssigned} />
                    </Row>
                </div>
           </div>
       )
   }


}



export default EntireHistoryConsumables