import React, {Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal} from 'react-materialize'
import AddAsset from './AddAsset'
// import Button from 'react-materialize/lib/Button';


class Assets extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetList : [],
            handleListRequest : true
        }
        this.handleList = this.handleList.bind(this)
    }

    handleList(){
        axios({
            method : 'get',
            url : 'http://localhost:3001/asset/list',
            withCredentials : true
        })
        .then(res => {
            this.setState({
                assetList : res.data.assets,
                handleListRequest : false
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
                            <td>{item.purchase_date}</td>
                            <td>{item.description}</td>
                            <td>{item.invoice_number}</td>
                            <td>{item.vendor}</td>
                            <td>{item.amount}</td>
                            <td>{item.gst}</td>
                            <td>{item.total}</td>
                            <td>{item.current_status}</td>
                            <td>{item.category}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                
                <Modal
                    header='Add Asset'
                    fixedFooter
                    trigger={<Button floating large className = 'red' waves = 'light' icon = 'add' />}>
                    <AddAsset />
                </Modal>
            </div>
        )
    }


}



export default Assets