import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'

class AddConsumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : '',
            vendor_name : '',
            purchase_date : '',
            purchased_quantity : 0,
            addConsumableRequest : false
        }
        this.setConsumableName = this.setConsumableName.bind(this)
        this.setVendorName = this.setVendorName.bind(this)
        this.setPurchaseDate = this.setPurchaseDate.bind(this)
        this.setPurchaseQuantity = this.setPurchaseQuantity.bind(this)
        this.addConsumable = this.addConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }

    checkForValidation(){
        if(!this.state.name || !this.state.vendor_name || !this.state.purchase_date || !this.state.purchased_quantity){
            window.Materialize.toast('All the fields are required', 4000)
        }
        else{
            this.setState({
                addConsumableRequest : true
            })
        }
    }

    setConsumableName(e){
        this.setState({
            name : e.target.value
        })
    }

    setVendorName(e){
        this.setState({
            vendor_name : e.target.value
        })
    }

    setPurchaseDate(e){
        this.setState({
            purchase_date : e.target.value
        })
    }

    setPurchaseQuantity(e){
        this.setState({
            purchased_quantity : e.target.value
        })
    }

    addConsumable(){
        axios({
            method :'post',
            url :'http://localhost:3001/consumables/create',
            data : {
                name : this.state.name,
                vendor_name : this.state.vendor_name,
                purchase_date : this.state.purchase_date,
                purchased_quantity : this.state.purchased_quantity
            }
        })
        .then(obj => {
            this.setState({
                name : '',
                vendor_name : '',
                purchase_date : '',
                purchased_quantity : 0,
                addConsumableRequest : false
            })
            this.props.setHandleListRequest()
            window.Materialize.toast('Consumable Added Successfully', 4000)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <Row>
                    <Input s={6} label="Consumable" value = {this.state.name} onChange = {this.setConsumableName}/>
                    <Input s={6} label="Vendor" value = {this.state.vendor_name} onChange = {this.setVendorName}/>
                    <Input s={6} name='on' type='date' label="Purchased Date" onChange={this.setPurchaseDate} value = {this.state.purchase_date} />
                    <Input s={6} label="Purchased Quantity" type = "number" value = {this.state.purchased_quantity} onChange = {this.setPurchaseQuantity}/>
                </Row>
                    <Button waves='light' type = "submit" name = "action" onClick={this.checkForValidation}>Add Consumable</Button>
                    {this.state.addConsumableRequest ? this.addConsumable () : null}
            </div>
        )
    }

}

export default AddConsumables