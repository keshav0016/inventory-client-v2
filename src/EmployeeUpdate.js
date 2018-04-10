import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'

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
            designation: this.props.user.designation
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleAge = this.handleAge.bind(this)
        this.handleDepartment = this.handleDepartment.bind(this)
        this.handleDesignation = this.handleDesignation.bind(this)
        this.handleFirstname = this.handleFirstname.bind(this)
        this.handleLastname = this.handleLastname.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.handleUserid = this.handleUserid.bind(this)
         
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
    componentDidMount(){
        $('label').addClass('active')
    }
   handleUpdate(){
       axios({
           method: 'post',
           url: 'http://localhost:3001/employees/update',
           data:{
               user_id: this.state.user_id,
               first_name:this.state.first_name,
                last_name:this.state.last_name,
                age:this.state.age,
                gender: this.state.gender,
                department:this.state.department,
                designation:this.state.designation
           },
           withCredentials: true
       })
       .then((res) => {
        if(res.data.message === 'employee has been updated'){
            window.Materialize.toast('Employee Edited', 4000)
           this.props.setHandleListRequest()
            
        }
          
       })
       .catch(error => {
         window.Materialize.toast('can not edit employee', 4000)

       })
   }
    render() {
        
        return (           
            <div>           
                <Row>
                <Input  defaultValue={this.state.user_id} onChange={this.handleUserid}s={6} label="User Id" />
                 <Input  defaultValue={this.state.first_name} onChange={this.handleFirstname}s={6} label="First Name" />
                    <Input  defaultValue={this.state.last_name}onChange={this.handleLastname} s={6}label="Last Name" />
                    <Input type="number"min='0' label="age" defaultValue={this.state.age}onChange={this.handleAge}s={6} />
                    <Input s={6} type='select' label="gender"defaultValue={this.state.gender} onChange={this.handleGender}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                        
                    </Input>
                    <Input s={6} type='select' label="Department" onChange={this.handleDepartment}defaultValue={this.state.department}>
                        <option value='Hr'>HR</option>
                        <option value='Delivery'>Delivery</option>
                        <option value='Developer'>Developer</option>
                        <option value='Other'>Other</option>
                        
                    </Input>
                    <Input type="text"  defaultValue={this.state.designation}label="Designation"onChange={this.handleDesignation} s={6} />
                </Row>
                 <Button onClick={this.handleUpdate}>Edit</Button>
            </div>
        )
    }


}
export default EmployeeUpdate