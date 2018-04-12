import React, {Component} from 'react';
import axios from 'axios'
import {Table} from 'react-materialize'
import './Employee.css'

class EmployeeHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_id: this.props.match.params.employee,
            data : [],
            history : [],
            historyAssets :[],
        }
        this.handleList = this.handleList.bind(this)
    }
    render(){
        return (
           
        <div style={{marginLeft : '1%', marginRight : '1%'}}>
      <h3 className='heading'>Items held by Employee</h3>
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
    componentWillMount(){
        this.handleList()
    }
    handleList(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/employees/history',
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
            })
            if(this.state.data.length === 0){
                window.Materialize.toast('There are no items for the user',3000)

            }
        })
        .catch(error => {
            window.Materialize.toast('list not found',3000)
          })
    }
}
export default EmployeeHistory