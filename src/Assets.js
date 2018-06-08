import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Icon, Dropdown, NavItem, Row, Input, Preloader, Col, CardPanel, SideNav} from 'react-materialize'
import AssignAsset from './AssignAsset'
import UpdateAsset from './UpdateAsset'
// import DeleteAsset from './DeleteAsset'
import RecoverAsset from './RecoverAsset'
import ReceiveAsset from './ReceiveAsset'
import DisableAsset from './DisableAsset'
import EnableAsset from './EnableAsset'
import {Link} from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'
import './Employee.css'
import './ListPage.css'
import './Asset.css'
import './MasterComponent.css'
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
            searchAssetId : {
                value:'',
                error:'',
                showError:false
            }
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
        this.setSearchAssetId = this.setSearchAssetId.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.renderDropdown = this.renderDropdown.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/asset/list?page=${this.state.page}&Available=${this.state.isAvailableChecked}&Assigned=${this.state.isAssignedChecked}&Service=${this.state.isServiceChecked}&Electronics=${this.state.isElectronicsChecked}&Non-Electronics=${this.state.isNonElectronicsChecked}&Other=${this.state.isOtherChecked}&search=${this.state.search}&searchAsset=${this.state.searchAssetId.value}`,
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
            handleListRequest : true
            
        })
        this.setPage(1)
    }

    setSearchAssetId(e){
        this.setState({
            searchAssetId : Object.assign(this.state.searchAssetId, {
                value:e.target.value
            })
        })

        if(Number(e.target.value) > 0){
            this.setState({
                searchAssetId : Object.assign(this.state.searchAssetId, {
                    showError : false,
                    error : ''
                })
            })
        }
        if(!e.target.value){
            this.setPage(1)
        }
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
            ,loading : true
        })
    }

    checkForValidation(){
        if(Number(this.state.searchAssetId.value) < 1){
            this.setState({
                searchAssetId: Object.assign(this.state.searchAssetId, {
                    error:'The Id cannot be less than 1',
                    showError:true
                }),
            })
        }
        else{
            this.setState({
                searchAssetId: Object.assign(this.state.searchAssetId, {
                    error : '',
                    showError : false
                }),
                handleListRequest : true
            })
            this.setPage(1)
        }
    }

    renderDropdown(item){
        return (
        item.disabled === 1 ? <Dropdown trigger={
            <Button ><Icon tiny>more_vert</Icon></Button>
        }>
        <Modal
            actions={null}
            trigger={<NavItem>Enable</NavItem> }>
            {<EnableAsset asset = {item} setHandleListRequest={this.setHandleListRequest} />}
        </Modal>
        </Dropdown>
        :<Dropdown trigger={
            <Button><Icon tiny>more_vert</Icon></Button>
        }>
            <Modal
                actions={null}
                trigger={item.current_status === 'Available' ? <NavItem>Disable</NavItem> : null}>
                {item.current_status === 'Available' ? <DisableAsset asset = {item} setHandleListRequest={this.setHandleListRequest} /> : null}
            </Modal>
            <Modal
                actions={null}
                className='editAssetBottomPadding'
                trigger={<NavItem>Edit</NavItem>}>
                <UpdateAsset asset = {item} setHandleListRequest={this.setHandleListRequest} />
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
    </Dropdown>
        )}

    render(){
        let filterSlideButton = <Button floating large className='teal filterContainerSliderButton' waves='light' icon='filter_list'></Button>;
        let filterPane = <div className="filterContainer">
            <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'white', fontSize: '20px', marginLeft: '30px' }}>Filter by Current Status</p>
            <div className="assetCheckbox">
                <Input name='filter' type='checkbox' value='red' label='Available' onClick={this.setAvailableChecked} checked={this.state.isAvailableChecked} />
                <Input name='filter' type='checkbox' value='red' label='Assigned' onClick={this.setAssignedChecked} checked={this.state.isAssignedChecked} />
                <Input name='filter' type='checkbox' value='red' label='Service' onClick={this.setServiceChecked} checked={this.state.isServiceChecked} />
            </div>
            <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'white', fontSize: '20px', marginLeft: '30px' }}>Filter by Category</p>
            <div className="assetCheckbox">
                <Input name='filter' type='checkbox' value='red' label='Electronics' onClick={this.setElectronicsChecked} checked={this.state.isElectronicsChecked} />
                <Input name='filter' type='checkbox' value='red' label='Non-Electronics' onClick={this.setNonElectronicsChecked} checked={this.state.isNonElectronicsChecked} />
                <Input name='filter' type='checkbox' value='red' label='Other' onClick={this.setOtherChecked} checked={this.state.isOtherChecked} />
            </div>
    </div>       
        return(
            <div className="listComponent">
                {this.state.handleListRequest ? this.handleList() : null}
                <Modal 
                id='mobileAssetFilters'
                actions={null}
                trigger={filterSlideButton}>
                <div>
                <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'black', fontSize: '20px', marginLeft: '30px' }}>Filter by Current Status</p>
                <div className="miniAssetCheckbox">
                    <Input name='filter' type='checkbox' value='red' label='Available' onClick={this.setAvailableChecked} checked={this.state.isAvailableChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Assigned' onClick={this.setAssignedChecked} checked={this.state.isAssignedChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Service' onClick={this.setServiceChecked} checked={this.state.isServiceChecked} />
                </div>
                <p style={{ fontFamily: 'Roboto', fontWeight: 300, color: 'black', fontSize: '20px', marginLeft: '30px' }}>Filter by Category</p>
                <div className="miniAssetCheckbox">
                    <Input name='filter' type='checkbox' value='red' label='Electronics' onClick={this.setElectronicsChecked} checked={this.state.isElectronicsChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Non-Electronics' onClick={this.setNonElectronicsChecked} checked={this.state.isNonElectronicsChecked} />
                    <Input name='filter' type='checkbox' value='red' label='Other' onClick={this.setOtherChecked} checked={this.state.isOtherChecked} />
                </div>
                <div>
                <Col>
                <Button style={{width:'100%'}} className='modal-close' >Close</Button>
                </Col>
                </div>
                </div>
                </Modal>
                <h3 className='title'>List Of Assets</h3>
                <Row style={{position : 'relative', left : '0'}}>
                    <Input s={12} m={6} l={4} placeholder="Search by name, ID or serial No:" style={{textAlign:'center'}} onChange = {this.setSearch} />
                    {/* <Input s={3} type='number' min={1} label="Search Asset ID" onChange = {this.setSearchAssetId} value={this.state.searchAssetId.value} error={this.state.searchAssetId.showError ? this.state.searchAssetId.error : null}/> */}
                    {/* <Button onClick={this.checkForValidation} style={{marginRight: '30px', marginLeft : '30px'}} >Search Asset Id</Button> */}
                </Row>
                {filterPane}
                {this.state.loading ? <Row><Preloader size='small' /></Row> :(this.state.assetList.length === 0 ? <div className = 'noRecordsScreen'>No Records</div> :
                <div>
                <Table centered className="assetTable desktopView listTable" style={{fontFamily: 'Roboto', fontWeight: 350}}>
                    <thead>
                        <tr >
                            <th data-field="asset_id">Asset ID</th>
                            <th data-field="serial_number">Serial No.</th>
                            <th data-field="asset_name">Asset Name</th>
                            <th data-field="asset_type">Asset Type</th>
                            <th className='extraFields' data-field="purchase_date">Purchase date</th>
                            <th className='extraFields' data-field="invoice_number">Invoice No.</th>
                            <th className='tabView' data-field="vendor">Vendor</th>
                            <th data-field="current_status">Current Status</th>
                            <th className='extraFields' data-field="condition">Condition</th>
                            <th className='extraFields' data-field="location">Location</th>
                            <th className='extraFields' data-field="category">Category</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.assetList.map((item, index) => {
                            return <tr key={item.asset_id} className={item.disabled === 1 ? 'disabled' : 'enabled' } >
                            <td>{item.asset_id}</td>
                            <td>{item.serial_number}</td>
                            <td>{item.asset_name}</td>
                            <td>{item.assetType}</td>
                            <td className='extraFields'>{moment(item.purchase_date).format('DD MMM YYYY')}</td>
                            <td className='extraFields'>{item.invoice_number}</td>
                            <td className='tabView'>{item.vendor}</td>
                            <td>{item.current_status}</td>
                            <td className='extraFields'>{item.condition}</td>
                            <td className='extraFields'>{item.location}</td>
                            <td className='extraFields'>{item.category}</td>
                            <td>{this.renderDropdown(item)}</td>
                            </tr>
                        })}
                    </tbody>
                    </Table>

                    <Col s={12} m={12} className='mobileView listTable'>
                        {this.state.assetList.map((item, index) => {
                            return <CardPanel key = {index} className={item.disabled === 1 ? 'disabled' : 'enabled' } >
                                        <div style={{ float : 'right'}}>
                                            {this.renderDropdown(item)}
                                        </div>
                                        <div className='historyCards'  >
                                            <div style={{float : 'left'}} >                                
                                                <h6><b>Asset Id</b> : {item.asset_id}</h6>
                                                <h6><b>Serial No.</b> : {item.serial_number}</h6>
                                                <h6><b>Asset Name</b> : {item.asset_name}</h6>
                                            </div>
                                            <div style={{float : 'right'}}>
                                                <h6><b>Asset Type</b> : {item.assetType}</h6>
                                                <h6><b>Vendor</b> : {item.vendor}</h6>
                                                <h6><b>Current Status</b> : {item.current_status}</h6>
                                            </div>
                                        </div>
                                    </CardPanel>
                        })}
                    </Col>
                    </div> )}
                
                
                <Link to={{ pathname : '/admin/assets/create'}}><Button fab="vertical" floating large className = 'red' waves = 'light' icon = 'add' /></Link>
                
                    {this.state.assetList.length === 0 || this.state.pagination.totalPage < 2 ? null : <Pagination className='pagination filterPadding' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />}
            </div>
        )
    }


}



export default Assets