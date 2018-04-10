import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col, CardPanel} from 'react-materialize'
import './adminDash.css'
import './Employee.css'


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
        }
        this.handleList = this.handleList.bind(this)
    }


    handleList(){
        axios({
            method : 'get',
            url : `http://localhost:3001/admin/ticket/dashboard`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                consumablesPendingCount:res.data.pendingConsumable,
                consumablesAcceptedCount:res.data.acceptedConsumable,
                consumablesLowStock:res.data.lowConsumable,
                assetPendingCount:res.data.pendingAsset,
                assetAcceptedCount:res.data.acceptedAsset,
                handleListRequest:false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    render(){
        return(
            <div>
                {this.state.handleListRequest ? this.handleList() : null}
                <h3 className='heading'>Inventory Mangement System</h3>
                <h5 className='heading'>West Agile Labs</h5>
                <Row>
                    <Col m={4}>
                    <img src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/202930-f19ff2e90358dfd16343b9dbe24c31d4-medium_jpg.jpg?buster=1457063274" alt="WAL Logo" className="adminDasboardLogo" />

                    </Col >

                    <Col m={4}>
                        <CardPanel className=" grey darken-3 white-text ">
                            <label className="adminDashCardTitle">Consumables</label>
                            <br />
                            <br />
                            <br />
                            <span>Pending Requests: {this.state.consumablesPendingCount}</span>
                            <br />
                            <span>Accepted Requests: {this.state.consumablesAcceptedCount}</span>
                            <br />
                            <span>No of consumables running low on stock: {this.state.consumablesLowStock}</span>
                        </CardPanel>
                    </Col>
                    <Col m={4}>
                        <CardPanel className=" grey darken-3 white-text ">
                            <label className="adminDashCardTitle">Assets</label>
                            <br />
                            <br />
                            <br />
                            <span>Pending Requests: {this.state.assetPendingCount}</span>
                            <br />
                            <span>Accepted Requests: {this.state.assetAcceptedCount}</span>
                        </CardPanel>
                    </Col>
                </Row>
            </div>
        )
    }


}



export default Admindashboard