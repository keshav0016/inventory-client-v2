import React, {Component} from 'react';
import axios from 'axios'
import {CardPanel, Col, Row, Button, Preloader, Icon} from 'react-materialize'
import moment from 'moment'
import './ListPage.css'
import './Employee.css'
import {Parser} from 'json2csv';
import fileSaver from 'file-saver'
import { baseUrl } from './config';
import {
    Redirect
  } from 'react-router-dom';
  
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
            redirect : false
        }
        this.handleList = this.handleList.bind(this)
        this.parsingDataToCsv = this.parsingDataToCsv.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/asset/history?asset_id=${this.props.match.params.asset}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetDetails : res.data.assetDetails,
                historyAssigned : res.data.historyAssigned,
                historyRepair : res.data.historyRepair,
                history : res.data.historyAssigned.concat(res.data.historyRepair).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
                assignedEmployee : res.data.employeeDetails,
                repairDetails : res.data.repairDetails,
                handleListRequest : false
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
        const fields = ['Id', 'Type', 'Name', 'Category', 'Amount', 'GST', 'Total', 'Purchase Vendor', 'Assigned Employee', 'Assigned From', 'Assigned To', 'Service Vendor', 'Service From', 'Service To']
        const assetsExport = []
        this.state.history.forEach(assetDetail => {
            return assetsExport.push({
                "Id" : this.state.assetDetails.asset_id,
                "Type" : this.state.assetDetails.assetType,
                "Name" : this.state.assetDetails.asset_name,
                "Category" : this.state.assetDetails.category,
                "Amount" : this.state.assetDetails.amount,
                "GST" : this.state.assetDetails.gst,
                "Total" : this.state.assetDetails.total,
                "Purchase Vendor" : this.state.assetDetails.vendor,
                "Assigned Employee" : assetDetail.user ? assetDetail.user.first_name + ' ' + assetDetail.user.last_name : null,
                "Assigned From" : assetDetail.user ? moment(assetDetail.from).format('DD MMM YYYY') : null,
                "Assigned To" : assetDetail.user && assetDetail.to ? moment(assetDetail.to).format('DD MMM YYYY') : null,
                "Service Vendor" : assetDetail.vendor ? assetDetail.vendor : null,
                "Service From" : assetDetail.vendor ? moment(assetDetail.from).format('DD MMM YYYY') : null,
                "Service To" : assetDetail.vendor && assetDetail.to ? moment(assetDetail.to).format('DD MMM YYYY') : null,
            })
        })
        
        const json2csvParser = new Parser({fields})
        const csv = json2csvParser.parse(assetsExport)
        const blob = new Blob([csv], {type : 'text/csv'})
        fileSaver.saveAs(blob, `Asset-${this.props.match.params.asset}.csv`)
    }

    render(){
        return(
            <div  className="listComponent" >
            {this.state.redirect ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
                {this.state.handleListRequest ? this.handleList() : null}
                <h3 className="title">Asset Details</h3>
                {this.state.assetDetails ? <div>
                {this.state.handleListRequest ? <Row><Preloader size='small' /></Row> :
                <div>
                    {this.state.assetDetails.disabled === 1 ? <b><p className = "heading">Current Status : Unavailable </p></b> : <React.Fragment>
                {this.state.assetDetails.current_status === 'Available' ? <b><p className = "heading">Current Status : {this.state.assetDetails.current_status}</p></b> : null }
                {this.state.assetDetails.current_status === 'Assigned' ? <b><p className = "heading">Currently Assigned to {this.state.assignedEmployee !== null ?this.state.assignedEmployee.first_name+""+ this.state.assignedEmployee.last_name: <b style={{color:'teal'}}>Employee has left</b>} ({this.state.assignedEmployee !== null ?this.state.assignedEmployee.user_id: null})</p></b> : null}
                {this.state.assetDetails.current_status === 'Service' ? <b><p className = "heading">Currently under Service to {this.state.repairDetails.vendor} vendor and the Expected recovery is {moment(this.state.repairDetails.expected_delivery).format('DD MMM YYYY')}</p></b> : null}
                </React.Fragment>}
                <Row className="splitModalButtons">
                    <a href='/admin/assets'><Button style={{float : 'left'}}><Icon>arrow_back</Icon></Button></a>
                    <Button style={{float : 'right', marginRight : '20px'}} onClick={this.parsingDataToCsv}>Export</Button>
                    <a href={`${baseUrl}/asset/qr?text=${this.props.match.params.asset}`} target='_blank'><Button style={{float : 'right', marginRight : '20px'}}>QR</Button></a>
                </Row>
                    {/* <Row> */}
                        <Col s={12} m={12}>
                        <CardPanel className="z-depth-2" >
                            <h5 style={{fontFamily : 'Roboto', fontWeight : 300}}>Purchase</h5>
                            <div className="historyCards" >
                                <div style={{float : 'left'}} >
                                    <h6><b>Asset Name</b> : {this.state.assetDetails.asset_name}</h6>
                                    <h6><b>Serial Number</b> : {this.state.assetDetails.serial_number}</h6>
                                    <h6><b>Invoice Number</b> : {this.state.assetDetails.invoice_number}</h6>
                                    <h6><b>Vendor</b> : {this.state.assetDetails.vendor}</h6>
                                    <h6><b>Category</b> : {this.state.assetDetails.category}</h6>
                                    <h6><b>Asset Type</b> : {this.state.assetDetails.assetType}</h6>
                                </div>
                                <div style={{float: 'right'}} >
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
                                    <h5 style={{fontFamily : 'Roboto', fontWeight : 300}}>Repair</h5>
                                    <div className="historyCards" >
                                        <div style={{float : 'left'}} >
                                            <h6><b>From</b> : {moment(element.from).format('DD MMM YYYY')}</h6>
                                            {element.to ? <h6><b>To</b> : { moment(element.to).format('DD MMM YYYY') }</h6> : <h6><b>Expected Delivery</b> : { moment(element.expected_delivery).format('DD MMM YYYY') }</h6>}
                                            {element.to ? <h6><b>Repair Invoice</b> : {element.repair_invoice}</h6> : null}
                                            <h6><b>Vendor</b> : {element.vendor}</h6>
                                        </div>
                                        <div style={{float : 'right'}} >
                                            {element.to ? <h6><b>Amount</b> : {element.amount}</h6> : null}
                                            {element.to ? <h6><b>GST</b> : {element.gst}</h6> : null}
                                            {element.to ? <h6><b>Total</b> : {element.total}</h6> : null}
                                        </div>
                                    </div>
                                </div> : <div>
                                    <h5 style={{fontFamily : 'Roboto', fontWeight : 300}}>Assigned</h5>
                                    <div className="historyCards" >
                                        <div style={{float: 'left'}} >
                                            <h6><b>Employee Id</b> : {element.user_id}</h6>
                                            <h6><b>Employee Name</b> : {element.user!== null ? element.user.first_name +" "+ element.user.last_name: <b style={{color:'teal'}}>Employee has left</b>}</h6>
                                            <h6><b>From</b> : {moment(element.from).format('DD MMM YYYY')}</h6>
                                        </div>
                                        <div style={{float: 'right'}} >
                                            {element.to ? <h6><b>To</b> : { moment(element.to).format('DD MMM YYYY') }</h6> : <h6><b>Expected Recovery</b> : { moment(element.expected_recovery).format('DD MMM YYYY') }</h6>}
                                            {element.ticekt_number ? <h6><b>Ticket Number</b> : {element.ticekt_number}</h6> : <h6><b>Assigned by admin</b></h6>}
                                        </div>
                                    </div>
                                </div>}
                            </CardPanel>
                        </Col>
                    })}
                    {/* </Row> */}
                </div>} 
                </div>: <h4 className = 'heading'>No such Asset</h4>}
                
            </div>
        )
    }


}



export default Assets