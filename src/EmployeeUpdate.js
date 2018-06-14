// import React, {Component} from 'react';
// import axios from 'axios';
// import {Row, Input, Button} from 'react-materialize'
// import $ from 'jquery'
// import { baseUrl } from './config';

// class EmployeeUpdate extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             user_id: this.props.user.user_id,
//             first_name: this.props.user.first_name,
//             last_name: this.props.user.last_name,
//             age: this.props.user.age,
//             gender: this.props.user.gender,
//             department: this.props.user.department,
//             designation: this.props.user.designation,
//             email: this.props.user.email
//         }
//         this.handleUpdate = this.handleUpdate.bind(this)
//         this.handleAge = this.handleAge.bind(this)
//         this.handleDepartment = this.handleDepartment.bind(this)
//         this.handleDesignation = this.handleDesignation.bind(this)
//         this.handleFirstname = this.handleFirstname.bind(this)
//         this.handleLastname = this.handleLastname.bind(this)
//         this.handleGender = this.handleGender.bind(this)
//         this.handleUserid = this.handleUserid.bind(this)
//         this.setFields = this.setFields.bind(this)
//         this.handleEmail = this.handleEmail.bind(this)

//     }
//     handleUserid(e){
//         this.setState({
//             user_id: e.target.value
//         })
//     }
//     handleFirstname(e){
//         this.setState({
//         first_name: e.target.value

//         })
//     }
//     handleLastname(e){
//         this.setState({
//         last_name: e.target.value

//         })
//     }
//     handleAge(e){
//         this.setState({
//         age: e.target.value

//         })
//     }
//     handleEmail(e){
//         this.setState({
//             email: e.target.value
//         })
//     }
//     handleDepartment(e){
//         this.setState({
//         department: e.target.value

//         })
//     }
//     handleDesignation(e){
//         this.setState({
//         designation: e.target.value

//         })
//     }
//     handleGender(e){
//         this.setState({
//             gender: e.target.value
//         })
//     }
//     componentDidMount(){
//         $('label').addClass('active')
//     }
//    handleUpdate(){
//        if(this.props.user.department !== this.state.department && this.props.user.designation === this.state.designation){
//         window.Materialize.toast('if you change the department, designation should also be changed', 4000)
//        }else{
//         axios({
//             method: 'post',
//             url: `${baseUrl}/employees/update`,
//             data:{
//                  user_id: this.state.user_id,
//                  first_name:this.state.first_name,
//                  last_name:this.state.last_name,
//                  age:this.state.age,
//                  gender: this.state.gender,
//                  department:this.state.department,
//                  designation:this.state.designation,
//                  email:this.state.email 
//             },
//             withCredentials: true
//         })
//         .then((res) => {
//          if(res.data.message === 'employee has been updated'){
//              window.Materialize.toast('Employee Edited', 4000)
//             this.props.setHandleListRequest()

//          }else if(res.data.error[0].message){
//             window.Materialize.toast(res.data.error[0].message, 4000)

//          }

//         })
//         .catch(error => {
//           window.Materialize.toast('can not edit employee', 4000)

//         })
//        }

//     }
//     setFields(){
//         this.setState({
//             user_id: this.state.user_id,
//             first_name: this.state.first_name,
//             last_name: this.state.last_name,
//             age: this.state.age,
//             gender: this.state.gender,
//             department: this.state.department,
//             designation: this.state.designation,
//             email: this.state.email
//         })
//     }
//     render() {

//         return (           
//             <div className="no-footer" style={{padding: '20px'}}>           
//                 <Row>
//                 <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Update Employee</h3 >
//                 <Input  defaultValue={this.state.user_id} onChange={this.handleUserid}s={12} m={6} l={6} label="User Id" />
//                  <Input  defaultValue={this.state.first_name} onChange={this.handleFirstname}s={12} m={6} l={6} label="First Name" />
//                     <Input  defaultValue={this.state.last_name}onChange={this.handleLastname} s={12} m={6} l={6}label="Last Name" />
//                     <Input type="number"min='0' label="age" defaultValue={this.state.age}onChange={this.handleAge}s={12} m={6} l={6} />
//                     <Input s={12} m={6} l={6} type='select' label="gender"defaultValue={this.state.gender} onChange={this.handleGender}>
//                         <option value='Male'>Male</option>
//                         <option value='Female'>Female</option>
//                         <option value='Other'>Other</option>

