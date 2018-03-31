import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon} from 'react-materialize'

class AddVendor extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : '',
            address : '',
            addVendorRequest : false
        }
        this.checkForValidation = this.checkForValidation.bind(this)
        this.addVendorIntoDb = this.addVendorIntoDb.bind(this)
        this.setName = this.setName.bind(this)
        this.setAddress = this.setAddress.bind(this)
    }

    checkForValidation(){
        if(!this.state.name || !this.state.address){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            this.setState({
                addVendorRequest : true
            })
        }
    }

    setName(e){
        this.setState({
            name : e.target.value
        })
    }

    setAddress(e){
        this.setState({
            address : e.target.value
        })
    }

    addVendorIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/vendor/create',
            withCredentials : true,
            data : {
                name: this.state.name,
                address : this.state.address
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
                    name: '',
                    address : '',
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


    render(){
        return(
            <div>
                <Row>
                    <Input s={6} label="Name *" value = {this.state.name} onChange = {this.setName} />
                    <Input s={12} label="Address *" value = {this.state.address} onChange = {this.setAddress} />
                </Row>
                    <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
                    {this.state.addVendorRequest ? this.addVendorIntoDb() : null}
            </div>
        )
    }

}

export default AddVendor