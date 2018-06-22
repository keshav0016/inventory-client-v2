
import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert'

class EmployeeUpdate extends Component{
    constructor(props){
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
            redirect: false,
            login: false
            
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleAge = this.handleAge.bind(this)
        this.handleDepartment = this.handleDepartment.bind(this)
        this.handleDesignation = this.handleDesignation.bind(this)
        this.handleFirstname = this.handleFirstname.bind(this)
        this.handleLastname = this.handleLastname.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.setFields = this.setFields.bind(this)
        this.setEmail = this.setEmail.bind(this)

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
    componentDidMount(){
        $('label').addClass('active')
    }
   handleUpdate(){
    var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
       
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
          if(this.state.gender.value === "select"){
            this.setState({
              gender: Object.assign(this.state.gender, {
                error: "Gender  is required",
                showError: true,
              }),
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
          if(this.state.gender.value !== "select"){
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
          if(this.props.user.department === this.state.department.value && this.props.user.designation !== this.state.designation.value){
            this.setState({
                    department: Object.assign(this.state.department, {
                    error: "Department should also be changed",
                    showError: true,
                    }),
                })     
            }
            if(this.props.user.department !== this.state.department.value && this.props.user.designation === this.state.designation.value){
                this.setState({
                        designation: Object.assign(this.state.designation, {
                        error: "Designation should also be changed",
                        showError: true,
                        }),
                    })     
                }
       
        if(!this.state.department.showError && !this.state.designation.showError && !this.state.first_name.showError && !this.state.last_name.showError && !this.state.age.showError && !this.state.gender.showError && !this.state.email.showError){
            axios({
                method: 'post',
                url: `${baseUrl}/employees/update`,
                data:{
                    user_id: this.props.user.user_id,
                    first_name:this.state.first_name.value,
                    last_name:this.state.last_name.value,
                    age:this.state.age.value,
                    gender: this.state.gender.value,
                    department:this.state.department.value,
                    designation:this.state.designation.value,
                    email:this.state.email.value 
                },
                withCredentials: true
            })
            .then((res) => {
                if (res.data.message === 'employee has been updated') {
                    // window.Materialize.toast('Employee Edited', 4000)
                    swal("Employee is Edited",{
                        buttons: false,
                        timer: 2000,
                        })
                    this.props.setHandleListRequest()

                } else if (res.data.error[0].message === "email must be unique") {
                    this.setState({
                        email: Object.assign(this.state.email, {
                            error:"This Email is already taken by another employee",
                            showError:true
                        }),
                    })
                    
                }

            })
            .catch(error => {
                if(error.response.status === 401){
                    this.setState({
                        login : true
                    })
                }else{

                    swal("can not Edit the Employee",{
                        buttons: false,
                        timer: 2000,
                        })
                }
                // window.Materialize.toast('can not edit employee', 4000)

            })
        }

    }
    setFields(){
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
            email: {
                value: this.props.user.email,
                showError: false,
                error: "",
            }
        })
        $(".modal-overlay").trigger('click');        
    }
            
    render() {

        return (           
            <div className="no-footer">
                <h5 className="title">Edit Employee</h5>
                <Row>

                 <Input  defaultValue={this.state.first_name.value} onChange={this.handleFirstname}s={12} m={6} l={6} label="First Name" error={this.state.first_name.showError ? this.state.first_name.error : null}/>
                    <Input  defaultValue={this.state.last_name.value}onChange={this.handleLastname} s={12} m={6} l={6}label="Last Name" error={this.state.last_name.showError ? this.state.last_name.error : null}/>
                    <Input type="number"min='0' label="age" defaultValue={this.state.age.value}onChange={this.handleAge}s={12} m={6} l={6} error={this.state.age.showError ? this.state.age.error : null}/>
                    <Input s={12} m={6} l={6} type='select' label="Gender" defaultValue={this.state.gender.value} onChange={this.handleGender} error={this.state.gender.showError ? this.state.gender.error : null}>
                        <option value='select'>select</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </Input>
                    <Input s={12} m={6} l={6}  label="Email*" type = "email" onChange={this.setEmail} defaultValue={this.state.email.value} error={this.state.email.showError ? this.state.email.error : null}/>
                    <Input s={12} m={6} l={6} type='select' label="Department" onChange={this.handleDepartment} defaultValue={this.state.department.value} error={this.state.department.showError ? this.state.department.error : null}>
                    <option value='HR'>HR</option>
                    <option value='Delivery'>Delivery</option>
                    <option value='Finance/Accounting'>Finance/Accounting</option>
                    <option value='Pre sales'>Pre sales</option>
                    <option value='Developer/Designer'>Developer/Designer</option>
                    <option value='Testing'>Testing</option>

                    </Input>
                    <Input type="text"  defaultValue={this.state.designation.value}label="Current Designation" s={12} m={6} l={6} disabled/>


                    {this.state.department.value === 'Developer/Designer' ? <Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
                        <option value='Software Development Engineer'>Software Development Engineer</option>
                        <option value='Senior Product Designer'>Senior Product Designer</option>
                        <option value='UI/UX Designer'>UI/UX Designer</option>


                    </Input> : null}
                    {this.state.department.value === 'HR' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='Select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Sr.HR Manager'>Sr.HR Manager</option>
                        <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
                    </Input> : null }
                    {this.state.department.value === 'Delivery' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Delivery Manager'>Delivery Manager</option>
                        <option value='Sr.Project Manager'>Sr.Project Manager</option>
                        <option value='Project Manager'>Project Manager</option>
                    </Input> : null }
                    {this.state.department.value === 'Finance/Accounting' ?<Input s={12} m={6} l={6} type='select' label="New Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
                    <option value='select'>select</option>
                    <option value='Finance Director'>Finance Director</option></Input>: null }
                    {this.state.department.value === 'Pre sales' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Lead Presales'>Lead Presales</option>
                        <option value='Presales Associate'>Presales Associate</option>
                    </Input> : null }
                    {this.state.department.value === 'Testing' ? <Input s={12} m={6} l={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='QA Lead'>QA Lead</option>
                        <option value='Software Test Engineer'>Software Test Engineer</option>
                    </Input> : null}
                </Row>
                    <div className="splitModalButtons">
                        <Button className='addbtn' onClick={this.handleUpdate}>Update</Button>
                        <Button onClick={this.setFields} className="cancelButton">Cancel</Button>                
                    </div>

            </div>
        )
    }


}
export default EmployeeUpdate