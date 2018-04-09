import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col, CardPanel,Table} from 'react-materialize'
import moment from 'moment'

class EmployeeHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_id: this.props.location.user,
            data : [],
            history : [],
            historyAssets :[],
        }
        this.handleList = this.handleList.bind(this)
    }
    render(){
        return (
           
        <div>
        <Table centered striped>
        <thead>
            <tr>
                <th data-field="item"> Item</th>
                <th data-field="quantity">Quantity</th>
             
            </tr>
        </thead>

        <tbody>
            {this.state.data.map((item, index) => {
                return <tr key={index}>
                        <td>{item.asset_id ? item.asset_name + " " + "[" + "Asset" + "]" : item.name + " " + "[ "+"consumable"+" ]"}</td>
                        <td>{item.quantity}</td>
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
                window.Materialize.toast('There is no history to show',3000)

            }
        })
        .catch(error => {
            window.Materialize.toast('list not found',3000)
          })
    }
}
export default EmployeeHistory