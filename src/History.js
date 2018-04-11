import React, {Component} from 'react';
import axios from 'axios'
import {CardPanel, Col, Row} from 'react-materialize'
import moment from 'moment'
import './ListPage.css'
import './Employee.css'

class Assets extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetDetails : {},
            historyAssigned : [],
            historyRepair : [],
            history : [],
            assignedEmployee : {},
            repairDetails : {},
            handleListRequest : true,
        }
        this.handleList = this.handleList.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/asset/history?asset_id=${this.props.match.params.asset}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetDetails : res.data.assetDetails,
                historyAssigned : res.data.historyAssigned,
                historyRepair : res.data.historyRepair,
                history : res.data.historyAssigned.concat(res.data.historyRepair).sort((a,b) => b.id - a.id),
                assignedEmployee : res.data.employeeDetails,
                repairDetails : res.data.repairDetails,
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div  style={{marginLeft : '1%', marginRight : '1%'}}>
                {this.state.handleListRequest ? this.handleList() : null}
                {this.state.assetDetails ? <div>
                <h3 className='heading'>Asset Details</h3>
                {this.state.assetDetails.current_status === 'Available' ? <h4 className = "heading">Current Status : {this.state.assetDetails.current_status}</h4> : null }
                {this.state.assetDetails.current_status === 'Assigned' ? <h4 className = "heading">Currently Assigned to {this.state.assignedEmployee.first_name} {this.state.assignedEmployee.last_name} ({this.state.assignedEmployee.user_id})</h4> : null}
                {this.state.assetDetails.current_status === 'Service' ? <h4 className = "heading">Currently under Service to {this.state.repairDetails.vendor} vendor and the Expected recovery is {moment(this.state.repairDetails.expected_delivery).format('DD MMM YYYY')}</h4> : null}
                    <Row>
                        <Col s={12} m={12}>
                        <CardPanel className="z-depth-2" >
                            <h5><u>Purchase</u></h5>
                            <div style = {{display : 'flex'}} >
                                <div style={{float : 'left', width : '50%'}} >
                                    <h6><b>Asset Name</b> : {this.state.assetDetails.asset_name}</h6>
                                    <h6><b>Serial Number</b> : {this.state.assetDetails.serial_number}</h6>
                                    <h6><b>Invoice Number</b> : {this.state.assetDetails.invoice_number}</h6>
                                    <h6><b>Vendor</b> : {this.state.assetDetails.vendor}</h6>
                                    <h6><b>Category</b> : {this.state.assetDetails.category}</h6>
                                </div>
                                <div style={{float: 'right', width : '50%'}} >
                                    <h6><b>Purchase Date</b> : {moment(this.state.assetDetails.purchase_date).format('DD MMM YYYY')}</h6>
                                    <h6><b>Description</b> : {this.state.assetDetails.description}</h6>
                                    <h6><b>Amount</b> : {this.state.assetDetails.amount}</h6>
                                    <h6><b>GST</b> : {this.state.assetDetails.gst}</h6>
                                    <h6><b>Total</b> : {this.state.assetDetails.total}</h6>
                                </div>
                            </div>
                        </CardPanel>
                        </Col>
                    {this.state.history.map((element, index) => {
                        return <Col s={12} m={12} key={index}>
                            <CardPanel className="z-depth-2" >
                                {element.vendor ? <div>
                                    <h5><u>Repair</u></h5>
                                    <div style={{display : 'flex'}} >
                                        <div style={{float : 'left', width : '50%'}} >
                                            <h6><b>From</b> : {moment(element.from).format('DD MMM YYYY')}</h6>
                                            {element.to ? <h6><b>To</b> : { moment(element.to).format('DD MMM YYYY') }</h6> : <h6><b>Expected Delivery</b> : { moment(element.expected_delivery).format('DD MMM YYYY') }</h6>}
                                            {element.to ? <h6><b>Repair Invoice</b> : {element.repair_invoice}</h6> : null}
                                            <h6><b>Vendor</b> : {element.vendor}</h6>
                                        </div>
                                        <div style={{float : 'right', width : '50%'}} >
                                            {element.to ? <h6><b>Amount</b> : {element.amount}</h6> : null}
                                            {element.to ? <h6><b>GST</b> : {element.gst}</h6> : null}
                                            {element.to ? <h6><b>Total</b> : {element.total}</h6> : null}
                                        </div>
                                    </div>
                                </div> : <div>
                                    <h5><u>Assigned</u></h5>
                                    <div style={{display : 'flex'}} >
                                        <div style={{float: 'left', width : '50%'}} >
                                            <h6><b>User Id</b> : {element.user_id}</h6>
                                            <h6><b>From</b> : {moment(element.from).format('DD MMM YYYY')}</h6>
                                        </div>
                                        <div style={{float: 'right', width : '50%'}} >
                                            {element.to ? <h6><b>To</b> : { moment(element.to).format('DD MMM YYYY') }</h6> : <h6><b>Expected Recovery</b> : { moment(element.expected_recovery).format('DD MMM YYYY') }</h6>}
                                            {element.ticekt_number ? <h6><b>Ticket Number</b> : {element.ticekt_number}</h6> : <h6><b>Assigned by admin</b></h6>}
                                        </div>
                                    </div>
                                </div>}
                            </CardPanel>
                        </Col>
                    })}
                    </Row>
                </div> : <h4 className = 'heading'>No such Asset</h4>}
            </div>
        )
    }


}



export default Assets