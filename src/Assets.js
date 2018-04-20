import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Icon, Dropdown, NavItem, Row, Input, ProgressBar} from 'react-materialize'
import AssignAsset from './AssignAsset'
import UpdateAsset from './UpdateAsset'
import DeleteAsset from './DeleteAsset'
import RecoverAsset from './RecoverAsset'
import ReceiveAsset from './ReceiveAsset'
import {Link} from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'
import './Employee.css'
import './ListPage.css'
import './Asset.css'
import { baseUrl } from './config';

class Assets extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true,
            loading : true,
            isAvailableChecked : false,
            isAssignedChecked : false,
            isServiceChecked : false,
            isElectronicsChecked : false,
            isNonElectronicsChecked : false,
            isOtherChecked : false,
            search : '',
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setAvailableChecked = this.setAvailableChecked.bind(this)
        this.setAssignedChecked = this.setAssignedChecked.bind(this)
        this.setServiceChecked = this.setServiceChecked.bind(this)
        this.setElectronicsChecked = this.setElectronicsChecked.bind(this)
        this.setNonElectronicsChecked = this.setNonElectronicsChecked.bind(this)
        this.setOtherChecked = this.setOtherChecked.bind(this)
        this.setSearch = this.setSearch.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/asset/list?page=${this.state.page}&Available=${this.state.isAvailableChecked}&Assigned=${this.state.isAssignedChecked}&Service=${this.state.isServiceChecked}&Electronics=${this.state.isElectronicsChecked}&Non-Electronics=${this.state.isNonElectronicsChecked}&Other=${this.state.isOtherChecked}&search=%${this.state.search}%`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetList : res.data.assets,
                pagination : res.data.pagination,
                handleListRequest : false,
                loading : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    setSearch(e){
        this.setState({
            search : e.target.value,
        })
        this.setPage(1)
    }



    setAvailableChecked(){
        this.setPage(1)
        this.setState({
            isAvailableChecked : !this.state.isAvailableChecked,
        })
    }

    setAssignedChecked(){
        this.setPage(1)
        this.setState({
            isAssignedChecked : !this.state.isAssignedChecked,
        })
    }

    setServiceChecked(){
        this.setPage(1)
        this.setState({
            isServiceChecked : !this.state.isServiceChecked,
        })
    }

    setElectronicsChecked(){
        this.setPage(1)
        this.setState({
            isElectronicsChecked : !this.state.isElectronicsChecked
        })
    }

    setNonElectronicsChecked(){
        this.setPage(1)
        this.setState({
            isNonElectronicsChecked : !this.state.isNonElectronicsChecked
        })
    }

    setOtherChecked(){
        this.setPage(1)
        this.setState({
            isOtherChecked : !this.state.isOtherChecked
        })
    }

    setHandleListRequest(itemAdded){
        this.setState({
            handleListRequest : true
        })
        $(".modal-overlay").click()
        if(itemAdded){
            this.setPage(1)
        }
    }


    setPage(e){
        this.setState({
            page : e,
            handleListRequest : true
        })
    }


    render(){
        return(
            <div style={{marginLeft : '30px', marginRight : '30px'}} >
                {this.state.handleListRequest ? this.handleList() : null}
                <h3 style={{fontFamily : 'Roboto', fontWeight : 250}}>List Of Assets</h3>
                <Row style={{position : 'relative', left : '0'}}>
                    <Input s={3} label="Search" onChange = {this.setSearch} />
                </Row>
                <div className="filterContainer" style={{height: '100vh', position: 'fixed'}}>
                    <h5 style={{color:'white',fontSize:'20px',textAlign:'center'}}>Filter by Current Status</h5>
                    <div className="assetCheckbox">
                    <Input name='filter' type='checkbox' value='red' label='Available' onClick = {this.setAvailableChecked} checked={this.state.isAvailableChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Assigned' onClick = {this.setAssignedChecked} checked={this.state.isAssignedChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Service'  onClick = {this.setServiceChecked} checked={this.state.isServiceChecked} />
                    </div>
                    <span> </span>
                    <br />
                    <h5 style={{color:'white',fontSize:'20px',textAlign:'center'}}>Filter by Category</h5>
                    <div className="assetCheckbox">
                    <Input name='filter' type='checkbox' value='red' label='Electronics' onClick = {this.setElectronicsChecked} checked={this.state.isElectronicsChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Non-Electronics' onClick = {this.setNonElectronicsChecked} checked={this.state.isNonElectronicsChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Other' onClick = {this.setOtherChecked} checked={this.state.isOtherChecked} />
                    </div>
                </div>
                {this.state.loading ? <ProgressBar /> :
                (this.state.assetList.length === 0 ? <h3 style={{left : '40%'}}>No Records</h3> :
                <div>
                <Table className="assetTable" hoverable style={{fontFamily: 'Roboto', fontWeight: 350}}>
                    <thead>
                        <tr>
                            <th data-field="serial_number">Serial No.</th>
                            <th data-field="asset_name">Asset Name</th>
                            <th data-field="asset_type">Asset Type</th>
                            <th data-field="purchase_date">Purchase date</th>
                            <th data-field="invoice_number">Invoice No.</th>
                            <th data-field="vendor">Vendor</th>
                            <th data-field="current_status">Current Status</th>
                            <th data-field="condition">Condition</th>
                            <th data-field="location">Location</th>
                            <th data-field="category">Category</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.assetList.map((item, index) => {
                            return <tr key={item.asset_id}>
                            <td>{item.serial_number}</td>
                            <td>{item.asset_name}</td>
                            <td>{item.assetType}</td>
                            <td>{moment(item.purchase_date).format('DD MMM YYYY')}</td>
                            <td>{item.invoice_number}</td>
                            <td>{item.vendor}</td>
                            <td>{item.current_status}</td>
                            <td>{item.condition}</td>
                            <td>{item.location}</td>
                            <td>{item.category}</td>
                            <td><Dropdown trigger={
                                    <Button><Icon tiny>more_vert</Icon></Button>
                                }>
                                    <Modal
                                        actions={null}
                                        trigger={<NavItem>Edit</NavItem>}>
                                        <UpdateAsset asset = {item} setHandleListRequest={this.setHandleListRequest} />
                                    </Modal>
                                    <Modal
                                        style={{width : '70%'}}
                                        actions={null}
                                        trigger={item.current_status === 'Available' ? <NavItem>Delete</NavItem> : null}>
                                        {item.current_status === 'Available' ? <DeleteAsset asset = {item} setHandleListRequest={this.setHandleListRequest} /> : null}
                                    </Modal>
                                    <Modal
                                        actions={null}
                                        trigger={item.current_status === 'Available' ? <NavItem>Assign</NavItem> : null}>
                                        {item.current_status === 'Available' ? <AssignAsset asset = {item.asset_id} setHandleListRequest={this.setHandleListRequest} /> : null}
                                    </Modal>
                                    <Modal
                                        actions={null}
                                        trigger={item.current_status === 'Assigned' ? <NavItem>Recover</NavItem> : null}>
                                        {item.current_status === 'Assigned' ? <RecoverAsset asset = {item.asset_id} setHandleListRequest={this.setHandleListRequest} /> : null}
                                    </Modal>
                                    {item.current_status === 'Available' ? <NavItem href={ `/admin/assets/repair/${item.asset_id}`}>Repair</NavItem> : null}
                                    <Modal
                                        actions={null}
                                        trigger={item.current_status === 'Service' ? <NavItem>Receive</NavItem> : null}>
                                        {item.current_status === 'Service' ? <ReceiveAsset asset = {item.asset_id} setHandleListRequest={this.setHandleListRequest} /> : null}
                                    </Modal>
                                    <NavItem href={`/admin/assets/history/${item.asset_id}`}>Details</NavItem>
                                </Dropdown></td>
                            </tr>
                        })}
                    </tbody>
                    </Table>
                    </div> )}
                
                <Link to={{ pathname : '/admin/assets/create'}}><Button style={{position : 'fixed'}} floating large className = 'red addVendorButton' waves = 'light' icon = 'add' /></Link>
                
                <div>
                    {this.state.assetList.length === 0 ? null : <Pagination items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />}
                </div> 
            </div>
        )
    }


}



export default Assets