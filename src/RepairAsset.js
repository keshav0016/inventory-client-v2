import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button, Icon, Modal} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'

class RepairAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            repairAssetRequest : false,
            vendor : 'Select',
            from : '',
            expected_delivery : '',
            vendorList : [],
            addVendor : false,
            vendorListRequest : true
        }
        this.repairAssetIntoDb = this.repairAssetIntoDb.bind(this)
        this.setFrom = this.setFrom.bind(this)
        this.setExpectedDelivery = this.setExpectedDelivery.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setVendor = this.setVendor.bind(this)
        this.handleVendorList = this.handleVendorList.bind(this)
    }

    checkForValidation(){
        if(this.state.vendor === 'Select' || !this.state.from || !this.state.expected_delivery){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            if(new Date(this.state.from) > new Date(this.state.expected_delivery)){
                console.log(this.state.from)
                console.log(this.state.expected_delivery)
                window.Materialize.toast('Expected Delivery cannot be less than FROM', 4000)
            }
            else{
                this.setState({
                    repairAssetRequest : true
                })
                console.log(this.state.from)
                console.log(this.state.expected_delivery)
            }
        }
    }

    setVendorListRequest(){
        this.setState({
            vendorListRequest : true
        })
        $('#addVendor .modal-footer button').click()
    }

    vendorListDropdown(){
        var vendorArr = []
        vendorArr.push(<option key='Select' value='Select'>Select</option>)
        this.state.vendorList.forEach(vendor => {
            vendorArr.push(<option key={vendor.id} value={vendor.name}>{vendor.name}</option>)
        });
        return vendorArr
    }

    repairAssetIntoDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/repair',
            data : {
                asset_id : this.props.asset,
                vendor : this.state.vendor,
                from : this.state.from,
                expected_delivery : this.state.expected_delivery
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                repairAssetRequest : false
            })
            window.Materialize.toast('Repair information has been stored', 4000)
            this.props.setHandleListRequest()
        })
    }

    // setEmployeeDropdown(){
    //     var employeesArr = []
    //     this.state.employees.forEach(employee => {
    //         employeesArr.push(<option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>)
    //     });
    //     return employeesArr
    // }

    setVendor(e){
        this.setState({
            vendor : e.target.value
        })
    }

    setFrom(e){
        this.setState({
            from : e.target.value
        })
    }

    setExpectedDelivery(e){
        this.setState({
            expected_delivery : e.target.value
        })
    }

    handleVendorList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/vendor/list`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                vendorList : res.data.vendors.sort((a, b) => a.asset_id - b.asset_id),
                vendorListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
                {this.state.vendorListRequest ? this.handleVendorList() : null}
                {this.state.repairAssetRequest ? this.repairAssetIntoDb() : null}
                <Row>
                    <Input s={6} type="select" label="Vendor*" value={this.state.vendor} onChange = {this.setVendor}>{this.vendorListDropdown()}</Input>
                    <Input s={12} type='date' label="From *" value = {this.state.from} onChange = {this.setFrom} />
                    <Input s={6} type='date' label="Expected Delivery*" value = {this.state.expected_delivery} onChange = {this.setExpectedDelivery} />
                </Row>
                <Button waves='light' onClick = {this.checkForValidation} >Submit <Icon small right>send</Icon></Button>
                <br /><br />
                <Modal
                    header='Add Vendor'
                    id="addVendor"
                    trigger={<Button id="triggerAddVendor">Add Vendor</Button>}>
                    <AddVendor setVendorListRequest = {this.setVendorListRequest}/>
                </Modal> 
            </div>
        )
    }

}

export default RepairAsset