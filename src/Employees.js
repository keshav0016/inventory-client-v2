import React, { Component } from 'react';
import axios from 'axios';
import './Employee.css';
import './adminDash.css'
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeDelete from './EmployeeDelete';
import EnableEmployee from './EnableEmployee'
import {
  Link,
} from 'react-router-dom';

import {Modal, Button, Table, Icon, Dropdown, NavItem, Pagination,Preloader } from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class EmployeesList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pagination:{totalPage : 1, currentPage : 1},
      page: 1,
      handleListRequest : true,
      loading : true,

     
    }
    this.handleList = this.handleList.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setHandleListRequest = this.setHandleListRequest.bind(this)
  }

 

  setHandleListRequest(){
    this.setState({
      handleListRequest : true
    })
    $(".modal-overlay").click()
  }

  handleList(){
    axios({
      method: 'get',
      url: `${baseUrl}/employees/list?page=${this.state.page}`,
      withCredentials: true
    })
    .then((res) => {
      this.setState({
        data: res.data.user.sort((a, b) => a.id - b.id),
        pagination : res.data.pagination,
        handleListRequest : false,
        loading: false
      })
    })
    .catch(error => {
      window.Materialize.toast('list not found',3000)
    })
  }

  setPage(e){
    this.setState({
      page : e,
      handleListRequest : true
    })
  }
  
  render() {
    return (
      <div style={{marginLeft: '30px',marginRight: '30px'}}>
        {this.state.handleListRequest ? this.handleList() : null}
        <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>List of Employees</h3>
        {this.state.loading ? <Preloader size='small' /> :
                (this.state.data.length === 0 ? <div className = 'noRecordsScreen'>No Records</div> :
                <div>
            <Table hoverable style={{fontFamily: 'Roboto', fontWeight: 350}}>
              <thead>
                <tr>
                  <th data-field="user_id">User Id</th>
                    <th data-field="first_name">First Name</th>
                    <th data-field="last_name">Last Name</th>
                    <th data-field="age">Age</th>
                    <th data-field="gender">Gender</th>
                    <th data-field="department">Department</th>
                    <th data-field="designation">Designation</th>
                  </tr>
              </thead>
              <tbody>{this.state.data.map(function (item,key){
                return(
                <tr key={item.user_id}>
                  <td>{item.user_id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.disable=== 1 ? <Dropdown trigger={
                                      <Button><Icon tiny>more_vert</Icon></Button>
                                  }>
                                  <Modal
                                      style={{width : '70%'}}
                                      actions={null}
                                      trigger={<NavItem>Enable</NavItem> }>
                                      {<EnableEmployee user = {this.state.data[key]} setHandleListRequest={this.setHandleListRequest} />}
                                  </Modal>
                                  </Dropdown>
                                  : <Dropdown trigger={
                                    <Button className = 'btn-mini'> <Icon>more_vert</Icon></Button>
                                  }>
                                    <Modal
                                    actions={null}
                                    trigger={<NavItem >Edit</NavItem >}>
                                    <EmployeeUpdate user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest}/>
                                  </Modal>
                                  <Modal style={{width:'70%'}}
                                    actions={null} 
                                    trigger={<NavItem >Disable</NavItem >}>
                                    <EmployeeDelete user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest}/>
                                  </Modal>
                                  <NavItem href={`/admin/employees/details/${item.user_id}`}>Details</NavItem>
                                </Dropdown>}</td>
                </tr>
                )
              },this)}
              </tbody>
            </Table>
          </div>)}
          <Link to={{ pathname : '/admin/employees/create',setHandleListRequest : this.setHandleListRequest}}><Button style={{position : 'fixed'}} floating large className = 'red addVendorButton' waves = 'light' icon = 'add' /></Link>
                
          <div>
            {this.state.data.length === 0 || this.state.pagination.totalPage < 2 ? null : <Pagination className='pagination' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />}
          </div> 
         
      </div>
    );
   
  }
}

export default EmployeesList;