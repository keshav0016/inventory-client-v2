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
            redirect: false
        }
        this.checkForValidation = this.checkForValidation.bind(this)
        this.addVendorIntoDb = this.addVendorIntoDb.bind(this)
        this.setName = this.setName.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setContact = this.setContact.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
    }

    checkForValidation(){
        var contactRegex = /^[4-9]\d{9}$/;
        var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/;
        var alphaNum = /^[a-zA-Z0-9]+(\s{1,1}[a-zA-Z0-9]+)*$/;

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
                    error: 'The Vendor name should only be alphabets',
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
        if(this.state.address.value){
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
                    error: 'Contact number should not be empty',
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
        if(this.state.name.value && !this.state.name.showError && this.state.address.value && !this.state.address.showError && this.state.contact.value.length === 10 && contactRegex.test(Number(this.state.contact.value))){
            this.setState({
                addVendorRequest: true
            })
            $('.modal-overlay').trigger('click');
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
                name: this.state.name.value,
                address : this.state.address.value,
                contact : this.state.contact.value
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
                let vendorName = this.state.name.value.charAt(0).toUpperCase() + this.state.name.value.slice(1).toLowerCase()
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
                    addVendorRequest : false

                })
           
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
                $('.modal').hide() 
                $('.modal-overlay').hide()


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
            }
        })
        $(".modal-overlay").trigger('click');        
    }


    render(){
        return(
            <div className="no-footer">
                <h5 className='title'>Add Vendor</h5 >
                <Row>
                    <Input s={12} m={6} l={6} label="Vendor Name" value = {this.state.name.value} onChange = {this.setName} error={this.state.name.showError ? this.state.name.error : null} />
                    <Input s={12} m={6} l={6} className="vendorContact" type="number" label="Contact"  value = {this.state.contact.value} onChange ={this.setContact}  error={this.state.contact.showError ? this.state.contact.error : null} ></Input>
                    <Input s={12} m={6} l={6} label="Address" value = {this.state.address.value} onChange = {this.setAddress} error={this.state.address.showError ? this.state.address.error : null} />

                </Row>
                <div className='splitModalButtons'>
                    <Button style={{bottom: '0%'}} waves='light' onClick = {this.checkForValidation} >Submit</Button>
                    <Button onClick={this.cancelAll} className="modal-close cancelButton">Cancel</Button>
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