
import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom'

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
            role: {
                value: this.props.user.role,
                showError: false,
                error: "",
              },
              idNo : {
                value: this.props.user.idSerialNo,
                showError: false,
                error: ''
              },
            currentDesignation: this.props.user.designation,
            addEmployee: true,
            redirect: false,
            login: false,
            UpdateRequest: false,
            disabled : false
            
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
        this.handleRole = this.handleRole.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.handleIdno = this.handleIdno.bind(this)
    }
    handleFirstname(e) {
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
    handleLastname(e) {
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
                    value : ''
                })
            })
        }
    }
    handleAge(e) {
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
    handleDepartment(e) {
        this.setState({
            department: Object.assign(this.state.department, {
                value: e.target.value
            })

        })
    }
    handleDesignation(e) {
        if(e.target.value === 'select') {
            this.setState({
                designation: Object.assign(this.state.designation, {
                    error : 'Designation is required',
                    showError : true
                })
    
            })
        } else {
            this.setState({
                designation: Object.assign(this.state.designation, {
                    value: e.target.value
                })
    
            })
        }
        
    }
    handleGender(e) {
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
    handleUser_Id(e) {
        this.setState({
            user_id: Object.assign(this.state.user_id, {
                value: e.target.value
            })
        })
    }
    setEmail(e) {
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
    handleRole(e){
        this.setState({
            role: Object.assign(this.state.role, {
                value: e.target.value
            })
        })
        
    }
    handleIdno(e){
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
    checkForValidation(){
        const nameReg = /^\s{0,}[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*\s{0,}$/;
        const reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
        const idNoReg = /^\s{0,}[0-9,.+-@#%^&*'":;()]+(\s{1,}[0-9,.+-@#%^&*'":;()]+)*\s{0,}$/

        if(!nameReg.test(this.state.first_name.value) ){
            this.setState({
            first_name: Object.assign(this.state.first_name, {
                error: "Enter alphabets",
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
        if(nameReg.test(this.state.first_name.value) ){
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
                error: "Enter alphabets",
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
            if(this.state.age.value < 18){
            this.setState({
                age: Object.assign(this.state.age, {
                error: "Age should be Greater than or equal to 18",
                showError: true,
                })
            })
            }if(this.state.age.value > 70){
            this.setState({
                age: Object.assign(this.state.age, {
                error: "Age should not be Greater than 70",
                showError: true,
                })
            })
            }
            else if(this.state.age.value >= 18 && this.state.age.value <= 70){
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
        if(reg.test(this.state.email.value)){
            this.setState({
                email: Object.assign(this.state.email, {
                    error: '',
                    showError:false
                }),
            })
        }
        if(!this.state.role.value){
            this.setState({
            role: Object.assign(this.state.role, {
                error: "Role is required",
                showError: true,
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
        if(this.props.user.department !== this.state.department.value && this.state.currentDesignation === this.state.designation.value){
            this.setState({
                designation: Object.assign(this.state.designation, {
                error: "Designation should also be changed",
                showError: true,
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
    
        if(!this.state.idNo.showError && !this.state.role.showError && !this.state.department.showError && !this.state.designation.showError && !this.state.first_name.showError && !this.state.last_name.showError && !this.state.age.showError && !this.state.gender.showError && !this.state.email.showError){
            this.setState({
                UpdateRequest: true,
                disabled : true
            })
        }
    }

    componentDidMount(){
        $('label').addClass('active')
    }

    componentDidUpdate(){
        $('label').addClass('active')
    }

    handleUpdate(){
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
                email:this.state.email.value ,
                role : this.state.role.value,
                idNo : this.state.idNo.value
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.data.message === 'employee has been updated') {
                this.setState({
                    UpdateRequest: false
                })
                $('.modal-close').trigger('click')
                swal("Employee details has been Updated",{
                    buttons: false,
                    timer: 2000,
                })
                this.props.setHandleListRequest()

            } 
            else if (res.data.error[0].message === "email must be unique") {
                this.setState({
                    UpdateRequest: false,
                    email: Object.assign(this.state.email, {
                        error:"This Email is already taken by another employee",
                        showError:true
                    }),
                })
                
            } 
        })
        .catch(error => {
            console.error(error)
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    login : true
                })
            }else{

                swal("can not Edit the Employee",{
                    buttons: false,
                    timer: 2000,
                    })
            }


        })
        

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
            },
            role : {
                value : this.props.user.role,
                showError : false,
                error : ""
            },
            idNo : {
                value : this.props.user.idNo,
                showError : false,
                error : ""
            }
        })
        this.props.onFinish()
        //   this.props.setListRequest()       
    }
            
    render() {

        return (           
            <div className="no-footer">
                <h5 className="title">Edit Employee</h5>
                <Row>

                    <Input  value={this.state.first_name.value} onChange={this.handleFirstname}s={12} m={6} l={6} label="First Name" error={this.state.first_name.showError ? this.state.first_name.error : null}/>
                    <Input  value={this.state.last_name.value}onChange={this.handleLastname} s={12} m={6} l={6}label="Last Name" error={this.state.last_name.showError ? this.state.last_name.error : null}/>
                    <Input type="number" min='0' label="age" defaultValue={this.state.age.value} onChange={this.handleAge} s={12} m={6} l={6} error={this.state.age.showError ? this.state.age.error : null}/>
                    <Input s={12} m={6} l={6} type='select' label="Gender" value={this.state.gender.value} onChange={this.handleGender} error={this.state.gender.showError ? this.state.gender.error : null}>
                        <option value='select'>select</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </Input>
                    <Input s={12} m={6} l={6}  label="Email*" type = "email" onChange={this.setEmail} value={this.state.email.value} error={this.state.email.showError ? this.state.email.error : null}/>
                    <Input s={12} m={6} l={6} type='select' label="Role" onChange={this.handleRole} value={this.state.role.value} error={this.state.role.showError ? this.state.role.error : null}>
                        <option value='select'>select</option>
                        <option value='Admin'>Admin</option>
                        <option value='Employee'>Employee</option>
                    </Input>
                    <Input s={12} m={6} l={6} type='select' label="Department" onChange={this.handleDepartment} value={this.state.department.value} error={this.state.department.showError ? this.state.department.error : null}>
                    <option value='Leadership'>Leadership</option>
                    <option value='HR'>HR</option>
                    <option value='Delivery'>Delivery</option>
                    <option value='Finance/Accounting'>Finance/Accounting</option>
                    <option value='Pre sales'>Pre sales</option>
                    <option value='Developer/Designer'>Developer/Designer</option>
                    <option value='Testing'>Testing</option>
                    <option value='Operations'>Operations</option>
                    <option value='Business Development'>Business Development</option>

                    </Input>
                    {/* <Input type="text"  defaultValue={this.state.designation.value} label="Current Designation" s={12} m={6} l={6} disabled/> */}

                    {/* <p style={{display: "block", marginLeft: "10px"}}>Current Designation: <b>{this.state.currentDesignation}</b></p> */}
                    {this.state.department.value === 'Developer/Designer' ? <Input s={12} m={6} l={6} type='select' label="Designation"  value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Sr.Software DeveOps Engineer/Team Lead'>Sr.Software DeveOps Engineer/Team Lead</option>
                        <option value='Sr.Software DeveOps Engineer'>Sr.Software DeveOps Engineer</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
                        <option value='Software Development Engineer'>Software Development Engineer</option>
                        <option value='Senior Product Designer'>Senior Product Designer</option>
                        <option value='UI/UX Designer'>UI/UX Designer</option>


                    </Input> : null}
                    {this.state.department.value === 'Operations' ? <Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Operations Manager'>Operations Manager</option>


                    </Input> : null}
                    {this.state.department.value === 'Business Development' ? <Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Business Analyst'>Business Analyst</option>
                        <option value='Lead Business Analyst '>Lead Business Analyst </option>
                        <option value='Business Development Manager '>Business Development Manager </option>

                    </Input> : null}
                    {this.state.department.value === 'HR' ? <Input s={12} m={6} l={6} type='select'  label="Designation"  value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Sr.HR Manager'>Sr.HR Manager</option>
                        <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
                        <option value='HR Admin'>HR Admin</option>
                    </Input> : null }
                    {this.state.department.value === 'Delivery' ? <Input s={12} m={6} l={6} type='select'  label="Designation"  value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Delivery Manager'>Delivery Manager</option>
                        <option value='Sr.Project Manager'>Sr.Project Manager</option>
                        <option value='Product Manager'>Product Manager</option>
                    
                    </Input> : null }
                    {this.state.department.value === 'Finance/Accounting' ?<Input s={12} m={6} l={6} type='select' label="Designation"  value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
                    <option value='select'>select</option>
                    <option value='Finance Director'>Finance Director</option></Input>: null }

                    {this.state.department.value === 'Leadership' ?<Input s={12} m={6} l={6} type='select' label="Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
                    <option value='select'>select</option>
                    <option value='Managing Director'>Managing Director</option></Input>: null }
                    
                    {this.state.department.value === 'Pre sales' ? <Input s={12} m={6} l={6} type='select'  label="Designation" value={this.state.designation.value}onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Lead Presales'>Lead Presales</option>
                        <option value='Presales Associate'>Presales Associate</option>
                        <option value='Presales Consultant'>Presales Consultant</option>
                    </Input> : null }
                    {this.state.department.value === 'Testing' ? <Input s={12} m={6} l={6} type='select'  label="Designation"  value={this.state.designation.value} onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='QA Lead'>QA Lead</option>
                        <option value='Software Test Engineer'>Software Test Engineer</option>
                    </Input> : null}
                    <Input type="text" label="Id serial no" value={this.state.idNo.value} onChange={this.handleIdno} s={12} m={6} l={6} error={this.state.idNo.showError ? this.state.idNo.error : null}/>
                </Row>
                    <div className="splitModalButtons">
                        <Button className='addbtn' onClick={this.checkForValidation} disabled={this.state.disabled}>Update</Button>
                        <Button onClick={this.setFields} className="cancelButton modal-close">Cancel</Button>                
                    </div>
                {this.state.UpdateRequest ? this.handleUpdate() : null}
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
export default EmployeeUpdate