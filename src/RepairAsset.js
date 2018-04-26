import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon, Modal, Autocomplete, Col} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'
import moment from 'moment'
import './Employee.css'
import { baseUrl } from './config';
import {
    Link,
    Redirect
  } from 'react-router-dom';

class RepairAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            repairAssetRequest : false,
            vendor : {
                value: '',
                error: '',
                showError: false,
                availabilityError: false,
                availabilityMessage: ""
            },
            from : {
                value: '',
                error: '',
                showError: false
            },
            expected_delivery : {
                value: '',
                error: '',
                showError: false
            },
            vendorList : [],
            addVendor : false,
            assetDetails : {},
            vendorNames:{},
            vendorListRequest : true,
            isDisabled : false,
            repairAsset: true,
            redirect: false
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
        // if(this.state.vendor === 'Select' || !this.state.from || !this.state.expected_delivery){
        //     window.Materialize.toast('All the * marked fields are required', 4000)
        // }
        // else{
        //     if(new Date(this.state.from) > new Date(this.state.expected_delivery)){
        //         window.Materialize.toast('Expected Delivery cannot be less than FROM', 4000)
        //     }
        //     else{
        //         this.setState({
        //             repairAssetRequest : true
        //         })
        //     }
        // }
        if(!this.state.vendor.value){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error: 'The vendor name is required',
                    showError: true
                })
            })
        }
        if(this.state.vendor.value){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.from.value){
            this.setState({
                from:Object.assign(this.state.from, {
                    error: 'The from date is required',
                    showError: true
                })
            })
        }
        if(this.state.from.value){
            this.setState({
                from:Object.assign(this.state.from, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.expected_delivery.value){
            this.setState({
                expected_delivery:Object.assign(this.state.expected_delivery, {
                    error: 'The expected delivery date is required',
                    showError: true
                })
            })
        }
        if(this.state.expected_delivery.value){
            this.setState({
                expected_delivery:Object.assign(this.state.expected_delivery, {
                    error: '',
                    showError: false
                })
            })
        }
        if(new Date(this.state.from.value) > new Date(this.state.expected_delivery.value)) {
            this.setState({
                from:Object.assign(this.state.from, {
                    error: 'The delivery date cannot be before the from date',
                    showError: true
                })
            })
        }
        if(new Date(this.state.from.value) < new Date(this.state.expected_delivery.value)) {
            this.setState({
                from:Object.assign(this.state.from, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.vendor.value in this.state.vendorNames){
            this.setState({
                vendor: Object.assign(this.state.vendor, {
                    availabilityMessage: "",
                    availabilityError: false
                })
            })
        }
        if(!(this.state.vendor.value in this.state.vendorNames)){
            this.setState({
                vendor: Object.assign(this.state.vendor, {
                    availabilityMessage: "The vendor is not in the list",
                    availabilityError: true
                })
            })
        }
        if(this.state.vendor.value && this.state.from.value && this.state.expected_delivery.value && new Date(this.state.from.value) < new Date(this.state.expected_delivery.value) && this.state.vendor.value in this.state.vendorNames) {
            this.setState({
                repairAssetRequest : true
            })
        }
    }

    getVendorName(){
        let vendorListObj = {}
        this.state.vendorList.map(function(obj){
            return vendorListObj[obj.name] = null
        })
        this.setState({
            vendorNames : vendorListObj
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
            url : `${baseUrl}/asset/repair`,
            data : {
                asset_id : this.props.match.params.asset,
                vendor : this.state.vendor.value,
                from : this.state.from.value,
                expected_delivery : this.state.expected_delivery.value
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                repairAssetRequest : false,
                isDisabled : true,
                vendor: Object.assign(this.state.vendor, {
                    value: '',
                    error: '',
                    showError: false,
                    availabilityError: false,
                    availabilityMessage: ''
                }),
                repairAsset: false,
                redirect: true
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
            vendor : Object.assign(this.state.vendor, {
                value: value
            })
        })
    }

    setFrom(e){
        this.setState({
            from : Object.assign(this.state.from, {
                value: e.target.value
            })
        })
    }

    setExpectedDelivery(e){
        this.setState({
            expected_delivery : Object.assign(this.state.expected_delivery, {
                value: e.target.value
            })
        })
    }

    handleVendorList(){
        axios({
            method : 'get',
            url : `${baseUrl}/vendor/list`,
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
            url : `${baseUrl}/asset/history?asset_id=${this.props.match.params.asset}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetDetails : res.data.assetDetails,
            })
        })
    }


    render(){
        var repairAssetForm = (
            <div style={{marginLeft : '30px', marginRight : '30px'}} >
                <h3 style={{fontFamily : 'Roboto', fontWeight : 250}}>Repair Asset</h3>
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
                                className={this.state.vendor.showError ? 'no-vendor-error' : (this.state.vendor.availabilityError ? 'no-vendor-available' : 'no-error')}
                                data={
                                    this.state.vendorNames
                                }
                                placeholder='Service Provider'
                                value={this.state.vendor.value}
                                onChange = {this.setVendor}
                            />
                        </Row>
                        <Input s={12} type='date' label="Given for Repair On *" value = {this.state.from.value} onChange = {this.setFrom} disabled = {this.state.isDisabled} error={this.state.from.showError ? this.state.from.error : null} />
                        <Input s={12} type='date' label="Expected Delivery*" value = {this.state.expected_delivery.value} onChange = {this.setExpectedDelivery} disabled = {this.state.isDisabled} error={this.state.expected_delivery.showError ? this.state.expected_delivery.error : null} />
                        <Modal
                            actions={null}
                            id="addVendor"
                            trigger={<Button>Add Vendor</Button>}>
                            <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                        </Modal>
                        <Col offset={'s2'}>
                        <Button style={{marginTop:"-60px", marginLeft: '-50px'}} onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
                        </Col>
                    </Row>
                    {this.state.vendorListRequest ? this.handleVendorList() : null}
                    {this.state.repairAssetRequest ? this.repairAssetIntoDb() : null}
                </div>
                :null}
            </div>
        );

        return(
            <div>
            {this.state.repairAsset ? repairAssetForm : null}
            {this.state.redirect ? (<Redirect  to ={{pathname:'/admin/assets'}}/>) : null}
            </div>
        )
    }
    
}

export default RepairAsset