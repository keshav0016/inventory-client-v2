import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Modal, Autocomplete, Col} from 'react-materialize'
import AddVendor from './AddVendor'
import AddAssetType from './AddAssetType'
import $ from 'jquery'
import './Employee.css'
import { baseUrl } from './config';
import {
    Redirect, Link
  } from 'react-router-dom';
import swal from 'sweetalert';
import DateInput from './shared/DateInput'  
import moment from 'moment'

class AddAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            serial_number : {
                value: '',
                error: '',
                showError: false
            },
            asset_name : {
                value: '',
                error: '',
                showError: false
            },
            purchase_date : {
                value: '',
                error: '',
                showError: false
            },
            description : {
                value: '',
                error: '',
                showError: false
            },
            invoice_number : {
                value: '',
                error: '',
                showError: false
            },
            vendor : {
                value: '',
                error: '',
                showError: false,
                availabilityError: false,
                availabilityMessage: ""
            },
            amount : {
                value: 0,
                error: '',
                showError: false
            },
            gst : {
                value: 0,
                error: '',
                showError: false
            },
            total : 0,
            category : {
                value: 'Select',
                error: '',
                showError: false
            },
            condition : {
                value: '',
                error: '',
                showError: false
            },
            location : {
                value: '',
                error: '',
                showError: false
            },
            vendorNames:{},
            vendorList : [],
            assetTypeList : [],
            assetType : {
                value: 'Select',
                error: '',
                showError: false
            },
            addVendor : false,
            vendorListRequest : true,
            addAssetRequest : false
            ,assetTypeListRequest : true,
            addAsset: true,
            redirect: false,
            login: false
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
        this.addAssetIntoDb = this.addAssetIntoDb.bind(this)
        this.setCondition = this.setCondition.bind(this)
        this.setLocation = this.setLocation.bind(this)
        this.handleVendorList = this.handleVendorList.bind(this)
        this.setVendorListRequest = this.setVendorListRequest.bind(this)
        this.fetchAssetTypeList = this.fetchAssetTypeList.bind(this)
        this.setAssetType = this.setAssetType.bind(this)
        this.setAssetTypeListRequest = this.setAssetTypeListRequest.bind(this)
        this.calculateTotal = this.calculateTotal.bind(this)
        this.getVendorName = this.getVendorName.bind(this)
        // this.clear = this.clear.bind(this)
    }

    // clear(){
    //     $(".modal-overlay").trigger('click');
    // }

    checkForValidation(){
        var alphaNum = /^\s{0,}[a-zA-Z0-9]*[a-zA-Z]{1}[a-zA-Z0-9]*(\s{1}[a-zA-Z0-9]+)*\s{0,}$/
        var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/
        var num = /^\s{0,}[a-zA-Z0-9]+\s{0,}$/
        var serialNum = /^\s{0,}[a-zA-Z0-9_@.:,-/#+&-*]+(\s{1,1}[a-zA-Z0-9_@.:,-/#+&-*]+)*\s{0,}$/
        // /^\s{0,}[a-zA-Z0-9_@.:,-/#+&-*]+(\s{1,1}[a-zA-Z0-9_@.:,-/#+&-*]+)*\s{0,}$/
        
        if(!serialNum.test(this.state.serial_number.value)){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: 'Enter alphabets or numbers',
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
        if(this.state.serial_number.value.length > 50){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: 'The serial number should not be too long',
                    showError : true
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
        if(!this.state.purchase_date.value){
            this.setState({
                purchase_date:Object.assign(this.state.purchase_date, {
                    error: 'The Purchase date is required',
                    showError : true
                })
            })
        }
        if(this.state.purchase_date.value){
            this.setState({
                purchase_date:Object.assign(this.state.purchase_date, {
                    error: '',
                    showError : false
                })
            })
        }
        if(!alphaNum.test(this.state.description.value)){
            this.setState({
                description: Object.assign(this.state.description, {
                    error: 'Enter alphabets',
                    showError: true
                })
            })
        }
        if(!this.state.description.value){
            this.setState({
                description: Object.assign(this.state.description, {
                    error: 'Description is required',
                    showError: true
                })
            })
        }
        if(alphaNum.test(this.state.description.value)){
            this.setState({
                description: Object.assign(this.state.description, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!num.test(this.state.invoice_number.value)){
            this.setState({
                invoice_number:Object.assign(this.state.invoice_number, {
                    error: 'Enter alphabets or number',
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
        if(Number(this.state.amount.value) === 0){
            this.setState({
                amount:Object.assign(this.state.amount, {
                    error: 'The Amount should not be zero.',
                    showError : true
                })
            })
        }
        if(Number(this.state.amount.value) < 0){
            this.setState({
                amount:Object.assign(this.state.amount, {
                    error: 'The Amount should not be neagtive.',
                    showError : true
                })
            })
        }
        if(Number(this.state.amount.value) > 0){
            this.setState({
                amount:Object.assign(this.state.amount, {
                    error: '',
                    showError : false
                })
            })
        }
        if(Number(this.state.gst.value) < 0){
            this.setState({
                gst:Object.assign(this.state.gst, {
                    error: 'The gst should not be negative',
                    showError : true
                })
            })
        }
        if(Number(this.state.gst.value) >= 0){
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
        if(this.state.category.value === 'Select'){
            this.setState({
                category:Object.assign(this.state.category, {
                    error:'Select a Category',
                    showError: true
                })
            })
        }
        if(this.state.category.value !== 'Select'){
            this.setState({
                category:Object.assign(this.state.category, {
                    error:'',
                    showError: false
                })
            })
        }
        if(this.state.assetType.value === 'Select'){
            this.setState({
                assetType:Object.assign(this.state.assetType, {
                    error:'Select an Asset Type ',
                    showError: true
                })
            })
        }
        if(this.state.assetType.value !== 'Select'){
            this.setState({
                assetType:Object.assign(this.state.assetType, {
                    error:'',
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
        if(serialNum.test(this.state.serial_number.value) && alphaNum.test(this.state.asset_name.value) && this.state.purchase_date.value && alphaNum.test(this.state.description.value) && num.test(this.state.invoice_number.value) && this.state.vendor.value && Number(this.state.amount.value) > 0 && alphaNum.test(this.state.condition.value) && alphaNum.test(this.state.location.value) && this.state.category.value !=='Select' && this.state.assetType.value !=='Select' && Number(this.state.gst.value) >= 0 && alphaNum.test(this.state.vendor.value) && this.state.vendor.value in this.state.vendorNames ){
            this.setState({
                addAssetRequest : true
            })
        }
    }

    setVendorListRequest(vendorName){
        if(vendorName){

            this.setState({
                vendorListRequest : true
                ,vendor : {
                    ...this.state.vendor,
                    value : vendorName
                }
            })
        }else{
            this.setState({
                vendorListRequest : false
                ,vendor : {
                    value : ''
                }
            })
        }
        // $('.modal-overlay').trigger('click')   
    }

    setSerialNumber(e){
        this.setState({
            serial_number : Object.assign(this.state.serial_number, {
                value: e.target.value
            })
        })
    }

    setAssetName(e){
        this.setState({
            asset_name : Object.assign(this.state.asset_name, {
                value: e.target.value
            })
        })
    }

    setPurchaseDate(e){
        this.setState({
            purchase_date : Object.assign(this.state.purchase_date, {
                value : e.target.value
            })
        })
    }

    setDescription(e){
        this.setState({
            description : Object.assign(this.state.description, {
                value : e.target.value
            })
        })
    }

    setInvoiceNumber(e){
        this.setState({
            invoice_number : Object.assign(this.state.invoice_number, {
                value : e.target.value
            })
        })
    }

    setVendor(e,value){
        this.setState({
            vendor : Object.assign(this.state.vendor, {
                value : value
            })
        })
    }

    setAmount(e){
        this.setState({
            amount : Object.assign(this.state.amount, {
                value : e.target.value
            })
        })
        this.calculateTotal()
    }

    setGst(e){
        this.setState({
            gst : Object.assign(this.state.gst, {
                value: e.target.value
            })
        })
        this.calculateTotal()
    }

    setCategory(e){
        this.setState({
            category : Object.assign(this.state.category, {
                value: e.target.value
            })
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

    // setAddVendor(){
    //     this.setState({
    //         addVendor : true
    //     })
    //     $("#triggerAddVendor").trigger('click')
    // }

    vendorListDropdown(){
        var vendorArr = []
        this.state.vendorList.forEach(vendor => {
            vendorArr.push(<option key={vendor.id} value={vendor.name}>{vendor.name}</option>)
        });
        return vendorArr
    }

    assetTypeDropdown(){
        var assetTypeArr = []
        assetTypeArr.push(<option key='Select' value='Select'>Select</option>)
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

    setAssetTypeListRequest(assetTypeName){
        if(assetTypeName){

            this.setState({
                assetTypeListRequest : true
                ,assetType : Object.assign({
                    value : assetTypeName
                })
            })
        }else{
            this.setState({
                assetTypeListRequest : false
                ,assetType : Object.assign({
                    value : ""
                })
            })
        }
        // $('.modal-overlay').trigger('click')
    }

    addAssetIntoDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/create`,
            withCredentials : true,
            data : {
                serial_number : this.state.serial_number.value.trim() ,
                asset_name : this.state.asset_name.value.trim(),
                purchase_date : this.state.purchase_date.value,
                description : this.state.description.value.trim(),
                invoice_number : this.state.invoice_number.value.trim() ,
                vendor : this.state.vendor.value,
                amount : this.state.amount.value,
                gst : this.state.gst.value,
                total : this.state.total,
                category : this.state.category.value,
                condition : this.state.condition.value.trim() ,
                location : this.state.location.value.trim()
                ,assetType : this.state.assetType.value
            }
        })
        .then(res => {
            if(res.data.message === 'Asset added successfully'){
                this.setState({
                    serial_number : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    asset_name : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    purchase_date : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    description : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    invoice_number : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    vendor : {
                        value: '',
                        error: '',
                        showError: false,
                        availabilityError: false,
                        availabilityMessage: ''
                    },
                    category : {
                        value: 'Select',
                        error: '',
                        showError: false
                    },
                    condition : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    location : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    amount : {
                        value: 0,
                        error: '',
                        showError: false
                    },
                    gst : {
                        value: 0,
                        error: '',
                        showError: false
                    },
                    total : 0,
                    assetType : {
                        value: 'Select',
                        error: '',
                        showError: false
                    },
                    addAsset: false,
                    redirect: true
                })

                swal("Asset has been added",{
                    buttons: false,
                    timer: 2000,
                  })
                //   $('.modal').hide()
                //   $('.modal-overlay').hide()
                //   setTimeout((function() {
                //     window.location.reload();
                //   }), 2100);


                // window.Materialize.toast('Asset Added', 4000)                
                // this.props.setHandleListRequest(true)
                $('label').addClass('active')     
            }else if(res.data.message === 'asset is already there'){
                swal("Asset is already there",{
                    buttons: false,
                    timer: 2000,
                  })
                // window.Materialize.toast('asset is already there', 4000)
            }else if(res.data.errors){
                if(res.data.errors[0].message === 'serial_number must be unique'){
                    this.setState({
                        serial_number:Object.assign(this.state.serial_number, {
                            error: 'The serial number is already assigned to another asset',
                            showError : true
                        })
                    })
                }
            }
            this.setState({
                addAssetRequest : false
            })
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    login : true
                })
            }else{

                console.error(error)
            }
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
                ,assetTypeListRequest : false
            })
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    login: true
                })
            }
            console.error(error)
        })
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.amount !== this.state.amount  || prevState.gst !== this.state.gst){
    //         this.setState({
    //             total : this.state.amount + ((this.state.amount * this.state.gst)/100)
    //         })
    //     }
    // }

    calculateTotal(){
        this.setState({
            total :(Number(this.state.amount.value) + (Number(this.state.amount.value) * ((Number(this.state.gst.value))/100)))
        })
    }

    getVendorName(){
        let vendorListObj = {}
        this.state.vendorList.map((obj)=>{
            return vendorListObj[obj.name] = null
        })
        this.setState({
            vendorNames : vendorListObj
        })
    }

    componentDidMount(){
        $(document).ready(function(){
            $('label').addClass('active');
        })   
    }

    componentDidUpdate(){
        $(document).ready(function(){
            $('label').addClass('active');
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
                vendorList : res.data.vendors,
                vendorListRequest : false
            })
            this.getVendorName()
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    login: true
                })
            }
            console.error(error)
        })
    }


    render(){
        var addAssetForm=(
            <div className="listComponent" >
                <h3 className='title'>Add Asset</h3>
                <Row>
                    <Input s={12} m={6} l={6} label="Serial Number *" defaultValue = {this.state.serial_number.value.trim()} onChange = {this.setSerialNumber} error={this.state.serial_number.showError ? this.state.serial_number.error : null} autoFocus />
                    <Input s={12} m={6} l={6} label="Asset Name *" defaultValue = {this.state.asset_name.value.trim()} onChange = {this.setAssetName} error={this.state.asset_name.showError ? this.state.asset_name.error : null}/>
                    {/* <Input s={12} m={6} l={6} name='on' type='date' 
                    label="Purchased Date *" onChange={this.setPurchaseDate} 
                    value = {this.state.purchase_date.value} 
                    error={this.state.purchase_date.showError ? this.state.purchase_date.error : null} 
                    /> */}
                    <DateInput
                                label="Purchased Date *" 
                                options={{max: moment(new Date(), "D MMMM, YYYY").toDate()}}
                                value = {this.state.purchase_date.value} 
                                onChange={this.setPurchaseDate} 
                                error={this.state.purchase_date.showError ? this.state.purchase_date.error : null} 
                            />
                    <Input s={12} m={6} l={6} label="Description" defaultValue = {this.state.description.value.trim()} onChange = {this.setDescription} error={this.state.description.showError ? this.state.description.error : null}/>
                    <Input s={12} m={6} l={6} label="Invoice Number *" defaultValue = {this.state.invoice_number.value.trim()} onChange = {this.setInvoiceNumber} error={this.state.invoice_number.showError ? this.state.invoice_number.error : null} />
                    <Input s={12} m={6} l={6} label="Condition *" defaultValue = {this.state.condition.value.trim()} onChange = {this.setCondition} error={this.state.condition.showError ? this.state.condition.error : null} />
                    <Input s={12} m={6} l={6} label="Location *" defaultValue = {this.state.location.value.trim()} onChange = {this.setLocation} error={this.state.location.showError ? this.state.location.error : null} />
                    <br />
                    <div className={this.state.category.showError ? 'category-error': 'no-error'}>
                    <Input s={12} m={6} l={6} type='select' label='Category' onChange = {this.setCategory} value={this.state.category.value} error={this.state.category.showError ? this.state.category.error : null}>
                        <option value='Select'>Select</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non-Electronics'>Non-Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                    </div>
                    <Input s={12} m={6} l={6}  type = "number" min={0} label='Amount*' value = {this.state.amount.value} onChange = {this.setAmount} error={this.state.amount.showError ? this.state.amount.error : null} />
                    <Input s={12} m={6} l={6}  type = "number" min={0} label='GST' value = {this.state.gst.value} onChange = {this.setGst} error={this.state.gst.showError ? this.state.gst.error : null} />
                    <Badge>Total : ₹{this.state.total.toFixed(2)}</Badge>
                    {/* <Input s={12} m={6} l={6} placeholder="Vendor *" type='select' value={this.state.vendor.value} onChange = {this.setVendor} error={this.state.vendor.showError ? this.state.vendor.error :null} >{this.vendorListDropdown()}</Input> */}
                        <Row>
                        <Autocomplete
                            s={11} m={4} l={5}
                            className={this.state.vendor.showError ? 'no-vendor-error' : (this.state.vendor.availabilityError ? 'no-vendor-available' : 'no-error')}
                            // title=' '
                            title='Vendor*'
                            data={
                                this.state.vendorNames
                            }
                            onChange = {this.setVendor}
                            value = {this.state.vendor.value}
                        />
                        <Col s={1} m={2} l={1} className="addAssetModalButtons1">
                            <Modal
                                modalOptions={{dismissible:false}}
                                actions={null}
                                trigger={<Button floating icon='add' ></Button>}>
                                <AddVendor  setVendorListRequest = {this.setVendorListRequest}/>
                            </Modal>
                        </Col>
                        </Row>
                        <div className={this.state.assetType.showError ? 'assetType-error' : 'no-error'}>
                        <Row>
                        <Input s={11} m={4} l={5} type='select' label='Asset Type*' value={this.state.assetType.value} onChange = {this.setAssetType} error={this.state.assetType.showError ? this.state.assetType.error : null} >{this.assetTypeDropdown()}</Input>
                        <Col s={1} m={2} l={1} className="addAssetModalButtons2">
                                    <Modal
                                    modalOptions={{dismissible:false}}
                                    actions={null}
                                    trigger={<Button floating icon='add'></Button>}>
                                    <AddAssetType setAssetTypeListRequest = {this.setAssetTypeListRequest}/>
                                    </Modal>
                                </Col>
                        </Row>
                        </div>
                        <div className="splitModalButtons"> 
                            <Row>
                                <Col offset={'l6'} style={{float: 'right'}}>
                                    <Button onClick = {this.checkForValidation} >SUBMIT</Button>
                                    <Link to='/admin/assets'><Button className="cancelButton modal-close">Cancel</Button></Link>                               
                        
                                </Col>
                            </Row>
                        </div>
                </Row>
                {this.state.addAssetRequest ? this.addAssetIntoDb() : null}
                {this.state.vendorListRequest ? this.handleVendorList() : null}
                {this.state.assetTypeListRequest ? this.fetchAssetTypeList() : null}
                {this.state.login ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />: null}
                <br /><br />
            </div>
        );

        return (
            <div>
            {this.state.addAsset ? addAssetForm : null}
            {this.state.redirect ? (<Redirect  to ={{pathname:'/admin/assets'}}/>) : null}
            </div>
        )
    }

}

export default AddAsset
