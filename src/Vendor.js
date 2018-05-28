import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Preloader, Col, CardPanel} from 'react-materialize'
import AddVendor from './AddVendor'
import VendorUpdate from './VendorUpdate'
import $ from 'jquery'
import './ListPage.css'
import './Employee.css'
import { baseUrl } from './config';

class Vendor extends Component{
    constructor(props){
        super(props)
        this.state = {
            vendorList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true,
            search : '',
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setSearch = this.setSearch.bind(this)
        this.renderButton = this.renderButton.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/vendor/list?page=${this.state.page}&search=%${this.state.search}%`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                vendorList : res.data.vendors.sort((a, b) => a.asset_id - b.asset_id),
                pagination : res.data.pagination,
                handleListRequest : false
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


    setHandleListRequest(itemAdded){
        this.setState({
            handleListRequest : true
        })
        $(".modal-overlay").click()

        // $(".modal-close").trigger('click')
        if(itemAdded){
            this.setPage(this.state.pagination.totalPage)
        }
    }
    componentDidMount(){
        $('label').addClass('active')
    }

    setPage(e){
        this.setState({
            page : e,
            handleListRequest : true
        })
    }

    renderButton(key){
        return <Modal
            actions={null}
            trigger={<Button>Edit</Button>}>
            <VendorUpdate user={this.state.vendorList[key]} setHandleListRequest={this.setHandleListRequest} />
        </Modal>
    }

    render(){
        return(
            <div className="listComponent">
                {this.state.handleListRequest ? this.handleList() : null}
                <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Vendors</h3 >
                {this.state.handleListRequest ? <Preloader size='small' /> : 
                    (this.state.vendorList.length === 0 ? <div className='noRecordsScreen'>No Records</div> : <div>
                <Table hoverable className='desktopView' style={{fontFamily: 'Roboto', fontWeight: 350}}>
                    <thead >
                        <tr>
                            <th data-field="id">Id</th>
                            <th data-field="name">Vendor Name</th>
                            <th data-field="address">Address</th>
                            <th data-field="contact">Contact No</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.vendorList.map((item, key) => {
                            return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.contact}</td>
                            <td>{this.renderButton(key)}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>

                <Col s={12} m={12} className='mobileView'>
                        {this.state.vendorList.map((item, index) => {
                            return <CardPanel key = {index}>
                                        <div className='historyCards'  >
                                            <div style={{float : 'left'}} >
                                                <h6><b>Id</b> : {item.id}</h6>
                                                <h6><b>Vendor Name</b> : {item.name}</h6>           
                                                <h6><b>Address</b> : {item.address}</h6>                                                                                                     
                                            </div>
                                            <div style={{float : 'right'}}>
                                                <h6><b>Contact No.</b> : {item.contact}</h6>                                                                                                                
                                                {this.renderButton(index)}
                                            </div>
                                        </div>
                                    </CardPanel>
                        })}
                    </Col>

                <Modal
                    id="addVendor"
                    actions={null}
                    // actions={<div><Button id="addVendor" waves='light' >Submit <Icon small right>send</Icon></Button></div>}
                    trigger={<Button style={{position : 'fixed'}} floating large className = 'red addVendorButton' waves = 'light' icon = 'add' />}>
                    <AddVendor setHandleListRequest = {this.setHandleListRequest}/>
                </Modal>
                <div>
                    {this.state.pagination.totalPage > 1 ? <Pagination className='pagination' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} /> : null}
                </div>
                    </div>)} 
            </div>
        )
    }


}



export default Vendor