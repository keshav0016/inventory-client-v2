import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Row, Input, Button, Badge, Icon} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class ReceiveAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            to : {
                value: '',
                error: '',
                showError: false
            },
            repair_invoice : {
                value: '',
                error: '',
                showError: false
            },
            amount : {
                value: 0,
                error: '',
                showError: false
            },
            gst : {
                value : 0,
                showError : false,
                error : ''
            },
            total : 0,
            repairInfo : {asset_id : '' , from : '', to : '', expected_delivery : ''},
            receiveAssetRequest : false
        }
        this.setTo = this.setTo.bind(this)
        this.setRepairInvoice = this.setRepairInvoice.bind(this)
        this.setAmount = this.setAmount.bind(this)
        this.setGst = this.setGst.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.receiveAssetIntoDb = this.receiveAssetIntoDb.bind(this)
    }

    checkForValidation(){
        if(!this.state.to.value){
            this.setState({
                to : Object.assign(this.state.to, {
                    showError : true,
                    error : 'Received from service date is required'
                })
            })
        }
        else{
            this.setState({
                to : Object.assign(this.state.to, {
                    showError : false,
                    error : ''
                })
            })
        }

        if(!this.state.repair_invoice.value){
            this.setState({
                repair_invoice : Object.assign(this.state.repair_invoice, {
                    showError : true,
                    error : 'Repair Invoice is required'
                })
            })
        }
        else{
            this.setState({
                repair_invoice : Object.assign(this.state.repair_invoice, {
                    showError : false,
                    error : ''
                })
            })
        }

        if(Number(this.state.amount.value) < 0){
            this.setState({
                amount : Object.assign(this.state.amount, {
                    showError : true,
                    error : 'Amount can not be negative'
                })
            })
        }
        else{
            this.setState({
                amount : Object.assign(this.state.amount, {
                    showError : false,
                    error : ''
                })
            })
        }

        if(Number(this.state.gst.value) < 0){
            this.setState({
                gst : Object.assign(this.state.gst, {
                    showError : true,
                    error : 'GST cannot be negative'
                })
            })
        }
        else{
            this.setState({
                gst : Object.assign(this.state.gst, {
                    showError : false,
                    error : ''
                })
            })
        }

        if(!this.state.to.showError && !this.state.amount.showError && !this.state.gst.showError && !this.state.repair_invoice.showError){
            this.setState({
                receiveAssetRequest : true
            })
        }
    }


    setTo(e){
        this.setState({
            to : Object.assign(this.state.to, {
                value : e.target.value
            })
        })
    }

    setRepairInvoice(e){
        this.setState({
            repair_invoice : Object.assign(this.state.repair_invoice, {
                value : e.target.value
            })
        })
    }


    setAmount(e){
        this.setState({
            amount : Object.assign(this.state.amount, {
                value : Number(e.target.value)
            })
        })
    }

    setGst(e){
        this.setState({
            gst : Object.assign(this.state.gst, {
                value : Number(e.target.value)
            }),
        })
    }

    receiveAssetIntoDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/recover-repair`,
            withCredentials : true,
            data : {
                asset_id : this.props.asset,
                to : this.state.to.value,
                repair_invoice : this.state.repair_invoice.value,
                amount : this.state.amount.value,
                gst : this.state.gst.value,
                total : this.state.total,
            }
        })
        .then(res => {
            if(res.data.error){
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    receiveAssetRequest : false
                })                
            }
            else{
                this.setState({
                    receiveAssetRequest : false,
                    to : Object.assign(this.state.to, {
                        value : '',
                        showError : false,
                        error : ''
                    }),
                    repair_invoice : Object.assign(this.state.repair_invoice, {
                        value : '',
                        showError : false,
                        error : ''
                    }),
                    amount : Object.assign(this.state.amount, {
                        value : 0,
                        showError : false,
                        error : ''
                    }),
                    gst : Object.assign(this.state.to, {
                        value : 0,
                        showError : false,
                        error : ''
                    }),
                    total : 0,
                })
                window.Materialize.toast('Asset Received', 4000)                
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.amount !== this.state.amount  || prevState.gst !== this.state.gst){
            this.setState({
                total : this.state.amount + ((this.state.amount * this.state.gst)/100)
            })
        }
    }

    componentDidMount(){
        axios({
            method : 'get', 
            url : `${baseUrl}/asset/repair-info?asset_id=${this.props.asset}`
            ,withCredentials : true
        })
        .then(res => {
            this.setState({
                repairInfo : res.data.repairInfo
            })
        })
        $('label').addClass('active')
    }



    render(){
        return(
            <div style={{padding: '20px'}} className="no-footer">
            <h5 style={{fontFamily : 'Roboto', fontWeight : 250}}>Receive Asset</h5>
                <Row>
                    {this.state.repairInfo.asset ? <div>
                        <h6><b>Asset Name</b> : {this.state.repairInfo.asset.asset_name}</h6>
                        <h6><b>Service Provider</b> : {this.state.repairInfo.vendor}</h6>
                        <h6><b>Given for service on</b> : {moment(this.state.repairInfo.from).format('DD MMM YYYY')}</h6>
                        <h6><b>Expected Recovery</b> : {moment(this.state.repairInfo.expected_delivery).format('DD MMM YYYY')}</h6>
                        </div> : null}
                   
                    <Input s={6} name='on' type='date' label="Received from Service *" onChange={this.setTo} value = {this.state.to.value} error={this.state.to.showError ? this.state.to.error : null}/>
                    <Input s={6} label="Repair Invoice *" value = {this.state.repair_invoice.value} onChange = {this.setRepairInvoice} error={this.state.repair_invoice.showError ? this.state.repair_invoice.error : null}/>
                    <Input s={6} label="Amount" type = "number" min={0} value = {this.state.amount.value} onChange = {this.setAmount} error={this.state.amount.showError ? this.state.amount.error : null}/>
                    <Input s={6} label="GST" type = "number" min={0} value = {this.state.gst.value} onChange = {this.setGst} error={this.state.gst.showError ? this.state.gst.error : null}/>
                    
                    <Badge>Total : {this.state.total}</Badge>
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button><span> </span>
                <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
                {this.state.receiveAssetRequest ? this.receiveAssetIntoDb() : null}
            </div>
        )
    }

}

export default ReceiveAsset