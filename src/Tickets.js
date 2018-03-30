import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge} from 'react-materialize'

//CHANGE THE USER ID IN CLIENT AS WELL AS SERVER

class Tickets extends Component{
    constructor(props){
        super(props)
        this.state = {
            quantity:0,
            availableItems: [],
            assets: '',
            item_type: '',
            user_id: '',
            requestResource: false,
            item:''
        }
        this.requestQuantity = this.requestQuantity.bind(this)
        this.requestResourceType = this.requestResourceType.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.confirmRequest = this.confirmRequest.bind(this)
        this.requestUser = this.requestUser.bind(this)
    }

    requestResourceType(e){
        if(e.target.value <= this.state.assets){
            this.setState({
                item_type:'assets',
                quantity:1,
                item:this.state.availableItems[e.target.value]
            })
        }
        else{
            this.setState({
                item_type:'consumables',
                item:this.state.availableItems[e.target.value]
            })
        }
    }

    requestQuantity(e){
        if(this.state.item_type === 'consumables'){
            this.setState({
                quantity:e.target.value
            })
        }
    }

    checkForValidation(){
        if(this.state.quantity <= 0 || !this.state.user_id){
            window.Materialize.toast('The resource cannot be requested, Check your Employee Id or the quantity cannot be negative', 4000)
        }
        else{
            this.setState({
                requestResource : true 
            })
        }
    }

    requestUser(e){
        this.setState({
            user_id : e.target.value
        })
    }

    confirmRequest(){
        axios({
            method:'post',
            url:'http://localhost:3001/user/ticket/create',
            data:{
                user_id:this.state.user_id,
                date:Date.now(),
                item:this.state.item,
                item_type:this.state.item_type,
                quantity:this.state.quantity,
            }
        })
        .then(res => {
            this.setState({
                requestResource:false
            })
            window.Materialize.toast('Success', 4000)
        })
        .catch(error => {
            console.log('Error')
        })
    }

   componentDidMount(){
       axios({
           method:'get',
           url:'http://localhost:3001/user/ticket/listitems',
           withCredentials:true
       })
       .then(resources => {
           this.setState({
               availableItems: resources.data.items,
               assets: resources.data.assetLimit
           })
       })
       .catch(error => {
           alert('No Available Resources')
       })
   }

   render(){
        return(
            <div>
                <Row>
                <Input s={2} label="Employee Id" type="number" value = {this.state.user_id} onChange = {this.requestUser}/>
                    <Input s={3} type='select' onChange={this.requestResourceType}>
                        {this.state.availableItems.map((element,index)=>{
                            return( 
                                <option key={index} value={index}>{element}</option>
                            )
                        })}
                    </Input>
                </Row>
                <Row>
                    <Input  s={2} label="Quantity" type="number" min={0} value = {this.state.quantity} onChange = {this.requestQuantity}/>
                </Row>
                    <Badge>Resource Type : {this.state.item_type}</Badge>
                    <Button waves='light' type = "submit" name = "action" onClick={this.checkForValidation}>Request Resource</Button>
                    {this.state.requestResource ? this.confirmRequest() : null}
            </div>
        )
    }

}


export default Tickets