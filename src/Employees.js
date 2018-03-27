import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import EmployeeAdd from './EmployeeAdd';
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeDelete from './EmployeeDelete'
import {Modal, Button, Table, Input, Row, Icon, Dropdown, NavItem, Pagination } from 'react-materialize'


class EmployeesList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pagination:{totalPage : 1, currentPage : 1},
      add:false,
      page: 1,
      handleListRequest : true
     
    }
    this.handleList = this.handleList.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setHandleListRequest = this.setHandleListRequest.bind(this)
    
  }
  setHandleListRequest(){
    this.setState({
      handleListRequest : true
    })
  }
  handleList(){
    axios({
      method: 'get',
      url: `http://localhost:3001/employee/list?page=${this.state.page}`,
      withCredentials: true
    })
    .then((res) => {
      this.setState({
        data: res.data.user,
        pagination : res.data.pagination,
        handleListRequest : false
      })
    })
    .catch(error => {
      alert('list not found')
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
      <div className="App">
        {this.state.handleListRequest ? this.handleList() : null}
          <h4>Employees List</h4>
         
          <Table class='container'>
            <thead>
              <tr>
                <th data-field="id">Id</th>
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
              <tr key={item.id}>
                <td>{item.id}</td>
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
                    header='Delete Employee'
                    trigger={<NavItem >Delete</NavItem >}>
                    <EmployeeDelete user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest}/>
                  </Modal>
                  <NavItem>history</NavItem>
                </Dropdown></td>
              </tr>
              )
            },this)}
            </tbody>
          </Table>
          <div className = 'Addbtn'>
          <Modal 
            header='Employee Add Form'
            trigger={<Button floating large className='red 'onClick={this.handleAdd} waves='light' icon='add' />}>
            <EmployeeAdd setHandleListRequest = {this.setHandleListRequest}/>
          </Modal>
          </div>
          <div>
            <Pagination items = {this.state.pagination.totalPage} activePage = {this.state.page } maxButton = {5} onSelect = {this.setPage}/> 
          </div>
      </div>
       
    );
  }
}

export default EmployeesList;