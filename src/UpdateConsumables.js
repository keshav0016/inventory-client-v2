import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom'

class UpdateConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable.consumable_id,
            name : {
                value:this.props.consumable.name,
                error:'',
                showError:false
            },
            quantity : {
                value:this.props.consumable.quantity,
                error:'',
                showError:false
            },
            updateConsumableRequest : false,
            redirect: false
        }

        this.setConsumableName=this.setConsumableName.bind(this)
        this.setConsumableQuantity=this.setConsumableQuantity.bind(this)
        this.UpdateConsumable=this.UpdateConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }

    checkForValidation(){
        var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/;
        var alphaNum = /^[a-zA-Z0-9]+(\s{1,1}[a-zA-Z0-9]+)*$/;
        
        if(!this.state.name.value){
            this.setState({
                name:Object.assign(this.state.name, {
                    error:'The Consumable name is required',
                    showError:true
                })
            })
        }
        if(this.state.name.value && !alphaNum.test(this.state.name.value)){
            this.setState({
                name:Object.assign(this.state.name, {
                    error:'The Consumable name should only be alphabets',
                    showError:true
                })
            })
        }
        if(alphaNum.test(this.state.name.value)){
            this.setState({
                name:Object.assign(this.state.name, {
                    error:'',
                    showError:false
                })
            })
        }
        if(Number(this.state.quantity.value) === 0){
            // window.Materialize.toast('The quantity cannot be negative', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error:'The Consumable quantity should not be zero',
                    showError: true
                })
            })
        }
        if(Number(this.state.quantity.value) < 0){
            // window.Materialize.toast('The quantity cannot be negative', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error:'The Consumable quantity should not be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.quantity.value) > 0){
            // window.Materialize.toast('The quantity cannot be negative', 4000)
            this.setState({
                quantity:Object.assign(this.state.quantity, {
                    error:'',
                    showError: false
                })
            })
        }
        if(this.state.name.value && !this.state.name.showError && Number(this.state.quantity.value) > 0){
            this.setState({
                updateConsumableRequest : true
            })
        }
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

    setConsumableName(e) {
        this.setState({
            name : Object.assign(this.state.name, {
                value: e.target.value
            })
        })
    }

    setConsumableQuantity(e) {
        this.setState({
            quantity : Object.assign(this.state.quantity, {
                value: e.target.value
            })
        })
    }

    UpdateConsumable() {
        axios({
            method: 'post',
            url: `${baseUrl}/consumables/update`,
            data: {
                consumable_id : this.state.consumable_id,
                name : this.state.name.value,
                quantity : this.state.quantity.value
            },
            withCredentials:true
        })
        .then(obj => {
            this.setState({
                name:{
                    value:this.props.consumable.name,
                    error:'',
                    showError:false
                },
                quantity:{
                    value:this.props.consumable.quantity,
                    error:'',
                    showError:false
                },
                updateConsumableRequest : false
            })
            // window.Materialize.toast('Consumable Updated Successfully', 4000)
            swal('Consumable Updated Successfully',{
                buttons: false,
                timer: 2000,
              })
            //   $('.modal').hide()
            //   $('.modal-overlay').hide()
            //   setTimeout((function() {
            //     window.location.reload();
            //   }), 2100);
            this.props.setHandleListRequest()
        })
        .catch(error => {
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect : true
                })
            }
            console.error(error)
        })
    }

    render() {
        return (
            <div className="listComponent">
            <h5 className="title" >Update Consumable</h5>
                <Row>
                    <Input s={6} label=' ' placeholder="Consumable Name" value={this.state.name.value} onChange={this.setConsumableName} error={this.state.name.showError ? this.state.name.error : null} />
                    <Input s={6} label=' ' placeholder="Consumable Quantity" type="number" min={0} value={this.state.quantity.value} onChange={this.setConsumableQuantity} error={this.state.quantity.showError ? this.state.quantity.error : null} />
                </Row>
                <Button waves='light' onClick={this.checkForValidation}>Update</Button>
                {this.state.updateConsumableRequest ? this.UpdateConsumable () : null}
                {this.state.redirect ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            </div>
        )
    }
}

export default UpdateConsumables