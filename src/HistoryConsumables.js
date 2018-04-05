import React, {Component} from 'react';
import axios from 'axios'
import {Table} from 'react-materialize'
import moment from 'moment'

class HistoryConsumables extends Component{
   constructor(props){
       super(props)
       this.state = {
           history : [],
           fetchHistory : true,
       }
       this.getHistory = this.getHistory.bind(this)
   }

   getHistory(){
       axios({
           method : 'post',
           url : `http://localhost:3001/consumables/history`,
           data: {
               consumable_id : this.props.location.consumable
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


   render(){
       return(
           <div>
               {this.state.fetchHistory ? this.getHistory() : null}
               <Table centered striped>
                   <thead>
                       <tr>
                           <th data-field="consumable id">Consumable Id</th>
                           <th data-field="user id">User Id</th>
                           <th data-field="ticket number">Ticket Number</th>
                           <th data-field="assigned date">Assigned Date</th>
                           <th data-field="assigned quantity">Assigned Quantity</th>
                           <th data-field="vendor name">Vendor Name</th>
                           <th data-field="purchase date">Purchase Date</th>
                           <th data-field="purchased quantity">Purchased Quantity</th>
                           <th data-field="item price">Individual Price</th>
                           <th data-field="collective price">Collective Price</th>
                           <th data-field="discount">Discount</th>
                           <th data-field="gst">GST</th>
                           <th data-field="total">Total</th>
                       </tr>
                   </thead>

                   <tbody>
                       {this.state.history.map((consumable, index) => {
                           return <tr key={index}>
                           <td>{consumable.consumable_id ? consumable.consumable_id : '-'}</td>
                           <td>{consumable.user_id ? consumable.user_id : '-'}</td>
                           <td>{consumable.user_id ? (consumable.ticket_number ? consumable.ticket_number : '(Assigned by Admin)') : '-'}</td>
                           <td>{consumable.assigned_date ? moment(consumable.assigned_date).format('DD MMM YYYY') : '-'}</td>
                           <td>{consumable.assigned_date ? consumable.quantity : '-'}</td>
                           <td>{consumable.vendor_name ? consumable.vendor_name : '-'}</td>
                           <td>{consumable.purchase_date ? moment(consumable.purchase_date).format('DD MMM YYYY') : '-'}</td>
                           <td>{consumable.purchase_date ? consumable.quantity : '-'}</td>
                           <td>{consumable.item_price ? consumable.item_price : '-'}</td>
                           <td>{consumable.whole_price ? consumable.whole_price : '-'}</td>
                           <td>{consumable.discount ? consumable.discount : '-'}</td>
                           <td>{consumable.gst ? consumable.gst : '-'}</td>
                           <td>{consumable.total ? consumable.total : '-'}</td>
                           {/* <td>{consumable.purchase_date ? <Button>Edit</Button> : null}</td>
                           <td>{consumable.purchase_date ? <Button>Submit</Button> : null}</td> */}
                           </tr>
                       })}
                   </tbody>
               </Table>
           </div>
       )
   }


}



export default HistoryConsumables