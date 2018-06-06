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
        this.cancelAll = this.cancelAll.bind(this)
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

   cancelAll(){
        this.setState({
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
            }
        })
        $(".modal-overlay").trigger('click');        
   }
   

    render() {
        
        return (           
            <div className="no-footer" >           
                <h5 className="title">Update Vendor</h5 >
                <Row>
                    {/* <Input  value={this.state.id.value} onChange={this.handleId}s={12} m={6} l={6} label="Id" error={this.state.id.showError ? this.state.id.error : null} />       */}
                    <Input  value={this.state.name.value} onChange={this.handleName}s={12} m={6} l={6} label="Name" error={this.state.name.showError ? this.state.name.error : null} />
                    <Input  value={this.state.contact.value} onChange={this.handleContact}s={12} m={6} l={6} label="Contact" error={this.state.contact.showError ? this.state.contact.error : null} />    
                    <Input  value={this.state.address.value} onChange={this.handleAddress} s={12} m={6} l={6} label="Address" error={this.state.address.showError ? this.state.address.error : null} />
                </Row>
                <div className='splitModalButtons'>
                    <Button onClick={this.checkForValidation}>Update</Button>
                    <Button  onClick={this.cancelAll} className="cancelButton" >Cancel</Button>
                </div>
                 {this.state.update ? this.handleUpdate() : null}
            </div>
        )
    }


}
export default VendorUpdate