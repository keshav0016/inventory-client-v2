import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col, CardPanel} from 'react-materialize'
import './adminDash.css'


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
                <Row>
                    <Col m={4}>
                        <CardPanel className=" grey darken-3 white-text">
                            <label className="adminDashCardTitle">Consumables</label>
                            <br />
                            <br />
                            <br />
                            <span>Pending Requests: {this.state.consumablesPendingCount}</span>
                            <br />
                            <span>Accepted Requests: {this.state.consumablesAcceptedCount}</span>
                            <br />
                            <span>Most Requested Consumable: {this.state.consumablesLowStock}</span>
                            <br />
                            <span>No of consumables running low on stock: </span>
                        </CardPanel>
                    </Col>
                    <Col m={4}>
                        <CardPanel className=" grey darken-3 white-text">
                            <label className="adminDashCardTitle">Assets</label>
                            <br />
                            <br />
                            <br />
                            <span>Pending Requests: {this.state.assetPendingCount}</span>
                            <br />
                            <span>Accepted Requests: {this.state.assetAcceptedCount}</span>
                            <br />
                            <span>Most Requested Assets: </span>
                        </CardPanel>
                    </Col>
                </Row>
            </div>
        )
    }


}



export default Admindashboard