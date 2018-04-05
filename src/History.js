import React, {Component} from 'react';
import axios from 'axios'
import {CardPanel, Col, Row} from 'react-materialize'
import moment from 'moment'
import './ListPage.css'

class Assets extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetDetails : {},
            historyAssigned : [],
            historyRepair : [],
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
                assetDetails : res.data.assetDetails,
                historyAssigned : res.data.historyAssigned,
                historyRepair : res.data.historyRepair,
                history : res.data.historyAssigned.concat(res.data.historyRepair).sort((a,b) => b.id - a.id),
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
                <h3>History</h3>
                {this.state.assetDetails ? <div>
                <h5 style={{float : 'right', position : 'absolute', left:'40%'}}>Current Status : {this.state.assetDetails.current_status}</h5>
                <h6>Asset Name : {this.state.assetDetails.asset_name}</h6>
                <h6>Serial Number : {this.state.assetDetails.serial_number}</h6>
                <h6>Invoice Number : {this.state.assetDetails.invoice_number}</h6>
                <h6>Vendor : {this.state.assetDetails.vendor}</h6>
                <h6>Category : {this.state.assetDetails.category}</h6>
                <h6>Purchase Date : {moment(this.state.assetDetails.purchase_date).format('DD MMM YYYY')}</h6>
                <h6>Description : {this.state.assetDetails.description}</h6>
                <h6>Amount : {this.state.assetDetails.amount}</h6>
                <h6>GST : {this.state.assetDetails.gst}</h6>
                <h6>Total : {this.state.assetDetails.total}</h6>
                 </div> : null}
                <br /><br />
                <div>
                    <Row>
                    {this.state.history.map((element, index) => {
                        return <Col s={12} m={4} key={index}>
                            <CardPanel className="grey darken-3 black-text " >
                                {element.vendor ? <div>
                                    <h5>Repair</h5>
                                    <h6>From : {moment(element.from).format('DD MMM YYYY')}</h6>
                                    {element.to ? <h6>To : { moment(element.to).format('DD MMM YYYY') }</h6> : <h6>Expected Delivery : { moment(element.expected_delivery).format('DD MMM YYYY') }</h6>}
                                    {element.to ? <h6>Repair Invoice : {element.repair_invoice}</h6> : null}
                                    {element.to ? <h6>Amount : {element.amount}</h6> : null}
                                    {element.to ? <h6>GST : {element.gst}</h6> : null}
                                    {element.to ? <h6>Total : {element.total}</h6> : null}
                                    <h6>Vendor : {element.vendor}</h6>
                                </div> : <div>
                                    <h5>Assigned</h5>
                                    <h6>User Id : {element.user_id}</h6>
                                    <h6>From : {moment(element.from).format('DD MMM YYYY')}</h6>
                                    {element.to ? <h6>To : { moment(element.to).format('DD MMM YYYY') }</h6> : <h6>Expected Recovery : { moment(element.expected_recovery).format('DD MMM YYYY') }</h6>}
                                    {element.ticekt_number ? <h6>Ticket Number : {element.ticekt_number}</h6> : <h6>Assigned by admin</h6>}
                                </div>}
                            </CardPanel>
                        </Col>
                    })}
                    </Row>
                </div>
                <div>
                </div> 
            </div>
        )
    }


}



export default Assets