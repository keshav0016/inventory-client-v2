import React, { Component } from 'react';
import axios from 'axios';
import { Button , Icon} from 'react-materialize';
import { baseUrl } from './config';

class EmployeeDelete extends Component {
    constructor(props){
        super(props)
    this.handleDelete = this.handleDelete.bind(this)
        
    }
    handleDelete(){
        axios({
          method: 'post',
          url: `${baseUrl}/employees/delete`,
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
            <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Delete Employee</h3 >
             <Icon large>delete forever</Icon>
            <h4>Are you sure you want to delete <b style ={{color:'teal'}}>{this.props.user.first_name}</b> ?</h4>
            <Button waves='light' onClick={this.handleDelete}>Delete</Button>
            </div>

        )
    }

}
export default EmployeeDelete
