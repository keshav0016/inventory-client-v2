import React, {Component} from 'react';
import axios from 'axios'
import moment from 'moment'
import {Row, Col, Card, Icon} from 'react-materialize'
import './adminDash.css'
import './Employee.css'
import { baseUrl } from './config';
import { Redirect } from "react-router-dom";

class Admindashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            handleListRequest:true,
            consumablesPendingCount:'',
            consumablesAcceptedCount:'',
            consumablesLowStock:'',
            assetPendingCount:'',
            assetAcceptedCount:''
            ,repairDateNear : []
            ,redirect : 0
        }
        this.handleList = this.handleList.bind(this)
    }


    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/admin/ticket/dashboard`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                consumablesPendingCount:res.data.pendingConsumable,
                consumablesAcceptedCount:res.data.acceptedConsumable,
                consumablesLowStock:res.data.lowConsumable,
                assetPendingCount:res.data.pendingAsset,
                assetAcceptedCount:res.data.acceptedAsset,
                handleListRequest:false,
                repairDateNear : res.data.repairDateNear
            })
            
        })
        .catch(error => {
            // window.Materialize.toast('details not found', 4000)
            if(error.response.status){
                this.setState({
                    redirect : error.response.status
                })
            }
        })
    }

    componentWillMount(){
        this.handleList()
    }

    render(){
        return(
            <div>
                <Row>
                    <Col s={9} offset={'s3'}>
                        <Card className="z-depth-0">
                            <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Dashboard</h3 >
                                <Card className="z-depth-2 teal-text" title="Consumables" actions={[<a href='/admin/tickets'>Go to Ticket List</a>]}>
                                    <Icon>developer_board</Icon>
                                    <p>Pending Requests: {this.state.consumablesPendingCount}</p>
                                    <p>Accepted Requests: {this.state.consumablesAcceptedCount}</p>
                                    <p>No of consumables running low on stock: {this.state.consumablesLowStock}</p>
                                </Card>
                                <Card className="z-depth-2 teal-text" title="Assets" actions={[<a href='/admin/tickets'>Go to Ticket List</a>]}>
                                    <Icon>important_devices</Icon>
                                    <p>Pending Requests: {this.state.assetPendingCount}</p>
                                    <p>Accepted Requests: {this.state.assetAcceptedCount}</p>
                                </Card>
                            {this.state.repairDateNear.length > 0 ?
                                <Card className="z-depth-2 teal-text" title="Asset repair recover notification" actions={[<a href='/admin/assets'>Go to Asset List</a>]}>
                                    <Icon>build</Icon>
                                    {this.state.repairDateNear.map((repair, index) => {
                                        return <p style={{display : 'list-item'}} key={repair.asset_id}>Collect {repair.asset.asset_name} ({repair.asset.assetType}) with serial number : {repair.asset.serial_number} from {repair.vendor} on {moment(repair.expected_delivery).format('DD MMM YYYY')}</p>
                                    })}
                                </Card>
                            : null}
                        </Card>
                    </Col>
                    {/* <Col m={4}>
                    <img src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/202930-f19ff2e90358dfd16343b9dbe24c31d4-medium_jpg.jpg?buster=1457063274" alt="WAL Logo" className="adminDasboardLogo" />

                    </Col > */}
                </Row>
                {this.state.redirect === 403 ? <Redirect from='/admin' to = '/employee/Profile/' /> : null}
                {this.state.redirect === 401 ? <Redirect from='/admin' to = '/login' /> : null}
            </div>
        )
    }


}



export default Admindashboard