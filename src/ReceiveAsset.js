import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Row, Input, Button, Badge, Icon} from 'react-materialize'
import $ from 'jquery'

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
        if(!this.state.repair_invoice || !this.state.amount || !this.state.to){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            this.setState({
                receiveAssetRequest : true
            })
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
            url : 'http://localhost:3001/asset/recover-repair',
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
                window.Materialize.toast('Asset Added', 4000)                
                this.props.setHandleListRequest(true)
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
            url : `http://localhost:3001/asset/repair-info?asset_id=${this.props.asset}`
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
            <div>
                <Row>
                    <Input s={3} label="Asset Id" value={this.state.repairInfo.asset_id} disabled />
                    <Input s={3} label="Vendor" value={this.state.repairInfo.vendor} disabled />
                    <Input s={3} label="From" value={moment(this.state.repairInfo.from).format('DD MMM YYYY')} disabled />
                    <Input s={3} label="Expected Delivery" value={moment(this.state.repairInfo.expected_delivery).format('DD MMM YYYY')} disabled />
                    <Input s={3} name='on' type='date' label="To *" onChange={this.setTo} value = {this.state.to} />
                    <Input s={3} label="Repair Invoice *" value = {this.state.repair_invoice} onChange = {this.setRepairInvoice}/>
                    <Input s={3} label="Amount *" type = "number" min={0} value = {this.state.amount} onChange = {this.setAmount}/>
                    <Input s={3} label="GST" type = "number" min={0} value = {this.state.gst} onChange = {this.setGst}/>
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