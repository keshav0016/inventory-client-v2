import React, {Component} from 'react';
import axios from 'axios'
import {Col, CardPanel, Row, Input, Preloader, Button, SideNav} from 'react-materialize'
import moment from 'moment'
import './Employee.css'
import './ListPage.css'
import { baseUrl } from './config';

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
           url : `${baseUrl}/consumables/entirehistory?purchased=${this.state.isPurchased}&assigned=${this.state.isAssigned}`,
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
    let filterSlideButton = <Button floating large className = 'teal filterContainerSliderButton' waves = 'light' icon = 'filter_list' style={{top:'64px'}}></Button>;
    let filterPane = <div className="filterContainer">
    <p style={{fontFamily: 'Roboto',fontWeight: 300, color:'white'}} className="adminDashboardTitle">History Filters</p>
        <Row className="ticketListCheckbox">
            <Input name='filter' type='checkbox' value='red' label='Purchased' onClick = {this.setPurchased} checked={this.state.isPurchased} />
            <Input name='filter' type='checkbox' value='red' label='Assigned' onClick = {this.setAssigned} checked={this.state.isAssigned} />
        </Row>
    </div>     
       return(
           <div className="listComponent">
            {this.state.fetchHistory ? this.getHistory() : null}
            <h3 className="title">Consumable History</h3>
            {filterSlideButton}
            <SideNav className="filterSliderPane" trigger={filterSlideButton} options={{ closeOnClick: true, edge: 'right' }}>
                {filterPane}
            </SideNav>
            <Row className='splitModalButtons'>
                <a href='/admin/consumables'><Button style={{float : 'left'}}>Go Back</Button></a>
           </Row>
            {(this.state.history.length < 1 ? 
            <div className = 'noRecordsScreen'>No Records</div>
            :this.state.history.map((consumable, index) => {
                return <Col s={12} m={12} key={index}>
                            {consumable.vendor_name ? 
                            ( consumable.consumable ?
                            (
                                <CardPanel className='z-depth-2 consumableTable'>
                            <div> 
                                <h5 style={{fontFamily: 'Roboto',fontWeight: 300}}>Purchased</h5>
                                <div className='historyCards'  >
                                    <div style={{float : 'left'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>Vendor Name</b> : {consumable.vendor_name}</h6>
                                        <h6><b>Purchase Date</b> : {moment(consumable.purchase_date).format('DD MMM YYYY')}</h6>
                                        {consumable.purchase_date ? <h6><b>Purchased Quantity</b> : {consumable.quantity}</h6> : null}
                                    </div>
                                    <div style={{float: 'right'}} >
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
                                <h5 style={{fontFamily: 'Roboto',fontWeight: 300}}>Assigned</h5>
                                <div className='historyCards' >
                                    <div style={{float: 'left'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>Employee Name</b> : {consumable.user!==null?consumable.user.first_name + " " + consumable.user.last_name: <b style={{color:'teal'}}>Employee has left</b>}</h6>
                                        <h6><b>Assigned Date</b> : {moment(consumable.assigned_date).format('DD MMM YYYY')}</h6>
                                    </div>
                                    <div style={{float: 'right'}} >
                                        {consumable.ticket_number ? (<h6><b>Ticket</b> : {consumable.quantity}</h6>) : 'Assigned by Admin'}
                                        {consumable.assigned_date ? (<h6><b>Assigned Quantity</b> : {consumable.quantity}</h6>) : null}
                                    </div>
                                </div>
                             </div>
                             </CardPanel>)
                             :
                            null )}
                    </Col>
                       }))}
                       {filterPane}
           </div>
       )
   }


}



export default EntireHistoryConsumables