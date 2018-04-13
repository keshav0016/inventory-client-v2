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
      department: 'HR',
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
        }else if(res.data.message ==='user exists'){
          window.Materialize.toast('user already exists',3000)

        
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
          <Input s={6} type='select' label="* Department" defaultValue='HR'onChange={this.handleDepartment}>
            <option value='HR'>HR</option>
            <option value='Delivery'>Delivery</option>
            <option value='Finance/Accounting'>Finance/Accounting</option>
            <option value='Pre sales'>Pre sales</option>
            <option value='Developer/Designer'>Developer/Designer</option>
            <option value='Testing'>Testing</option>
          </Input>
          {this.state.department === 'Developer/Designer' ? <Input s={6} type='select' label="* Designation" defaultValue='Developer/Designer'onChange={this.handleDesignation}>
            <option value='Team Lead'>Team Lead</option>
            <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
            <option value='Software Development Engineer'>Software Development Engineer</option>
            <option value='Senior Product Designer'>Senior Product Designer</option>
            <option value='UI/UX Designer'>UI/UX Designer</option>
            
            
          </Input> : null}
          {this.state.department === 'HR' ? <Input s={6} type='select' label="* Designation" defaultValue='Sr.HR Manager'onChange={this.handleDesignation}>
            <option value='Sr.HR Manager'>Sr.HR Manager</option>
            <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
          </Input> : null }
          {this.state.department === 'Delivery' ? <Input s={6} type='select' label="* Designation" defaultValue='Delivery Manager'onChange={this.handleDesignation}>
            <option value='Delivery Manager'>Delivery Manager</option>
            <option value='Sr.Project Manager'>Sr.Project Manager</option>
            <option value='Project Manager'>Project Manager</option>
          </Input> : null }
          {this.state.department === 'Finance/Accounting' ?   <Input s={6} label="* Designation" defaultValue='Finance Director' /> : null }
          {this.state.department === 'Pre sales' ? <Input s={6} type='select' label="* Designation" defaultValue='Lead Presales'onChange={this.handleDesignation}>
            <option value='Lead Presales'>Lead Presales</option>
            <option value='Presales Associate'>Presales Associate</option>
          </Input> : null }
          {this.state.department === 'Testing' ? <Input s={6} type='select' label="* Designation" defaultValue='QA Lead'onChange={this.handleDesignation}>
            <option value='QA Lead'>QA Lead</option>
            <option value='Software Test Development Engineer'>Software Test Development Engineer</option>
          </Input> : null}
        </Row>
          <Button className='addbtn' onClick={this.handleCreate}>Add</Button>
      </div>

    )
  }
}

export default EmployeeAdd