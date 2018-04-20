import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge} from 'react-materialize'
import $ from 'jquery'
import moment from 'moment'
import { baseUrl } from './config';

class UpdateConsumablePurchase extends Component{
    constructor(props){
        super(props)
        this.state = {
            consumable_id: this.props.consumable.consumable_id,
            name : this.props.consumable.consumable.name,
            vendor_name : this.props.consumable.vendor_name,
            purchase_date : this.props.consumable.purchase_date,
            purchased_quantity : {
                value: this.props.consumable.quantity,
                error: '',
                showError: false
            },
            item_price : {
                value: this.props.consumable.item_price,
                error:'',
                showError: false
            },
            whole_price : this.props.consumable.whole_price,
            discount : {
                value: this.props.consumable.discount,
                error: '',
                showError: false
            },
            gst : {
                value: this.props.consumable.gst,
                error:'',
                showError: false
            },
            total : this.props.consumable.total,
            updateConsumable : false,
            calculateTotal : false
        }
        this.setPurchaseQuantity = this.setPurchaseQuantity.bind(this)
        this.updateConsumablePurchase = this.updateConsumablePurchase.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setItemPrice = this.setItemPrice.bind(this)
        this.setDiscount = this.setDiscount.bind(this)
        this.setGst = this.setGst.bind(this)
        this.calculateWholePrice = this.calculateWholePrice.bind(this)
        this.calculateTotal = this.calculateTotal.bind(this)
        }
    componentDidMount(){
        $('label').addClass('active')
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

    checkForValidation(){

        // if(this.state.purchased_quantity <= 0){
        //     window.Materialize.toast('The Purchase quantity cannot be negative', 4000)
        // }
        // else if(this.state.item_price <= 0){
        //     window.Materialize.toast('The Consumable price cannot be negative', 4000)
        // }
        // else if(this.state.gst < 0){
        //     window.Materialize.toast('The Consumable gst cannot be negative', 4000)
        // }
        // else if(this.state.discount < 0){
        //     window.Materialize.toast('The Consumable discount cannot be negative', 4000)
        // }
        // else{
        //     this.setState({
        //         updateConsumable : true
        //     })
        // }
        if(Number(this.state.purchased_quantity.value) === 0){
            this.setState({
                purchased_quantity:Object.assign(this.state.purchased_quantity, {
                    error: 'The quantity should not be zero',
                    showError: true
                })
            })
        }
        if(Number(this.state.purchased_quantity.value) < 0){
            this.setState({
                purchased_quantity:Object.assign(this.state.purchased_quantity, {
                    error: 'The quantity should not be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.purchased_quantity.value) > 0){
            this.setState({
                purchased_quantity:Object.assign(this.state.purchased_quantity, {
                    error: '',
                    showError: false
                })
            })
        }
        if(Number(this.state.item_price.value) === 0){
            this.setState({
                item_price:Object.assign(this.state.item_price, {
                    error: 'The price should not be zero',
                    showError: true
                })
            })
        }
        if(Number(this.state.item_price.value) < 0){
            this.setState({
                item_price:Object.assign(this.state.item_price, {
                    error: 'The price should not be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.item_price.value) > 0){
            this.setState({
                item_price:Object.assign(this.state.item_price, {
                    error: '',
                    showError: false
                })
            })
        }
        if(Number(this.state.gst.value) < 0){
            this.setState({
                gst:Object.assign(this.state.gst, {
                    error: 'The gst should not be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.gst.value) >= 0){
            this.setState({
                gst:Object.assign(this.state.gst, {
                    error: '',
                    showError: false
                })
            })
        }
        if(Number(this.state.discount.value) < 0){
            this.setState({
                discount:Object.assign(this.state.discount, {
                    error: 'The discount should not be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.discount.value) >= 0){
            this.setState({
                discount:Object.assign(this.state.discount, {
                    error: '',
                    showError: false
                })
            })
        }
        if(Number(this.state.purchased_quantity.value) > 0 && Number(this.state.item_price.value) > 0 && Number(this.state.gst.value) >= 0 && Number(this.state.discount.value) >= 0){
            this.setState({
                updateConsumable : true
            })
        }
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
            item_price : Object.assign(this.state.item_price, {
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

    updateConsumablePurchase(){
        axios({
            method :'post',
            url :`${baseUrl}/consumables/editPurchase`,
            data : {
                consumable_id : this.state.consumable_id,
                name : this.state.name,
                vendor_name : this.state.vendor_name,
                purchase_date : this.state.purchase_date,
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
                updateConsumable : false
            })
            $('label').addClass('active')
            $(".modal-overlay").click()
            this.props.getHistory()
            window.Materialize.toast('Consumable Purchase Detail Updated', 4000)
        })
        .catch(error => {
            console.log(error)
        })
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.item_price !== this.state.item_price  || prevState.purchased_quantity !== this.state.purchased_quantity){
    //         this.setState({
    //             whole_price : this.state.item_price * this.state.purchased_quantity
    //         })
    //     }
    //     if(prevState.whole_price !== this.state.whole_price || prevState.gst !== this.state.gst || prevState.discount !== this.state.discount){
    //         this.setState({
    //             total : ((this.state.whole_price)+((this.state.whole_price * this.state.gst)/100))-((this.state.whole_price * this.state.discount)/100)
    //         })
    //     }
    // }


    render(){
        return(
            <div style={{marginLeft : '30px', marginRight : '30px'}}>
                <h3 style={{fontWeight : 250, fontFamily : 'Roboto'}}>Update Purchase</h3>
                <Row>
                    <p><b>Consumable: </b>{this.props.consumable.consumable.name}</p>
                    <p><b>Vendor: </b>{this.props.consumable.vendor_name}</p>
                    <p><b>Purchase Date: </b>{moment(this.props.consumable.purchase_date).format('DD MMM YYYY')}</p>
                    <Input s={6} label="Purchased Quantity" type='number' min={0} value = {this.state.purchased_quantity.value} onChange = {this.setPurchaseQuantity} error={this.state.purchased_quantity.showError ? this.state.purchased_quantity.error : null} />
                    <Input s={6} label="Price" type='number' min={0} value = {this.state.item_price.value} onChange = {this.setItemPrice} error={this.state.item_price.showError ? this.state.item_price.error : null} />
                    <Input s={6} label="GST %" type='number' min={0} value = {this.state.gst.value} onChange = {this.setGst} error={this.state.gst.showError ? this.state.gst.error : null} />
                    <Input s={6} label="Discount %" type='number' min={0} value = {this.state.discount.value} onChange = {this.setDiscount} error={this.state.discount.showError ? this.state.discount.error : null} />
                    <Badge>Total : ₹{this.state.total.toFixed(2)}</Badge>
                    <Badge>Total Price : ₹{this.state.whole_price.toFixed(2)}</Badge>
                </Row>
                    <Button onClick={this.checkForValidation}>Submit</Button>
                    {this.state.updateConsumable ? this.updateConsumablePurchase() : null}
                    {this.state.calculateTotal ? this.calculateTotal() : null}
            </div>  
        )
    }

}

export default UpdateConsumablePurchase