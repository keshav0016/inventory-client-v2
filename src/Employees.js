import React, { Component } from 'react';
import axios from 'axios';
import './Employee.css';
import './adminDash.css'
import EmployeeAdd from './EmployeeAdd';
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeDelete from './EmployeeDelete';
import {
  Link,
} from 'react-router-dom';

import {Modal, Button, Table, Icon, Dropdown, NavItem, Pagination } from 'react-materialize'
import $ from 'jquery'

class EmployeesList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pagination:{totalPage : 1, currentPage : 1},
      add:false,
      page: 1,
      handleListRequest : true,
      list: true
     
    }
    this.handleList = this.handleList.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setHandleListRequest = this.setHandleListRequest.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    
  }
  handleUpdate(){
    this.setState({
      update: true
    })
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
      url: `http://localhost:3001/employees/list?page=${this.state.page}`,
      withCredentials: true
    })
    .then((res) => {
      this.setState({
        data: res.data.user.sort((a, b) => a.id - b.id),
        pagination : res.data.pagination,
        handleListRequest : false
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
    var employeelist = (
      <div style={{marginLeft : '1%', marginRight : '1%'}}>
        {this.state.handleListRequest ? this.handleList() : null}
          <p className="adminDashboardTitle">Employees List</p>
         
          <Table>
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
                <td><Dropdown trigger={
                   <Button className = 'btn-mini'> <Icon>more_vert</Icon></Button>
                  }>
                   <Modal
                    header='Employee Update Form'
                    trigger={<NavItem >Edit</NavItem >}>
                    <EmployeeUpdate user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest}/>
                  </Modal>
                  <Modal
                    header='Delete Employee' bottomSheet
                    trigger={<NavItem >Delete</NavItem >}>
                    <EmployeeDelete user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest}/>
                  </Modal>
                  <Link to={{ pathname : '/adminhomepage/employees/details', user : item.user_id}}><NavItem>Details</NavItem></Link>
                </Dropdown></td>
              </tr>
              )
            },this)}
            </tbody>
          </Table>
          <div className = 'Addbtn'>
          <Modal 
            header='Employee Add Form'
            trigger={<Button  floating large className = 'red addemployeebtn' waves = 'light' icon = 'add'  />}>
            <EmployeeAdd setHandleListRequest = {this.setHandleListRequest}/>
          </Modal>
          </div>
          <div>
            <Pagination items = {this.state.pagination.totalPage} activePage = {this.state.page } maxButton = {5} onSelect = {this.setPage}/> 
          </div>
      </div>
    );
    return (
      <div>
        {this.state.list ? employeelist :null}
        
      </div>
       
    );
  }
}

export default EmployeesList;