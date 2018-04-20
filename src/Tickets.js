import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import './Employee.css'
import './adminDash.css'
import $ from 'jquery'
import { baseUrl } from './config';
//CHANGE THE USER ID IN CLIENT AS WELL AS SERVER

class Tickets extends Component{
    constructor(props){
        super(props)
        this.state = {
            availableItems: [],
            user_id: this.props.user_id,
            requestResource: false,
            quantity:'',
            assets: '',
            item_type: 'Select',
            item:'Select',
            disableItems : true
        }
        this.requestQuantity = this.requestQuantity.bind(this)
        this.requestResourceType = this.requestResourceType.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.confirmRequest = this.confirmRequest.bind(this)
        this.requestUser = this.requestUser.bind(this)
        this.itemTypeDropdown = this.itemTypeDropdown.bind(this)
    }
    requestResourceType(e){
        if(e.target.value <= this.state.assets){
            this.setState({
                item:this.state.availableItems[e.target.value]
            })
            $('label').addClass('active')
        }
        else{
            this.setState({
                item:this.state.availableItems[e.target.value]
            })
            $('label').addClass('active')
        }
    }

    requestQuantity(e){
        if(this.state.item_type === 'consumables'){
            this.setState({
                quantity:e.target.value
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
                    quantity : 1,
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
                itemArr.push(<option key={index} value={index}>{this.state.availableItems[index]}</option>)
            }
        }
        else{
            for(let index = this.state.assets + 1; index < this.state.availableItems.length; index++){
                itemArr.push(<option key={index} value={index}>{this.state.availableItems[index]}</option>)
            }
        }
        return itemArr
    }

    checkForValidation(){
        if(Number(this.state.quantity) < 0){
            window.Materialize.toast(`requested quantity cannot be negative`, 4000)
        }
        else{
            if(Number(this.state.quantity) === 0){
                window.Materialize.toast(`requested quantity cannot be zero`, 4000)
            }
            else{
                if(this.state.item === 'Select'){
                    window.Materialize.toast(`Please select any item`, 4000)
                }
                else{
                    this.setState({
                        requestResource : true 
                    })
                }
            }
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
                item:this.state.item,
                item_type:this.state.item_type,
                quantity:this.state.quantity,
            },
            withCredentials:true
        })
        .then(res => {
            this.setState({
                requestResource:false,
                quantity:'',
                item_type: 'Select',
                disableItems : true
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

   render(){
        return(
            <div >
                <h3 className='heading'>Ticket Request Form</h3>
                <div className ='RequestForm'>
                <Row>
                    <Input s={6} label='Item Type' type = 'select' value={this.state.item_type} onChange={this.itemTypeDropdown}>
                        <option value='Select'>Select</option>
                        <option value='assets'>Assets</option>
                        <option value='consumables'>Consumables</option>                        
                    </Input>
                </Row>
                <Row>
                    <Input s={6} label='Items'type='select' onChange={this.requestResourceType} disabled={this.state.disableItems}>
                        {this.itemDropdown()}
                    </Input>
                </Row>
                <Row>
                    <Input  s={6} label="Quantity" type="number" min={0} value = {this.state.quantity} onChange = {this.requestQuantity} disabled={this.state.disableItems}/>
                </Row>
                <Button className='requestbtn'waves='light' type = "submit" name = "action" onClick={this.checkForValidation} disabled={this.state.disableItems}>Request</Button>
                {this.state.requestResource ? this.confirmRequest() : null} 
                </div>
                   
            </div>
        )
    }

}


export default Tickets