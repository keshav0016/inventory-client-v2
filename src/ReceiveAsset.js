import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Badge, Icon} from 'react-materialize'
// import $ from 'jquery'

class ReceiveAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            to : '',
            repair_invoice : '',
            amount : 0,
            gst : 0,
            total : 0,
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

    // setVendorListRequest(){
    //     this.setState({
    //         vendorListRequest : true
    //     })
    //     $('#addVendor .modal-footer button').click()
    // }

    setTo(e){
        this.setState({
            to : e.target.value
        })
    }

    // setAssetName(e){
    //     this.setState({
    //         asset_name : e.target.value
    //     })
    // }

    // setPurchaseDate(e){
    //     this.setState({
    //         purchase_date : e.target.value
    //     })
    // }

    // setDescription(e){
    //     this.setState({
    //         description : e.target.value
    //     })
    // }

    setRepairInvoice(e){
        this.setState({
            repair_invoice : e.target.value
        })
    }

    // setVendor(e){
    //     this.setState({
    //         vendor : e.target.value
    //     })
    // }

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

    // setCategory(e){
    //     this.setState({
    //         category : e.target.value
    //     })
    // }

    // setCondition(e){
    //     this.setState({
    //         condition : e.target.value
    //     })
    // }

    // setLocation(e){
    //     this.setState({
    //         location : e.target.value
    //     })
    // }

    // setAddVendor(){
    //     this.setState({
    //         addVendor : true
    //     })
    //     $("#triggerAddVendor").trigger('click')
    // }

    // vendorListDropdown(){
    //     var vendorArr = []
    //     vendorArr.push(<option key='Select' value='Select'>Select</option>)
    //     this.state.vendorList.forEach(vendor => {
    //         vendorArr.push(<option key={vendor.id} value={vendor.name}>{vendor.name}</option>)
    //     });
    //     return vendorArr
    // }

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
                    addAssetRequest : false,
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


    // handleVendorList(){
    //     axios({
    //         method : 'get',
    //         url : `http://localhost:3001/vendor/list`,
    //         withCredentials : true
    //     })
    //     .then(res => {
    //         this.setState({
    //             vendorList : res.data.vendors.sort((a, b) => a.asset_id - b.asset_id),
    //             vendorListRequest : false
    //         })
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })

        // $("#triggerAddVendor").hide()
    // }


    render(){
        return(
            <div>
                <Row>
                    <Input s={12} label="Asset Id" defaultValue={this.props.asset} disabled />
                    <Input s={3} name='on' type='date' label="To *" onChange={this.setTo} value = {this.state.to} />
                    <Input s={3} label="Repair Invoice *" value = {this.state.repair_invoice} onChange = {this.setRepairInvoice}/>
                    <Input s={3} label="Amount *" type = "number" min={0} value = {this.state.amount} onChange = {this.setAmount}/>
                    <Input s={3} label="GST" type = "number" min={0} value = {this.state.gst} onChange = {this.setGst}/>
                    <br />
                    <Badge>Total : {this.state.total}</Badge>
                    {/* <Input s={6} type='select' label="Category" onChange = {this.setCategory} defaultValue='Other'>
                        <option value='Electronics'>Electronics</option>
                        <option value='Non - Electronics'>Non - Electronics</option>
                        <option value='Other'>Other</option>
                    </Input> */}
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button><span> </span>
                {/* <Button onClick = {this.setAddVendor}>Add Vendor</Button> */}
                {this.state.receiveAssetRequest ? this.receiveAssetIntoDb() : null}
                {/* {this.state.vendorListRequest ? this.handleVendorList() : null} */}
                <br /><br />
                {/* <Modal
                    header='Add Vendor'
                    id="addVendor"
                    trigger={<Button id="triggerAddVendor">Add Vendor</Button>}>
                    <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                </Modal>  */}
            </div>
        )
    }

}

export default ReceiveAsset