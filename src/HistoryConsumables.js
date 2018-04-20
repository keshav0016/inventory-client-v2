import React, {Component} from 'react';
import axios from 'axios'
import {Col, CardPanel, Button, Modal} from 'react-materialize'
import moment from 'moment'
import './Employee.css'
import UpdateConsumablePurchase from './UpdateConsumablePurchase'
import {Parser} from 'json2csv';
import fileSaver from 'file-saver'
import { baseUrl } from './config';

class HistoryConsumables extends Component{
   constructor(props){
       super(props)
       this.state = {
           history : [],
           fetchHistory : true,
       }
       this.getHistory = this.getHistory.bind(this)
       this.parsingDataToCsv = this.parsingDataToCsv.bind(this)
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
           console.error(error)
       })
   }


   parsingDataToCsv(){
    const fields = ['id', 'name', 'purchaseQuantity', 'vendor', 'purchaseDate', 'individualPrice', 'collectivePrice', 'gst', 'total', 'assignedEmployee', 'assignedDate', 'assignedQuantity']
    const consumablesExport = []
    this.state.history.forEach(consumableDetail => {
        return consumablesExport.push({
            "id" : this.props.match.params.consumable,
            "name" : consumableDetail.consumable.name,
            "purchaseQuantity" : consumableDetail.vendor_name ? consumableDetail.quantity : '-',
            "vendor" : consumableDetail.vendor_name ? consumableDetail.vendor_name : '-',
            "purchaseDate" : consumableDetail.vendor_name ? consumableDetail.purchase_date : '-',
            "individualPrice" : consumableDetail.vendor_name ? consumableDetail.item_price : '-',
            "collectivePrice" : consumableDetail.vendor_name ? consumableDetail.whole_price : '-',
            "gst" : consumableDetail.vendor_name ? consumableDetail.gst : '-',
            "total" : consumableDetail.vendor_name ? consumableDetail.total : '-',
            "assignedEmployee" : consumableDetail.vendor_name ? '-' : consumableDetail.user.first_name + ' ' + consumableDetail.user.last_name,
            "assignedDate" : consumableDetail.vendor_name ? '-' : consumableDetail.assigned_date,
            "assignedQuantity" : consumableDetail.vendor_name ? '-' : consumableDetail.quantity,
        })
    })
    
    const json2csvParser = new Parser({fields, quote: '\''})
    const csv = json2csvParser.parse(consumablesExport)
    const blob = new Blob([csv], {type : 'text/csv'})
    fileSaver.saveAs(blob, `Consumable-${this.props.match.params.asset}.csv`)
}

   render(){
       return(
           <div style={{marginLeft : '1%',marginRight : '1%'}}>
            <Button style={{float : 'right', marginRight : '20px'}} onClick={this.parsingDataToCsv}>Export</Button>
            {this.state.fetchHistory ? this.getHistory() : null}
            <h3 className='heading'>Consumable Details</h3>
            {this.state.history.map((consumable, index) => {
                return <Col s={12} m={12} key={index}>
                        <CardPanel className='z-depth-2'>
                            {consumable.vendor_name ? 
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
                                        <Modal
                                            header='Update Consumable Purchase Detail'
                                            fixedFooter
                                            trigger={<Button>Edit</Button>}>
                                            <UpdateConsumablePurchase consumable={consumable} getHistory={this.getHistory}/>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                             : 
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
                            </div>}
                        </CardPanel>
                    </Col>
                       })}
           </div>
       )
   }


}



export default HistoryConsumables