import React, { Component } from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import {
  Redirect
} from 'react-router-dom';

class EmployeeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: {
        value: "",
        showError: false,
        error: "",
      },
      last_name: {
        value: "",
        showError: false,
        error: "",
      },
      age: {
        value: "",
        showError: false,
        error: "",
      },
      gender: {
        value: "",
        showError: false,
        error: "",
      },
      department: {
        value: "HR",
        showError: false,
        error: "",
      },
      designation: {
        value: "",
        showError: false,
        error: "",
      },
      user_id: {
        value: "",
        showError: false,
        error: "",
      },
      addEmployee: true,
      redirect: false
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
    if (!this.state.user_id.value){
      this.setState({
        user_id: Object.assign(this.state.user_id, {
            error: "Employee Id is required",
            showError: true,
        })
      })
    } if( !this.state.first_name.value ){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
          error: "First name  is required",
          showError: true,
        })
      })
    }if(!this.state.last_name.value){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
          error: "Last name  is required",
          showError: true,
        }),
      })
    }if(!this.state.gender.value){
      this.setState({
        gender: Object.assign(this.state.gender, {
          error: "Gender  is required",
          showError: true,
        }),
      })
    }if(!this.state.age.value) {
      this.setState({
        age: Object.assign(this.state.age, {
          error: "Age  is required",
          showError: true,
        })
      })
    }if(!this.state.department.value){
      this.setState({
        department: Object.assign(this.state.department, {
          error: "Department is required",
          showError: true,
        }),
      })
    }if(!this.state.designation.value){
      this.setState({
        designation: Object.assign(this.state.designation, {
          error: "Designation is required",
          showError: true,
        }),
      })
    }
    else{
      axios({
        method: 'post',
        url: `${baseUrl}/employees/create`,
        data:{
          user_id: this.state.user_id.value,
          first_name:this.state.first_name.value,
          last_name:this.state.last_name.value,
          age:this.state.age.value,
          gender: this.state.gender.value,
          department:this.state.department.value,
          designation:this.state.designation.value,
        },
        withCredentials: true
      })
      .then((res)=>{
        if(res.data.message === 'employee created'){
          this.setState({
            first_name: {
              value: "",
              showError: false,
              error: "",
            },
            last_name: {
              value: "",
              showError: false,
              error: "",
            },
            age: {
              value: "",
              showError: false,
              error: "",
            },
            gender: {
              value: "",
              showError: false,
              error: "",
            },
            department: {
              value: "HR",
              showError: false,
              error: "",
            },
            designation: {
              value: "",
              showError: false,
              error: "",
            },
            user_id: {
              value: "",
              showError: false,
              error: "",
            },
            addEmployee: false,
            redirect: true
          })
          window.Materialize.toast('Employee added', 4000)
          // this.props.setHandleListRequest(true)
        }else if(res.data.error[0].message ==='first name should be alphabets'){
          window.Materialize.toast('firstname should be only letters',3000)
        }else if(res.data.error[0].message ==='last name should be alphabets'){
          window.Materialize.toast('lastname should be only letters',3000)
        }else if(res.data.error[0].message ==='designation should be alphabets'){
          window.Materialize.toast('designation should be only letters',3000)
        }else if(res.data.error[0].message === 'user_id must be unique'){
          window.Materialize.toast('user id is already given to another user',3000)

        }
      })
    }
    
  }
  handleFirstname(e){
    this.setState({
      first_name: Object.assign(this.state.first_name, {
        value: e.target.value
      })  
      
    })
  }
  handleLastname(e){
    this.setState({
      last_name: Object.assign(this.state.last_name, {
        value: e.target.value
      })  
    })
  }
  handleAge(e){
    this.setState({
      age: Object.assign(this.state.age, {
        value: e.target.value
      })  
      
    })
  }
  handleDepartment(e){
    this.setState({
      department: Object.assign(this.state.department, {
        value: e.target.value
      })  
        
    })
  }
  handleDesignation(e){
    this.setState({
      designation: Object.assign(this.state.designation, {
        value: e.target.value 
      })  
      
    })
  }
  handleGender(e){
    this.setState({
      gender: Object.assign(this.state.gender, {
        value: e.target.value
      })  
    })
  }
  handleUser_Id(e){
    this.setState({
      user_id:Object.assign(this.state.user_id, {
        value: e.target.value
      })  
    })
  }

  render() {
    var addEmployeeForm = (
      <div style={{marginLeft: '30px',marginRight: '30px'}} >
      <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Add Employee</h3>
        <Row>
        <Input  onChange={this.handleUser_Id}s={6} value={this.state.user_id.value} label="Employee Id" error={this.state.user_id.showError ? this.state.user_id.error : null} />
          <Input  onChange={this.handleFirstname}s={6} value={this.state.first_name.value} label="First Name" error={this.state.first_name.showError ? this.state.first_name.error : null}/>
          <Input  onChange={this.handleLastname} s={6} value={this.state.last_name.value} label="Last Name" error={this.state.last_name.showError ? this.state.last_name.error : null}/>
          <Input type="number" min='0'label="Age" value={this.state.age.value} onChange={this.handleAge}s={6} error={this.state.age.showError ? this.state.age.error : null}/>
          <Input s={6} type='select'  label="Gender" value={this.state.gender.value} onChange={this.handleGender} error={this.state.gender.showError ? this.state.gender.error : null}>
            <option value='select'>select</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Input>
          <Input s={6} type='select' label="Department" defaultValue='HR'onChange={this.handleDepartment} error={this.state.department.showError ? this.state.department.error : null}>
            <option value='select'>select</option>
            <option value='HR'>HR</option>
            <option value='Delivery'>Delivery</option>
            <option value='Finance/Accounting'>Finance/Accounting</option>
            <option value='Pre sales'>Pre sales</option>
            <option value='Developer/Designer'>Developer/Designer</option>
            <option value='Testing'>Testing</option>
          </Input>
          {this.state.department.value === 'Developer/Designer' ? <Input s={6} type='select' label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Team Lead'>Team Lead</option>
            <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
            <option value='Software Development Engineer'>Software Development Engineer</option>
            <option value='Senior Product Designer'>Senior Product Designer</option>
            <option value='UI/UX Designer'>UI/UX Designer</option>
            
            
          </Input> : null}
          {this.state.department.value === 'HR' ? <Input s={6} type='select'  label="Designation" defaultValue='Select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Sr.HR Manager'>Sr.HR Manager</option>
            <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
          </Input> : null }
          {this.state.department.value === 'Delivery' ? <Input s={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Delivery Manager'>Delivery Manager</option>
            <option value='Sr.Project Manager'>Sr.Project Manager</option>
            <option value='Project Manager'>Project Manager</option>
          </Input> : null }
          {this.state.department.value === 'Finance/Accounting' ?<Input s={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
          <option value='select'>select</option>
          <option value='Finance Director'>Finance Director</option></Input>: null }
          {this.state.department.value === 'Pre sales' ? <Input s={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Lead Presales'>Lead Presales</option>
            <option value='Presales Associate'>Presales Associate</option>
          </Input> : null }
          {this.state.department.value === 'Testing' ? <Input s={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='QA Lead'>QA Lead</option>
            <option value='Software Test Development Engineer'>Software Test Development Engineer</option>
          </Input> : null}
        </Row>
          <Button className='addbtn' onClick={this.handleCreate}>Add</Button>
      </div>

    );

    return(
      <div>
      {this.state.addEmployee ? addEmployeeForm : null}
      {this.state.redirect ? (<Redirect  to ={{pathname:'/admin/employees'}}/>) : null}
      </div>
    )
  }
}

export default EmployeeAdd