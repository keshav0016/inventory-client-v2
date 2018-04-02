import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Icon, Dropdown, NavItem} from 'react-materialize'
import AddAsset from './AddAsset'
import UpdateAsset from './UpdateAsset'
import DeleteAsset from './DeleteAsset'
import moment from 'moment'
import $ from 'jquery'
import './ListPage.css'

class Assets extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.setPage = this.setPage.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/asset/list?page=${this.state.page}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetList : res.data.assets.sort((a, b) => a.asset_id - b.asset_id),
                pagination : res.data.pagination,
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    setHandleListRequest(){
        this.setState({
            handleListRequest : true
        })
    }


    setPage(e){
        this.setState({
            page : e,
            handleListRequest : true
        })
    }


    componentDidUpdate(prevProps, prevState){
        if(this.state.handleListRequest === true){
            $(".modal").hide()
            $(".modal-overlay").hide()
        }
    }



    render(){
        return(
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <Table centered>
                    <thead>
                        <tr>
                            <th data-field="asset_id">Asset Id</th>
                            <th data-field="serial_number">Serial No.</th>
                            <th data-field="asset_name">Asset Name</th>
                            <th data-field="purchase_date">Purchase date</th>
                            <th data-field="Description">Description</th>
                            <th data-field="invoice_number">Invoice No.</th>
                            <th data-field="vendor">Vendor</th>
                            <th data-field="amount">Amount</th>
                            <th data-field="gst">GST</th>
                            <th data-field="total">Total</th>
                            <th data-field="current_status">Current Status</th>
                            <th data-field="category">Category</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.assetList.map((item, index) => {
                            return <tr key={item.asset_id}>
                            <td>{item.asset_id}</td>
                            <td>{item.serial_number}</td>
                            <td>{item.asset_name}</td>
                            <td>{moment(item.purchase_date).format('DD MMM YYYY')}</td>
                            <td>{item.description}</td>
                            <td>{item.invoice_number}</td>
                            <td>{item.vendor}</td>
                            <td>{item.amount}</td>
                            <td>{item.gst}</td>
                            <td>{item.total}</td>
                            <td>{item.current_status}</td>
                            <td>{item.category}</td>
                            <Dropdown trigger={
                                    <Button><Icon tiny>more_vert</Icon></Button>
                                }>
                                    <Modal
                                        header='Edit Asset'
                                        fixedFooter
                                        trigger={<NavItem>Edit</NavItem>}>
                                        <UpdateAsset asset = {item} setHandleListRequest={this.setHandleListRequest} />
                                    </Modal>
                                    <Modal
                                        header='Delete Asset'
                                        bottomSheet
                                        trigger={<NavItem>Delete</NavItem>}>
                                        <DeleteAsset asset = {item.asset_id} setHandleListRequest={this.setHandleListRequest} />
                                    </Modal>
                                </Dropdown>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Modal
                    header='Add Asset'
                    fixedFooter
                    trigger={<Button floating large className = 'red addResourceButton' waves = 'light' icon = 'add' />}>
                    <AddAsset setHandleListRequest = {this.setHandleListRequest}/>
                </Modal>
                <div>
                    <Pagination items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />
                </div> 
            </div>
        )
    }


}



export default Assets