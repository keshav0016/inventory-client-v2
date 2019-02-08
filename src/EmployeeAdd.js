import React, { Component } from 'react';
import axios from 'axios';
import {Row, Input, Button, Col} from 'react-materialize'
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import {
  Redirect, Link
} from 'react-router-dom';
import swal from 'sweetalert';


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
      role: {
        value: "select",
        showError: false,
        error: "",
      },
      department: {
        value: "HR",
        showError: false,
        error: "",
      },
      designation: {
        value: "select",
        showError: false,
        error: "",
      },
      user_id: {
        value: "",
        showError: false,
        error: "",
      },
      email : {
        value: "",
        showError: false,
        error: "",
      },
      idNo : {
        value: '',
        showError: false,
        error: ''
      },
      addEmployee: true,
      redirect: false,
      login : false
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleAge = this.handleAge.bind(this)
    this.handleDepartment = this.handleDepartment.bind(this)
    this.handleDesignation = this.handleDesignation.bind(this)
    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handleGender = this.handleGender.bind(this)
    this.handleUser_Id = this.handleUser_Id.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.handleRole = this.handleRole.bind(this)
    this.handleIdno = this.handleIdno.bind(this)

  }
  componentDidMount(){
    $(document).ready(function(){
      $('label').addClass('active');
  }) 
  }

  componentDidUpdate(){
    $(document).ready(function(){
      $('label').addClass('active');
  }) 
}
  handleCreate(){
    var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
    var nameReg = /^\s{0,}[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*\s{0,}$/;
    // var name = /^\s{0,}[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*\s{0,}$/;
    var userIdReg = /^[0-9]+$/;
    var idNoReg =/^\s{0,}[0-9,.+-@#%^&*'":;()]+(\s{1,}[0-9,.+-@#%^&*'":;()]+)*\s{0,}$/
    
    if(!userIdReg.test(this.state.user_id.value)){
      this.setState({
        user_id: Object.assign(this.state.user_id, {
            error: "Employee Id should be a number",
            showError: true,
        })
      })
    } 
    if (!this.state.user_id.value){
      this.setState({
        user_id: Object.assign(this.state.user_id, {
            error: "Employee Id is required",
            showError: true,
        })
      })
    }
    if (userIdReg.test(this.state.user_id.value)){
      this.setState({
        user_id: Object.assign(this.state.user_id, {
            error: '',
            showError: false,
        })
      })
    }
    if(!nameReg.test(this.state.first_name.value)){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
          error: "First name should be alphabets",
          showError: true,
        })
      })
    }
    if(!this.state.first_name.value ){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
          error: "First name  is required",
          showError: true,
        })
      })
    }
    if(nameReg.test(this.state.first_name.value)){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
            error: '',
            showError: false,
        })
      })
    }
    if(!nameReg.test(this.state.last_name.value)){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
          error: "Last name should be alphabets",
          showError: true,
        }),
      })
    }
    if(!this.state.last_name.value){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
          error: "Last name  is required",
          showError: true,
        }),
      })
    }
    if(nameReg.test(this.state.last_name.value)){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
            error: '',
            showError: false,
        })
      })
    }
    if(!this.state.gender.value){
      this.setState({
        gender: Object.assign(this.state.gender, {
          error: "Gender  is required",
          showError: true,
        }),
      })
    }
    if(this.state.gender.value){
      this.setState({
        gender: Object.assign(this.state.gender, {
            error: '',
            showError: false,
        })
      })
    }
    

    if(this.state.age.value < 18){
      this.setState({
        age: Object.assign(this.state.age, {
          error: "Age should be Greater than or equal to 18",
          showError: true,
        })
      })
    }
    if(this.state.age.value > 70){
      this.setState({
        age: Object.assign(this.state.age, {
          error: "Age should not be Greater than 70",
          showError: true,
        })
      })
    }
    if(!this.state.age.value) {
      this.setState({
        age: Object.assign(this.state.age, {
          error: "Age  is required",
          showError: true,
        })
      })
    }
    if(this.state.age.value >= 18 && this.state.age.value <= 70){
      this.setState({
        age: Object.assign(this.state.age, {
            error: '',
            showError: false,
        })
      })
    }

    if(!this.state.department.value){
      this.setState({
        department: Object.assign(this.state.department, {
          error: "Department is required",
          showError: true,
        }),
      })
    }
    if(this.state.department.value === 'select'){
      this.setState({
        department: Object.assign(this.state.department, {
          error: "Department is required",
          showError: true,
        }),
      })
    }
    if(this.state.department.value !== 'select'){
      this.setState({
        department: Object.assign(this.state.department, {
          error: "",
          showError: false,
        }),
      })
    }
    if(this.state.designation.value === 'select'){
        this.setState({
          designation: Object.assign(this.state.designation, {
            error: "Designation is required",
            showError: true,
          }),
        })
    }
    if(this.state.designation.value !== 'select'){
      this.setState({
        designation: Object.assign(this.state.designation, {
          error: "",
          showError: false,
        })
      })
    }
    if(!reg.test(this.state.email.value)){
        this.setState({
            email: Object.assign(this.state.email, {
                error:"Enter Valid West Agile Lab's Email",
                showError:true
            }),
        })
    }
    if(!this.state.email.value){
      this.setState({
        email: Object.assign(this.state.email, {
            error:"Email is required",
            showError:true
        }),
    })
    }
    if(reg.test(this.state.email.value)){
      this.setState({
        email: Object.assign(this.state.email, {
            error: '',
            showError:false
        }),
      })
    }
    if(this.state.role.value === 'select'){
      this.setState({
        role: Object.assign(this.state.role, {
          error: "Role is required",
          showError: true,
        }),
      })
    }
    if(this.state.role.value !== 'select'){
      this.setState({
        role: Object.assign(this.state.role, {
          error: "",
          showError: false,
        }),
      })
    }
    if(!idNoReg.test(this.state.idNo.value)) {
      this.setState({
        idNo : Object.assign(this.state.idNo, {
          error : 'Enter a valid id no',
          showError : true
        })
      })
    }
    if(!this.state.idNo.value) {
      this.setState({
        idNo : Object.assign(this.state.idNo, {
          error : 'Id no is reqruired',
          showError : true
        })
      })
    }

    if(idNoReg.test(this.state.idNo.value)) {
      this.setState({
        idNo : Object.assign(this.state.idNo, {
          error : '',
          showError : false
        })
      })
    }
    if(userIdReg.test(this.state.user_id.value) && !this.state.role.showError && !this.state.first_name.showError && !this.state.last_name.showError && !this.state.age.showError && !this.state.gender.showError && this.state.department.value && this.state.designation.value !== 'select' && !this.state.email.showError && !this.state.idNo.showError){
      this.setState({
        disabled: true
      })
      axios({
        method: 'post',
        url: `${baseUrl}/employees/create`,
        data:{
          user_id: this.state.user_id.value,
          first_name:this.state.first_name.value.trim(),
          last_name:this.state.last_name.value.trim(),
          age:this.state.age.value,
          gender: this.state.gender.value,
          department:this.state.department.value,
          designation:this.state.designation.value,
          email:this.state.email.value,
          role: this.state.role.value,
          idNo : this.state.idNo.value
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
            role: {
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
            idNo : {
              value : '',
              showError : false,
              error : ''
            },
            addEmployee: false,
            redirect: true
          })
          swal("Employee has been added",{
            buttons: false,
            timer: 2000,
          });

          $('.modal-close').trigger('click')
          // $('.modal').hide()
          // $('.modal-overlay').hide()
          // setTimeout((function() {
          //   window.location.reload();
          // }), 2100);

          // this.props.setHandleListRequest(true)
        }else if(res.data.message === 'admin created'){
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
            role: {
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
            idNo: {
              value: "",
              showError: false,
              error: "",
            },
            addEmployee: false,
            redirect: true
          })
          swal("Admin has been added", {
            buttons : false,
            timer : 2000,
          });
       
        }
        else if(res.data.error[0].message ==='first name should be alphabets'){
          this.setState({
            first_name: Object.assign(this.state.first_name, {
              error: "First name should be only letters",
              showError: true,
            })
          })
        }else if(res.data.error[0].message ==='last name should be alphabets'){
          this.setState({
            last_name: Object.assign(this.state.last_name, {
              error: "Last name  should be only letters",
              showError: true,
            }),
          })
        }else if(res.data.error[0].message ==='designation should be alphabets'){
          this.setState({
            designation: Object.assign(this.state.designation, {
              error: "Designation should be only letters",
              showError: true,
            }),
          })
        }else if(res.data.error[0].message === 'user_id must be unique'){
          this.setState({
            user_id: Object.assign(this.state.user_id, {
              error: "Employee Id is already given to another Employee",
              showError: true,
            })
          })
  
        }else if(res.data.error[0].message === 'email must be unique'){
          this.setState({
            email: Object.assign(this.state.email, {
              error: "Email is already taken by an another Employee",
              showError: true,
            })
          })
  
        }
      })
      .catch(error => {
        if(error.response.status === 401){
          this.setState({
            login: true
          })
        }
      })
    }
    
  }
  handleFirstname(e){
    var nameReg = /^\s{0,}[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*\s{0,}$/;

    if(nameReg.test(e.target.value)){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
          value: e.target.value,
          showError : false,
          error : ''
        })  
      })
    }
    if(!nameReg.test(e.target.value)){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
          value : '',
          error: "First name should be alphabets",
          showError: true
        })
      })
    }
    if(!e.target.value){
      this.setState({
        first_name: Object.assign(this.state.first_name, {
          error: "First name  is required",
          showError: true,
        })
      })
    }
  }
  handleLastname(e){
    var nameReg = /^\s{0,}[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*\s{0,}$/;

    if(nameReg.test(e.target.value)){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
          value: e.target.value,
          showError : false,
          error : ''
        })  
      })
    }
    if(!nameReg.test(e.target.value)){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
          error: "Last name should be alphabets",
          showError: true,
        })
      })
    }
    if(!e.target.value){
      this.setState({
        last_name: Object.assign(this.state.last_name, {
          error: "Last name  is required",
          showError: true,
        })
      })
    }
  }
  handleAge(e){
    if(e.target.value < 70 && e.target.value > 18) {
      this.setState ({
        age : Object.assign(this.state.age, {
          value : e.target.value,
          error : '',
          showError : false
        })
      })
    }
    if(e.target.value >70) {
      this.setState ({
        age : Object.assign(this.state.age, {
          error : 'Age should be less than 70',
          showError : true
        })
      })
    }
    if(e.target.value < 18) {
      this.setState ({
        age : Object.assign(this.state.age, {
          error : 'Age should be greater than 18',
          showError : true
        })
      })
    }if(!e.target.value) {
      this.setState ({
        age : Object.assign(this.state.age, {
          error : "Age is required",
          showError : true
        })
      })
    } 
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
    if(e.target.value === 'select') {
      this.setState({
        gender: Object.assign(this.state.gender, {
          error: "Gender  is required",
          showError: true,
        }),
      })
    } else {
      this.setState({
        gender: Object.assign(this.state.gender, {
          value: e.target.value,
          showError : false,
          error : ''
        })  
      })
    }
  }
  handleRole(e){
    this.setState({
      role: Object.assign(this.state.role, {
        value: e.target.value
      })  
    })
  }
  handleUser_Id(e){
    var userIdReg = /^[0-9]+$/;
    if (userIdReg.test(e.target.value)){
      this.setState({
        user_id:Object.assign(this.state.user_id, {
          value: e.target.value,
          showError : false,
          error : ''
        })  
      })
    }
    if(!userIdReg.test(e.target.value)){
      this.setState({
        user_id: Object.assign(this.state.user_id, {
            error: "Employee Id should be a number",
            showError: true,
            value : ''
        })
      })
    } 
    if (!e.target.value){
      this.setState({
        user_id: Object.assign(this.state.user_id, {
            error: "Employee Id is required",
            showError: true,
            value : ''
        })
      })
    }
  }
  handleIdno (e) {
    var idNoReg =/^\s{0,}[0-9,.+-@#%^&*'":;()]+(\s{1,}[0-9,.+-@#%^&*'":;()]+)*\s{0,}$/

    if(!idNoReg.test(e.target.value)) {
      this.setState({
        idNo : Object.assign(this.state.idNo, {
          error : 'Enter a valid id no',
          showError : true
        })
      })
    }
    if(!e.target.value) {
      this.setState({
        idNo : Object.assign(this.state.idNo, {
          error : 'Id no is reqruired',
          showError : true,
          value : ''
        })
      })
    }
    if(idNoReg.test(e.target.value)) {
      this.setState ({
        idNo : Object.assign(this.state.idNo, {
          value : e.target.value,
          error : '',
          showError : false
        })
      })
    }
    
  }
  setEmail(e){
    var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;

    if(reg.test(e.target.value)){
      this.setState({
        email : Object.assign(this.state.email, {
          value: e.target.value,
          showError : false,
          error : ''
        })  
      })
    }
    if(!reg.test(e.target.value)){
      this.setState({
        email : Object.assign(this.state.email, {
          error:"Enter Valid West Agile Lab's Email",
          showError: true,
          value : e.target.value
        })
      })
    }
    if(!e.target.value){
      this.setState({
        email : Object.assign(this.state.email, {
          error: "Email  is required",
          showError: true,
        })
      })
    }
  }
  render() {
    var addEmployeeForm = (
      <div className="listComponent" >
      <h3 className="title">Add Employee</h3>
        <Row>
          <Input onChange={this.handleUser_Id}s={12} m={6} l={6} value={this.state.user_id.value} label="Employee Id" error={this.state.user_id.showError ? this.state.user_id.error : null} />
          <Input  onChange={this.handleFirstname}s={12} m={6} l={6} defaultValue={this.state.first_name.value.trim()} label="First Name" error={this.state.first_name.showError ? this.state.first_name.error : null}/>
          <Input  onChange={this.handleLastname} s={12} m={6} l={6} defaultValue={this.state.last_name.value.trim()} label="Last Name" error={this.state.last_name.showError ? this.state.last_name.error : null}/>
          <Input type="number" label="Age" onChange={this.handleAge}s={12} m={6} l={6} error={this.state.age.showError ? this.state.age.error : null}/>
          <Input s={12} m={6} l={6} type='select'  label="Gender" value={this.state.gender.value} onChange={this.handleGender} error={this.state.gender.showError ? this.state.gender.error : null}>
            <option value='select'>select</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Input>
          <Input s={12} m={6} l={6}  label="Email*" type = "email" value={this.state.email.value} onChange={this.setEmail} error={this.state.email.showError ? this.state.email.error : null}/>
          <Input s={12} m={6} l={6} type='select' label="Department" defaultValue='HR'onChange={this.handleDepartment} error={this.state.department.showError ? this.state.department.error : null}>
            <option value='select'>select</option>
            <option value='Leadership'>Leadership</option>
            <option value='HR'>HR</option>
            <option value='Delivery'>Delivery</option>
            <option value='Finance/Accounting'>Finance/Accounting</option>
            <option value='Pre sales'>Pre sales</option>
            <option value='Developer/Designer'>Developer/Designer</option>
            <option value='Testing'>Testing</option>
            <option value='Operations'>Operations</option>
            <option value='Digital Marketing'>Digital Marketing</option>
          </Input>
          {this.state.department.value === 'Developer/Designer' ? <Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Sr.Software DeveOps Engineer/Team Lead'>Sr.Software DeveOps Engineer/Team Lead</option>
            <option value='Sr.Software DeveOps Engineer'>Sr.Software DeveOps Engineer</option>
            <option value='Team Lead'>Team Lead</option>
            <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
            <option value='Software Development Engineer'>Software Development Engineer</option>
            <option value='Senior Product Designer'>Senior Product Designer</option>
            <option value='UI/UX Designer'>UI/UX Designer</option>
            <option value='Intern'>Intern</option>
          </Input> : null}
          {this.state.department.value === 'Operations' ? <Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Operations Manager'>Operations Manager</option>
          </Input> : null}
          {this.state.department.value === 'Digital Marketing' ? <Input s={12} m={6} l={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Chief of digital marketing'>Chief of digital marketing</option>
            <option value='Content writer'>Content writer</option>
            <option value='Intern'>Intern</option>
          </Input> : null }
          {this.state.department.value === 'HR' ? <Input s={12} m={6} l={6} type='select'  label="Designation" defaultValue='Select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Sr.HR Manager'>Sr.HR Manager</option>
            <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
            <option value='HR Admin'>HR Admin</option>
            <option value='Intern'>Intern</option>
          </Input> : null }
          {this.state.department.value === 'Delivery' ? <Input s={12} m={6} l={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Delivery Manager'>Delivery Manager</option>
            <option value='Sr.Project Manager'>Sr.Project Manager</option>
            <option value='Project Manager'>Project Manager</option>
            <option value='Intern'>Intern</option>
          </Input> : null }
          {this.state.department.value === 'Leadership' ?<Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
          <option value='select'>select</option>
          <option value='Managing Director'>Managing Director</option></Input>: null }
          
          {this.state.department.value === 'Finance/Accounting' ?<Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
            <option value='select'>select</option>
            <option value='Finance Director'>Finance Director</option>
            <option value='Intern'>Intern</option>
          </Input> : null}
          {this.state.department.value === 'Pre sales' ? <Input s={12} m={6} l={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='Lead Presales'>Lead Presales</option>
            <option value='Presales Associate'>Presales Associate</option>
            <option value='Intern'>Intern</option>
          </Input> : null }
          {this.state.department.value === 'Testing' ? <Input s={12} m={6} l={6} type='select'  label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
            <option value='select'>select</option>
            <option value='QA Lead'>QA Lead</option>
            <option value='Software Test Engineer'>Software Test Engineer</option>
            <option value='Intern'>Intern</option>
          </Input> : null}
        <Input s={12} m={6} l={6} type='select' label="Role" onChange={this.handleRole} error={this.state.role.showError ? this.state.role.error : null}>
            <option value='select'>select</option>
            <option value='Admin'>Admin</option>
            <option value='Employee'>Employee</option>
          </Input>
          <Input type="text" label="Id serial no" onChange={this.handleIdno}s={12} m={6} l={6} error={this.state.idNo.showError ? this.state.idNo.error : null}/>
        </Row>
        {/* <div className="splitModalButtons" >
        <Row>
          <Button className='addbtn' onClick={this.handleCreate}>Add</Button>
        </Row>
        </div> */}
        <div className="splitModalButtons" >
            <Row>
                <Col offset={'l6'} style={{float: 'right'}}>
                    <Button onClick = {this.handleCreate} disabled={this.state.disabled}>SUBMIT</Button>
                    <Link to='/admin/employees'><Button className="cancelButton modal-close">Cancel</Button></Link>                            
                </Col>
            </Row>
        </div>
      </div>

    );

    return(
      <div>
      {this.state.addEmployee ? addEmployeeForm : null}
      {this.state.redirect ? (<Redirect  to ={{pathname:'/admin/employees'}}/>) : null}
      {this.state.login ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
      </div>
    )
  }
}

export default EmployeeAdd