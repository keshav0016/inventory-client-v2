import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import './Employee.css'
import './adminDash.css'
import $ from 'jquery'
import { baseUrl } from './config';
import './ListPage.css'
//CHANGE THE USER ID IN CLIENT AS WELL AS SERVER

class Tickets extends Component{
    constructor(props){
        super(props)
        this.state = {
            availableItems: [],
            user_id: this.props.user_id,
            requestResource: false,
            quantity:{
                value : ''
                ,error : ''
                ,showError : false
            },
            assets: '',
            item_type: {
                value : 'Select'
                ,error : ''
                ,showError : false
            },
            item: {
                value : 'Select'
                ,error : ''
                ,showError : false
            },
            disableItems : true
        }
        this.requestQuantity = this.requestQuantity.bind(this)
        this.requestResourceType = this.requestResourceType.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.confirmRequest = this.confirmRequest.bind(this)
        this.requestUser = this.requestUser.bind(this)
        this.itemTypeDropdown = this.itemTypeDropdown.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
    }
    requestResourceType(e){
        if(e.target.value !== 'Select'){
            this.setState({
                item: Object.assign(this.state.item, {
                    value : e.target.value
                    ,showError : false
                })
            })
        }
        else{
            this.setState({
                item: Object.assign(this.state.item, {
                    value : 'Select'
                })
            })
        }
    }

    requestQuantity(e){
        if(this.state.item_type === 'consumables'){
            this.setState({
                quantity: Object.assign(this.state.quantity, {
                    value : e.target.value
                })
            })
        }
    }

    itemTypeDropdown(e){
        if(e.target.value === 'Select'){
            this.setState({
                disableItems : true
            })
        }
        else{
            if(e.target.value === 'assets'){
                this.setState({
                    item_type : 'assets',
                    quantity : Object.assign(this.state.quantity, {
                        value : 1
                        ,showError : false
                    }),
                    disableItems : false
                })
            }
            else{
                this.setState({
                    item_type : 'consumables',
                    disableItems : false
                })
            }
        }
        $('label').addClass('active')
    }

    itemDropdown(){
        var itemArr = []
        itemArr.push(<option key='Select' value='Select'>Select</option>)
        if(this.state.item_type === 'assets'){
            for(let index = 0; index <= this.state.assets; index++){
                itemArr.push(<option key={index} value={this.state.availableItems[index]}>{this.state.availableItems[index]}</option>)
            }
        }
        else{
            for(let index = this.state.assets + 1; index < this.state.availableItems.length; index++){
                itemArr.push(<option key={index} value={this.state.availableItems[index]}>{this.state.availableItems[index]}</option>)
            }
        }
        return itemArr
    }

    checkForValidation(){
        if(!this.state.quantity.value){
            this.setState({
                quantity : Object.assign(this.state.quantity, {
                    error : 'Quantity is required',
                    showError : true
                })
            })
        }
        else{
            if(Number(this.state.quantity.value) < 1){
                this.setState({
                    quantity : Object.assign(this.state.quantity, {
                        error : 'Quantity cannot be less than 1',
                        showError : true
                    })
                })
            }
            else{
                this.setState({
                    quantity : Object.assign(this.state.quantity, {
                        showError : false
                    })
                })
            }
        }
                
        if (this.state.item.value === 'Select') {
            this.setState({
                item : Object.assign(this.state.item, {
                    error : 'Item is required'
                    ,showError: true
                })
            })
        }
        else{
            this.setState({
                item : Object.assign(this.state.item, {
                    showError: false
                })
            })
        }
        
        if (this.state.item_type.value === 'Select') {
            this.setState({
                item_type : Object.assign(this.state.item_type, {
                    error : 'Item type is required'
                    ,showError: true
                })
            })
        }
        else{
            this.setState({
                item_type : Object.assign(this.state.item_type, {
                    showError: false
                })
            })
        }

        if(!this.state.quantity.showError && !this.state.item.showError && !this.state.item_type.showError){
            this.setState({
                requestResource : true
            })
            $(".modal-overlay").click()
        }


    }
    

    requestUser(e){
        this.setState({
            user_id : e.target.value
        })
    }


    //user_id,first_name and last_name will be taken from the req.currentUser
    confirmRequest(){
        axios({
            method:'post',
            url:`${baseUrl}/employee/ticket/create`,
            data:{
                user_id:this.state.user_id,
                date:Date.now(),
                item: this.state.item.value,
                item_type:this.state.item_type.value,
                quantity:this.state.quantity.value,
            },
            withCredentials:true
        })
        .then(res => {
            this.setState({
                requestResource:false,
                quantity : Object.assign(this.state.quantity, {
                    value : ''
                }),
                item: Object.assign(this.state.item, {
                    value : 'Select'
                }),
                disableItems : true
                ,item_type : Object.assign(this.state.item_type, {
                    value : 'Select'
                })
            })
            if(res.data.message){
                window.Materialize.toast(res.data.message, 4000)
            }else if(res.data.error === 'ticket can not be created'){
                window.Materialize.toast('sorry, request can not be made', 4000)

            }
            // this.props.setHandleListRequest()
        })
        // .catch(error => {
        //     window.Materialize.toast('sorry, request can not be made', 4000)
        // })
    }

   componentDidMount(){
       axios({
           method:'get',
           url:`${baseUrl}/employee/ticket/listItems`,
           withCredentials:true
       })
       .then((res) => {
           this.setState({
               availableItems: res.data.items,
               assets: res.data.assetLimit,
           })
       })
       .catch(error => {
        window.Materialize.toast('Sorry, there are no resources available', 4000)
    })
    $('label').addClass('active')
   }

   cancelAll(){
       this.setState({
            quantity:{
                value : ''
                ,error : ''
                ,showError : false
            },
            assets: '',
            item_type: {
                value : 'Select'
                ,error : ''
                ,showError : false
            },
            item: {
                value : 'Select'
                ,error : ''
                ,showError : false
            }
       })
       $(".modal-overlay").trigger('click');        
    }


   render(){
        return(
            <div className="" >
                <h3 className="title">Ticket Request</h3>
                <div className ='RequestForm'>
                <Row>
                    <Input s={12} label='Item Type' type = 'select' value={this.state.item_type} onChange={this.itemTypeDropdown} error={this.state.item_type.showError ? this.state.item_type.error : null}>
                        <option value='Select'>Select</option>
                        <option value='assets'>Assets</option>
                        <option value='consumables'>Consumables</option>                        
                    </Input>
                </Row>
                <Row>
                    <Input s={12} label='Items' type='select' value={this.state.disableItems ? 'Select' : this.state.item.value} onChange={this.requestResourceType}  error={this.state.item.showError ? this.state.item.error : null}>
                        {this.itemDropdown()}
                    </Input>
                </Row>
                <Row>
                    <Input  s={12} label="Quantity" type="number" min={0} value = {this.state.quantity.value} onChange = {this.requestQuantity}  error={this.state.quantity.showError ? this.state.quantity.error : null}/>
                </Row>
                {this.state.requestResource ? this.confirmRequest() : null} 
                </div>
                <div className='splitModalButtons'>
                    <Button className=''waves='light' type = "submit" name = "action" onClick={this.checkForValidation} >Request</Button>
                    <Button  onClick={this.cancelAll} className="cancelButton" >Cancel</Button>
                </div>
                   
            </div>
        )
    }

}


export default Tickets