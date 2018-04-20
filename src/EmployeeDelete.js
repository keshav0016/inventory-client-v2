import React, { Component } from 'react';
import axios from 'axios';
import { Button} from 'react-materialize';
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
            <div style={{padding: '20px'}} className="no-footer">
            <h5>Delete Employee</h5>                            
            <p>{`Do you really want to delete `}
                <b style={{color:'teal'}}>
                    {`${this.props.user.first_name} `}
                </b>
                {`?`}
            </p>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick = {this.handleDelete} style={{margin: '0 20px'}}>Delete</Button>
                    <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
            </div>
        </div>
        )
    }

}
export default EmployeeDelete
