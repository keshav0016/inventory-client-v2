import React, {Component} from 'react';
import axios from 'axios';
import { baseUrl } from './config';
import {Redirect} from 'react-materialize'
import {Table,Col, CardPanel } from 'react-materialize'
import swal from 'sweetalert';



class AdminList extends Component{
    constructor(props){
        super(props)
        this.state = {
            adminsList : [],

        }
        this.handleList = this.handleList.bind(this)

    }
    componentDidMount(){
        this.handleList()
    }
    handleList(){
        axios({
            method : 'get',
            url : `${baseUrl}/admin/list`,
            withCredentials : true,
        })
        .then(res => {
            this.setState({
                adminsList : res.data.admins
            })
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect: true
                })
            }else{
                swal("List not found", {
                    buttons : false,
                    timer : 2000
                })
            }
        })
    }

    render(){
        return(
            <div className="listComponent">
                {this.state.redirect? <Redirect
                    to={{
                        pathname: "/login",
                        search: '?sessionExpired=true'
                    }}/>: null
                }
                <h3 className="title">List of Admins</h3>
                        {this.state.adminsList.length === 0 ?  <div className = 'noRecordsScreen'>No Records</div> :
                    <div>
                        <Table centered className='desktopView listTable' style={{fontFamily: 'Roboto', fontWeight: 350}}>
                            <thead>
                                <tr>
                                    <th data-field="first_name">First Name</th>
                                    <th data-field="last_name">Last Name</th>
                                    <th className="extraFields" data-field="email">Email</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.adminsList.map(function (item,key){
                                return(
                                <tr key={item.id} className={item.disable === 1 ? 'disabled' : 'enabled'}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td className="extraFields">{item.email}</td>
                                </tr>
                                )
                            },this)}
                            </tbody>
                        </Table>
                        <Col s={12} m={12} className='mobileView listTable'>
                            {this.state.adminsList.map((item, index) => {
                                return <CardPanel key = {index} className={item.disable === 1 ? 'disabled' : 'enabled' } >
                                        <div className='historyCards'  >
                                            <div style={{float : 'left'}} >                                
                                                <h6><b>Admin Id</b> : {item.id}</h6>
                                                <h6><b>First Name</b> : {item.first_name}</h6>
                                                <h6><b>Last Name</b> : {item.last_name}</h6>  
                                            </div>
                                            <div style={{float : 'right'}}>
                                                <h6><b>Email</b> : {item.email}</h6>                                                
                                            </div>
                                        </div>
                                    </CardPanel>
                                })}
                        </Col>
                        
                    </div>
                }
                            
                </div>
            
        )
    }
    
}

export default AdminList