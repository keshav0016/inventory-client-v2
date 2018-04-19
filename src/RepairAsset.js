import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon, Modal, Autocomplete} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'
import moment from 'moment'
import './Employee.css'

class RepairAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            repairAssetRequest : false,
            vendor : 'Select',
            from : '',
            expected_delivery : '',
            vendorList : [],
            addVendor : false,
            assetDetails : {},
            vendorNames:{},
            vendorListRequest : true,
            isDisabled : false
        }
        this.repairAssetIntoDb = this.repairAssetIntoDb.bind(this)
        this.setFrom = this.setFrom.bind(this)
        this.setExpectedDelivery = this.setExpectedDelivery.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setVendor = this.setVendor.bind(this)
        this.handleVendorList = this.handleVendorList.bind(this)
        this.setVendorListRequest = this.setVendorListRequest.bind(this)
        this.getVendorName = this.getVendorName.bind(this)
    }

    checkForValidation(){
        if(this.state.vendor === 'Select' || !this.state.from || !this.state.expected_delivery){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            if(new Date(this.state.from) > new Date(this.state.expected_delivery)){
                window.Materialize.toast('Expected Delivery cannot be less than FROM', 4000)
            }
            else{
                this.setState({
                    repairAssetRequest : true
                })
            }
        }
    }

    getVendorName(){
        this.state.vendorList.map((obj)=>{
            this.state.vendorNames[obj.name]=null
        })
    }

    setVendorListRequest(){
        this.setState({
            vendorListRequest : true
        })
        $('#addVendor .modal-footer button').click()
    }

    vendorListDropdown(){
        var vendorArr = []
        vendorArr.push(<option key='Select' value='Select'>Select</option>)
        this.state.vendorList.forEach(vendor => {
            vendorArr.push(<option key={vendor.id} value={vendor.name}>{vendor.name}</option>)
        });
        return vendorArr
    }

    repairAssetIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/repair',
            data : {
                asset_id : this.props.match.params.asset,
                vendor : this.state.vendor,
                from : this.state.from,
                expected_delivery : this.state.expected_delivery
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                repairAssetRequest : false,
                isDisabled : true
            })
            window.Materialize.toast('Repair information has been stored', 4000)
            // this.props.setHandleListRequest()
        })
    }

    // setEmployeeDropdown(){
    //     var employeesArr = []
    //     this.state.employees.forEach(employee => {
    //         employeesArr.push(<option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>)
    //     });
    //     return employeesArr
    // }

    setVendor(e,value){
        this.setState({
            vendor : value
        })
    }

    setFrom(e){
        this.setState({
            from : e.target.value
        })
    }

    setExpectedDelivery(e){
        this.setState({
            expected_delivery : e.target.value
        })
    }

    handleVendorList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/vendor/list`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                vendorList : res.data.vendors.sort((a, b) => a.asset_id - b.asset_id),
                vendorListRequest : false
            })
            this.getVendorName()
        })
        .catch(error => {
            console.error(error)
        })

        axios({
            method : 'get',
            url : `http://localhost:3001/asset/history?asset_id=${this.props.match.params.asset}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetDetails : res.data.assetDetails,
            })
        })
    }


    render(){
        return(
            <div style={{marginLeft : '1%'}} >
                <h3 className="heading">Repair Asset</h3>
                <br /><br />
                {this.state.assetDetails ? 
                <div>
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
                    <br /><br />
                    <Row>
                        {/* <Input s={12} type="select" label="Service Provider*" value={this.state.vendor} onChange = {this.setVendor} disabled = {this.state.isDisabled}>{this.vendorListDropdown()}</Input> */}
                        <Row>
                            <Autocomplete s={12}
                                title='Service Provider'
                                data={
                                    this.state.vendorNames
                                }
                                onChange = {this.setVendor}
                            />
                        </Row>
                        <Input s={12} type='date' label="Given for Repair On *" value = {this.state.from} onChange = {this.setFrom} disabled = {this.state.isDisabled}/>
                        <Input s={12} type='date' label="Expected Delivery*" value = {this.state.expected_delivery} onChange = {this.setExpectedDelivery} disabled = {this.state.isDisabled}/>
                    </Row>
                    <Modal
                        header='Add Vendor'
                        id="addVendor"
                        trigger={<Button>Add Vendor</Button>}>
                        <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                    </Modal> 
                    <br /><br />
                    <Button waves='light' style={{position : 'fixed', bottom : '3%', right : '3%'}} onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
                    {this.state.vendorListRequest ? this.handleVendorList() : null}
                    {this.state.repairAssetRequest ? this.repairAssetIntoDb() : null}
                </div>
                :null}
            </div>
        )
    }
    
}

export default RepairAsset