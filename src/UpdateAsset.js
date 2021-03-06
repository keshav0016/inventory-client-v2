import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge} from 'react-materialize'
import moment from 'moment'
import { baseUrl } from './config';
import $ from 'jquery';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';

class UpdateAsset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect : false,
            serial_number: {
                value: this.props.asset.serial_number,
                error: '',
                showError: false
            },
            asset_name: {
                value: this.props.asset.asset_name,
                error: '',
                showError: false
            },
            purchase_date: this.props.asset.purchase_date,
            description: {
                value: this.props.asset.description,
                error: '',
                showError: false
            },
            invoice_number:{
                value: this.props.asset.invoice_number,
                error: '',
                showError: false
            },
            vendor:{
                value: this.props.asset.vendor,
                error: '',
                showError: false
            },
            amount:{
                value: this.props.asset.amount,
                error: '',
                showError: false
            },
            gst:{
                value: this.props.asset.gst,
                error: '',
                showError: false
            },
            total: this.props.asset.total,
            category: this.props.asset.category,
            condition :{
                value: this.props.asset.condition,
                error: '',
                showError: false
            },
            location :{
                value: this.props.asset.location,
                error: '',
                showError: false
            },
            assetType: {
                value: this.props.asset.assetType,
                error: '',
                showError: false
            },
            assetTypeList : [],
            updateAssetRequest: false
        }

        this.setSerialNumber = this.setSerialNumber.bind(this)
        this.setAssetName = this.setAssetName.bind(this)
        this.setPurchaseDate = this.setPurchaseDate.bind(this)
        this.setDescription = this.setDescription.bind(this)
        this.setInvoiceNumber = this.setInvoiceNumber.bind(this)
        this.setVendor = this.setVendor.bind(this)
        this.setAmount = this.setAmount.bind(this)
        this.setGst = this.setGst.bind(this)
        this.setCategory = this.setCategory.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.updateAssetIntoDb = this.updateAssetIntoDb.bind(this)
        this.setCondition = this.setCondition.bind(this)
        this.setLocation = this.setLocation.bind(this)
        this.calculateTotal = this.calculateTotal.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
        this.setAssetType = this.setAssetType.bind(this)
    }

    calculateTotal(){
        this.setState({
            total : this.state.amount.value + ((this.state.amount.value * this.state.gst.value)/100)
        })
    }

    checkForValidation() {

        var alphaNum = /^\s{0,}[a-zA-Z0-9]*[a-zA-Z]{1}[a-zA-Z0-9]*(\s{1}[a-zA-Z0-9]+)*\s{0,}$/
        // var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/
        var num = /^\s{0,}[a-zA-Z0-9]+\s{0,}$/
        var serialNum = /^\s{0,}[a-zA-Z0-9_@.:,-/#+&-*]+(\s{1,1}[a-zA-Z0-9_@.:,-/#+&-*]+)*\s{0,}$/
        var descriptionNum = /^\s{0,}[a-zA-Z0-9_@.:,"'-/#+&-*]+(\s{1,1}[a-zA-Z0-9_@.:,"'-/#+&-*]+)*\s{0,}$/


        if(!serialNum.test(this.state.serial_number.value)){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: 'Enter alphabet or digit',
                    showError : true
                })
            })
        }
        if(!this.state.serial_number.value){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: 'The serial number is required',
                    showError : true
                })
            })
        }
        if(serialNum.test(this.state.serial_number.value)){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: '',
                    showError : false
                })
            })
        }
        if(!alphaNum.test(this.state.asset_name.value)){
            this.setState({
                asset_name:Object.assign(this.state.asset_name, {
                    error: 'Enter alphabets',
                    showError : true
                })
            })
        }
        if(!this.state.asset_name.value){
            this.setState({
                asset_name:Object.assign(this.state.asset_name, {
                    error: 'The Asset name is required',
                    showError : true
                })
            })
        }
        if(alphaNum.test(this.state.asset_name.value)){
            this.setState({
                asset_name:Object.assign(this.state.asset_name, {
                    error: '',
                    showError : false
                })
            })
        }
        if(!descriptionNum.test(this.state.description.value)){
            this.setState({
                description:Object.assign(this.state.description, {
                    error: 'Enter alphabets',
                    showError : true
                })
            })
        }
        if(!this.state.description.value){
            this.setState({
                description:Object.assign(this.state.description, {
                    error: 'The description is required',
                    showError : true
                })
            })
        }
        if(descriptionNum.test(this.state.description.value)){
            this.setState({
                description:Object.assign(this.state.description, {
                    error: '',
                    showError : false
                })
            })
        }
        if(!num.test(this.state.invoice_number.value)){
            this.setState({
                invoice_number:Object.assign(this.state.invoice_number, {
                    error: 'Enter alphabets or digits',
                    showError : true
                })
            })
        }
        if(!this.state.invoice_number.value){
            this.setState({
                invoice_number:Object.assign(this.state.invoice_number, {
                    error: 'The Invoice number is required',
                    showError : true
                })
            })
        }
        if(num.test(this.state.invoice_number.value)){
            this.setState({
                invoice_number:Object.assign(this.state.invoice_number, {
                    error: '',
                    showError : false
                })
            })
        }
        if(this.state.amount.value === 0){
            this.setState({
                amount:Object.assign(this.state.amount, {
                    error: 'The Amount should not be zero.',
                    showError : true
                })
            })
        }
        if(this.state.amount.value < 0){
            this.setState({
                amount:Object.assign(this.state.amount, {
                    error: 'The Amount should not be neagtive.',
                    showError : true
                })
            })
        }
        if(this.state.amount.value > 0){
            this.setState({
                amount:Object.assign(this.state.amount, {
                    error: '',
                    showError : false
                })
            })
        }
        if(this.state.gst < 0){
            this.setState({
                gst:Object.assign(this.state.gst, {
                    error: 'The gst should not be negative',
                    showError : true
                })
            })
        }
        if(this.state.gst >= 0){
            this.setState({
                gst:Object.assign(this.state.gst, {
                    error: '',
                    showError : false
                })
            })
        }
        if(!alphaNum.test(this.state.condition.value)){
            this.setState({
                condition:Object.assign(this.state.condition, {
                    error: 'Enter alphabets',
                    showError: true
                })
            })
        }
        if(!this.state.condition.value){
            this.setState({
                condition:Object.assign(this.state.condition, {
                    error: 'The condition of the asset is required',
                    showError: true
                })
            })
        }
        if(alphaNum.test(this.state.condition.value)){
            this.setState({
                condition:Object.assign(this.state.condition, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!alphaNum.test(this.state.location.value)){
            this.setState({
                location:Object.assign(this.state.location, {
                    error:'Enter alphabets',
                    showError: true
                })
            })
        }
        if(!this.state.location.value){
            this.setState({
                location:Object.assign(this.state.location, {
                    error:'The location is required',
                    showError: true
                })
            })
        }
        if(alphaNum.test(this.state.location.value)){
            this.setState({
                location:Object.assign(this.state.location, {
                    error:'',
                    showError: false
                })
            })
        }
        if(!alphaNum.test(this.state.vendor.value)){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error:'Enter alphabets',
                    showError:true
                })
            })
        }
        if(!this.state.vendor.value){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error:'Select the Vendor',
                    showError:true
                })
            })
        }
        if(alphaNum.test(this.state.vendor.value)){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error:'',
                    showError:false
                })
            })
        }
        if(serialNum.test(this.state.serial_number.value) && alphaNum.test(this.state.asset_name.value) && descriptionNum.test(this.state.description.value) && num.test(this.state.invoice_number.value) && alphaNum.test(this.state.vendor.value) && Number(this.state.amount.value) > 0 && alphaNum.test(this.state.condition.value) && alphaNum.test(this.state.location.value) && Number(this.state.gst.value) >= 0){
            this.setState({
                        updateAssetRequest: true
                    }) 
        }
    }
    
    setSerialNumber(e) {
        this.setState({
            serial_number: Object.assign(this.state.serial_number, {
                value: e.target.value
            })
        })
    }
    
    setAssetName(e) {
        this.setState({
            asset_name: Object.assign(this.state.asset_name, {
                value: e.target.value
            })
        })
    }
    
    setPurchaseDate(e) {
        this.setState({
            purchase_date: e.target.value
        })
    }
    
    setDescription(e) {
        this.setState({
            description: Object.assign(this.state.description, {
                value: e.target.value
            })
        })
    }
    
    setInvoiceNumber(e) {
        this.setState({
            invoice_number: Object.assign(this.state.invoice_number, {
                value: e.target.value
            })
        })
    }
    
    setVendor(e) {
        this.setState({
            vendor: Object.assign(this.state.vendor, {
                value: e.target.value
            })
        })
    }
    
    setAmount(e) {
        this.setState({
            amount: Object.assign(this.state.amount, {
                value: Number(e.target.value)
            }),
        })
        this.calculateTotal()
    }
    
    setGst(e) {
        this.setState({
            gst: Object.assign(this.state.gst, {
                value: Number(e.target.value)
            }),
        })
        this.calculateTotal()
    }
    
    setCategory(e) {
        this.setState({
            category: e.target.value
        })
    }
    
    setCondition(e){
        this.setState({
            condition : Object.assign(this.state.condition, {
                value: e.target.value
            })
        })
    }
    
    setLocation(e){
        this.setState({
            location : Object.assign(this.state.location, {
                value: e.target.value
            })
        })
    }
    
    updateAssetIntoDb() {
        axios({
            method: 'post',
            url: `${baseUrl}/asset/update`,
            withCredentials: true,
            data: {
                asset_id : this.props.asset.asset_id,
                serial_number: this.state.serial_number.value.trim(),
                asset_name: this.state.asset_name.value.trim(),
                purchase_date: this.state.purchase_date,
                description: this.state.description.value.trim(),
                invoice_number: this.state.invoice_number.value.trim(),
                vendor: this.state.vendor.value.trim(),
                amount: this.state.amount.value,
                gst: this.state.gst.value,
                total: this.state.total,
                category: this.state.category,
                condition: this.state.condition.value,
                location: this.state.location.value,
                assetType: this.state.assetType.value
            } 
        })
        .then(res => {
            if(res.data.message === 'Asset updated successfully') {
                $('.modal-close').trigger('click')
                this.setState({
                    updateAssetRequest: false
                })
                swal('Asset details has been Updated',{
                    buttons: false,
                    timer: 2000,
                })
                this.props.setHandleListRequest()
                this.props.onFinish()

            }
            if(res.data.error === "serial_number must be unique"){
                this.setState({
                    updateAssetRequest : false,
                    serial_number : Object.assign(this.state.serial_number, {
                        error : `Serial number is given to another asset`,
                        showError : true
                    })
                })                
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
            console.error(error)
        })
    }


    fetchAssetTypeList(){
        axios({
            method: 'get',
            url : `${baseUrl}/assetType/list`
            ,withCredentials : true
        })
        .then(res => {
            this.setState({
                assetTypeList : res.data.assetTypes
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidMount(){
        this.fetchAssetTypeList()
    }


    assetTypeDropdown(){
        var assetTypeArr = []
        this.state.assetTypeList.forEach(assetType => {
            assetTypeArr.push(<option key={assetType.id} value={assetType.assetType}>{assetType.assetType}</option>)
        });
        return assetTypeArr
    }

    setAssetType(e){
        this.setState({
            assetType : Object.assign(this.state.assetType, {
                value: e.target.value
            })
        })
    }

    cancelAll(){
        this.setState({
            serial_number: {
                value: this.props.asset.serial_number,
                error: '',
                showError: false
            },
            asset_name: {
                value: this.props.asset.asset_name,
                error: '',
                showError: false
            },
            purchase_date: this.props.asset.purchase_date,
            description: {
                value: this.props.asset.description,
                error: '',
                showError: false
            },
            invoice_number:{
                value: this.props.asset.invoice_number,
                error: '',
                showError: false
            },
            vendor:{
                value: this.props.asset.vendor,
                error: '',
                showError: false
            },
            amount:{
                value: this.props.asset.amount,
                error: '',
                showError: false
            },
            gst:{
                value: this.props.asset.gst,
                error: '',
                showError: false
            },
            total: this.props.asset.total,
            category: this.props.asset.category,
            condition :{
                value: this.props.asset.condition,
                error: '',
                showError: false
            },
            location :{
                value: this.props.asset.location,
                error: '',
                showError: false
            }
        })
        this.props.onFinish()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({
                redirect : false,
                serial_number: {
                    value: this.props.asset.serial_number,
                    error: '',
                    showError: false
                },
                asset_name: {
                    value: this.props.asset.asset_name,
                    error: '',
                    showError: false
                },
                purchase_date: this.props.asset.purchase_date,
                description: {
                    value: this.props.asset.description,
                    error: '',
                    showError: false
                },
                invoice_number:{
                    value: this.props.asset.invoice_number,
                    error: '',
                    showError: false
                },
                vendor:{
                    value: this.props.asset.vendor,
                    error: '',
                    showError: false
                },
                amount:{
                    value: this.props.asset.amount,
                    error: '',
                    showError: false
                },
                gst:{
                    value: this.props.asset.gst,
                    error: '',
                    showError: false
                },
                total: this.props.asset.total,
                category: this.props.asset.category,
                condition :{
                    value: this.props.asset.condition,
                    error: '',
                    showError: false
                },
                location :{
                    value: this.props.asset.location,
                    error: '',
                    showError: false
                },
                updateAssetRequest: false
            })
        }
    }

    render() {
        
        return (
            <div className="no-footer">
            <h5 className="title">Update Asset</h5> 
                <Row className="assetUpdateForm" >
                    <Input s={12} m={3} l={3} label="Serial Number *" value={this.state.serial_number.value} onChange={this.setSerialNumber} error={this.state.serial_number.showError ? this.state.serial_number.error : null} />
                    <Input s={12} m={3} l={3} label="Asset Name *" value={this.state.asset_name.value} onChange={this.setAssetName} error={this.state.asset_name.showError ? this.state.asset_name.error : null} />
                    <Input s={12} m={3} l={3} label='Purchase Date' name='on' type='date' onChange={this.setPurchaseDate} value={`${moment(this.state.purchase_date).format('D MMMM, YYYY')}`} placeholder={`${moment(this.state.purchase_date).format('D MMMM, YYYY')}`} />
                    <Input s={12} m={3} l={3} label="Description" value={this.state.description.value} onChange={this.setDescription} error={this.state.description.showError ? this.state.description.error : null} />
                    <Input s={12} m={3} l={3} label="Invoice Number *" value={this.state.invoice_number.value} onChange={this.setInvoiceNumber} error={this.state.invoice_number.showError ? this.state.invoice_number.error : null} />
                    <Input s={12} m={3} l={3} label="Vendor *" defaultValue={this.state.vendor.value} onChange={this.setVendor} error={this.state.vendor.showError ? this.state.vendor.error : null} disabled/>
                    <Input s={12} m={3} l={3} label="Condition *" value = {this.state.condition.value} onChange = {this.setCondition} error={this.state.condition.showError ? this.state.condition.error : null}/>
                    <Input s={12} m={3} l={3} label="Location *" value = {this.state.location.value} onChange = {this.setLocation} error={this.state.location.showError ? this.state.location.error : null} />
                    <Input s={12} m={3} l={3} label="Amount *" type="number" min={0} value={this.state.amount.value} onChange={this.setAmount} error={this.state.amount.showError ? this.state.amount.error : null} />
                    <Input s={12} m={3} l={3} label="GST" type="number" min={0} value={this.state.gst.value} onChange={this.setGst} error={this.state.gst.showError ? this.state.gst.error : null} />
                    
                    {/* <br /> */}
                  
                    <Input s={12} m={3} l={3} type='text' label="Category" onChange={this.setCategory} value={this.state.category} disabled>
                        {/* <option value='Electronics'>Electronics</option>
                        <option value='Non-Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option> */}
                    </Input>
                    <Input s={11} m={4} l={5} type='select' label='Asset Type*' value={this.state.assetType.value} onChange = {this.setAssetType} error={this.state.assetType.showError ? this.state.assetType.error : null} >{this.assetTypeDropdown()}</Input>
                    <Badge style={{float:'left'}} ><b style={{color:'teal'}}>Total</b> : ₹{this.state.total}</Badge>
                
                </Row>
                <div className="splitModalButtons">
                    <Button waves='light' onClick={this.checkForValidation}>Update</Button>
                    <Button onClick={this.cancelAll} className="cancelButton modal-close">Cancel</Button>
                </div>
                {this.state.updateAssetRequest ? this.updateAssetIntoDb() : null}
                {this.state.redirect ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            </div>
        )
    }
}

export default UpdateAsset
