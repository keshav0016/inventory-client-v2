import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Icon, Modal} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'

class AddAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            serial_number : '',
            asset_name : '',
            purchase_date : '',
            description : '',
            invoice_number : '',
            vendor : 'Select',
            amount : 0,
            gst : 0,
            total : 0,
            category : '',
            condition : '',
            location : '',
            vendorList : [],
            addVendor : false,
            vendorListRequest : true,
            addAssetRequest : false
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
        this.setAddVendor = this.setAddVendor.bind(this)
    }

    checkForValidation(){
        if(!this.state.serial_number || !this.state.asset_name || !this.state.purchase_date || !this.state.invoice_number || this.state.vendor === 'Select' || !this.state.amount || !this.state.condition || !this.state.location){
            window.Materialize.toast('All the * marked fields are required', 4000)
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
            serial_number : e.target.value
        })
    }

    setAssetName(e){
        this.setState({
            asset_name : e.target.value
        })
    }

    setPurchaseDate(e){
        this.setState({
            purchase_date : e.target.value
        })
    }

    setDescription(e){
        this.setState({
            description : e.target.value
        })
    }

    setInvoiceNumber(e){
        this.setState({
            invoice_number : e.target.value
        })
    }

    setVendor(e){
        this.setState({
            vendor : e.target.value
        })
    }

    setAmount(e){
        this.setState({
            amount : Number(e.target.value),
        })
    }

    setGst(e){
        this.setState({
            gst : Number(e.target.value),
        })
    }

    setCategory(e){
        this.setState({
            category : e.target.value
        })
    }

    setCondition(e){
        this.setState({
            condition : e.target.value
        })
    }

    setLocation(e){
        this.setState({
            location : e.target.value
        })
    }

    setAddVendor(){
        this.setState({
            addVendor : true
        })
        $("#triggerAddVendor").trigger('click')
    }

    vendorListDropdown(){
        var vendorArr = []
        vendorArr.push(<option key='Select' value='Select'>Select</option>)
        this.state.vendorList.forEach(vendor => {
            vendorArr.push(<option key={vendor.id} value={vendor.name}>{vendor.name}</option>)
        });
        return vendorArr
    }

    addAssetIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/create',
            withCredentials : true,
            data : {
                serial_number : this.state.serial_number ,
                asset_name : this.state.asset_name,
                purchase_date : this.state.purchase_date,
                description : this.state.description,
                invoice_number : this.state.invoice_number,
                vendor : this.state.vendor,
                amount : this.state.amount,
                gst : this.state.gst,
                total : this.state.total,
                category : this.state.category,
                condition : this.state.condition,
                location : this.state.location
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
                    serial_number : '',
                    asset_name : '',
                    purchase_date : '',
                    description : '',
                    invoice_number : '',
                    vendor : '',
                    amount : 0,
                    gst : 0,
                    total : 0,
                    category : ''
                })
                window.Materialize.toast('Asset Added', 4000)                
                this.props.setHandleListRequest(true)
            }
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
            <div>
                <Row>
                    <Input s={3} label="Serial Number *" value = {this.state.serial_number} onChange = {this.setSerialNumber} />
                    <Input s={3} label="Asset Name *" value = {this.state.asset_name} onChange = {this.setAssetName} />
                    <Input s={3} name='on' type='date' label="Purchased Date *" onChange={this.setPurchaseDate} value = {this.state.purchase_date} />
                    <Input s={6} label="Description" value = {this.state.description} onChange = {this.setDescription}/>
                    <Input s={3} label="Invoice Number *" value = {this.state.invoice_number} onChange = {this.setInvoiceNumber}/>
                    <Input s={2} label="Vendor *" type='select' value={this.state.vendor} onChange = {this.setVendor}>{this.vendorListDropdown()}</Input>
                    <Input s={3} label="Condition *" value = {this.state.condition} onChange = {this.setCondition}/>
                    <Input s={3} label="Location *" value = {this.state.location} onChange = {this.setLocation}/>
                    <Input s={3} label="Amount *" type = "number" min={0} value = {this.state.amount} onChange = {this.setAmount}/>
                    <Input s={3} label="GST" type = "number" min={0} value = {this.state.gst} onChange = {this.setGst}/>
                    <br />
                    <Badge>Total : {this.state.total}</Badge>
                    <Input s={6} type='select' label="Category" onChange = {this.setCategory} defaultValue='Other'>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non - Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button><span> </span>
                {/* <Button onClick = {this.setAddVendor}>Add Vendor</Button> */}
                {this.state.addAssetRequest ? this.addAssetIntoDb() : null}
                {this.state.vendorListRequest ? this.handleVendorList() : null}
                <br /><br />
                <Modal
                    header='Add Vendor'
                    id="addVendor"
                    trigger={<Button id="triggerAddVendor">Add Vendor</Button>}>
                    <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                </Modal> 
            </div>
        )
    }

}

export default AddAsset