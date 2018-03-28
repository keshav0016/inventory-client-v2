import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';

class EmployeeDelete extends Component {
    constructor(props){
        super(props)
    this.handleDelete = this.handleDelete.bind(this)
        
    }
    handleDelete(){
        axios({
          method: 'post',
          url: 'http://localhost:3001/employee/delete',
          data:{
            id: this.props.user.id
          },
          withCredentials: true
        })
        .then((res) => {
          if(res.data.message === 'employee deleted'){
            window.Materialize.toast('Employee deleted', 4000)

          }
          this.props.setHandleListRequest()
        })
    }
    render(){
        return(
            <div>
            <p>Are you sure you want to delete {this.props.user.first_name} ?</p>
            <Button waves='light' onClick={this.handleDelete}>Delete</Button>
            </div>

        )
    }

}
export default EmployeeDelete
