import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import './Employee.css'
import './adminDash.css'
import $ from 'jquery'
import { baseUrl } from './config';
import './ListPage.css';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom'
//CHANGE THE USER ID IN CLIENT AS WELL AS SERVER

class Tickets extends Component{
    constructor(props){
        super(props)
        this.state = {
            availableItems: [],
            availableAssets: [],
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
            asset: {
                value : 'Select'
                ,error : ''
                ,showError : false
            },
            disableItems : true,
            itemType: false,
            redirect: false,
            assetsInput: false
        }
        // this.requestQuantity = this.requestQuantity.bind(this)
        this.requestResourceType = this.requestResourceType.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.confirmRequest = this.confirmRequest.bind(this)
        this.requestUser = this.requestUser.bind(this)
        this.itemTypeDropdown = this.itemTypeDropdown.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
        this.itemList = this.itemList.bind(this)
        this.requestAsset = this.requestAsset.bind(this)
    }
    requestResourceType(e){
        if(e.target.value !== 'Select'){
            this.setState({
                item: Object.assign(this.state.item, {
                    value : e.target.value
                    ,showError : false
                }),
                itemType: true
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
    
    requestAsset(e){
        this.setState({
            asset: Object.assign(this.state.asset, {
                value : e.target.value
            })
        })
    }

    //sending request to get assets for the selected asset type
    itemList(){
        if(this.state.item_type.value === "assets"){
        axios({
            method:'get',
            url:`${baseUrl}/employee/ticket/listAssets?assetType=${this.state.item.value}`,
               withCredentials:true
           })
           .then((res) => {
               this.setState({
                   availableAssets: res.data.assetsArr,
                   itemType: false ,
                   assetsInput: true
               })
           })
           .catch(error => {
                if(error.response.status === 401){
                    $('.modal-overlay').remove()
                    $('body').removeAttr( 'style' )
                    this.setState({
                        redirect: true
                    })
                }else{

                    swal('There are no resources available',{
                        buttons: false,
                        timer: 2000,
                    })
                }
            })
        }
        // else{
        //     this.setState({
        //         assetsInput: false
        //     })
        // }
    }

    // requestQuantity(e){
    //     if(this.state.item_type.value === 'consumables'){
    //         this.setState({
    //             quantity: Object.assign(this.state.quantity, {
    //                 value : e.target.value
    //             })
    //         })
    //     }
    // }

    itemTypeDropdown(e){
        if(e.target.value === 'Select'){
            this.setState({
                disableItems : true
            })
        }
        else{
            if(e.target.value === 'assets'){
                this.setState({

                    item_type : Object.assign(this.state.item_type, {
                        value : 'assets'
                        ,showError : false
                    }),

                    quantity : Object.assign(this.state.quantity, {
                        value : 1
                        ,showError : false
                    }),
                    disableItems : false
                })
            }
            else{
                this.setState({
                    item_type : Object.assign(this.state.item_type, {
                        value : 'consumables'
                        ,showError : false
                    }),

                    quantity : Object.assign(this.state.quantity, {
                        value : 1
                        ,showError : false
                    }),
                    disableItems : false
                })
            }
        }
        $('label').addClass('active')
    }

    itemDropdown(){
        var itemArr = []
        itemArr.push(<option key='Select' value='Select'>Select</option>)
        if(this.state.item_type.value === 'assets'){
            for(let index = 0; index <= this.state.assets; index++){
                itemArr.push(<option key={index} value={this.state.availableItems[index]}>{this.state.availableItems[index]}</option>)
            }
        }
        else{
            for(let index = this.state.assets + 1; index < this.state.availableItems.length; index++){
                itemArr.push(<option key={index} value={this.state.availableAssets[index]}>{this.state.availableItems[index]}</option>)
            }
        }
        return itemArr
    }
    assetsDropdown(){
        var assetsList = []
        assetsList.push(<option key='Select' value='Select'>Select</option>)
        for(let index = 0; index <= this.state.availableAssets.length; index++){
            assetsList.push(<option key={index} value={this.state.availableAssets[index]}>{this.state.availableAssets[index]}</option>)
        }
        return assetsList
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
                }),
                assetsInput: false
            })
            if(res.data.message){
                // window.Materialize.toast(res.data.message, 4000)
                $('.modal-close').trigger('click')
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                  })

                  
                //   $('.modal').hide()
                //   $('.modal-overlay').hide()
                this.props.setHandleListRequest()

                  
            }else if(res.data.error === 'ticket can not be created'){
               swal('sorry, request can not be made',{
                buttons: false,
                timer: 2000,
              })
                // window.Materialize.toast('sorry, request can not be made', 4000)

            }
            this.props.setHandleListRequest()
        })
        .catch(error => {
            // window.Materialize.toast('sorry, request can not be made', 4000)
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
        })
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
        if(error.response.status === 401){
            $('.modal-overlay').remove()
            $('body').removeAttr( 'style' )
            this.setState({
                redirect: true
            })
        }else{

            swal('There are no resources available',{
                buttons: false,
                timer: 2000,
            })
        }
    })
   
    $('label').addClass('active')
   }

   componentDidUpdate(){
    $('label').addClass('active')
}

   cancelAll(){
       this.setState({
            quantity:{
                value : ''
                ,error : ''
                ,showError : false
            },
            // assets: '',
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
            assetsInput: false
       })
       $(".modal-overlay").trigger('click');        
    }


   render(){
       return(
           
           <div className="" >
                <h3 className="title">Ticket Request</h3>
                <div className ='RequestForm'>
                <Row>
                    <Input s={12} label='Item Type' type = 'select' value={this.state.item_type.value} onChange={this.itemTypeDropdown} error={this.state.item_type.showError ? this.state.item_type.error : null}>
                        <option value='Select'>Select</option>
                        <option value='assets'>Assets</option>
                        <option value='consumables'>Consumables</option>                        
                    </Input>
                </Row>
                {this.state.itemType ? this.itemList(): null}
                <Row>
                    <Input s={12} label='Items' type='select' value={this.state.disableItems ? 'Select' : this.state.item.value} onChange={this.requestResourceType}  error={this.state.item.showError ? this.state.item.error : null}>
                        {this.itemDropdown()}
                    </Input>
                </Row>
                {this.state.assetsInput ? (
                     <Row>
                     <Input s={12} label='Assets' type='select' value={this.state.disableItems ? 'Select' : this.state.asset.value} onChange={this.requestAsset}  error={this.state.asset.showError ? this.state.asset.error : null}>
                         {this.assetsDropdown()}
                     </Input>
                 </Row>
                 ) : null}
                <Row>
                    <Input  s={12} label="Quantity" type="number" min={0} value = {this.state.quantity.value}  error={this.state.quantity.showError ? this.state.quantity.error : null}/>
                </Row>
                {this.state.requestResource ? this.confirmRequest() : null} 
                </div>
                <div className='splitModalButtons'>
                    <Button className=''waves='light' type = "button" name = "action" onClick={this.checkForValidation} >Request</Button>
                    <Button  onClick={this.cancelAll} className="cancelButton modal-close" >Cancel</Button>
                </div>
                {this.state.redirect? <Redirect
              to={{
                  pathname: "/login",
                  search: '?sessionExpired=true'
              }}/>: null}
            </div>
        )
    }

}


export default Tickets