//                     </Input>
//                     <Input s={12} m={6} l={6}  label="Email*" type = "email" onChange={this.setEmail} defaultValue={this.state.email} />
//                     <Input s={12} m={6} l={6} type='select' label="Department" onChange={this.handleDepartment}defaultValue={this.state.department}>
//                     <option value='HR'>HR</option>
//                     <option value='Delivery'>Delivery</option>
//                     <option value='Finance/Accounting'>Finance/Accounting</option>
//                     <option value='Pre sales'>Pre sales</option>
//                     <option value='Developer/Designer'>Developer/Designer</option>
//                     <option value='Testing'>Testing</option>

//                     </Input>
//                     <Input type="text"  defaultValue={this.state.designation}label="Current Designation"onChange={this.handleDesignation} s={12} m={6} l={6} disabled/>


//                     {this.state.department === 'Developer/Designer' ? <Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
//                         <option value='select'>select</option>
//                         <option value='Team Lead'>Team Lead</option>
//                         <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
//                         <option value='Software Development Engineer'>Software Development Engineer</option>
//                         <option value='Senior Product Designer'>Senior Product Designer</option>
//                         <option value='UI/UX Designer'>UI/UX Designer</option>


//                     </Input> : null}
//                     {this.state.department === 'HR' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='Select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
//                         <option value='select'>select</option>
//                         <option value='Sr.HR Manager'>Sr.HR Manager</option>
//                         <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
//                     </Input> : null }
//                     {this.state.department === 'Delivery' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
//                         <option value='select'>select</option>
//                         <option value='Delivery Manager'>Delivery Manager</option>
//                         <option value='Sr.Project Manager'>Sr.Project Manager</option>
//                         <option value='Project Manager'>Project Manager</option>
//                     </Input> : null }
//                     {this.state.department === 'Finance/Accounting' ?<Input s={12} m={6} l={6} type='select' label="New Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
//                     <option value='select'>select</option>
//                     <option value='Finance Director'>Finance Director</option></Input>: null }
//                     {this.state.department === 'Pre sales' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
//                         <option value='select'>select</option>
//                         <option value='Lead Presales'>Lead Presales</option>
//                         <option value='Presales Associate'>Presales Associate</option>
//                     </Input> : null }
//                     {this.state.department === 'Testing' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
//                         <option value='select'>select</option>
//                         <option value='QA Lead'>QA Lead</option>
//                         <option value='Software Test Development Engineer'>Software Test Development Engineer</option>
//                     </Input> : null}
//                 </Row>
//                  <Button onClick={this.handleUpdate}>Edit</Button>
//                  <Button className="modal-close" onClick={this.setFields} style={{margin: '0 20px'}}>Cancel</Button>
//             </div>
//         )
//     }


// }
// export default EmployeeUpdate

import React, { Component } from 'react';
import axios from 'axios';
import { Row, Input, Button } from 'react-materialize'
import './Employee.css'
import $ from 'jquery'
import { baseUrl } from './config';
import {
    Redirect
} from 'react-router-dom';

class EmployeeUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: {
                value: this.props.user.first_name,
                showError: false,
                error: "",
            },
            last_name: {
                value: this.props.user.last_name,
                showError: false,
                error: "",
            },
            age: {
                value: this.props.user.age,
                showError: false,
                error: "",
            },
            gender: {
                value: this.props.user.gender,
                showError: false,
                error: "",
            },
            department: {
                value: this.props.user.department,
                showError: false,
                error: "",
            },
            designation: {
                value: this.props.user.designation,
                showError: false,
                error: "",
            },
            user_id: {
                value: this.props.user.user_id,
                showError: false,
                error: "",
            },
            email: {
                value: this.props.user.email,
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
        this.setEmail = this.setEmail.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
    }
    componentDidMount() {
        $('label').addClass('active')
    }

    componentDidUpdate(){
        $('label').addClass('active')
    }

    handleCreate() {
        var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
        if (!this.state.user_id.value){
            this.setState({
              user_id: Object.assign(this.state.user_id, {
                  error: "Employee Id is required",
                  showError: true,
              })
            })
          } 
          if (this.state.user_id.value){
            this.setState({
              user_id: Object.assign(this.state.user_id, {
                  error: '',
                  showError: false,
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
          if(this.state.first_name.value ){
            this.setState({
              first_name: Object.assign(this.state.first_name, {
                  error: '',
                  showError: false,
              })
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
          if(this.state.last_name.value){
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
          if(!this.state.age.value) {
            this.setState({
              age: Object.assign(this.state.age, {
                error: "Age  is required",
                showError: true,
              })
            })
          }
          if(this.state.age.value){
            if(this.state.age.value < 1 || this.state.age.value > 70){
              this.setState({
                age: Object.assign(this.state.age, {
                  error: "Invalid age",
                  showError: true,
                })
              })
            }
            else{
              this.setState({
                age: Object.assign(this.state.age, {
                    error: '',
                    showError: false,
                })
              })
            }
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
                      error:"Enter Valid West Agile labs' Email",
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
          if(this.state.user_id.value && this.state.first_name.value && this.state.last_name.value && this.state.age.value && this.state.gender.value && this.state.department.value !== 'select' && this.state.designation.value !== 'select' && !this.state.email.showError){
            axios({
                method: 'post',
                url: `${baseUrl}/employees/update`,
                data: {
                    user_id: this.state.user_id.value,
                    first_name: this.state.first_name.value,
                    last_name: this.state.last_name.value,
                    age: this.state.age.value,
                    gender: this.state.gender.value,
                    department: this.state.department.value,
                    designation: this.state.designation.value,
                    email: this.state.email.value
                },
                withCredentials: true
            })
                .then((res) => {
                    if (res.data.message === 'employee has been updated') {
                        window.Materialize.toast('Employee Edited', 4000)
                        this.props.setHandleListRequest()

                    } else if (res.data.error[0].message) {
                        window.Materialize.toast(res.data.error[0].message, 4000)

                    }

                })
                .catch(error => {
                    window.Materialize.toast('can not edit employee', 4000)

                })
        }

    }
    handleFirstname(e) {
        this.setState({
            first_name: Object.assign(this.state.first_name, {
                value: e.target.value
            })

        })
    }
    handleLastname(e) {
        this.setState({
            last_name: Object.assign(this.state.last_name, {
                value: e.target.value
            })
        })
    }
    handleAge(e) {
        this.setState({
            age: Object.assign(this.state.age, {
                value: e.target.value
            })

        })
    }
    handleDepartment(e) {
        this.setState({
            department: Object.assign(this.state.department, {
                value: e.target.value
            })

        })
    }
    handleDesignation(e) {
        this.setState({
            designation: Object.assign(this.state.designation, {
                value: e.target.value
            })

        })
    }
    handleGender(e) {
        this.setState({
            gender: Object.assign(this.state.gender, {
                value: e.target.value
            })
        })
    }
    handleUser_Id(e) {
        this.setState({
            user_id: Object.assign(this.state.user_id, {
                value: e.target.value
            })
        })
    }
    setEmail(e) {
        this.setState({
            email: Object.assign(this.state.email, {
                value: e.target.value
            })
        })
    }

    cancelAll(){
        this.setState({
            first_name: {
                value: this.props.user.first_name,
                showError: false,
                error: "",
            },
            last_name: {
                value: this.props.user.last_name,
                showError: false,
                error: "",
            },
            age: {
                value: this.props.user.age,
                showError: false,
                error: "",
            },
            gender: {
                value: this.props.user.gender,
                showError: false,
                error: "",
            },
            department: {
                value: this.props.user.department,
                showError: false,
                error: "",
            },
            designation: {
                value: this.props.user.designation,
                showError: false,
                error: "",
            },
            user_id: {
                value: this.props.user.user_id,
                showError: false,
                error: "",
            },
            email: {
                value: this.props.user.email,
                showError: false,
                error: "",
            }
        })
        $(".modal-overlay").trigger('click');        
    }

    render() {
        var addEmployeeForm = (
            <div className="no-footer">
                <h5 className="title">Edit Employee</h5>
                <Row>
                    {/* <Input onChange={this.handleUser_Id} s={12} m={6} l={6} value={this.state.user_id.value} label="Employee Id" error={this.state.user_id.showError ? this.state.user_id.error : null} /> */}
                    <Input onChange={this.handleFirstname} s={12} m={6} l={6} value={this.state.first_name.value} label="First Name" error={this.state.first_name.showError ? this.state.first_name.error : null} />
                    <Input onChange={this.handleLastname} s={12} m={6} l={6} value={this.state.last_name.value} label="Last Name" error={this.state.last_name.showError ? this.state.last_name.error : null} />
                    <Input type="number" min='0' label="Age" value={this.state.age.value} onChange={this.handleAge} s={12} m={6} l={6} error={this.state.age.showError ? this.state.age.error : null} />
                    <Input s={12} m={6} l={6} type='select' label="Gender" value={this.state.gender.value} onChange={this.handleGender} error={this.state.gender.showError ? this.state.gender.error : null}>
                        <option value='select'>select</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </Input>
                    <Input s={12} m={6} l={6} label="Email*" type="email" value={this.state.email.value} onChange={this.setEmail} error={this.state.email.showError ? this.state.email.error : null} />
                    <Input s={12} m={6} l={6} type='select' label="Department" value={this.state.department.value} onChange={this.handleDepartment} error={this.state.department.showError ? this.state.department.error : null}>
                        <option value='select'>select</option>
                        <option value='HR'>HR</option>
                        <option value='Delivery'>Delivery</option>
                        <option value='Finance/Accounting'>Finance/Accounting</option>
                        <option value='Pre sales'>Pre sales</option>
                        <option value='Developer/Designer'>Developer/Designer</option>
                        <option value='Testing'>Testing</option>
                    </Input>
                    {this.state.department.value === 'Developer/Designer' ? <Input s={12} m={6} l={6} type='select' label="Designation" value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
                        <option value='Software Development Engineer'>Software Development Engineer</option>
                        <option value='Senior Product Designer'>Senior Product Designer</option>
                        <option value='UI/UX Designer'>UI/UX Designer</option>


                    </Input> : null}
                    {this.state.department.value === 'HR' ? <Input s={12} m={6} l={6} type='select' label="Designation" value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Sr.HR Manager'>Sr.HR Manager</option>
                        <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
                        <option value='HR Admin'>HR Admin</option>
                    </Input> : null}
                    {this.state.department.value === 'Delivery' ? <Input s={12} m={6} l={6} type='select' label="Designation" value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Delivery Manager'>Delivery Manager</option>
                        <option value='Sr.Project Manager'>Sr.Project Manager</option>
                        <option value='Project Manager'>Project Manager</option>
                    </Input> : null}
                    {this.state.department.value === 'Finance/Accounting' ? <Input s={12} m={6} l={6} type='select' label="Designation" value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
                        <option value='select'>select</option>
                        <option value='Finance Director'>Finance Director</option></Input> : null}
                    {this.state.department.value === 'Pre sales' ? <Input s={12} m={6} l={6} type='select' label="Designation" value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Lead Presales'>Lead Presales</option>
                        <option value='Presales Associate'>Presales Associate</option>
                    </Input> : null}
                    {this.state.department.value === 'Testing' ? <Input s={12} m={6} l={6} type='select' label="Designation" value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='QA Lead'>QA Lead</option>
                        <option value='Software Test Development Engineer'>Software Test Engineer</option>
                    </Input> : null}
                </Row>
                <div className="splitModalButtons">
                    <Button className='addbtn' onClick={this.handleCreate}>Update</Button>
                    <Button onClick={this.cancelAll} className="cancelButton">Cancel</Button>                
                </div>
            </div>

        );

        return (
            <div>
                {this.state.addEmployee ? addEmployeeForm : null}
                {this.state.redirect ? (<Redirect to={{ pathname: '/admin/employees' }} />) : null}
            </div>
        )
    }
}

export default EmployeeUpdate