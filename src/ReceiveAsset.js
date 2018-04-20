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
            to : '',
            repair_invoice : '',
            amount : 0,
            gst : 0,
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
        if(!this.state.repair_invoice || !this.state.to){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            if(new Date(this.state.repairInfo.from) > new Date(this.state.to)){
                window.Materialize.toast('TO cannot be less than FROM', 4000)
            }
            else{
                this.setState({
                    receiveAssetRequest : true
                })
            }
        }
    }


    setTo(e){
        this.setState({
            to : e.target.value
        })
    }

    setRepairInvoice(e){
        this.setState({
            repair_invoice : e.target.value
        })
    }


    setAmount(e){
        this.setState({
            amount : Number(e.target.value),
        })
    }

    setGst(e){
        this.setState({
            gst : Number(e.target.value),
        })
    }

    receiveAssetIntoDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/recover-repair`,
            withCredentials : true,
            data : {
                asset_id : this.props.asset,
                to : this.state.to,
                repair_invoice : this.state.repair_invoice,
                amount : this.state.amount,
                gst : this.state.gst,
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
                    to : '',
                    repair_invoice : '',
                    amount : 0,
                    gst : 0,
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
            <div style={{marginLeft: '30px',marginRight: '30px'}}>
            <h3 style={{fontFamily : 'Roboto', fontWeight : 250}}>Receive Asset</h3>
                <Row><br /><br />
                    {this.state.repairInfo.asset ? <div>
                        <h6><b>Asset Name</b> : {this.state.repairInfo.asset.asset_name}</h6>
                        <h6><b>Service Provider</b> : {this.state.repairInfo.vendor}</h6>
                        <h6><b>Given for service on</b> : {moment(this.state.repairInfo.from).format('DD MMM YYYY')}</h6>
                        <h6><b>Expected Recovery</b> : {moment(this.state.repairInfo.expected_delivery).format('DD MMM YYYY')}</h6>
                        </div> : null}
                    <br /><br />
                    <Input s={6} name='on' type='date' label=' ' placeholder="Received from Service *" onChange={this.setTo} value = {this.state.to} />
                    <Input s={6} placeholder="Repair Invoice *" label=' ' value = {this.state.repair_invoice} onChange = {this.setRepairInvoice}/>
                    <Input s={6} placeholder="Amount *" type = "number" label=' ' min={0} value = {this.state.amount} onChange = {this.setAmount}/>
                    <Input s={6} placeholder="GST" type = "number" min={0} label=' ' value = {this.state.gst} onChange = {this.setGst}/>
                    <br />
                    <Badge>Total : {this.state.total}</Badge>
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button><span> </span>
                {this.state.receiveAssetRequest ? this.receiveAssetIntoDb() : null}
            </div>
        )
    }

}

export default ReceiveAsset