import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Icon} from 'react-materialize'
import moment from 'moment'
import { baseUrl } from './config';



class UpdateAsset extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            description: this.props.asset.description,
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
    }

    calculateTotal(){
        this.setState({
            total : this.state.amount.value + ((this.state.amount.value * this.state.gst.value)/100)
        })
    }

    checkForValidation() {
        // if (!this.state.serial_number || !this.state.asset_name || !this.state.purchase_date || !this.state.invoice_number || !this.state.vendor || !this.state.amount) {
        //     window.Materialize.toast('All the * marked fields are required', 4000)
        // }
        // else {
        //     this.setState({
        //         updateAssetRequest: true
        //     })
        // }
        if(!this.state.serial_number.value){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: 'The serial number is required',
                    showError : true
                })
            })
        }
        if(this.state.serial_number.value){
            this.setState({
                serial_number:Object.assign(this.state.serial_number, {
                    error: '',
                    showError : false
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
        if(this.state.asset_name.value){
            this.setState({
                asset_name:Object.assign(this.state.asset_name, {
                    error: '',
                    showError : false
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
        if(this.state.invoice_number.value){
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
        if(!this.state.condition.value){
            this.setState({
                condition:Object.assign(this.state.condition, {
                    error: 'The condition of the asset is required',
                    showError: true
                })
            })
        }
        if(this.state.condition.value){
            this.setState({
                condition:Object.assign(this.state.condition, {
                    error: '',
                    showError: false
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
        if(this.state.location.value){
            this.setState({
                location:Object.assign(this.state.location, {
                    error:'',
                    showError: false
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
        if(this.state.vendor.value){
            this.setState({
                vendor:Object.assign(this.state.vendor, {
                    error:'',
                    showError:false
                })
            })
        }
        if(this.state.serial_number.value && this.state.asset_name.value && this.state.invoice_number.value && this.state.vendor.value && Number(this.state.amount.value) > 0 && this.state.condition.value && this.state.location.value && Number(this.state.gst.value) >= 0){
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
            description: e.target.value
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
                serial_number: this.state.serial_number.value,
                asset_name: this.state.asset_name.value,
                purchase_date: this.state.purchase_date,
                description: this.state.description,
                invoice_number: this.state.invoice_number.value,
                vendor: this.state.vendor.value,
                amount: this.state.amount.value,
                gst: this.state.gst.value,
                total: this.state.total,
                category: this.state.category
            }
        })
        .then(res => {
            if(res.data.error){
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    updateAssetRequest : false
                })                
            }
            else{
                window.Materialize.toast('Asset Edited', 4000)
                this.setState({
                    updateAssetRequest: false
                })
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.amount !== this.state.amount || prevState.gst !== this.state.gst) {
    //         this.setState({
    //             total: this.state.amount + ((this.state.amount * this.state.gst) / 100)
    //         })
    //     }
    // }



    render() {
        return (
            <div className="no-footer">
            <h5 className="title">Update Asset</h5> 
                <Row className="assetUpdateForm" >
                    <Input s={12} m={3} l={3} label="Serial Number *" defaultValue={this.state.serial_number.value} onChange={this.setSerialNumber} error={this.state.serial_number.showError ? this.state.serial_number.error : null} />
                    <Input s={12} m={3} l={3} label="Asset Name *" defaultValue={this.state.asset_name.value} onChange={this.setAssetName} error={this.state.asset_name.showError ? this.state.asset_name.error : null} />
                    <Input s={12} m={3} l={3} label='Purchase Date' name='on' type='date' onChange={this.setPurchaseDate} placeholder={`${moment(this.state.purchase_date).format('D MMMM, YYYY')}`} />
                    <Input s={12} m={3} l={3} label="Description" defaultValue={this.state.description} onChange={this.setDescription} />
                    <Input s={12} m={3} l={3} label="Invoice Number *" defaultValue={this.state.invoice_number.value} onChange={this.setInvoiceNumber} error={this.state.invoice_number.showError ? this.state.invoice_number.error : null} />
                    <Input s={12} m={3} l={3} label="Vendor *" defaultValue={this.state.vendor.value} onChange={this.setVendor} error={this.state.vendor.showError ? this.state.vendor.error : null} />
                    <Input s={12} m={3} l={3} label="Condition *" defaultValue = {this.state.condition.value} onChange = {this.setCondition} error={this.state.condition.showError ? this.state.condition.error : null}/>
                    <Input s={12} m={3} l={3} label="Location *" defaultValue = {this.state.location.value} onChange = {this.setLocation} error={this.state.location.showError ? this.state.location.error : null} />
                    <Input s={12} m={3} l={3} label="Amount *" type="number" min={0} defaultValue={this.state.amount.value} onChange={this.setAmount} error={this.state.amount.showError ? this.state.amount.error : null} />
                    <Input s={12} m={3} l={3} label="GST" type="number" min={0} defaultValue={this.state.gst.value} onChange={this.setGst} error={this.state.gst.showError ? this.state.gst.error : null} />
                    <br />
                    <Badge>Total : ₹{this.state.total}</Badge>
                    <Input s={12} m={3} l={3} type='select' label="Category" onChange={this.setCategory} defaultValue={this.state.category}>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non-Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                </Row>
                <div className="splitModalButtons">
                    <Button waves='light' onClick={this.checkForValidation}>Update <Icon small right>send</Icon></Button>
                    <Button className="modal-close cancelButton">Cancel</Button>
                </div>
                {this.state.updateAssetRequest ? this.updateAssetIntoDb() : null}
            </div>
        )
    }
}

export default UpdateAsset