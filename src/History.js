import React, {Component} from 'react';
import axios from 'axios'
import {Table} from 'react-materialize'
import moment from 'moment'
import './ListPage.css'

class Assets extends Component{
    constructor(props){
        super(props)
        this.state = {
            history : [],
            handleListRequest : true,
        }
        this.handleList = this.handleList.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/asset/history?asset_id=${this.props.location.asset}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                history : res.data.history.sort((a, b) => b.updatedAt - a.updatedAt),
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <br />
                {/* <div><h5>{this.props.asset.asset_id}</h5><br /><h5>{this.props.asset.asset_name}</h5><br /><h5>{this.props.asset.current_status}</h5></div> */}
                <Table centered>
                    <thead>
                        <tr>
                            <th data-field="user id">User Id</th>
                            <th data-field="Vendor">Vendor</th>
                            <th data-field="type">Type</th>
                            <th data-field="from">From</th>
                            <th data-field="to">To</th>
                            <th data-field="ticket_number">Ticket No.</th>
                            <th data-field="repair_invoice">Repair Invoice</th>
                            <th data-field="amount">Amount</th>
                            <th data-field="gst">GST</th>
                            <th data-field="total">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.history.map((item, index) => {
                            return <tr key={index}>
                            <td>{item.user_id ? item.user_id : '-'}</td>
                            <td>{item.vendor ? item.vendor : '-'}</td>
                            <td>{item.user_id ? 'Assigned' : 'Repair'}</td>
                            <td>{moment(item.from).format('DD MMM YYYY')}</td>
                            <td>{item.user_id ? (item.to ? moment(item.to).format('DD MMM YYYY') : `${moment(item.expected_recovery).format('DD MMM YYYY')} (exp)`) : (item.to ? moment(item.to).format('DD MMM YYYY') : `${moment(item.expected_delivery).format('DD MMM YYYY')} (exp)`)}</td>
                            <td>{item.user_id ? (item.ticket_number ? item.ticket_number : '(Assigned by Admin)') : '-'}</td>
                            <td>{item.repair_invoice ? item.repair_invoice : '-'}</td>
                            <td>{item.amount ? item.amount : '-'}</td>
                            <td>{item.gst ? item.gst : '-'}</td>
                            <td>{item.total ? item.total : '-'}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <div>
                </div> 
            </div>
        )
    }


}



export default Assets