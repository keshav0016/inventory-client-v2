import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon} from 'react-materialize'
// import $ from 'jquery'


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
            }
        }
        this.checkForValidation = this.checkForValidation.bind(this)
        this.addVendorIntoDb = this.addVendorIntoDb.bind(this)
        this.setName = this.setName.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setContact = this.setContact.bind(this)
    }

    checkForValidation(){
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
        if(this.state.contact.value && this.state.contact.value.length === 10){
            this.setState({
                contact:Object.assign(this.state.contact, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.name.value && this.state.address.value && this.state.contact.value.length === 10){
            this.setState({
                addVendorRequest: true
            })
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
        this.setState({
            contact : Object.assign(this.state.contact, {
                value: e.target.value
            })
        })
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
            url : 'http://localhost:3001/vendor/create',
            withCredentials : true,
            data : {
                name: this.state.name.value,
                address : this.state.address.value,
                contact : this.state.contact.value
            }
        })
        .then(res => {
            if(res.data.error){
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    addVendorRequest : false
                })                
            }
            else{
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
                window.Materialize.toast('Vendor Added', 4000)
                if(this.props.setVendorListRequest){
                    this.props.setVendorListRequest()
                }                
                else{
                    this.props.setHandleListRequest(true)
                }
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    // componentDidMount(){
    //     $('#addVendor').click(this.checkForValidation)
    // }

    render(){
        return(
            <div>
                <Row>
                    <Input s={6} label="Name *" value = {this.state.name.value} onChange = {this.setName} error={this.state.name.showError ? this.state.name.error : null} />
                    <Input s={6} label="Contact "value = {this.state.contact.value} onChange ={this.setContact} error={this.state.contact.showError ? this.state.contact.error : null} ><Icon>phone</Icon></Input>

                    <Input s={12} label="Address *" value = {this.state.address.value} onChange = {this.setAddress} error={this.state.address.showError ? this.state.address.error : null} />

                </Row>
                    <Button style={{bottom: '0%'}} waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
                    {/* {$('#addVendor').click(this.checkForValidation)} */}
                    {this.state.addVendorRequest ? this.addVendorIntoDb() : null}
            </div>
        )
    }

}

export default AddVendor