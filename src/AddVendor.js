import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
// import $ from 'jquery'
import { baseUrl } from './config';
import $ from 'jquery'
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  
class AddVendor extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : {
                value: '',
                error: '',
                showError: false
            },
            address : {
                value: '',
                error: '',
                showError: false
            },
            addVendorRequest : false,
            contact : {
                value: '',
                error: '',
                showError: false
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
            redirect: false
        }
        this.checkForValidation = this.checkForValidation.bind(this)
        this.addVendorIntoDb = this.addVendorIntoDb.bind(this)
        this.setName = this.setName.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setContact = this.setContact.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
        this.setNumber = this.setNumber.bind(this)
        this.setStd = this.setStd.bind(this)
    }
    componentDidMount(){
        $(document).ready(function(){
          $('label').addClass('active');
      }) 
      }
    
      componentDidUpdate(){
        $(document).ready(function(){
          $('label').addClass('active');
      }) 
    }

    checkForValidation(){
        var contactRegex = /^[6-9]\d{9}$/;
        var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/;
        var alphaNum = /^\s{0,}[a-zA-Z0-9]*[a-zA-Z]{1}[a-zA-Z0-9]*(\s{1}[a-zA-Z0-9]+)*\s{0,}$/
        var space = /^\s{1,}$/
        var preceeding = /^\s{1,}[a-zA-Z0-9]+(\s{1,1}[a-zA-Z0-9]+)*$/
        var trailing = /^[a-zA-Z0-9]+(\s{1,1}[a-zA-Z0-9]+)*\s{1,}$/
        var precandtrail = /^\s{1,}[a-zA-Z0-9]+(\s{1,1}[a-zA-Z0-9]+)*\s{1,}$/
        var stdCode = /^[0][0-9]\d$/
        var number = /^[1-9]\d{7,10}$/
        var landline = /^0[0-9]\d{9,11}$/

        // if(!alphaNum.test(this.state.name.value)){
        //     this.setState({
        //         name:Object.assign(this.state.name, {
        //             error: 'The Vendor name should be alphanumeric',
        //             showError: true
        //         })
        //     })
        // }
        // if(precandtrail.test(this.state.name.value)){
        //     this.setState({
        //         name:Object.assign(this.state.name, {
        //             error: 'The Vendor name should not contain preceeding or trailing spaces',
        //             showError: true
        //         })
        //     })
        // }
        // if(preceeding.test(this.state.name.value)){
        //     this.setState({
        //         name:Object.assign(this.state.name, {
        //             error: 'The Vendor name should not contain preceeding spaces',
        //             showError: true
        //         })
        //     })
        // }
        // if(trailing.test(this.state.name.value)){
        //     this.setState({
        //         name:Object.assign(this.state.name, {
        //             error: 'The Vendor name should not contain trailing spaces',
        //             showError: true
        //         })
        //     })
        // }
        if(!this.state.name.value){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: 'The Vendor name is required',
                    showError: true
                })
            })
        }
        if(space.test(this.state.name.value)){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: 'The Vendor name should not be spaces',
                    showError: true
                })
            })
        }
        //use if needed !preceeding.test(this.state.name.value) && !space.test(this.state.name.value) && !trailing.test(this.state.name.value) && !precandtrail.test(this.state.name.value) &&
        if(!alphaNum.test(this.state.name.value)){
            this.setState({
                name:Object.assign(this.state.name, {
                    error: 'The Vendor name should be alphanumeric',
                    showError: true
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
        if(alphaNum.test(this.state.name.value) && !space.test(this.state.name.value)){
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
        if(!contactRegex.test(Number(this.state.contact.value))){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: 'Enter a valid 10 digit contact number',
                    showError: true
                })
            })
        }
        if(!this.state.contact.value){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: 'Mobile number should not be empty',
                    showError: true
                })
            })
        }
        // if(this.state.contact.value.length < 10 && this.state.contact.value.length > 0 ){
        //     this.setState({
        //         contact:Object.assign(this.state.contact, {
        //             error: 'Contact number less than 10 digits',
        //             showError: true
        //         })
        //     })
        // }
        // if(this.state.contact.value.length > 10){
        //     this.setState({
        //         contact:Object.assign(this.state.contact, {
        //             error: 'Contact number greater than 10 digits',
        //             showError: true
        //         })
        //     })
        // }
        if(this.state.contact.value && this.state.contact.value.length === 10 && contactRegex.test(Number(this.state.contact.value))){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: '',
                    showError: false
                })
            })
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
        // if(!Number(this.state.std.value.length) >= 3){
        //     this.setState({
        //         std:Object.assign(this.state.std, {
        //             error: 'Enter valid code',
        //             showError: true
        //         })
        //     })
        // }
        if(!stdCode.test(this.state.std.value)){
            this.setState({
                std:Object.assign(this.state.std, {
                    error: 'Enter valid code',
                    showError: true
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
    }
        if(this.state.name.value && !this.state.name.showError && this.state.address.value && !this.state.address.showError && this.state.contact.value.length === 10 && contactRegex.test(Number(this.state.contact.value)) && !this.state.std.showError && !this.state.number.showError){
            this.setState({
                addVendorRequest: true
            })
            // $('.modal-overlay').trigger('click');
        }
    }

    setName(e){
        this.setState({
            name : Object.assign(this.state.name, {
                value: e.target.value
            })
        })
    }
    setContact(e){
        if(e.target.value.length <= 10){
            this.setState({
                contact : Object.assign(this.state.contact, {
                    value: e.target.value
                })
            })
        }
    }
    setNumber(e){
        if(e.target.value.length <= 8){
            this.setState({
                number : Object.assign(this.state.number, {
                    value: e.target.value
                })
            })
        }
    }
    setStd(e){
        if(e.target.value.length <= 5){

            this.setState({
                std : Object.assign(this.state.std, {
                    value: e.target.value
                })
            })
        }
    }
    setAddress(e){
        this.setState({
            address : Object.assign(this.state.address, {
                value: e.target.value
            })
        })
    }

    addVendorIntoDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/vendor/create`,
            withCredentials : true,
            data : {
                name: this.state.name.value.trim(),
                address : this.state.address.value.trim(),
                contact : this.state.contact.value,
                landline: {"code":this.state.std.value,"number":this.state.number.value}
            }
        })
        .then(res => {
            if(res.data.error){
                if(res.data.error === 'Validation isNumeric failed'){
                    this.setState({
                        contact:Object.assign(this.state.contact, {
                            showError: true,
                            error: 'The contact should be numbers.'
                        })
                    })
                }
                this.setState({
                    addVendorRequest : false
                })  
                            
            }
            else{
                let vendorName = this.state.name.value.trim()
                vendorName = vendorName.charAt(0).toUpperCase() + vendorName.slice(1).toLowerCase()
                this.setState({
                    name: {
                        value: '',
                        error: '',
                        showError: false
                    },
                    address : {
                        value: '',
                        error: '',
                        showError: false
                    },
                    contact : {
                        value: '',
                        error: '',
                        showError: false
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
                    addVendorRequest : false

                })
           
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
                $('.vendorclosebutton').trigger('click')

                if(this.props.setVendorListRequest){
                    this.props.setVendorListRequest(vendorName)
                }                
                else{
                    this.props.setHandleListRequest(true)
                }
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
            console.error(error)
        })
    }

    // componentDidMount(){
    //     $('#addVendor').click(this.checkForValidation)
    // }

    cancelAll(){
        this.setState({
            name : {
                value: '',
                error: '',
                showError: false
            },
            address : {
                value: '',
                error: '',
                showError: false
            },
            contact : {
                value: '',
                error: '',
                showError: false
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
        $(".modal-overlay").trigger('click');        
    }


    render(){
        const code = (
        <Input s={2} m={2} l={2}
        value={this.state.number.value}
        onChange={this.handleNumber}
        error={this.state.number.showError ? this.state.number.error : null} 
        />
        )
        return(
            <div className="no-footer">
                <h5 className='title'>Add Vendor</h5 >
                <Row>
                    <Input s={12} m={6} l={6} label="Vendor Name" defaultValue = {this.state.name.value.trim()} onChange = {this.setName} error={this.state.name.showError ? this.state.name.error : null} />
                    <Input s={12} m={6} l={6} label="Address" defaultValue = {this.state.address.value.trim()} onChange = {this.setAddress} error={this.state.address.showError ? this.state.address.error : null} />
                    <Input s={12} m={6} l={6} className="vendorContact" 
                        type="number" label="Mobile No"  value = {this.state.contact.value} 
                        onChange ={this.setContact}  
                        error={this.state.contact.showError ? this.state.contact.error : null} >
                    </Input>
                    <Input s={2} m={2} l={2} className="vendorContact" 
                        type="number" label="STD code"  value = {this.state.std.value} 
                        onChange ={this.setStd}  
                        error={this.state.std.showError ? this.state.std.error : null}
                       >
                    </Input>
                    <Input s={2} m={2} l={2} className="vendorContact" 
                        type="number" label="number"  value = {this.state.number.value} 
                        onChange ={this.setNumber}  
                        error={this.state.number.showError ? this.state.number.error : null}
                       >
                    </Input>
                  

                </Row>
                <div className='splitModalButtons'>
                    <Button style={{bottom: '0%'}} waves='light' onClick = {this.checkForValidation} >Submit</Button>
                    <Button onClick={this.cancelAll} className="modal-close vendorclosebutton cancelButton">Cancel</Button>
                </div>
                    {/* {$('#addVendor').click(this.checkForValidation)} */}
                    {this.state.addVendorRequest ? this.addVendorIntoDb() : null}
                    {this.state.redirect ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />: null}
            </div>
        )
    }

}

export default AddVendor