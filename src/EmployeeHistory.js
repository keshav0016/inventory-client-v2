import React, {Component} from 'react';
import axios from 'axios'
import {Table, Preloader} from 'react-materialize'
import './Employee.css'
import { baseUrl } from './config';

class EmployeeHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_id: this.props.match.params.employee,
            data : [],
            history : [],
            historyAssets :[],
            loading : true
        }
        this.handleList = this.handleList.bind(this)
    }
    render(){
        return (
           
        <div className="listComponent" >
            <h3 className="title">Items held by Employee</h3>
            {this.state.loading ? <Preloader size='small' /> :
                (this.state.data.length === 0 ? <div className = 'noRecordsScreen'>No Records</div> : 
            <div>
                <Table hoverable style={{fontFamily: 'Roboto', fontWeight: 350}}>
                <thead>
                    <tr>
                        <th data-field="item"> Item</th>
                        <th data-field="quantity">Quantity</th>
                    
                    </tr>
                </thead>

                <tbody>
                    {this.state.data.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.asset_id ? ( item.asset ? `${item.asset.asset_name} [Asset]` : `${item.asset_id} [Asset]`) : ( item.consumable ? `${item.consumable.name} [consumable]` : `${item.consumable_id} [consumable]`)}</td>
                            <td>{item.asset_id ? "1": item.quantity}</td>
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
                window.Materialize.toast('There are no items for the user',3000)

            }
        })
        .catch(error => {
            window.Materialize.toast('list not found',3000)
          })
    }
}
export default EmployeeHistory