import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination} from 'react-materialize'
import AddVendor from './AddVendor'
import $ from 'jquery'
import './ListPage.css'

class Assets extends Component{
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
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/vendor/list?page=${this.state.page}&search=%${this.state.search}%`,
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
        $(".modal-close").trigger('click')
        if(itemAdded){
            this.setPage(this.state.pagination.totalPage)
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
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <br />
                <h4>Vendors</h4>
                <Table centered>
                    <thead>
                        <tr>
                            <th data-field="id">Id</th>
                            <th data-field="name">Vendor Name</th>
                            <th data-field="address">Address</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.vendorList.map((item, index) => {
                            return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Modal
                    header='Add Vendor'
                    id="addVendor"
                    actions ={<div></div>}
                    // actions={<div><Button id="addVendor" waves='light' >Submit <Icon small right>send</Icon></Button></div>}
                    trigger={<Button floating large className = 'red addVendorButton' waves = 'light' icon = 'add' />}>
                    <AddVendor setHandleListRequest = {this.setHandleListRequest}/>
                </Modal>
                <div>
                    <Pagination items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />
                </div> 
            </div>
        )
    }


}



export default Assets