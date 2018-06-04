import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Preloader, Col, CardPanel} from 'react-materialize'
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
        this.renderButton = this.renderButton.bind(this)
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

    renderButton(item){
        return <Modal
            actions={null}
            trigger={<Button>Edit</Button>}>
            <UpdateAssetType assetType={item.assetType} maxRequest={item.maxRequest} id={item.id} setHandleListRequest={this.setHandleListRequest}/>
            </Modal>
    }

    render(){
        return(
            <div className="listComponent">
                {this.state.handleListRequest ? this.handleList() : null}
                <br />
                <h3 className='title' >Asset Types</h3 >
                { this.state.handleListRequest ? <Preloader size='small' /> : ( this.state.assetTypeList.length === 0 ? <div className="noRecordsScreen">No Records</div> : <div>
                <Table className='desktopView' hoverable style={{fontFamily: 'Roboto', fontWeight: 350}}>
                    <thead>
                        <tr>
                            {/* <th data-field="id">S. No</th> */}
                            <th data-field="name">Asset Type</th>
                            <th data-field="maxRequest">Max. Request</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.assetTypeList.map((item, index) => {
                            return <tr key={index+1}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.assetType}</td>
                            <td>{item.maxRequest}</td>
                            <td>{this.renderButton(item)}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Col s={12} m={12} className='mobileView'>
                        {this.state.assetTypeList.map((item, index) => {
                            return <CardPanel key = {index}>
                                        <div className='historyCards'  >
                                            <div style={{float : 'left'}} >
                                                {/* <h6><b>Serial No.</b> : {item.id}</h6> */}
                                                <h6><b>Asset Type</b> : {item.assetType}</h6>                                
                                            </div>
                                            <div style={{float : 'right'}}>
                                                <h6><b>Max Request</b> : {item.maxRequest}</h6>                                                                                                                
                                                {this.renderButton(item)}
                                            </div>
                                        </div>
                                    </CardPanel>
                        })}
                    </Col>

                <Modal
                    actions ={null}
                    trigger={<Button floating large className = 'red addVendorButton' waves = 'light' icon = 'add' style={{position: 'fixed'}} />}>
                    <AddAssetType setHandleListRequest = {this.setHandleListRequest}/>
                </Modal>
                <div>
                    {this.state.pagination.totalPage > 1 ? <Pagination className='pagination' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} /> : null}
                </div> 
                </div>)}
            </div>
        )
    }


}



export default AssetType