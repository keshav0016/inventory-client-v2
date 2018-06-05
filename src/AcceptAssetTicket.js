import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Preloader} from 'react-materialize'
import {Redirect} from 'react-router-dom'
import './Employee.css'
import { baseUrl } from './config';


class AcceptAssetTicket extends Component{
    constructor(props){
        super(props)
        this.state = {
            availableAssetsList : []
            ,currentAssetSelected : {
                value : {}
                ,error : ''
                ,showError : false
            }
            // ,currentAssetSelectedError : false
            ,reason : ''
            ,expected_recovery : {
                value: '',
                error: '',
                showError: false
            }
            ,unAuth : false
            ,loading : true
            ,redirect : false
            ,acceptTicketRequest : false
        }
        this.setCurrentAssetSelected = this.setCurrentAssetSelected.bind(this) 
        this.handleExpected = this.handleExpected.bind(this)
        this.setReason = this.setReason.bind(this)
        this.acceptTicket = this.acceptTicket.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }

    checkForValidation(){
        if(!this.state.expected_recovery.value){
            this.setState({
                expected_recovery : Object.assign(this.state.expected_recovery, {
                    showError : true,
                    error : 'Expected Recovery date is Required'
                })
            })
        }
        else{
            this.setState({
                expected_recovery : Object.assign(this.state.expected_recovery, {
                    showError : false,
                    error : ''
                })
            })
        }

        if(!this.state.currentAssetSelected.value.serial_number){
            // window.Materialize.toast('Select any asset ID if available', 4000)
            this.setState({
                currentAssetSelected : Object.assign(this.state.currentAssetSelected, {
                    error : 'Select any asset ID if available'
                    ,showError : true
                })
            })
        }
        else{
            this.setState({
                currentAssetSelected : Object.assign(this.state.currentAssetSelected, {
                    error : ''
                    ,showError : false
                })
            })
        }

        if(!this.state.expected_recovery.showError && !this.state.currentAssetSelected.showError){
            this.setState({
                acceptTicketRequest : true
            })
        }
    }

    fetchAvailableAssets(){
        axios({
            method : 'get'
            ,url : `${baseUrl}/admin/ticket/available?ticket=${this.props.match.params.ticket}`
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.error === 'Ticket is not in Pending state'){
                this.setState({
                    unAuth : true
                    ,loading : false
                })
            }
            else{
                this.setState({
                    availableAssetsList : res.data.assets
                    ,loading : false
                })
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidMount(){
        this.fetchAvailableAssets()
    }

    availableAssetsDropdown(){
        var availableAssetsArr = []
        availableAssetsArr.push(<option key='Select' value='Select'>Select</option>)
        this.state.availableAssetsList.forEach(asset => {
            availableAssetsArr.push(<option key={asset.asset_id} value={asset.asset_id}>{asset.asset_id}</option>)
        });
        return availableAssetsArr
    }


    setCurrentAssetSelected(e){
        this.state.availableAssetsList.forEach(asset => {
            if(asset.asset_id === Number(e.target.value)){
                this.setState({
                    currentAssetSelected : Object.assign(this.state.currentAssetSelected, {
                        value : asset
                    })
                    // ,currentAssetSelectedError : false
                })
            }
        })
    }

    acceptTicket(){
        axios({
            method:'post',
            url:`${baseUrl}/admin/ticket/accept`,
            data:{
                ticket_number:this.props.match.params.ticket,
                expected_recovery : this.state.expected_recovery.value
                ,reason : this.state.reason
                ,requested_asset_id : this.state.currentAssetSelected.value.asset_id
            },
            withCredentials:true
        })
        .then(res =>{
            this.setState({
                handleListRequest:true
                ,reason : ''
                ,acceptTicketRequest : false
            })
            if(res.data.message === 'Requested Quantity greater than available'){
                window.Materialize.toast('Requested Quantity greater than available', 4000)
            }
            else{
                window.Materialize.toast('Ticket Accepted', 4000)
                this.setState({
                    redirect : true
                })
            }
            console.log('success')
        })
        .catch(error =>{
            console.log('error')
        })
    }

    handleExpected(e){
        this.setState({
            expected_recovery : Object.assign(this.state.expected_recovery, {
                value: e.target.value
            })
        })
    }

    setReason(e){
        this.setState({
            reason : e.target.value
        })
    }

    render(){
        return(
            <div className="listComponent" >
            <Row>
                <h3 className='title'>Accept Asset</h3>
                {this.state.loading ? <Preloader size='small'/> :
                (this.state.unAuth ? <div><h5 style={{color : 'red'}}>Ticket has either been Accepted/Rejected or does not exist</h5></div> :
                <React.Fragment>
                    <Row>
                        <Row>
                            <Input s={12} m={12} l={12} name='on' type='date' label="Expected Recovery*" onChange={this.handleExpected} error={this.state.expected_recovery.showError ? this.state.expected_recovery.error : null}/>
                        </Row>
                        <Row>
                            <Input s={12} m={12} l={12} onChange = {this.setReason} label="Remarks" value={this.state.reason} />
                        </Row>
                        <Row>
                            <Input s={12} m={12} l={12} label = "Asset Id*" type = 'select' onChange = {this.setCurrentAssetSelected} value={this.state.currentAssetSelected.asset_id} error={this.state.currentAssetSelected.showError ? this.state.currentAssetSelected.error : null}>{this.availableAssetsDropdown()}</Input>
                        </Row>
                    </Row>
                    <br />
                    <Row>
                        {this.state.currentAssetSelected.serial_number ? 
                        <div>
                            <h5>Asset name : {this.state.currentAssetSelected.asset_name}</h5>
                            <h5>Serial Number : {this.state.currentAssetSelected.serial_number}</h5>
                            <h5>Description : {this.state.currentAssetSelected.description}</h5>
                            <h5>Invoice number : {this.state.currentAssetSelected.invoice_number}</h5>
                            <h5>Vendor : {this.state.currentAssetSelected.vendor}</h5>
                        </div> : (this.state.availableAssetsList.length === 0 ? <h4>No available Asset for this Type</h4> : null)}
                    </Row>
                    <div className='splitModalButtons'>
                        <Button onClick={this.checkForValidation}>Submit</Button>
                    </div>
                </React.Fragment>)}
                {this.state.redirect ? <Redirect push to="/admin/tickets"/> : null}
                {this.state.acceptTicketRequest ? this.acceptTicket() : null}
            </Row>
            </div>
        )
    }
}

export default AcceptAssetTicket