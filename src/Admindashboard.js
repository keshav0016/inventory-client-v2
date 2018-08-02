import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { Row, Col, Card, Icon, Preloader, Button , Modal, Table} from 'react-materialize'
import './adminDash.css'
import './Employee.css'
import { baseUrl } from './config';
import { Redirect } from "react-router-dom";
import ChangePassword from './ChangePassword';

class Admindashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            handleListRequest: true,
            consumablesPendingCount: '',
            consumablesAcceptedCount: '',
            consumablesLowStock: '',
            assetPendingCount: '',
            assetAcceptedCount: ''
            , repairDateNear: []
            , redirect: 0
        }
        this.handleList = this.handleList.bind(this)
    }


    handleList() {
        axios({
            method: 'get',
            url: `${baseUrl}/admin/ticket/dashboard`,
            withCredentials: true
        })
            .then(res => {
                this.setState({
                    consumablesPendingCount: res.data.pendingConsumable,
                    consumablesAcceptedCount: res.data.acceptedConsumable,
                    consumablesLowStock: res.data.lowConsumable,
                    assetPendingCount: res.data.pendingAsset,
                    assetAcceptedCount: res.data.acceptedAsset,
                    handleListRequest: false,
                    repairDateNear: res.data.repairDateNear
                })

            })
            .catch(error => {
                if(error.response.status === 401){
                    this.setState({
                        redirect: error.response.status
                    })
                }
                // window.Materialize.toast('details not found', 4000)
                if (error.response.status) {
                    this.setState({
                        redirect: error.response.status
                    })
                }
            })
    }

    componentWillMount() {
        this.handleList()
    }
    
    render() {
        return (
            <div>
                <Row>
                    <Col s={12} m={12} l={12}>
                        <Card className="z-depth-0" >
                            <div style ={{marginTop: '20px'}}>
                            <h3  className='title'>Dashboard</h3 >
                            <div className="changePassword">
                            <Modal
                                modalOptions={{dismissible:false}}
                                actions={null}
                                trigger={<Button small >Change Password</Button>}>
                                <ChangePassword />
                                {/* <p>change password</p> */}
                            </Modal>     
                            </div>
                            </div>       
                            {   this.state.handleListRequest ? <Row><Preloader size='small' /></Row> :
                            <div>
                                <Col s={12} m={6} l={6} >
                                <Card className="teal-text dashboardContent small" actions={[<a href='/admin/tickets#consumable'>Go to Consumables request list</a>]}>
                                    <div style={{marginTop:'3%', marginBottom:'5%'}} >
                                    <Icon>developer_board</Icon>
                                    <span style={{fontFamily:'Roboto',color:'black',fontWeight:300, fontSize: '23px', marginLeft: '2%'}} >Consumables</span>
                                    </div>
                                    <p>Pending Requests: {this.state.consumablesPendingCount}</p>
                                    {/* <p>Accepted Requests: {this.state.consumablesAcceptedCount}</p> */}
                                    <p>consumables running low on stock: {this.state.consumablesLowStock.length !== 0 ? this.state.consumablesLowStock.length : null}</p>
                                    <div  style={{maxHeight:"100px", overflow:"auto"}}>
                                        {this.state.consumablesLowStock.length !== 0 ? 
                                            <Table  className='desktopView listTable' style={{fontFamily: 'Roboto', fontWeight: 350}}>
                                            <thead style={{color: 'black'}}>
                                            <tr>
                                                <th data-field="name">Name</th>
                                                <th data-field="quantity">Available Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.consumablesLowStock.map(consumable => {
                                            return(
                                            <tr style={{color: 'black'}}>
                                                <td>{consumable.name}</td>
                                                <td>{consumable.quantity}</td>
                                            </tr>
                                            )
                                            },this)}
                                            </tbody>
                                        </Table>
                                        : null}

                                    </div>
                                </Card>
                                </Col>
                                <Col s={12} m={6} l={6} >
                                <Card className="teal-text dashboardContent small" actions={[<a href='/admin/tickets#asset'>Go to assets request list</a>]}>
                                <div style={{marginTop:'3%', marginBottom:'5%'}} >
                                <Icon>important_devices</Icon>
                                <span style={{fontFamily:'Roboto',color:'black',fontWeight:300, fontSize: '23px', marginLeft: '2%'}} >Assets</span>
                                </div>
                                    <p>Pending Requests: {this.state.assetPendingCount}</p>
                                    {/* <p>Accepted Requests: {this.state.assetAcceptedCount}</p> */}
                                </Card>
                                </Col>
                                {this.state.repairDateNear.length > 0 ?
                                <Col s={12} m={6} l={6} offset={'m3 l3'} >
                                    <Card header={<div style={{paddingTop:'3%', paddingBottom:'5%', paddingLeft: '3%'}} >
                                            <Icon>build</Icon>
                                            <span style={{fontFamily:'Roboto',color:'black',fontWeight:300, fontSize: '23px', marginLeft: '2%'}} >Asset repair recover notification</span>
                                        </div>} className="teal-text dashboardContent small"  actions={[<a href='/admin/assets#service'>Go to Asset Service List</a>]}>
                                        <div style={{maxHeight:"155px", overflow:"auto"}} >
                                            {this.state.repairDateNear.map((repair, index) => {
                                                return <li style={{ display: 'list-item' }} key={repair.asset_id}>Collect {repair.asset.asset_name} ({repair.asset.assetType}) with serial number : {repair.asset.serial_number} from {repair.vendor} on {moment(repair.expected_delivery).format('DD MMM YYYY')}</li>
                                            })}
                                        </div>
                                    </Card>
                                </Col>
                                    : null}
                            </div>}
                        </Card>
                    </Col>
                </Row>
                {this.state.redirect === 403 ? <Redirect from='/admin' to='/employee/Profile/' /> : null}
                {this.state.redirect === 401 ? <Redirect from='/admin' to='/login' /> : null}
            </div>
        )
    }


}



export default Admindashboard