import React, { Component } from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import './Employee.css'
import $ from 'jquery'

class EmployeeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      password: '',
      age: '',
      gender: '',
      department: '',
      designation: '',
      user_id: ''
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleAge = this.handleAge.bind(this)
    this.handleDepartment = this.handleDepartment.bind(this)
    this.handleDesignation = this.handleDesignation.bind(this)
    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handleGender = this.handleGender.bind(this)
    this.handleUser_Id = this.handleUser_Id.bind(this)
     
  }
  componentDidMount(){
    $('label').addClass('active')
}
  handleCreate(){
    if(!this.state.user_id || !this.state.first_name || !this.state.last_name || !this.state.age || !this.state.gender || !this.state.designation || !this.state.department){
      window.Materialize.toast('All the * marked fields are required', 4000)
    }else
    {
      axios({
        method: 'post',
        url: 'http://localhost:3001/employees/create',
        data:{
          user_id: this.state.user_id,
          first_name:this.state.first_name,
          last_name:this.state.last_name,
          password:this.state.password,
          age:this.state.age,
          gender: this.state.gender,
          department:this.state.department,
          designation:this.state.designation,
        },
        withCredentials: true
      })
      .then((res)=>{
        if(res.data.message === 'employee created'){
          this.setState({
            user_id: '',
            first_name: '',
            last_name: '',
            age: '',
            gender: '',
            department: '',
            designation: '',
          })
          window.Materialize.toast('Employee added', 4000)
          // this.props.setHandleListRequest(true)
        }else if(res.data.error[0].message ==='first name should be alphabets'){
          window.Materialize.toast('firstname should be filled and should be only letters',3000)
        }else if(res.data.error[0].message ==='last name should be alphabets'){
          window.Materialize.toast('lastname should be filled and should be only letters',3000)
        }else if(res.data.error[0].message ==='designation should be alphabets'){
          window.Materialize.toast('designation should be filled and should be only letters',3000)
        }
      })
    }
    
   
  }
  handleFirstname(e){
    this.setState({
    first_name: e.target.value
      
    })
  }
  handleLastname(e){
    this.setState({
    last_name: e.target.value
      
    })
  }
  handleAge(e){
    this.setState({
    age: e.target.value
      
    })
  }
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  handleDepartment(e){
    this.setState({
    department: e.target.value
      
    })
  }
  handleDesignation(e){
    this.setState({
    designation: e.target.value
      
    })
  }
  handleGender(e){
    this.setState({
      gender: e.target.value
    })
  }
  handleUser_Id(e){
    this.setState({
      user_id: e.target.value
    })
  }

  render() {
    return (
      <div style={{marginLeft : '1%', marginRight : '1%'}} >
      <h3 className='heading'>Add a Employee</h3>
        <Row>
        <Input  onChange={this.handleUser_Id}s={6} value={this.state.user_id} label="* Employee Id" />
          <Input  onChange={this.handleFirstname}s={6} value={this.state.first_name} label="* First Name" />
          <Input  onChange={this.handleLastname} s={6} value={this.state.last_name} label="* Last Name" />
          <Input type="number" min='0'label="* age"value={this.state.age} onChange={this.handleAge}s={6} />
          <Input s={6} type='select' label="* gender"value={this.state.gender} onChange={this.handleGender}defaultValue='Other'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Input>
          <Input s={6} type='select' label="* Department" defaultValue='Other'onChange={this.handleDepartment}defaultValue='Other'>
            <option value='Hr'>HR</option>
            <option value='Delivery'>Delivery</option>
            <option value='Developer'>Developer</option>
            <option value='Other'>Other</option>
            
          </Input>
          <Input type="text" value={this.state.designation}label="* Designation"onChange={this.handleDesignation} s={6} />
        </Row>
          <Button className='addbtn' onClick={this.handleCreate}>Add</Button>
      </div>

    )
  }
}

export default EmployeeAdd