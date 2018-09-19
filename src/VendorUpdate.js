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
            number : {
                value: this.props.user.landline.number,
                error: '',
                showError: false
            },
            std : {
                value: this.props.user.landline.code,
                error: '',
                showError: false
            },
            update: false,
            redirect : false
        }
        this.handleId = this.handleId.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleContact = this.handleContact.bind(this)
        this.handleAddress = this.handleAddress.bind(this) 
        this.handleNumber = this.handleNumber.bind(this)   
        this.handleStd = this.handleStd.bind(this)
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
    handleNumber(e){
        if(e.target.value.length <= 8){
            this.setState({
                number : Object.assign(this.state.number, {
                    value: e.target.value
                })
            })
        }
    }
    handleStd(e){
        if(e.target.value.length <= 5){

            this.setState({
                std : Object.assign(this.state.std, {
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
        // var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/;
        var alphaNum = /^\s{0,}[a-zA-Z0-9]*[a-zA-Z]{1}[a-zA-Z0-9]*(\s{1}[a-zA-Z0-9]+)*\s{0,}$/
        var stdCode = /^0[0-9]\d{3,5}$/
        var number = /^[1-9]\d{7,10}$/
        var landline = /^0[0-9]\d{9,11}$/
        var addressReg = /^\s{0,}[a-zA-Z0-9_@.:,-/#&+"'-*]*[a-zA-Z_@.:,-/#&+"'-*]{1}[a-zA-Z0-9_@.:,-/#&+"'-*]*(\s{1}[a-zA-Z0-9_@.:,-/#&+"'-*]+)*\s{0,}$/
        

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
        if(this.state.address.value && !addressReg.test(this.state.address.value)){
            this.setState({
                address:Object.assign(this.state.address, {
                    error: 'Enter a valid address without special characters',
                    showError: true
                })
            })
        }
        if(this.state.address.value && addressReg.test(this.state.address.value)){
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
                    error: '',
                    showError: false
                })
            })
        }else if(this.state.contact){

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
        }

        //validation for std code
        if(!this.state.std.value && !this.state.number.value){
            this.setState({
                number:Object.assign(this.state.number, {
                    error: '',
                    showError: false
                }),
                std:Object.assign(this.state.std, {
                    error: '',
                    showError: false
                })
            })
            
        }else{
            if(!stdCode.test(this.state.std.value)){
                this.setState({
                    std:Object.assign(this.state.std, {
                        error: 'Enter valid code',
                        showError: true
                    })
                })
            }
            if(stdCode.test(this.state.std.value)){
                this.setState({
                    std:Object.assign(this.state.std, {
                        error: '',
                        showError: false
                    })
                })
            }
            
            //validation for number
            if(!number.test(Number(this.state.number.value))){
                this.setState({
                    name:Object.assign(this.state.name, {
                        error: 'Enter a valid number',
                        showError: false
                    })
                })
            }
    
            if(!landline.test(this.state.std.value+this.state.number.value)){
                this.setState({
                    number:Object.assign(this.state.number, {
                        error: 'number',
                        showError: true
                    }),
                    std:Object.assign(this.state.std, {
                        error: 'Enter valid landline ',
                        showError: true
                    })
                  
                })
            }
            if(landline.test(this.state.std.value+this.state.number.value)){
                this.setState({
                    number:Object.assign(this.state.number, {
                        error: '',
                        showError: false
                    }),
                    std:Object.assign(this.state.std, {
                        error: '',
                        showError: false
                    })
                  
                })
            }
        }
        if(!this.state.name.showError && !this.state.address.showError && !this.state.contact.showError&& !this.state.std.showError && !this.state.number.showError){
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
               landline:{"code":this.state.std.value,"number":this.state.number.value}
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
             
                this.props.setHandleListRequest()
            
        }else{
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
            $('.modal-overlay').remove()
            $('body').removeAttr( 'style' )
               this.setState({
                   redirect: true,
                   update: false
               })
           }else{

               swal('can not edit vendor',{
                   buttons: false,
                   timer: 2000,
                 })
                this.setState({
                   update : false
               })
           }
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
            },
            number : {
                value: '',
                error: '',
                showError: false
            },
            std : {
                value: '',
                error: '',
                showError: false
            },
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
                    <Input  defaultValue={this.state.name.value.trim()} value={this.state.name.value}onChange={this.handleName}s={12} m={6} l={6} label="Name" error={this.state.name.showError ? this.state.name.error : null} />
                    <Input  type="number" value={this.state.contact.value} className="vendorContact" onChange={this.handleContact}s={12} m={6} l={6}  label="Contact"  error={this.state.contact.showError ? this.state.contact.error : null} />    
                    <Input  defaultValue={this.state.address.value.trim()} value={this.state.address.value} onChange={this.handleAddress} s={12} m={6} l={6} label="Address" error={this.state.address.showError ? this.state.address.error : null} />
                    <Input s={2} m={2} l={2} className="vendorContact" 
                        type="number" label="STD code"  value = {this.state.std.value} 
                        onChange ={this.handleStd}  
                        error={this.state.std.showError ? this.state.std.error : null}
                       >
                    </Input>
                    <Input s={2} m={2} l={2} className="vendorContact" 
                        type="number" label="number"  value = {this.state.number.value} 
                        onChange ={this.handleNumber}  
                        error={this.state.number.showError ? this.state.number.error : null}
                       >
                    </Input>
                
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