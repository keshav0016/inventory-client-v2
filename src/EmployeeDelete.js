import React, { Component } from 'react';
import axios from 'axios';
import { Button , Icon} from 'react-materialize';

class EmployeeDelete extends Component {
    constructor(props){
        super(props)
    this.handleDelete = this.handleDelete.bind(this)
        
    }
    handleDelete(){
        axios({
          method: 'post',
          url: 'http://localhost:3001/employees/delete',
          data:{
            user_id: this.props.user.user_id
          },
          withCredentials: true
        })
        .then((res) => {
          if(res.data.message === 'employee deleted'){
          this.props.setHandleListRequest()
              
            window.Materialize.toast('Employee deleted', 4000)

          }
        })
        .catch(error => {
            window.Materialize.toast('can not delete employee', 4000)
        })
    }
    render(){
        return(
            <div>
             <Icon large>delete forever</Icon>
            <p>Are you sure you want to delete {this.props.user.first_name} ?</p>
            <Button waves='light' onClick={this.handleDelete}>Delete</Button>
            </div>

        )
    }

}
export default EmployeeDelete
