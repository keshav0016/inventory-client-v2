import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class VendorUpdate extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : {
                value:this.props.user.id,
                error:'',
                showError:false
            },
            name: {
                value:this.props.user.name,
                error:'',
                showError:false
            },
            contact: {
                value:this.props.user.contact,
                error:'',
                showError:false
            },
            address: {
                value:this.props.user.address,
                error:'',
                showError:false
            },
            update: false
        }
        this.handleId = this.handleId.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleContact = this.handleContact.bind(this)
        this.handleAddress = this.handleAddress.bind(this)    
        this.checkForValidation = this.checkForValidation.bind(this)
    }
    handleId(e){
        this.setState({
            id : Object.assign(this.state.id, {
                value: e.target.value
            })
        })
    }
    handleName(e){
        this.setState({
            name: Object.assign(this.state.name, {
                value: e.target.value
            })
        })
    }
    handleContact(e){
        this.setState({
        contact: Object.assign(this.state.contact, {
            value: e.target.value
            })  
        })
    }
    handleAddress(e){
        this.setState({
        address: Object.assign(this.state.address, {
            value: e.target.value
            }) 
        })
    }

    checkForValidation(){
        if(!this.state.id.value){
            this.setState({
                id:Object.assign(this.state.id, {
                    error: 'The vendor id is required',
                    showError: true
                })
            })
        }
        if(this.state.id.value){
            this.setState({
                id:Object.assign(this.state.id, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.name.value){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: 'The Vendor name is required',
                    showError: true
                })
            })
        }
        if(this.state.name.value){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.address.value){
            this.setState({
                address:Object.assign(this.state.address, {
                    error: 'The vendor address is required',
                    showError: true
                })
            })
        }
        if(this.state.address.value){
            this.setState({
                address:Object.assign(this.state.address, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.contact.value.length !== 10){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: 'Enter a Phone number',
                    showError: true
                })
            })
        }
        if(this.state.contact.value.length === 10){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.id.value && this.state.name.value && this.state.address.value && this.state.contact.value.length === 10){
            this.setState({
                update: true
            })
        }
    }
    
    componentDidMount(){
        $('label').addClass('active')
    }
   handleUpdate(){
       axios({
           method: 'post',
           url: `${baseUrl}/vendor/update`,
           data:{
               id: this.state.id.value,
               name: this.state.name.value,
               contact:this.state.contact.value,
                address:this.state.address.value,
           },
           withCredentials: true
       })
       .then((res) => {
        if(res.data.message === 'vendor has been updated'){
            window.Materialize.toast('Vendor has been Edited', 4000)
            this.setState({
                update : false
            })
            this.props.setHandleListRequest()
            
        }else{
            window.Materialize.toast(res.data.error, 4000)
            this.setState({
                update : false
            })
        }
          
       })
       .catch(error => {
         window.Materialize.toast('can not edit vendor', 4000)
         this.setState({
            update : false
        })
       })
   }
    render() {
        
        return (           
            <div>           
                <Row>
                    <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Update Vendor</h3 >
                    <Input  value={this.state.id.value} onChange={this.handleId}s={6} label=" " placeholder="Id" error={this.state.id.showError ? this.state.id.error : null} />      
                    <Input  value={this.state.name.value} onChange={this.handleName}s={6} label=" " placeholder="Name" error={this.state.name.showError ? this.state.name.error : null} />
                    <Input  value={this.state.contact.value} onChange={this.handleContact}s={6} label=" " placeholder="Contact" error={this.state.contact.showError ? this.state.contact.error : null} />    
                    <Input  value={this.state.address.value} onChange={this.handleAddress} s={6} label=" " placeholder="Address" error={this.state.address.showError ? this.state.address.error : null} />
                </Row>
                 <Button onClick={this.checkForValidation}>Edit</Button>
                 {this.state.update ? this.handleUpdate() : null}
            </div>
        )
    }


}
export default VendorUpdate