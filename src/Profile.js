import React, {Component} from 'react';
import axios from 'axios'
import {Table, Row, Col, Modal, Button} from 'react-materialize'
import { baseUrl } from './config';
import './ListPage.css'
import './MasterComponent.css';
import swal from 'sweetalert'
import {Redirect} from 'react-router-dom'
import ChangePassword from './ChangePassword'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            profile : [],
            history : [],
            historyAssets :[],
            assetsCount: '',
            consumablesCount: '',
        }
    }
    componentDidMount(){
        axios({
            method:'get',
            url : `${baseUrl}/employee/ticket/count`,
            withCredentials:true
        })
        .then(res => {
            this.setState({
                assetsCount : res.data.assetsCount,
                consumablesCount : res.data.consumablesCount,
                history : res.data.history,
                historyAssets : res.data.historyAssets,
                data : res.data.historyAssets.concat(res.data.history).sort((a,b) => b.id - a.id), 
                handleList : false

            })
        })
        axios({
            method: 'get',
            url: `${baseUrl}/employee/ticket/current`,
            withCredentials: true
        })
        .then(res => {
            this.setState({
                profile: res.data.currentUser
    
            })
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect: true
                })
            }else{

                swal('User details not found',{
                    buttons: false,
                    timer: 2000,
                })
            }
            
            // window.Materialize.toast('user details not found',3000)
        })
       
    }
   
    render(){
        return (
            <div className="listComponent" >
            <h5 className='title'>List of Items held</h5>
            <div className="filterContainer">
                <h3 className="employeeTitle">Profile</h3>
                <div className='employeeProfile'>
                    <h6 style={{color: 'white', fontWeight: '300'}}>Name : <b style={{color : 'white'}}>{this.state.profile.first_name} {this.state.profile.last_name}</b></h6>
                    <h6 style={{color: 'white', fontWeight: '300'}}>No of Assets held : <b style={{color : 'white'}}>{this.state.assetsCount}</b></h6>
                    <h6 style={{color: 'white', fontWeight: '300'}}>No of Consumables held : <b style={{color: 'white'}}>{this.state.consumablesCount}</b> </h6>
                </div>
                <div style = {{display: 'inline-block',width: '10px'}}>
                <Modal
                    modalOptions={{dismissible:false}}
                    actions={null}
                    trigger={<Button style = {{marginLeft: '20px', display : 'inline-block', paddingLeft: '10px', paddingRight: '10px'}} small >Change Password</Button>}>
                    <ChangePassword />
                    {/* <p>change password</p> */}
                </Modal>     
                </div>    
            
            </div>
            <Row>
                {this.state.data.length !== 0 ? 
            // <Col s={12} m={8} l={8} offset={'m2 l2'} >
            <Table hoverable style={{fontFamily : 'Roboto', fontWeight : 350}}>
              <thead>
                  <tr>
                      <th data-field="item"> Item</th>
                      <th data-field="quantity">Quantity</th>
                   
                  </tr>
              </thead>
      
              <tbody>
                  {this.state.data.map((item, index) => {
                      return <tr key={index}>
                          <td>{item.asset_id ? ( item.asset ? `${item.asset.asset_name} [Asset]` : `${item.asset_id} [Asset]`) : ( item.consumable_id ? `${item.name} [consumable]` : `${item.consumable_id} [consumable]`)}</td>
                          <td>{item.asset_id ? "1": item.sum}</td>
                      </tr>
                  })}
              </tbody>
          </Table>
            // </Col>
            : <div className="noRecordsScreen">No Records</div>}
            </Row>
            {this.state.redirect? <Redirect
              to={{
                  pathname: "/login",
                  search: '?sessionExpired=true'
              }}/>: null}
              </div>
        )
    }
}
export default Profile