import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Icon} from 'react-materialize'



class UpdateConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable_id,
            name : this.props.consumable.name,
            quantity : this.props.consumable.quantity,
        }

        this.setConsumableId=this.setConsumableId.bind(this)
        this.setConsumableName=this.setConsumableName.bind(this)
        this.setConsumableQuantity=this.setConsumableQuantity.bind(this)
        this.UpdateConsumable=this.UpdateConsumable.bind(this)
    }

    setConsumableId(e) {
        this.setState({
            consumable_id : e.target.value
        })
    }

    setConsumableName(e) {
        this.setState({
            name : e.target.value
        })
    }

    setConsumableQuantity(e) {
        this.setState({
            quantity : e.target.value
        })
    }

    UpdateConsumable() {
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
            console.log(res.data.message)
            this.props.setHandleListRequest()
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
                    <Input s={6} label="Serial Number *" defaultValue={this.state.serial_number} onChange={this.setSerialNumber} />
                    <Input s={6} label="Asset Name *" defaultValue={this.state.asset_name} onChange={this.setAssetName} />
                    <Input s={6} name='on' type='date'  onChange={this.setPurchaseDate} label={moment(this.state.purchase_date).format('D MMMM, YYYY')} />
                    <Input s={6} label="Description" defaultValue={this.state.description} onChange={this.setDescription} />
                    <Input s={6} label="Invoice Number *" defaultValue={this.state.invoice_number} onChange={this.setInvoiceNumber} />
                    <Input s={6} label="Vendor *" defaultValue={this.state.vendor} onChange={this.setVendor} />
                    <Input s={6} label="Amount *" type="number" defaultValue={this.state.amount} onChange={this.setAmount} />
                    <Input s={6} label="GST" type="number" defaultValue={this.state.gst} onChange={this.setGst} />
                    <br />
                    <Badge>Total : {this.state.total}</Badge>
                    <Input s={12} type='select' label="Category" onChange={this.setCategory} defaultValue={this.state.category}>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non - Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option>
                    </Input>
                </Row>
                <Button waves='light' onClick={this.checkForValidation} toast={this.state.toastText} >Submit <Icon small right>send</Icon></Button>
                {this.state.updateAssetRequest ? this.updateAssetIntoDb() : null}
            </div>
        )
    }
}

export default UpdateConsumables