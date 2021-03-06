import React, {Component} from 'react';
import axios from 'axios'
import {Col, CardPanel, Button, Modal, Preloader, Row, Icon} from 'react-materialize'
import moment from 'moment'
import './Employee.css'
import UpdateConsumablePurchase from './UpdateConsumablePurchase'
import fileSaver from 'file-saver'
import { baseUrl } from './config';
import {
    Redirect
  } from 'react-router-dom';
import xlsx from 'node-xlsx';

class HistoryConsumables extends Component{
   constructor(props){
       super(props)
       this.state = {
           history : [],
           fetchHistory : true,
           redirect : false
           ,showModal : false
           ,currentItem : null
       }
       this.getHistory = this.getHistory.bind(this)
       this.parsingDataToCsv = this.parsingDataToCsv.bind(this)
       this.handleUpdateModalClose = this.handleUpdateModalClose.bind(this)
    }
    handleUpdateModalClose(){
        this.setState({
            showModal : false
            ,currentItem : null
        })
    }

   getHistory(){
       axios({
           method : 'post',
           url : `${baseUrl}/consumables/history`,
           data: {
               consumable_id : this.props.match.params.consumable
           },
           withCredentials : true
       })
       .then(res => {
           this.setState({
               history : res.data.history,
               fetchHistory : false
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


   parsingDataToCsv(){
    if(this.state.history.length !== 0){
        var ConsumableDetails = [[
            'Id', 'Name', 'Purchase Quantity', 'Present Quantity','Vendor', 'Purchase Date', 'Individual Price', 'Collective Price', 'GST', 'Total'
        ]]
        this.state.history.map(element => {
            if(!element.user){
                return ConsumableDetails.push([
                    `${element.consumable_id}`,
                    `${element.consumable.name}`,
                    `${element.quantity}`,
                    `${element.consumable.quantity}`,
                    `${element.vendor_name}`,
                    `${moment(element.purchase_date).format('DD/MM/YYYY')}`,
                    `${element.item_price}`,
                    `${element.whole_price}`,
                    `${element.gst}`,
                    `${element.total}`
                ])
            }
        })
    }
    else{
        var ConsumableDetails = [[
            'Id', 'Name', 'Purchase Quantity','Present Quantity', 'Vendor', 'Purchase Date', 'Individual Price', 'Collective Price', 'GST', 'Total'
        ],[
            "Nil","Nil","Nil","Nil","Nil","Nil","Nil","Nil","Nil","Nil"
        ]]
    }
    if(this.state.history.length !== 0){
        var ConsumableAssignedDetails = [[
            "Employee Id",'Employee Name',"Assigned Quantity","Assigned Date","Ticket Number","Assigned by"
        ]]
        this.state.history.map(element => {
            if(element.user){
                return ConsumableAssignedDetails.push([
                    `${element.user_id}`,
                    `${element.user.first_name}${element.user.last_name}`,
                    `${element.quantity}`,
                    `${moment(element.assigned_date).format('DD/MM/YYYY')}`,
                    `${element.ticket_number ? element.ticket_number : "Nil"}`,
                    `${element.adminName ? element.adminName : "Nil"}`,

                ])
            }
        })
    }else{
        var ConsumableAssignedDetails = [[
            "Employee Id",'Employee Name',"Assigned Quantity","Assigned Date","Ticket Number","Assigned by"
        ],[
            "Nil","Nil","Nil","Nil","Nil","Nil"
        ]]
    }
    var buffer = xlsx.build([{name: 'Consumable-Details',data: ConsumableDetails},{name: 'Consumable-Assigned-Details',data: ConsumableAssignedDetails}]);
    const blob = new Blob([buffer],{ type: 'application/vnd.ms-excel' });
    const file = new File([blob], `Consumable-${this.props.match.params.consumable}.xlsx`,{ type: 'application/vnd.ms-excel' });
    fileSaver.saveAs(file);
}

   render(){
       return(
           <div className="listComponent" >
           {this.state.redirect ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            {this.state.fetchHistory ? this.getHistory() : null}
            <h3 className="title">Consumable Details</h3>
           <Row >
                <a href='/admin/consumables'><Button style={{float : 'left'}}><Icon>arrow_back</Icon></Button></a>
                <Button style={{float : 'right'}} onClick={this.parsingDataToCsv}>Export</Button>
           </Row> 

           
            {this.state.fetchHistory ? <Row><Preloader size='small' /></Row> :
            (this.state.history.length > 0  ? this.state.history.map((consumable, index) => {
                return <Col s={12} m={12} key={index}>
                        <CardPanel className='z-depth-2'>
                            {consumable.vendor_name ? 
                            <div> 
                                <h5 style={{fontFamily : 'Roboto', fontWeight : 300, display: "inline-block"}}>Purchased</h5>
                                <div style={{display: 'inline-block',position: 'relative',float: 'right',top: '5px',marginRight: '20px'}}>
                                <div>
                                <button className="editButtonPurchase" onClick={() => {this.setState({
                                    showModal : true
                                    , currentItem : consumable
                                })}}>Edit</button>
                                </div>
                                {/* <Modal 
                                    modalOptions={{dismissible:false}}
                                    actions={null}
                                    trigger={<Button style={{}}>Edit</Button>}>
                                    <UpdateConsumablePurchase onFinish={this.handleUpdateModalClose} consumable={consumable} getHistory={this.getHistory}/>
                                </Modal> */}
                                </div>
                                <div className='historyCards' >
                                    <div style={{float : 'left'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>Vendor Name</b> : {consumable.vendor_name}</h6>
                                        <h6><b>Description</b> : {consumable.consumable.description}</h6>
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
                             : 
                             <div>
                                <h5 style={{fontFamily : 'Roboto', fontWeight : 300}}>Assigned</h5>
                                <div className='historyCards' >
                                    <div style={{float: 'left'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>User Name</b> : {consumable.user !== null ? consumable.user.first_name + " " + consumable.user.last_name : <b style={{color:'teal'}}>Employee has left</b>}</h6>
                                        <h6><b>Assigned Date</b> : {moment(consumable.assigned_date).format('DD MMM YYYY')}</h6>
                                    </div>
                                    <div style={{float: 'right'}} >
                                        {consumable.ticket_number ? (<h6><b>Ticket</b> : {consumable.ticket_number}</h6>) : <h6><b>Ticket</b> : {'Nil'}</h6>}
                                        {consumable.assigned_date ? (<h6><b>Assigned Quantity</b> : {consumable.quantity}</h6>) : null}
                                        {consumable.ticket_number ? (consumable.adminName ? <h6><b>Accepted by</b>  {consumable.adminName}</h6> : null) : (consumable.adminName ? <h6><b>Assigned by </b>{consumable.adminName}</h6> : null) }

                                    </div>
                                </div>
                            </div>}
                        </CardPanel>
                    </Col>
                       }) : 
                       <div>
                           <h4>No such Consumable found</h4>
                       </div>)}
                       {this.state.showModal ? (
                    <Modal
                        modalOptions={{ dismissible: false }}
                        open={this.state.showModal}
                        actions={null}
                        className='editAssetBottomPadding'>
                        <UpdateConsumablePurchase onFinish={this.handleUpdateModalClose} consumable={this.state.currentItem} getHistory={this.getHistory} />
                    </Modal>

                ) : null}
           </div>
       )
   }


}



export default HistoryConsumables