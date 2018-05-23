import React, {Component} from 'react';
import axios from 'axios'
import {Col, CardPanel, Button, Modal, Preloader} from 'react-materialize'
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
    const fields = ['Id', 'Name', 'Purchase Quantity', 'Vendor', 'Purchase Date', 'Individual Price', 'Collective Price', 'GST', 'Total', 'Assigned Employee', 'Assigned Date', 'Assigned Quantity']
    const consumablesExport = []
    this.state.history.forEach(consumableDetail => {
        return consumablesExport.push({
            "Id" : this.props.match.params.consumable,
            "Name" : consumableDetail.consumable.name,
            "Purchase Quantity" : consumableDetail.vendor_name ? consumableDetail.quantity : null,
            "Vendor" : consumableDetail.vendor_name ? consumableDetail.vendor_name : null,
            "Purchase Date" : consumableDetail.vendor_name ? moment(consumableDetail.purchase_date).format('DD MMM YYYY') : null,
            "Individual Price" : consumableDetail.vendor_name ? consumableDetail.item_price : null,
            "Collective Price" : consumableDetail.vendor_name ? consumableDetail.whole_price : null,
            "GST" : consumableDetail.vendor_name ? consumableDetail.gst : null,
            "Total" : consumableDetail.vendor_name ? consumableDetail.total : null,
            "Assigned Employee" : consumableDetail.vendor_name ? null : consumableDetail.user.first_name + ' ' + consumableDetail.user.last_name,
            "Assigned Date" : consumableDetail.vendor_name ? null : moment(consumableDetail.assigned_date).format('DD MMM YYYY'),
            "Assigned Quantity" : consumableDetail.vendor_name ? null : consumableDetail.quantity,
        })
    })
    
    const json2csvParser = new Parser({fields})
    const csv = json2csvParser.parse(consumablesExport)
    const blob = new Blob([csv], {type : 'text/csv'})
    fileSaver.saveAs(blob, `Consumable-${this.props.match.params.consumable}.csv`)
}

   render(){
       return(
           <div style={{marginLeft : '30px',marginRight : '30px'}}>
            <Button style={{float : 'right', marginRight : '20px'}} onClick={this.parsingDataToCsv}>Export</Button>
            {this.state.fetchHistory ? this.getHistory() : null}
            <h3 style={{fontFamily : 'Roboto', fontWeight : 250}}>Consumable Details</h3>
            {this.state.fetchHistory ? <div><Preloader size='small' /></div> : 
            (this.state.history.length > 0  ? this.state.history.map((consumable, index) => {
                return <Col s={12} m={12} key={index}>
                        <CardPanel className='z-depth-2'>
                            {consumable.vendor_name ? 
                            <div> 
                                <h5 style={{fontFamily : 'Roboto', fontWeight : 300}}>Purchased</h5>
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
                                            actions={null}
                                            trigger={<Button>Edit</Button>}>
                                            <UpdateConsumablePurchase consumable={consumable} getHistory={this.getHistory}/>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                             : 
                             <div>
                                <h5 style={{fontFamily : 'Roboto', fontWeight : 300}}>Assigned</h5>
                                <div style={{display : 'flex'}} >
                                    <div style={{float: 'left', width : '50%'}} >
                                        <h6><b>Consumable</b> : {consumable.consumable.name}</h6>
                                        <h6><b>User Name</b> : {consumable.user !== null ? consumable.user.first_name + " " + consumable.user.last_name : <b style={{color:'teal'}}>Employee has left</b>}</h6>
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
                       }) : 
                       <div>
                           <h4>No such Consumable found</h4>
                       </div>)}
                       <a href='/admin/consumables'><Button>Go Back</Button></a>
           </div>
       )
   }


}



export default HistoryConsumables