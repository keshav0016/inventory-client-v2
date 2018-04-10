import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge} from 'react-materialize'
import './Employee.css'
import './adminDash.css'
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
            item_type: '',
            item:'',
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
        if(this.state.quantity <= 0){
            window.Materialize.toast(`requested quantity cannot be negative`, 4000)
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


    //user_id,first_name and last_name will be taken from the req.currentUser
    confirmRequest(){
        axios({
            method:'post',
            url:'http://localhost:3001/employee/ticket/create',
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
                assets: '',
                item_type: '',
                item:'',

            })
            if(res.data.message === 'ticket created'){
                window.Materialize.toast('Success', 4000)
            }else if(res.data.error === 'ticket can not br created'){
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
           url:'http://localhost:3001/employee/ticket/listItems',
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
   }

   render(){
        return(
            <div >
                <h3 className='heading'>Ticket RequestForm</h3>
                <div className ='RequestForm'>
                <Row>
                    <Input s={6} type='select' onChange={this.requestResourceType}>
                        {this.state.availableItems.map((element,index)=>{
                            return( 
                                <option key={index} value={index}>{element}</option>
                            )
                        })}
                    </Input>
                </Row>
                <Row>
                    <Input  s={6} label="Quantity" type="number" min={0} value = {this.state.quantity} onChange = {this.requestQuantity}/>
                </Row>
                    <Badge>Resource Type : {this.state.item_type}</Badge>
                <Button waves='light' type = "submit" name = "action" onClick={this.checkForValidation}>Request Resource</Button>
                {this.state.requestResource ? this.confirmRequest() : null} 
                </div>
                   
            </div>
        )
    }

}


export default Tickets