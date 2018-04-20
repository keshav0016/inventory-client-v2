import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Modal, Autocomplete} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'
import { baseUrl } from './config';

class AddConsumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : {
                value: "",
                showError: false,
                error: "",
            },
            vendor_name : {
                value: "",
                showError: false,
                error: "",
            },
            purchase_date : {
                value: "",
                showError: false,
                error: "",
            },
            purchased_quantity : {
                value: 0,
                showError: false,
                error: ""
            },
            item_price : {
                value: 0,
                showError: false,
                error: ""
            },
            whole_price : 0,
            discount : {
                value: 0,
                showError: false,
                error: ""
            },
            gst : {
                value: 0,
                showError: false,
                error: ""
            },
            vendorNames : {
            },
            total : 0,
            vendorList : [],
            addVendor : false,
            vendorListRequest : true,
            addConsumableRequest : false,
            calculateTotal : false
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
        this.calculateWholePrice = this.calculateWholePrice.bind(this)
        this.calculateTotal = this.calculateTotal.bind(this)
        this.getVendorName = this.getVendorName.bind(this)
    }
    componentDidMount(){
        $(document).ready(function(){
            $('label').addClass('active');
        })
    }

    checkForValidation(){
        if (!this.state.name.value) {
            this.setState({
                name: Object.assign(this.state.name, {
                    error: "Name is required",
                    showError: true,
                })
            })
        }
        if (this.state.name.value) {
            this.setState({
                name: Object.assign(this.state.name, {
                    error: "",
                    showError: false,
                })
            })
        }
        if(Number(this.state.purchased_quantity.value) === 0){
            this.setState({
                purchased_quantity: Object.assign(this.state.purchased_quantity, {
                    error: "The purchased quantity should not be empty",
                    showError: true
                })
            })
        }
        if(Number(this.state.purchased_quantity.value) < 0){
            this.setState({
                purchased_quantity: Object.assign(this.state.purchased_quantity, {
                    error: "The purchased quantity should not be negative",
                    showError: true
                })
            })
        }
        if(Number(this.state.purchased_quantity.value) > 0){
            this.setState({
                purchased_quantity: Object.assign(this.state.purchased_quantity, {
                    error: "",
                    showError: false
                })
            })
        }
        if(Number(this.state.item_price.value) === 0){
            this.setState({
                item_price: Object.assign(this.state.item_price, {
                    error: "The item price should not be zero",
                    showError: true
                })
            })
        }
        if(Number(this.state.item_price.value) < 0){
            this.setState({
                item_price: Object.assign(this.state.item_price, {
                    error: "The item price should not be negative",
                    showError: true
                })
            })
        }
        if(Number(this.state.item_price.value) > 0){
            this.setState({
                item_price: Object.assign(this.state.item_price, {
                    error: "",
                    showError: false
                })
            })
        }
        if(Number(this.state.gst.value) < 0){
            this.setState({
                gst: Object.assign(this.state.gst, {
                    error: "The gst should not be negative",
                    showError: true
                })
            })    
        }
        if(Number(this.state.gst.value) > 0){
            this.setState({
                gst: Object.assign(this.state.gst, {
                    error: "",
                    showError: false
                })
            })    
        }
        if(Number(this.state.discount.value) < 0){
            this.setState({
                discount: Object.assign(this.state.discount, {
                    error: "The discount cannot be negative",
                    showError: true
                })
            })  
        }
        if(Number(this.state.discount.value) > 0){
            this.setState({
                discount: Object.assign(this.state.discount, {
                    error: "",
                    showError: false
                })
            })  
        }
        if(!this.state.purchase_date.value){
            this.setState({
                purchase_date: Object.assign(this.state.purchase_date, {
                    error: "Select the purchase date",
                    showError: true
                })
            })  
        }
        if(this.state.purchase_date.value){
            this.setState({
                purchase_date: Object.assign(this.state.purchase_date, {
                    error: "",
                    showError: false
                })
            })  
        }
        if(!this.state.vendor_name.value){
            this.setState({
                vendor_name: Object.assign(this.state.vendor_name, {
                    error: "The vendor name cannot be empty",
                    showError: true
                })
            })  
        }
        if(this.state.vendor_name.value){
            this.setState({
                vendor_name: Object.assign(this.state.vendor_name, {
                    error: "",
                    showError: false
                })
            })  
        }
        if(!this.state.name.value||!this.state.purchase_date.value||!this.state.purchased_quantity.value||!this.state.item_price.value||!this.state.gst.value||!this.state.discount.value){
                console.log('error')
            }
        else{
            this.setState({
                    addConsumableRequest : true
                })
            }
    }

    setConsumableName(e){
        this.setState({
            name: Object.assign(this.state.name, {
                value: e.target.value
            })
        })
    }

    setVendorName(e, value){
        this.setState({
            vendor_name : Object.assign(this.state.vendor_name, {
                value: value
            })
        })
    }

    setPurchaseDate(e){
        this.setState({
            purchase_date : Object.assign(this.state.purchase_date, {
                value: e.target.value
            })
        })
    }

    setPurchaseQuantity(e){
        this.setState({
            purchased_quantity : Object.assign(this.state.purchased_quantity, {
                value: e.target.value
            })
        })
        this.calculateWholePrice()
    }

    setItemPrice(e){
        this.setState({
            item_price: Object.assign(this.state.item_price, {
                value: e.target.value
            })
        })
        this.calculateWholePrice()
    }

    setDiscount(e){
        this.setState({
            discount : Object.assign(this.state.discount, {
                value: e.target.value
            })
        })
        this.calculateWholePrice()
    }

    setGst(e){
        this.setState({
            gst : Object.assign(this.state.gst, {
                value: e.target.value
            })
        })
        this.calculateWholePrice()
    }

    addConsumable(){
        axios({
            method :'post',
            url :`${baseUrl}/consumables/create`,
            data : {
                name : this.state.name.value,
                vendor_name : this.state.vendor_name.value,
                purchase_date : this.state.purchase_date.value,
                purchased_quantity : this.state.purchased_quantity.value,
                item_price : this.state.item_price.value,
                whole_price : this.state.whole_price,
                discount : this.state.discount.value,
                gst : this.state.gst.value,
                total : this.state.total
            },
            withCredentials:true
        })
        .then(obj => {
            this.setState({
                name : {
                    value: "",
                    showError: false,   
                    error: "",
                },
                vendor_name : {
                    value: "",
                    showError: false,
                    error: "",
                },
                purchase_date : {
                    value: "",
                    showError: false,
                    error: "",
                },
                purchased_quantity : {
                    value: 0,
                    showError: false,
                    error: ""
                },
                item_price : {
                    value: 0,
                    showError: false,
                    error: ""
                },
                whole_price : 0,
                discount : {
                    value: 0,
                    showError: false,
                    error: ""
                },
                gst : {
                    value: 0,
                    showError: false,
                    error: ""
                },
                total : 0,
                addConsumableRequest : false
            })
            this.props.location.setHandleListRequest()
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
            console.error(error)
        })
    }



    calculateWholePrice(){
            this.setState({
                whole_price : this.state.item_price.value * this.state.purchased_quantity.value,
                calculateTotal : true
            })
    }

    calculateTotal(){
        this.setState({
            total : ((this.state.whole_price)+((this.state.whole_price * this.state.gst.value)/100))-((this.state.whole_price * this.state.discount.value)/100),
            calculateTotal : false
        })
    }

    getVendorName(){
        this.state.vendorList.map((obj)=>{
            this.state.vendorNames[obj.name]=null
        })
    }


    render(){

        return(
            <div style={{marginLeft:'1%',marginRight:'1%'}}>
                <h3>Add Consumable</h3>
                <Row>
                    <Input s={6} label="Consumable" value = {this.state.name.value} onChange = {this.setConsumableName} error={this.state.name.showError ? this.state.name.error : null}/>
                    <Input s={6} name='on' type='date' label="Purchased Date" onChange={this.setPurchaseDate} value = {this.state.purchase_date.value} error={this.state.purchase_date.showError ? this.state.purchase_date.error : null} />
                    <br/>
                    <br/>
                    <br/>
                    <Input s={6} label="Purchased Quantity" type="number" min={0} value={this.state.purchased_quantity.value} onChange = {this.setPurchaseQuantity} error={this.state.purchased_quantity.showError ? this.state.purchased_quantity.error : null}/>
                    <Input s={6} label="Price" type='number' min={0} value = {this.state.item_price.value} onChange = {this.setItemPrice} error={this.state.item_price.showError ? this.state.item_price.error : null}/>
                    <br/>
                    <br/>
                    <br/>
                    <Input s={6} label="GST %" type='number' min={0} value = {this.state.gst.value} onChange = {this.setGst} error={this.state.gst.showError ? this.state.gst.error : null}/>
                    <Input s={6} label="Discount %" type='number' min={0} value = {this.state.discount.value} onChange = {this.setDiscount} error={this.state.discount.showError ? this.state.discount.error : null}/>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <Autocomplete
                            title='Vendor'
                            data={
                                this.state.vendorNames
                            }
                            onChange = {this.setVendorName}
                            value={this.state.vendor_name.value}
                        />
                    </Row>
                    <Badge>Total : ₹{this.state.total.toFixed(2)}</Badge>
                    <Badge>Total Price : ₹{this.state.whole_price.toFixed(2)}</Badge>
                </Row>
                    <Modal
                        header='Add Vendor'
                        id="addVendor"
                        trigger={<Button style={{marginLeft:'1%'}} id="triggerAddVendor">Add Vendor</Button>}>
                        <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                    </Modal> 
                    <Button style={{position:'absolute', right:'3%', bottom:'3%'}} waves='light' type = "submit" name = "action" onClick={this.checkForValidation}>Add Consumable</Button>
                    {this.state.addConsumableRequest ? this.addConsumable () : null}
                    {this.state.vendorListRequest ? this.handleVendorList() : null}
                    {this.state.calculateTotal ? this.calculateTotal() : null}
                    <br />
                    <br />
            </div>  
        )
    }

}

export default AddConsumables