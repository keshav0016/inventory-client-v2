import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Modal, Autocomplete, Col} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'
import { baseUrl } from './config';
import {
    Redirect, Link
  } from 'react-router-dom';
import swal from 'sweetalert';
import DateInput from './shared/DateInput'
import moment from 'moment'
class AddConsumables extends Component{
    constructor(props){
        super(props)
        this.state = {
            login: false,
            name : {
                value: "",
                showError: false,
                error: "",
            },
            vendor_name : {
                value: "",
                showError: false,
                error: "",
                availabilityError: false,
                availabilityMessage: ""
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
            consumableNamesListObj : {

            },
            total : 0,
            vendorList : [],
            consumableNameList : [],
            addVendor : false,
            vendorListRequest : true,
            addConsumableRequest : false,
            calculateTotal : false,
            redirect: false,
            addConsumable: true,
            getConsumableName: true
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
        this.handleConsumableNameList = this.handleConsumableNameList.bind(this)
        this.getConsumableNameList = this.getConsumableNameList.bind(this)
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
        if(!this.state.purchased_quantity.value){
            this.setState({
                purchased_quantity: Object.assign(this.state.purchased_quantity, {
                    error: "The purchased quantity should not be empty",
                    showError: true
                })
            })
        }
        if(this.state.purchased_quantity.value === 0){
            this.setState({
                purchased_quantity: Object.assign(this.state.purchased_quantity, {
                    error: "The purchased quantity should not be zero",
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
        if(!this.state.item_price.value){
            this.setState({
                item_price: Object.assign(this.state.item_price, {
                    error: "The item price should not be empty",
                    showError: true
                })
            })
        }
        if(this.state.item_price.value === 0){
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
        if(Number(this.state.gst.value) >= 0){
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
        if(Number(this.state.discount.value) >= 0){
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
        if(this.state.vendor_name.value in this.state.vendorNames){
            this.setState({
                vendor_name: Object.assign(this.state.vendor_name, {
                    availabilityMessage: "",
                    availabilityError: false
                })
            })
        }
        if(!(this.state.vendor_name.value in this.state.vendorNames)){
            this.setState({
                vendor_name: Object.assign(this.state.vendor_name, {
                    availabilityMessage: "The vendor is not in the list",
                    availabilityError: true
                })
            })
        }
        if(this.state.name.value && this.state.purchase_date.value && Number(this.state.purchased_quantity.value) > 0 && Number(this.state.item_price.value) > 0 && Number(this.state.gst.value) >= 0 && Number(this.state.discount.value) >= 0 && this.state.vendor_name.value && this.state.vendor_name.value in this.state.vendorNames){
            this.setState({
                addConsumableRequest : true
            })
        }
            }

    setConsumableName(e,value){
        this.setState({
            name: Object.assign(this.state.name, {
                value: value,
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
                    availabilityError: false,
                    availabilityMessage: ""
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
                addConsumableRequest : false,
                addConsumable: false,
                redirect: true
            })
            this.props.location.setHandleListRequest()
            swal("Consumable is Added Successfully!", {
                buttons: false,
                timer: 2000,
              });
              $('.modal').hide()
              $('.modal-overlay').hide()
            //   setTimeout((function() {
            //     window.location.reload();
            //   }), 2100);

            // window.Materialize.toast('Consumable Added Successfully', 4000)
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    login: true
                })
            }
            console.log(error)
        })
    }

    setVendorListRequest(vendorName){
        this.setState({
            vendorListRequest : true
            ,vendor_name : Object.assign({
                value : vendorName
            })
        })
        $('.modal-overlay').trigger('click')
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
            if(error.response.status === 401){
                this.setState({
                    login: true
                })
            }
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
        let vendorListObj = {}
        this.state.vendorList.map((obj)=>{
            return vendorListObj[obj.name] = null
        })
        this.setState({
            vendorNames : vendorListObj
        })
    }

    handleConsumableNameList(){
        axios({
            method : 'get',
            url : `${baseUrl}/consumables/listNames`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                consumableNameList : res.data.consumablesNames,
                getConsumableName : false
            })
            this.getConsumableNameList()
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    login : true
                })
            }
            console.error(error)
        })
    }

    getConsumableNameList(){
        let consumableNamesObj = {}
        this.state.consumableNameList.map((obj)=>{
            return consumableNamesObj[obj.name] = null
        })
        this.setState({
            consumableNamesListObj : consumableNamesObj,
        })
    }

    render(){

        var addConsumableForm=(
            <div className="listComponent" >
                <h3  className='title'>Add Consumable</h3>
                <Row>
                    {/* <Input autoFocus s={12} m={6} l={6} label='Consumable' value = {this.state.name.value} onChange = {this.setConsumableName} error={this.state.name.showError ? this.state.name.error : null}/> */}
                        <Autocomplete s={12} m={6} l={6}
                            className={this.state.name.showError ? 'consumable-empty-error': null}
                            autoFocus
                            title='Consumable'
                            data={
                                this.state.consumableNamesListObj
                            }
                            onChange = {this.setConsumableName}
                            value={this.state.name.value}
                        />
                    {/* <Input s={12} m={6} l={6} name='on' type='date' 
                    label="Purchased Date" onChange={this.setPurchaseDate} 
                    value = {this.state.purchase_date.value} 
                    error={this.state.purchase_date.showError ? this.state.purchase_date.error : null}
                     /> */}
                     <DateInput
                                label="Purchased Date *" 
                                options={{max: moment(new Date(), "D MMMM, YYYY").toDate()}}
                                value = {this.state.purchase_date.value} 
                                onChange = {this.handleExpected} 
                                error={this.state.purchase_date.showError ? this.state.purchase_date.error : null} 
                            /> 
                    <br/>
                    <br/>
                    <br/>
                    <Input s={12} m={6} l={6} label="Purchased Quantity"  type="number" min={0} value={this.state.purchased_quantity.value} onChange = {this.setPurchaseQuantity} error={this.state.purchased_quantity.showError ? this.state.purchased_quantity.error : null}/>
                    <Input s={12} m={6} l={6} label="Price" type='number' min={0} value = {this.state.item_price.value} onChange = {this.setItemPrice} error={this.state.item_price.showError ? this.state.item_price.error : null}/>
                    <br/>
                    <br/>
                    <br/>
                    <Input s={12} m={6} l={6} label="GST %" type='number' min={0} value = {this.state.gst.value} onChange = {this.setGst} error={this.state.gst.showError ? this.state.gst.error : null}/>
                    <Input s={12} m={6} l={6} label="Discount %" type='number' min={0} value = {this.state.discount.value} onChange = {this.setDiscount} error={this.state.discount.showError ? this.state.discount.error : null}/>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <Autocomplete s={11} m={4} l={5}
                            className={this.state.vendor_name.showError ? 'no-vendor-error' : (this.state.vendor_name.availabilityError ? 'no-vendor-available' : 'no-error')}
                            title='Vendor'
                            data={
                                this.state.vendorNames
                            }
                            onChange = {this.setVendorName}
                            value={this.state.vendor_name.value}
                        />
                        <Col s={1} m={2} l={1} className='addAssetModalButtons2' >
                            <Modal
                            modalOptions={{dismissible:false}}
                            actions={null}
                            id="addVendor"
                            trigger={<Button id="triggerAddVendor" floating icon="add"></Button>}>
                            <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                            </Modal> 
                        </Col>
                    </Row>
                    <Badge>Total : ₹{this.state.total.toFixed(2)}</Badge>
                    <Badge>Total Price : ₹{this.state.whole_price.toFixed(2)}</Badge>
                </Row>
                    <div className="splitModalButtons" >
                    {/* <Row> */}
                    {/* <Col s={12}>
                    
                    <Button style={{float: 'right'}} waves='light' type = "submit" onClick={this.checkForValidation}>Add Consumable</Button>
                    </Col> */}
                        <Row>
                            <Col offset={'l6'} style={{float: 'right'}}>
                                <Button onClick = {this.checkForValidation} >SUBMIT</Button>
                                <Link to='/admin/consumables'><Button className="cancelButton close-modal">Cancel</Button></Link>                            
                            </Col>
                        </Row>
                    {/* </Row> */}

                    </div>
                    {this.state.addConsumableRequest ? this.addConsumable () : null}
                    {this.state.vendorListRequest ? this.handleVendorList() : null}
                    {this.state.getConsumableName ? this.handleConsumableNameList() : null}
                    {this.state.calculateTotal ? this.calculateTotal() : null}
                    <br />
                    <br />
            </div>  
        );

        return(
            <div>
            {this.state.addConsumable ? addConsumableForm : null}
            {this.state.redirect ? (<Redirect  to ={{pathname:'/admin/consumables'}}/>) : null}
            {this.state.login ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />: null}
            </div>
        )
    }

}

export default AddConsumables