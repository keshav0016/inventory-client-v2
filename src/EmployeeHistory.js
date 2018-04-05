import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col, CardPanel,Table} from 'react-materialize'
import moment from 'moment'

class EmployeeHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [],
            user_id: this.props.location.user
        }
        this.handleList = this.handleList.bind(this)
    }
    render(){
        return (
           
        <div>
        <Table centered striped>
        <thead>
            <tr>
                <th data-field="consumable id"> User held Consumable Id</th>
                <th data-field="asset id">User held Asset Id</th>
             
            </tr>
        </thead>

        <tbody>
            {this.state.data.map((item, index) => {
                return <tr key={index}>
                <td>{item.consumable_id}</td>
                <td>{item.asset_id}</td>
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
                data : res.data.history
                
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