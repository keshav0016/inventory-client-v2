import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class EmployeeUpdate extends Component{
    constructor(props){
        super(props)
        this.state = {
            user_id: this.props.user.user_id,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            age: this.props.user.age,
            gender: this.props.user.gender,
            department: this.props.user.department,
            designation: this.props.user.designation,
            email: this.props.user.email
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleAge = this.handleAge.bind(this)
        this.handleDepartment = this.handleDepartment.bind(this)
        this.handleDesignation = this.handleDesignation.bind(this)
        this.handleFirstname = this.handleFirstname.bind(this)
        this.handleLastname = this.handleLastname.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.handleUserid = this.handleUserid.bind(this)
        this.setFields = this.setFields.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
         
    }
    handleUserid(e){
        this.setState({
            user_id: e.target.value
        })
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
    handleEmail(e){
        this.setState({
            email: e.target.value
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
    componentDidMount(){
        $('label').addClass('active')
    }
   handleUpdate(){
       if(this.props.user.department !== this.state.department && this.props.user.designation === this.state.designation){
        window.Materialize.toast('if you change the department, designation should also be changed', 4000)
       }else{
        axios({
            method: 'post',
            url: `${baseUrl}/employees/update`,
            data:{
                 user_id: this.state.user_id,
                 first_name:this.state.first_name,
                 last_name:this.state.last_name,
                 age:this.state.age,
                 gender: this.state.gender,
                 department:this.state.department,
                 designation:this.state.designation,
                 email:this.state.email 
            },
            withCredentials: true
        })
        .then((res) => {
         if(res.data.message === 'employee has been updated'){
             window.Materialize.toast('Employee Edited', 4000)
            this.props.setHandleListRequest()
             
         }else if(res.data.error[0].message){
            window.Materialize.toast(res.data.error[0].message, 4000)

         }
           
        })
        .catch(error => {
          window.Materialize.toast('can not edit employee', 4000)
 
        })
       }
       
    }
    setFields(){
        this.setState({
            user_id: this.state.user_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            gender: this.state.gender,
            department: this.state.department,
            designation: this.state.designation,
            email: this.state.email
        })
    }
    render() {
        
        return (           
            <div className="no-footer" style={{padding: '20px'}}>           
                <Row>
                <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Update Employee</h3 >
                <Input  defaultValue={this.state.user_id} onChange={this.handleUserid}s={6} label="User Id" />
                 <Input  defaultValue={this.state.first_name} onChange={this.handleFirstname}s={6} label="First Name" />
                    <Input  defaultValue={this.state.last_name}onChange={this.handleLastname} s={6}label="Last Name" />
                    <Input type="number"min='0' label="age" defaultValue={this.state.age}onChange={this.handleAge}s={6} />
                    <Input s={6} type='select' label="gender"defaultValue={this.state.gender} onChange={this.handleGender}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                        
                    </Input>
                    <Input s={6}  label="Email*" type = "email" onChange={this.setEmail} defaultValue={this.state.email} />
                    <Input s={6} type='select' label="Department" onChange={this.handleDepartment}defaultValue={this.state.department}>
                    <option value='HR'>HR</option>
                    <option value='Delivery'>Delivery</option>
                    <option value='Finance/Accounting'>Finance/Accounting</option>
                    <option value='Pre sales'>Pre sales</option>
                    <option value='Developer/Designer'>Developer/Designer</option>
                    <option value='Testing'>Testing</option>
                        
                    </Input>
                    <Input type="text"  defaultValue={this.state.designation}label="Current Designation"onChange={this.handleDesignation} s={6} disabled/>


                    {this.state.department === 'Developer/Designer' ? <Input s={6} type='select' label="Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='Sr.Software Development Engineer'>Sr.Software Development Engineer</option>
                        <option value='Software Development Engineer'>Software Development Engineer</option>
                        <option value='Senior Product Designer'>Senior Product Designer</option>
                        <option value='UI/UX Designer'>UI/UX Designer</option>
                        
                        
                    </Input> : null}
                    {this.state.department === 'HR' ? <Input s={6} type='select'  label="New Designation" defaultValue='Select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Sr.HR Manager'>Sr.HR Manager</option>
                        <option value='HR Recruitment Manager'>HR Recruitment Manager</option>
                    </Input> : null }
                    {this.state.department === 'Delivery' ? <Input s={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Delivery Manager'>Delivery Manager</option>
                        <option value='Sr.Project Manager'>Sr.Project Manager</option>
                        <option value='Project Manager'>Project Manager</option>
                    </Input> : null }
                    {this.state.department === 'Finance/Accounting' ?<Input s={6} type='select' label="New Designation" defaultValue='select' onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null} >
                    <option value='select'>select</option>
                    <option value='Finance Director'>Finance Director</option></Input>: null }
                    {this.state.department === 'Pre sales' ? <Input s={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='Lead Presales'>Lead Presales</option>
                        <option value='Presales Associate'>Presales Associate</option>
                    </Input> : null }
                    {this.state.department === 'Testing' ? <Input s={6} type='select'  label="New Designation" defaultValue='select'onChange={this.handleDesignation} error={this.state.designation.showError ? this.state.designation.error : null}>
                        <option value='select'>select</option>
                        <option value='QA Lead'>QA Lead</option>
                        <option value='Software Test Development Engineer'>Software Test Development Engineer</option>
                    </Input> : null}
                </Row>
                 <Button onClick={this.handleUpdate}>Edit</Button>
                 <Button className="modal-close" onClick={this.setFields} style={{margin: '0 20px'}}>Cancel</Button>
            </div>
        )
    }


}
export default EmployeeUpdate