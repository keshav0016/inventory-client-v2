import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Icon, Modal} from 'react-materialize'
import AddVendor from './AddVendor'
import AddAssetType from './AddAssetType'
import $ from 'jquery'
import './Employee.css'

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
            description : '',
            invoice_number : {
                value: '',
                error: '',
                showError: false
            },
            vendor : {
                value: 'Select',
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
            category : 'Select',
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
            vendorList : [],
            assetTypeList : [],
            assetType : 'Select',
            addVendor : false,
            vendorListRequest : true,
            addAssetRequest : false
            ,assetTypeListRequest : true
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
    }

    checkForValidation(){
        // if(!this.state.serial_number || !this.state.asset_name || !this.state.purchase_date || !this.state.invoice_number || this.state.vendor === 'Select' || !this.state.amount || !this.state.condition || !this.state.location || this.state.category ==='Select'){
        //     window.Materialize.toast('All the * marked fields are required', 4000)
        // }
        if(!this.state.serial_number.value){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: 'The serial number is required',
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
        if(!this.state.purchase_date.value){
            this.setState({
                purchase_date:Object.assign(this.state.purchase_date, {
                    error: 'The Purchase date is required',
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
        if(this.state.gst > 0){
            this.setState({
                gst:Object.assign(this.state.gst, {
                    error: '',
                    showError : false
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
        if(!this.state.location.value){
            this.setState({
                location:Object.assign(this.state.location, {
                    error:'The location is required',
                    showError: true
                })
            })
        }
        if(this.state.vendor.value === 'Select'){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error:'Select the Vendor',
                    showError:true
                })
            })
        }
        else{
            this.setState({
                addAssetRequest : true
            })
        }
    }

    setVendorListRequest(){
        this.setState({
            vendorListRequest : true
        })
        $('#addVendor .modal-footer button').click()
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
            description : e.target.value
        })
    }

    setInvoiceNumber(e){
        this.setState({
            invoice_number : Object.assign(this.state.invoice_number, {
                value : e.target.value
            })
        })
    }

    setVendor(e){
        this.setState({
            vendor : Object.assign(this.state.vendor, {
                value : e.target.value
            })
        })
    }

    setAmount(e){
        this.setState({
            amount : Object.assign(this.state.amount, {
                value : Number(e.target.value)
            })
        })
    }

    setGst(e){
        this.setState({
            gst : Object.assign(this.state.gst, {
                value: Number(e.target.value)
            })
        })
    }

    setCategory(e){
        this.setState({
            category : e.target.value
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
        vendorArr.push(<option key='Select' value='Select'>Select</option>)
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
            assetType : e.target.value
        })
    }

    setAssetTypeListRequest(){
        this.setState({
            assetTypeListRequest : true
        })
    }

    addAssetIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/create',
            withCredentials : true,
            data : {
                serial_number : this.state.serial_number.value ,
                asset_name : this.state.asset_name.value,
                purchase_date : this.state.purchase_date.value,
                description : this.state.description,
                invoice_number : this.state.invoice_number.value,
                vendor : this.state.vendor.value,
                amount : this.state.amount.value,
                gst : this.state.gst.value,
                total : this.state.total,
                category : this.state.category,
                condition : this.state.condition.value,
                location : this.state.location.value
                ,assetType : this.state.assetType
            }
        })
        .then(res => {
            if(res.data.error){
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    addAssetRequest : false
                })                
            }
            else{
                this.setState({
                    addAssetRequest : false,
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
                    description : '',
                    invoice_number : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    vendor : {
                        value: 'Select',
                        error: '',
                        showError: false
                    },
                    category : 'Select',
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
                    assetType : 'Select'
                })
                window.Materialize.toast('Asset Added', 4000)                
                this.props.setHandleListRequest(true)
                $('label').addClass('active')
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    fetchAssetTypeList(){
        axios({
            method: 'get',
            url : 'http://localhost:3001/assetType/list'
            ,withCredentials : true
        })
        .then(res => {
            this.setState({
                assetTypeList : res.data.assetTypes
                ,assetTypeListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.amount !== this.state.amount  || prevState.gst !== this.state.gst){
            this.setState({
                total : this.state.amount + ((this.state.amount * this.state.gst)/100)
            })
        }
    }

    componentDidMount(){
        $('label').addClass('active')
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
        })
        .catch(error => {
            console.error(error)
        })

        // $("#triggerAddVendor").hide()
    }


    render(){
        return(
            <div style={{marginLeft : '1%', marginRight : '1%'}} >
                <h3 className='heading'>Add Asset</h3>
                <Row>
                    <Input s={6} label="Serial Number *" value = {this.state.serial_number.value} onChange = {this.setSerialNumber} error={this.state.serial_number.showError ? this.state.serial_number.error : null}/>
                    <Input s={6} label="Asset Name *" value = {this.state.asset_name.value} onChange = {this.setAssetName} error={this.state.asset_name.showError ? this.state.asset_name.error : null}/>
                    <Input s={6} name='on' type='date' label="Purchased Date *" onChange={this.setPurchaseDate} value = {this.state.purchase_date.value} error={this.state.purchase_date.showError ? this.state.purchase_date.error : null} />
                    <Input s={6} label="Description" value = {this.state.description} onChange = {this.setDescription}/>
                    <Input s={6} label="Invoice Number *" value = {this.state.invoice_number.value} onChange = {this.setInvoiceNumber} error={this.state.invoice_number.showError ? this.state.invoice_number.error : null} />
                    <Input s={6} label="Condition *" value = {this.state.condition.value} onChange = {this.setCondition} error={this.state.condition.showError ? this.state.condition.error : null} />
                    <Input s={6} label="Location *" value = {this.state.location.value} onChange = {this.setLocation} error={this.state.location.showError ? this.state.location.error : null} />
                    <br />
                    <Input s={6} type='select' label="Category*" onChange = {this.setCategory} value={this.state.category}>
                        <option value='Select'>Select</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non-Electronics'>Non-Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                    <Input s={6} label="Amount *" type = "number" min={0} value = {this.state.amount.value} onChange = {this.setAmount} error={this.state.amount.showError ? this.state.amount.error : null} />
                    <Input s={6} label="GST" type = "number" min={0} value = {this.state.gst.value} onChange = {this.setGst} error={this.state.gst.showError ? this.state.gst.error : null} />
                    <Input s={6} label="Vendor *" type='select' value={this.state.vendor.value} onChange = {this.setVendor} error={this.state.vendor.showError ? this.state.vendor.error :null} >{this.vendorListDropdown()}</Input>
                    <Input s={6} label="Asset Type*" type='select' value={this.state.assetType} onChange = {this.setAssetType}>{this.assetTypeDropdown()}</Input>
                    <Badge>Total : ₹{this.state.total.toFixed(2)}</Badge>
                    <br /> <br />
                </Row>
                <Modal
                    header='Add Vendor'
                    id="addVendor"
                    trigger={<Button>Add Vendor</Button>}>
                    <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                </Modal>
                <Modal
                    header='Add Asset Type'
                    trigger={<Button style={{float : 'right', marginRight : '2%'}}>Add Asset Type</Button>}>
                    <AddAssetType setAssetTypeListRequest = {this.setAssetTypeListRequest}/>
                </Modal>
                <Button style={{position : 'absolute', bottom : '3%', right : '3%'}} waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
                {this.state.addAssetRequest ? this.addAssetIntoDb() : null}
                {this.state.vendorListRequest ? this.handleVendorList() : null}
                {this.state.assetTypeListRequest ? this.fetchAssetTypeList() : null}
                <br /><br />
            </div>
        )
    }

}

export default AddAsset