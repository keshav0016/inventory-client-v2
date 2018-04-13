import React, {Component} from 'react';
import axios from 'axios'
import {Table} from 'react-materialize'


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
            url : `http://localhost:3001/employee/ticket/count`,
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
            url: 'http://localhost:3001/employee/ticket/current',
            withCredentials: true
        })
        .then(res => {
            this.setState({
                profile: res.data.currentUser
    
            })
        })
        .catch(error => {
            window.Materialize.toast('user details not found',3000)
        })
       
    }
   
    render(){
        return (
            <div style={{marginLeft : '1%', marginRight : '1%'}}>
            <h5>Name : <b style={{color : 'teal'}}>{this.state.profile.first_name} {this.state.profile.last_name}</b></h5>
            <h5>No of Assets held : <b style={{color : 'teal'}}>{this.state.assetsCount}</b></h5>
            <h5>No of Consumables held : <b style={{color: 'teal'}}>{this.state.consumablesCount}</b> </h5>
            <Table >
              <thead>
                  <tr>
                      <th data-field="item"> Item</th>
                      <th data-field="quantity">Quantity</th>
                   
                  </tr>
              </thead>
      
              <tbody>
                  {this.state.data.map((item, index) => {
                      return <tr key={index}>
                          <td>{item.asset_id ? `${item.asset.asset_name} [Asset]`: `${item.consumable.name} [consumable]`}</td>
                          <td>{item.asset_id ? "1": item.quantity}</td>
                      </tr>
                  })}
              </tbody>
          </Table>
              </div>
        )
    }
}
export default Profile