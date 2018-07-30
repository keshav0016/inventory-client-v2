import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Pagination, Preloader, Col, CardPanel, Row} from 'react-materialize'
import AddVendor from './AddVendor'
import VendorUpdate from './VendorUpdate'
import $ from 'jquery'
import './ListPage.css'
import './Employee.css'
import { baseUrl } from './config';
import {Redirect} from 'react-router-dom'

class Vendor extends Component{
    constructor(props){
        super(props)
        this.state = {
            vendorList : [],
            pagination : {totalPage : 1, currentPage : 1},
            page : 1,
            handleListRequest : true,
            search : '',
            redirect: false
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
        this.setPage = this.setPage.bind(this)
        this.renderButton = this.renderButton.bind(this)
        this.setSearch = this.setSearch.bind(this)
    }
   

    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/vendor/list?page=${this.state.page}&search=%${this.state.search}%`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                vendorList : res.data.vendors,
                pagination : res.data.pagination,
                handleListRequest : false
            })
        })
        .catch(error => {
            console.error(error)
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect: true
                })
            }
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
        if(itemAdded){
            this.setPage(this.state.pagination.currentPage)
        }
        $('.modal-overlay').trigger('click')
        // $(".modal-overlay").click()
        
        // $(".modal-close").trigger('click')
    }
    componentDidMount(){
        $('label').addClass('active')
    }

    componentDidUpdate(){
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
            modalOptions={{dismissible:false,backdrop: 'static'}}
            actions={null}
            trigger={<Button>Edit</Button>}>
            <VendorUpdate user={this.state.vendorList[key]} setHandleListRequest={this.setHandleListRequest} />
        </Modal>
    }

    render(){
        return(
            <div className="listComponent">
                {this.state.handleListRequest ? this.handleList() : null}            
             {this.state.redirect? <Redirect
              to={{
                  pathname: "/login",
                  search: '?sessionExpired=true'
              }}/>: null}
                <h3 className="title">Vendors</h3 >
                    {this.state.handleListRequest ? <Row><Preloader size='small' /></Row> : 
                    (this.state.vendorList.length === 0 ? <div className='noRecordsScreen'>No Records</div> : <div>
                <Table hoverable className='desktopView' style={{fontFamily: 'Roboto', fontWeight: 350}}>
                    <thead >
                        <tr>
                            <th data-field="id">Vendor Id</th>
                            <th data-field="name">Vendor Name</th>
                            <th data-field="address">Address</th>
                            <th data-field="contact">Contact No</th>
                            <th data-field="landline">LandLine No</th>
                            
                            
                        </tr>
                    </thead>

                    <tbody  style={{wordBreak: 'normal'}}>
                        {this.state.vendorList.map((item, key) => {
                            return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td style={{wordBreak : 'break-word', width: '40%'}}>{item.address}</td>
                            <td className='vendorContact' >{item.contact ? `${item.contact}` : `-` }</td>
                            <td className='vendorContact' >{item.landline !==null ? (item.landline.code !==null && item.landline.number !==null ? `${item.landline.code}-${item.landline.number}` :null ): null } </td>
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
                                                <h6><b>Landline No.</b> : {item.landline.code}-{item.landline.number}</h6>                                                                                                              
                                                {this.renderButton(index)}
                                            </div>
                                        </div>
                                    </CardPanel>
                        })}
                    </Col>

                <Modal
                    modalOptions={{dismissible:false}}
                    actions={null}
                    trigger={<Button style={{position : 'fixed'}} floating large className = 'red addVendorButton' waves = 'light' icon = 'add' />}>
                    <AddVendor setHandleListRequest = {this.setHandleListRequest}/>
                </Modal>
                <div>
                {this.state.vendorList.length === 0 || this.state.pagination.totalPage < 2 ? null : <Pagination className='pagination' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />}
                </div>
                    </div>)} 
            </div>
        )
    }


}



export default Vendor