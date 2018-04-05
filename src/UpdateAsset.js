import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Icon} from 'react-materialize'
import moment from 'moment'



class UpdateAsset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            serial_number: this.props.asset.serial_number,
            asset_name: this.props.asset.asset_name,
            purchase_date: this.props.asset.purchase_date,
            description: this.props.asset.description,
            invoice_number: this.props.asset.invoice_number,
            vendor: this.props.asset.vendor,
            amount: this.props.asset.amount,
            gst: this.props.asset.gst,
            total: this.props.asset.total,
            category: this.props.asset.category,
            condition : this.props.asset.condition,
            location : this.props.asset.location,
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
    }

    checkForValidation() {
        if (!this.state.serial_number || !this.state.asset_name || !this.state.purchase_date || !this.state.invoice_number || !this.state.vendor || !this.state.amount) {
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else {
            this.setState({
                updateAssetRequest: true
            })
        }
    }
    
    setSerialNumber(e) {
        this.setState({
            serial_number: e.target.value
        })
    }
    
    setAssetName(e) {
        this.setState({
            asset_name: e.target.value
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
            invoice_number: e.target.value
        })
    }
    
    setVendor(e) {
        this.setState({
            vendor: e.target.value
        })
    }
    
    setAmount(e) {
        this.setState({
            amount: Number(e.target.value),
        })
    }
    
    setGst(e) {
        this.setState({
            gst: Number(e.target.value),
        })
    }
    
    setCategory(e) {
        this.setState({
            category: e.target.value
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
    
    updateAssetIntoDb() {
        axios({
            method: 'post',
            url: 'http://localhost:3001/asset/update',
            withCredentials: true,
            data: {
                asset_id : this.props.asset.asset_id,
                serial_number: this.state.serial_number,
                asset_name: this.state.asset_name,
                purchase_date: this.state.purchase_date,
                description: this.state.description,
                invoice_number: this.state.invoice_number,
                vendor: this.state.vendor,
                amount: this.state.amount,
                gst: this.state.gst,
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.amount !== this.state.amount || prevState.gst !== this.state.gst) {
            this.setState({
                total: this.state.amount + ((this.state.amount * this.state.gst) / 100)
            })
        }
    }



    render() {
        return (
            <div>
                <Row>
                    <Input s={3} label="Serial Number *" defaultValue={this.state.serial_number} onChange={this.setSerialNumber} />
                    <Input s={3} label="Asset Name *" defaultValue={this.state.asset_name} onChange={this.setAssetName} />
                    <Input s={3} name='on' type='date' label="Purchase Date" onChange={this.setPurchaseDate} placeholder={moment(this.state.purchase_date).format('D MMMM, YYYY')} />
                    <Input s={6} label="Description" defaultValue={this.state.description} onChange={this.setDescription} />
                    <Input s={3} label="Invoice Number *" defaultValue={this.state.invoice_number} onChange={this.setInvoiceNumber} />
                    <Input s={3} label="Vendor *" defaultValue={this.state.vendor} onChange={this.setVendor} />
                    <Input s={3} label="Condition *" defaultValue = {this.state.condition} onChange = {this.setCondition}/>
                    <Input s={3} label="Location *" defaultValue = {this.state.location} onChange = {this.setLocation}/>
                    <Input s={3} label="Amount *" type="number" min={0} defaultValue={this.state.amount} onChange={this.setAmount} />
                    <Input s={3} label="GST" type="number" min={0} defaultValue={this.state.gst} onChange={this.setGst} />
                    <br />
                    <Badge>Total : {this.state.total}</Badge>
                    <Input s={6} type='select' label="Category" onChange={this.setCategory} defaultValue={this.state.category}>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non - Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                </Row>
                <Button waves='light' onClick={this.checkForValidation}>Submit <Icon small right>send</Icon></Button>
                {this.state.updateAssetRequest ? this.updateAssetIntoDb() : null}
            </div>
        )
    }
}

export default UpdateAsset