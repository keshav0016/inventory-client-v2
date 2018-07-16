import React, {Component} from 'react';
import axios from 'axios'
import {Table, Preloader, Row, Button, Modal} from 'react-materialize'
import './Employee.css'
import { baseUrl } from './config';
import RecoverAsset from "./RecoverAsset";
import $ from 'jquery';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  
class EmployeeHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_id: this.props.match.params.employee,
            data : [],
            history : [],
            historyAssets :[],
            loading : true,
            redirect : false
        }
        this.handleList = this.handleList.bind(this)
        this.setHandleListRequest = this.setHandleListRequest.bind(this)
    }

    setHandleListRequest(){
        $('.modal-overlay').trigger('click')
        this.handleList();
    }

    render(){
        return (
           
        <div className="listComponent" >
            <h3 className="title">Items held by Employee</h3>
            {this.state.redirect ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
                {this.state.loading ? <Row><Preloader size='small' /></Row> : 
                (this.state.data.length === 0 ? <div className = 'noRecordsScreen'>No Records</div> : 
            <div>
                <Table centered hoverable style={{fontFamily: 'Roboto', fontWeight: 350}}>
                <thead>
                    <tr>
                        <th data-field="item"> Item</th>
                        <th data-field="quantity">Quantity</th>
                        <th data-field="recover">Recover</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.data.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.asset_id ? ( item.asset ? `${item.asset.asset_name} [Asset]` : `${item.asset_id} [Asset]`) : ( item.consumable_id ? `${item.name} [consumable]` : `${item.consumable_id} [consumable]`)}</td>
                            <td>{item.asset_id ? "1": item.sum}</td>
                            <td><Modal
                            modalOptions={{dismissible:false}}
                                actions={null}
                                trigger={item.asset && item.to === null && item.asset.current_status === 'Assigned' ? <Button>Recover</Button> : null}>
                                {item.asset && item.to === null && item.asset.current_status === 'Assigned' ? <RecoverAsset asset = {item.asset_id} setHandleListRequest={this.setHandleListRequest} /> : null}
                            </Modal></td>
                        </tr>
                    })}
                </tbody>
                </Table>

            </div>   )}
            
        </div>
        )
    }
    componentWillMount(){
        this.handleList()
    }

    handleList(){
        axios({
            method : 'post',
            url : `${baseUrl}/employees/history`,
            data : {
                user_id : this.state.user_id
            },
            withCredentials : true
        })
        .then((res) => {
            this.setState({
                history : res.data.history,
                historyAssets : res.data.historyAssets,
                data : res.data.historyAssets.concat(res.data.history).sort((a,b) => b.id - a.id), 
                loading : false
            })
            if(this.state.data.length === 0){
                // window.Materialize.toast('There are no items for the user',3000)
                swal('There are no items for the user',{
                    buttons: false,
                    timer: 2000,
                  })

            }
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect : true
                })
            }else{

                swal('List not Found',{
                    buttons: false,
                    timer: 2000,
                  })
            }
            // window.Materialize.toast('list not found',3000)
          })
    }
}
export default EmployeeHistory