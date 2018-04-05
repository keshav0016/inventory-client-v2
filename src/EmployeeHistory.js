import React, {Component} from 'react';
import axios from 'axios'
import {Table} from 'react-materialize'

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
                 <p>history</p>
            <Table>
            <thead>
                <tr>
                <th data-field="id">User Id</th>
                <th data-field="name">Asset</th>
                <th data-field="price">Consumables</th>

                </tr>
            </thead>

            <tbody>{this.state.data.map(function (item,key){
                return(
                    <tr>
                    <td>{item.user_id}</td>
                    <td>{item.asset_name}</td>
                    <td>{item.consumable_name}</td>
                    </tr>
                    
                )
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