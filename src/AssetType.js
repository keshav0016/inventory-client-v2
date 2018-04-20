import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination} from 'react-materialize'
import AddAssetType from './AddAssetType'
import UpdateAssetType from './UpdateAssetType'
import $ from 'jquery'
import './ListPage.css'
import './Employee.css'
import { baseUrl } from './config';

class AssetType extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetTypeList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true,
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.setPage = this.setPage.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/assetType/list?page=${this.state.page}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetTypeList : res.data.assetTypes,
                pagination : res.data.pagination,
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    setHandleListRequest(itemAdded){
        this.setState({
            handleListRequest : true
        })
        $(".modal-overlay").click()

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


    render(){
        return(
            <div style={{marginLeft: '30px',marginRight: '30px'}}>
                {this.state.handleListRequest ? this.handleList() : null}
                <br />
                <h3 style={{fontFamily: 'Roboto', fontWeight: 250}} >Asset Types</h3 >
                <Table hoverable style={{fontFamily: 'Roboto', fontWeight: 350}}>
                    <thead>
                        <tr>
                            <th data-field="id">S. No</th>
                            <th data-field="name">Asset Type</th>
                            <th data-field="maxRequest">Max. Request</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.assetTypeList.map((item, index) => {
                            return <tr key={index+1}>
                            <td>{item.id}</td>
                            <td>{item.assetType}</td>
                            <td>{item.maxRequest}</td>
                            <td><Modal
                                trigger={<Button>Edit</Button>}>
                                <UpdateAssetType assetType={item.assetType} maxRequest={item.maxRequest} id={item.id} setHandleListRequest={this.setHandleListRequest}/>
                                </Modal></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Modal
                    actions ={<div></div>}
                    trigger={<Button floating large className = 'red addVendorButton' waves = 'light' icon = 'add' />}>
                    <AddAssetType setHandleListRequest = {this.setHandleListRequest}/>
                </Modal>
                <div>
                    <Pagination items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />
                </div> 
            </div>
        )
    }


}



export default AssetType