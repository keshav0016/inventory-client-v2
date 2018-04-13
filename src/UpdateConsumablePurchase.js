import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge} from 'react-materialize'
import $ from 'jquery'
import moment from 'moment'

class UpdateConsumablePurchase extends Component{
    constructor(props){
        super(props)
        this.state = {
            consumable_id: this.props.consumable.consumable_id,
            name : this.props.consumable.consumable.name,
            vendor_name : this.props.consumable.vendor_name,
            purchase_date : this.props.consumable.purchase_date,
            purchased_quantity : this.props.consumable.quantity,
            item_price : this.props.consumable.item_price,
            whole_price : this.props.consumable.whole_price,
            discount : this.props.consumable.discount,
            gst : this.props.consumable.gst,
            total : this.props.consumable.total,
            updateConsumable : false
        }
        this.setPurchaseQuantity = this.setPurchaseQuantity.bind(this)
        this.updateConsumablePurchase = this.updateConsumablePurchase.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setItemPrice = this.setItemPrice.bind(this)
        this.setDiscount = this.setDiscount.bind(this)
        this.setGst = this.setGst.bind(this)
        }
    componentDidMount(){
        $('label').addClass('active')
    }

    checkForValidation(){

        if(this.state.purchased_quantity <= 0){
            window.Materialize.toast('The Purchase quantity cannot be negative', 4000)
        }
        else if(this.state.item_price <= 0){
            window.Materialize.toast('The Consumable price cannot be negative', 4000)
        }
        else if(this.state.gst < 0){
            window.Materialize.toast('The Consumable gst cannot be negative', 4000)
        }
        else if(this.state.discount < 0){
            window.Materialize.toast('The Consumable discount cannot be negative', 4000)
        }
        else{
            this.setState({
                updateConsumable : true
            })
        }
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

    updateConsumablePurchase(){
        axios({
            method :'post',
            url :'http://localhost:3001/consumables/editPurchase',
            data : {
                consumable_id : this.state.consumable_id,
                name : this.state.name,
                vendor_name : this.state.vendor_name,
                purchase_date : this.state.purchase_date,
                purchased_quantity : this.state.purchased_quantity,
                item_price : this.state.item_price,
                whole_price : this.state.whole_price,
                discount : this.state.discount,
                gst : this.state.gst,
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
                    <p><b>Consumable: </b>{this.props.consumable.consumable.name}</p>
                    <p><b>Vendor: </b>{this.props.consumable.vendor_name}</p>
                    <p><b>Purchase Date: </b>{moment(this.props.consumable.purchase_date).format('DD MMM YYYY')}</p>
                    <Input s={6} label="Purchased Quantity" type='number' min={0} value = {this.state.purchased_quantity} onChange = {this.setPurchaseQuantity}/>
                    <Input s={6} label="Price" type='number' min={0} value = {this.state.item_price} onChange = {this.setItemPrice}/>
                    <Input s={6} label="GST %" type='number' min={0} value = {this.state.gst} onChange = {this.setGst}/>
                    <Input s={6} label="Discount %" type='number' min={0} value = {this.state.discount} onChange = {this.setDiscount}/>
                    <Badge>Total : ₹{this.state.total.toFixed(2)}</Badge>
                    <Badge>Total Price : ₹{this.state.whole_price.toFixed(2)}</Badge>
                </Row>
                    <Button onClick={this.checkForValidation}>Submit</Button>
                    {this.state.updateConsumable ? this.updateConsumablePurchase() : null}
            </div>  
        )
    }

}

export default UpdateConsumablePurchase