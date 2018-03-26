import React, {Component} from 'react'
// import axios from 'axios'
import {Row, Input, Button, Badge} from 'react-materialize'

class AddAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
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

    componentDidUpdate(prevProps, prevState){
        if(prevState.amount !== this.state.amount  || prevState.gst !== this.state.gst){
            this.setState({
                total : this.state.amount + ((this.state.amount * this.state.gst)/100)
            })
        }
    }



    render(){
        return(
            <div>
                <Row>
                    <Input s={6} label="Serial Number" defaultValue = {this.state.serial_number} onChange = {this.setSerialNumber} validate/>
                    <Input s={6} label="Asset Name" defaultValue = {this.state.asset_name} onChange = {this.setAssetName}/>
                    <Input s={6} name='on' type='date' label="Purchased Date" onChange={this.setPurchaseDate} defaultValue = {this.state.purchase_date} />
                    <Input s={6} label="Description" defaultValue = {this.state.description} onChange = {this.setDescription}/>
                    <Input s={6} label="Invoice Number" defaultValue = {this.state.invoice_number} onChange = {this.setInvoiceNumber}/>
                    <Input s={6} label="Vendor" defaultValue = {this.state.vendor} onChange = {this.setVendor}/>
                    <Input s={6} label="Amount" type = "number" defaultValue = {this.state.amount} onChange = {this.setAmount}/>
                    <Input s={6} label="GST" type = "number" defaultValue = {this.state.gst} onChange = {this.setGst}/>
                    <br />
                    <Badge>Total : {this.state.total}</Badge>
                    <Input s={12} type='select' label="Category" onChange = {this.setCategory} defaultValue='Other'>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non - Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                </Row>
                    <Button waves='light' type = "submit" name = "action">Add Asset</Button>
            </div>
        )
    }

}

export default AddAsset