import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'

class VendorUpdate extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : this.props.user.id,
            name: this.props.user.name,
            contact: this.props.user.contact,
            address: this.props.user.address,
        }
        this.handleId = this.handleId.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleContact = this.handleContact.bind(this)
        this.handleAddress = this.handleAddress.bind(this)    
    }
    handleId(e){
        this.setHandleListRequest({
            id : e.target.value
        })
    }
    handleName(e){
        this.setState({
            name: e.target.value
        })
    }
    handleContact(e){
        this.setState({
        contact: e.target.value
            
        })
    }
    handleAddress(e){
        this.setState({
        address: e.target.value
            
        })
    }
    
    componentDidMount(){
        $('label').addClass('active')
    }
   handleUpdate(){
       axios({
           method: 'post',
           url: 'http://localhost:3001/vendor/update',
           data:{
               id: this.state.id,
               name: this.state.name,
               contact:this.state.contact,
                address:this.state.address,
           },
           withCredentials: true
       })
       .then((res) => {
        if(res.data.message === 'vendor has been updated'){
            window.Materialize.toast('Vendor has been Edited', 4000)
           this.props.setHandleListRequest()
            
        }else{
            window.Materialize.toast(res.data.error, 4000)

        }
          
       })
       .catch(error => {
         window.Materialize.toast('can not edit vendor', 4000)

       })
   }
    render() {
        
        return (           
            <div>           
                <Row>
                    <Input  defaultValue={this.state.id} onChange={this.handleId}s={6} label="Id" />      
                    <Input  defaultValue={this.state.name} onChange={this.handleName}s={6} label="Name" />
                    <Input  defaultValue={this.state.contact} onChange={this.handleContact}s={6} label="Contact" />    
                    <Input  defaultValue={this.state.address}onChange={this.handleAddress} s={6}label="Address" />
                </Row>
                 <Button onClick={this.handleUpdate}>Edit</Button>
            </div>
        )
    }


}
export default VendorUpdate