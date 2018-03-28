import React, { Component } from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize'





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
      designation: ''
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleAge = this.handleAge.bind(this)
    this.handleDepartment = this.handleDepartment.bind(this)
    this.handleDesignation = this.handleDesignation.bind(this)
    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleGender = this.handleGender.bind(this)
     
  }
  handleCreate(){
    axios({
      method: 'post',
      url: 'http://localhost:3001/employee/create',
      data:{
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        password:this.state.password,
        age:this.state.age,
        gender: this.state.gender,
        department:this.state.department,
        designation:this.state.designation
      },
      withCredentials: true
    })
    .then((res)=>{
      if(res.data.message === 'employee created'){
      // alert('employee created')
      window.Materialize.toast('Employee added', 4000)

      }else{
        alert('error')
        console.log(res.data)
      }
      this.props.setHandleListRequest()
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

  render() {
    return (
      // <div>
      //   <header className="App-header">
      //     <script src="https://unpkg.com/jquery@2.2.1/dist/jquery.js"></script>
      //     <script type="text/javascript" src="js/materialize.min.js"></script>
         
      //   </header>
      // <div className="masterComponentBackground">
      //   <div >
      //     <nav className="masterComponentNavigationBar">
      //       <Link to="/"><a className="btn-flat waves-effect wave-teal white masterComponentLogoutButton">LOGOUT</a></Link>
      //       <a href="#" data-activates="slide-out" className="btn-flat waves-effect white button-collapse masterComponentMenuButton">
      //         <i className="material-icons masterComponentMenuIcon">menu</i>
      //       </a>
      //       <div className="nav-wrapper">
      //         <form>
      //           <div className="input-field masterComponentSearchfield">
      //             <input id="search" type="search" required />
      //             <label className="label-icon"><i className="material-icons">search</i></label>
      //           </div>
      //         </form>
      //       </div>
      //       <ul id="slide-out" className="side-nav masterComponentSideBar">
      //         <li className="masterComponentSideBarItem"><a href="#!">Assets</a></li>
      //         <br />
      //         <li className="masterComponentSideBarItem"><a href="#!">Consumables</a></li>
      //         <br />
      //         <li className="masterComponentSideBarItem" ><a href="#!">Employee</a></li>
      //         <br />
      //         <li className="masterComponentSideBarItem"><a href="#!">History</a></li>
      //         <br />
      //       </ul>
      //     </nav>
      //   </div>
      //   <br/>
      //   <br/>
      //   <br/>
      //   <br/>
      //   <div class='container '>
      //   <div class="row">
      //     <form class="col s8">
      //       <div class="row">
      //         <div class="input-field col s4">
      //           <input  id="user_id" type="number" min='0' onChange={this.handleUser_id} />
      //           <label for="user_id" class='active'>user_id</label>
      //         </div>
      //         <div class="input-field col s8">
      //           <input id="name" type="text" class="validate" onChange={this.handleName}/>
      //           <label for="name" class='active'>name</label>
      //         </div>
      //       </div>
      //       <div class="row">
      //         <div class="input-field col s8">
      //           <input id="password" type="password" class="validate" onChange={this.handlePassword}/>
      //           <label for="password" class='active'>Password</label>
      //         </div>
      //       </div>
      //       <div class="row">
      //         <div class="input-field col s4">
      //           <input value="employee" type="text" class="validate" />
      //           <label class="active" >role</label>
      //         </div>
      //       </div>
      //       <div class='row'>
      //       <div class="input-field col  s8">
      //         <select id='options' value={this.state.department}onChange={this.handleDepartment}>
      //           <option value="" disabled selected>Choose department</option>
      //           <option value="intern">intern</option>
      //           <option value="full time">full time</option>
      //           <option value="part time">part time</option>
      //         </select>
      //         <label >department</label>
              
      //       </div>  
      //       </div>
      //       <a class="waves-effect waves-light btn" onClick={this.handleAdd}>Add</a>

      //     </form>
      //   </div>
      //   </div>
      // </div>
      // </div>
      <div >
        <Row>
          <Input  onChange={this.handleFirstname}s={6}  label="First Name" />
          <Input  onChange={this.handleLastname} s={6} label="Last Name" />
          <Input type="number" min='0'label="age" onChange={this.handleAge}s={6} />
          <Input s={6} type='select' label="gender" onChange={this.handleGender}defaultValue='Other'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
            
          </Input>
          <Input s={6} type='select' label="Department" onChange={this.handleDepartment}defaultValue='Other'>
            <option value='Hr'>Hr</option>
            <option value='Delivery'>Delivery</option>
            <option value='Developer'>Developer</option>
            <option value='Other'>Other</option>
            
          </Input>
          <Input type="text" label="Designation"onChange={this.handleDesignation} s={6} />
        </Row>
          <Button onClick={this.handleCreate}>Add</Button>
              

      </div>

    )
  }
}



export default EmployeeAdd