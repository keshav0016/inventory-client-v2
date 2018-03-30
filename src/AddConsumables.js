import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Modal} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'

class AddConsumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : '',
            vendor_name : '',
            purchase_date : '',
            purchased_quantity : 0,
            item_price : 0,
            whole_price : 0,
            discount : 0,
            gst : 0,
            total : 0,
            vendorList : [],
            addVendor : false,
            vendorListRequest : true,
            addConsumableRequest : false
        }
        this.setConsumableName = this.setConsumableName.bind(this)
        this.setVendorName = this.setVendorName.bind(this)
        this.setPurchaseDate = this.setPurchaseDate.bind(this)
        this.setPurchaseQuantity = this.setPurchaseQuantity.bind(this)
        this.addConsumable = this.addConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setItemPrice = this.setItemPrice.bind(this)
        this.setDiscount = this.setDiscount.bind(this)
        this.setGst = this.setGst.bind(this)
        this.setVendorListRequest = this.setVendorListRequest.bind(this)
        this.setAddVendor = this.setAddVendor.bind(this)
        this.handleVendorList = this.handleVendorList.bind(this)
        this.vendorListDropdown = this.vendorListDropdown.bind(this)
    }

    checkForValidation(){
        if(!this.state.name || !this.state.vendor_name || !this.state.purchase_date){
            window.Materialize.toast('All the fields are required', 4000)
        }
        else if(this.state.purchased_quantity <= 0){
            window.Materialize.toast('The quantity cannot be negative', 4000)
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

    setItemPrice(e){
        this.setState({
            item_price : e.target.value
        })
    }

    setDiscount(e){
        this.setState({
            discount : e.target.value
        })
    }

    setGst(e){
        this.setState({
            gst : e.target.value
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
                purchased_quantity : this.state.purchased_quantity,
                item_price : this.state.item_price,
                whole_price : this.state.whole_price,
                discount : this.state.discount,
                gst : this.state.gst,
                total : this.state.total
            }
        })
        .then(obj => {
            this.setState({
                name : '',
                vendor_name : '',
                purchase_date : '',
                purchased_quantity : 0,
                item_price : 0,
                whole_price : 0,
                discount : 0,
                gst : 0,
                total : 0,
                addConsumableRequest : false
            })
            this.props.setHandleListRequest()
            window.Materialize.toast('Consumable Added Successfully', 4000)
        })
        .catch(error => {
            console.log(error)
        })
    }

    setVendorListRequest(){
        this.setState({
            vendorListRequest : true
        })
        $('#addVendor .modal-footer button').click()
    }

    setAddVendor(){
        this.setState({
            addVendor : true
        })
        $("#triggerAddVendor").trigger('click')
    }

    vendorListDropdown(){
        var vendorArr = []
        this.state.vendorList.forEach(vendor => {
            vendorArr.push(<option key={vendor.id} value={vendor.name}>{vendor.name}</option>)
        });
        return vendorArr
    }

    handleVendorList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/vendor/list`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                vendorList : res.data.vendors,
                vendorListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
        // $("#triggerAddVendor").hide()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.item_price !== this.state.item_price  || prevState.purchased_quantity !== this.state.purchased_quantity){
            this.setState({
                whole_price : this.state.item_price * this.state.purchased_quantity
            })
        }
        if(prevState.whole_price !== this.state.whole_price || prevState.gst !== this.state.gst || prevState.discount !== this.state.discount){
            this.setState({
                total : ((this.state.whole_price)+((this.state.whole_price * this.state.gst)/100))-((this.state.whole_price * this.state.discount)/100)
            })
        }
    }


    render(){
        return(
            <div>
                <Row>
                    <Input s={6} label="Consumable" value = {this.state.name} onChange = {this.setConsumableName}/>
                    <Input s={6} label="Vendor" type='select' onChange = {this.setVendorName}>{this.vendorListDropdown()}</Input>
                    <Input s={6} name='on' type='date' label="Purchased Date" onChange={this.setPurchaseDate} value = {this.state.purchase_date} />
                    <Input s={6} label="Purchased Quantity" type="number" min={0} value = {this.state.purchased_quantity} onChange = {this.setPurchaseQuantity}/>
                    <Input s={6} label="Price" type='number' value = {this.state.item_price} onChange = {this.setItemPrice}/>
                    <Input s={6} label="GST" type='number' value = {this.state.gst} onChange = {this.setGst}/>
                    <Input s={6} label="Discount" type='number' value = {this.state.discount} onChange = {this.setDiscount}/>
                    <Badge>Total : {this.state.total}</Badge>
                    <Badge>Total Price : {this.state.whole_price}</Badge>
                </Row>
                    <Button waves='light' type = "submit" name = "action" onClick={this.checkForValidation}>Add Consumable</Button>
                    {this.state.addConsumableRequest ? this.addConsumable () : null}
                    {this.state.vendorListRequest ? this.handleVendorList() : null}
                    <br />
                    <br />
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

export default AddConsumables