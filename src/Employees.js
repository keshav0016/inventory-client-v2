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

import {Modal, Button, Table, Icon, Dropdown, NavItem, Pagination,Preloader, Col, CardPanel, Input, Row } from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class EmployeesList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pagination:{totalPage : 1, currentPage : 1},
      page: 1,
      search: '',
      handleListRequest : true,
      loading : true,

     
    }
    this.handleList = this.handleList.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setHandleListRequest = this.setHandleListRequest.bind(this)
    this.renderDropdown = this.renderDropdown.bind(this)
    this.setSearch = this.setSearch.bind(this)
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
      url: `${baseUrl}/employees/list?page=${this.state.page}&search=${this.state.search}`,
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
  renderDropdown(item, key){
    return item.disable === 1 ? <Dropdown trigger={
      <Button><Icon tiny>more_vert</Icon></Button>
    }>
      <Modal
        actions={null}
        trigger={<NavItem>Enable</NavItem>}>
        {<EnableEmployee user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest} />}
      </Modal>
    </Dropdown>
      : <Dropdown trigger={
        <Button className='btn-mini'> <Icon>more_vert</Icon></Button>
      }>
        <Modal
          actions={null}
          trigger={<NavItem >Disable</NavItem >}>
          <EmployeeDelete user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest} />
        </Modal>
        <Modal
          actions={null}
          className='editAssetBottomPadding'
          trigger={<NavItem >Edit</NavItem >}>
          <EmployeeUpdate user={this.state.data[key]} setHandleListRequest={this.setHandleListRequest} />
        </Modal>
        <NavItem href={`/admin/employees/details/${item.user_id}`}>Details</NavItem>
      </Dropdown>
  }
  
  setSearch(e){
    this.setState({
        search : e.target.value,
        handleListRequest : true
        
    })
    this.setPage(1)
}

  render() {
    return (
      <div className="listComponent">
        {this.state.handleListRequest ? this.handleList() : null}
        <h3 className="title">List of Employees</h3>
        <Row>
        <Input s={12} m={6} l={4} placeholder="Search by Employee ID or Employee Name" onChange = {this.setSearch} />
        </Row>
        {this.state.loading ? <Preloader size='small' /> :
                (this.state.data.length === 0 ? <div className = 'noRecordsScreen'>No Records</div> :
                <div>
            <Table  className='desktopView listTable' style={{fontFamily: 'Roboto', fontWeight: 350}}>
              <thead>
                <tr>
                  <th data-field="user_id">Emp. Id</th>
                    <th data-field="first_name">First Name</th>
                    <th data-field="last_name">Last Name</th>
                    <th className="extraFields" data-field="age">Age</th>
                    <th className="extraFields" data-field="gender">Gender</th>
                    <th className="extraFields" data-field="department">Department</th>
                    <th data-field="designation">Designation</th>
                  </tr>
              </thead>
              <tbody>{this.state.data.map(function (item,key){
                return(
                <tr key={item.user_id} className={item.disable === 1 ? 'disabled' : 'enabled'}>
                  <td>{item.user_id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td className="extraFields">{item.age}</td>
                  <td className="extraFields">{item.gender}</td>
                  <td className="extraFields">{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{this.renderDropdown(item, key)}</td>
                </tr>
                )
              },this)}
              </tbody>
            </Table>
            <Col s={12} m={12} className='mobileView listTable'>
                        {this.state.data.map((item, index) => {
                            return <CardPanel key = {index} className={item.disable === 1 ? 'disabled' : 'enabled' } >
                                        <div style={{ float : 'right'}}>
                                            {this.renderDropdown(item, index)}
                                        </div>
                                        <div className='historyCards'  >
                                            <div style={{float : 'left'}} >                                
                                                <h6><b>Employee Id</b> : {item.user_id}</h6>
                                                <h6><b>First Name</b> : {item.first_name}</h6>
                                                <h6><b>Last Name</b> : {item.last_name}</h6>  
                                            </div>
                                            <div style={{float : 'right'}}>
                                                <h6><b>Department</b> : {item.department}</h6>
                                                <h6><b>Designation</b> : {item.designation}</h6>                                                
                                            </div>
                                        </div>
                                    </CardPanel>
                        })}
                    </Col>
          </div>)}
          <Link to={{ pathname : '/admin/employees/create',setHandleListRequest : this.setHandleListRequest}}><Button fab="vertical" floating large className = 'red' waves = 'light' icon = 'add' /></Link>
                
          <div>
            {this.state.data.length === 0 || this.state.pagination.totalPage < 2 ? null : <Pagination className='pagination' items={this.state.pagination.totalPage} activePage={this.state.page} maxButtons={5} onSelect = {this.setPage} />}
          </div> 
         
      </div>
    );
   
  }
}

export default EmployeesList;