import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
// import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  const $ = window.jQuery;

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
            update: false,
            redirect : false
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
    
        if(e.target.value.length <= 10){

            this.setState({
                contact : Object.assign(this.state.contact, {
                    value: e.target.value
                })
            })
        }
        
       
    }
    handleAddress(e){
        this.setState({
        address: Object.assign(this.state.address, {
            value: e.target.value
            }) 
        })
    }

    checkForValidation(){
        var contactRegex = /^[4-9]\d{9}$/;
        var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/;
        var alphaNum = /^\s{0,}[a-zA-Z0-9]*[a-zA-Z]{1}[a-zA-Z0-9]*(\s{1}[a-zA-Z0-9]+)*\s{0,}$/

    
        if(!this.state.name.value){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: 'The Vendor name is required',
                    showError: true
                })
            })
        }  
        if(this.state.name.value && !alphaNum.test(this.state.name.value)){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: 'Enter a valid Name without special characters',
                    showError: true
                })
            })
        }
        if(alphaNum.test(this.state.name.value)){
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
        if(this.state.address.value && !alphaNum.test(this.state.address.value)){
            this.setState({
                address:Object.assign(this.state.address, {
                    error: 'Enter a valid address without special characters',
                    showError: true
                })
            })
        }
        if(this.state.address.value && alphaNum.test(this.state.address.value)){
            this.setState({
                address:Object.assign(this.state.address, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.contact.value){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: 'Contact number should not be empty',
                    showError: true
                })
            })
        }
        if(this.state.contact.value && !contactRegex.test(Number(this.state.contact.value))){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: 'Enter a valid 10 digit contact number',
                    showError: true
                })
            })
        }
        if(this.state.contact.value && this.state.contact.value.length === 10 && contactRegex.test(Number(this.state.contact.value))){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: '',
                    showError: false
                })
            })
        }
        if(!this.state.name.showError && !this.state.address.showError && this.state.contact.value.length === 10 && contactRegex.test(Number(this.state.contact.value))){
            this.setState({
                update: true
            })
        }
    }
    
    componentDidMount(){
        $('label').addClass('active')
    }

    componentDidUpdate(){
        $('label').addClass('active')
    }

   handleUpdate(){
       axios({
           method: 'post',
           url: `${baseUrl}/vendor/update`,
           data:{
               id: this.state.id.value,
               name: this.state.name.value.trim(),
               contact:this.state.contact.value,
                address:this.state.address.value.trim(),
           },
           withCredentials: true
       })
       .then((res) => {
        if(res.data.message === 'vendor has been updated'){
            this.setState({
                update : false
              })
            $('.modal-close').trigger('click')
            swal('Vendor details has been updated',{
                buttons: false,
                timer: 2000,
              })
            //   $('.modal-overlay').trigger('click') 
            //   $('.modal').hide()
            //   $('.modal-overlay').remove()

            //   setTimeout((function() {
            //     window.location.reload();
            // }), 2100);
             
                this.props.setHandleListRequest()
            
        }else{
            // window.Materialize.toast(res.data.error, 4000)
            swal(res.data.error,{
                buttons: false,
                timer: 2000,
              })
            this.setState({
                update : false
            })
        }
          
       })
       .catch(error => {
           if(error.response.status === 401){
               this.setState({
                   redirect: true
               })
           }
        //  window.Materialize.toast('can not edit vendor', 4000)
        swal('can not edit vendor',{
            buttons: false,
            timer: 2000,
          })
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
        // setTimeout((function() {
        //     window.location.reload();
        //   }), 2100);
        $(".modal-overlay").trigger('click');        
   }
   

    render() {
        
        return (           
            <div className="no-footer" >           
                <h5 className="title">Update Vendor</h5 >
                <Row>
                    {/* <Input  value={this.state.id.value} onChange={this.handleId}s={12} m={6} l={6} label="Id" error={this.state.id.showError ? this.state.id.error : null} />       */}
                    <Input  defaultValue={this.state.name.value.trim()} onChange={this.handleName}s={12} m={6} l={6} label="Name" error={this.state.name.showError ? this.state.name.error : null} />
                    <Input  type="number" value={this.state.contact.value} className="vendorContact" onChange={this.handleContact}s={12} m={6} l={6}  label="Contact"  error={this.state.contact.showError ? this.state.contact.error : null} />    
                    <Input  defaultValue={this.state.address.value.trim()} onChange={this.handleAddress} s={12} m={6} l={6} label="Address" error={this.state.address.showError ? this.state.address.error : null} />
                </Row>
                <div className='splitModalButtons'>
                    <Button onClick={this.checkForValidation}>Update</Button>
                    <Button  onClick={this.cancelAll} className="cancelButton modal-close" >Cancel</Button>
                </div>
                 {this.state.update ? this.handleUpdate() : null}
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
export default VendorUpdate