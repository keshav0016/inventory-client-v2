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
          url: `${baseUrl}/employees/disable`,
          data:{
            user_id: this.props.user.user_id
          },
          withCredentials: true
        })
        .then((res) => {
            if(res.data.message === 'Employee deleted successfully'){
                this.props.setHandleListRequest(true)
                window.Materialize.toast('Employee disabled successfully', 4000)
            }else if(res.data.message === 'recover the assets first'){
                window.Materialize.toast(`Recover the assets first `, 4000)
            }else if(res.data.message === 'can not disable employee'){
                window.Materialize.toast(res.data.message, 4000)
            }
        })
        .catch(error => {
            window.Materialize.toast('can not delete employee', 4000)
        })
        
    }
    render(){
        return(
            <div style={{padding: '20px'}} className="no-footer">
            <h5>Disable Employee</h5>                            
            <p>{`Do you really want to disable `}
                <b style={{color:'teal'}}>
                    {`${this.props.user.first_name} `}
                </b>
                {`?`}
            </p>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick = {this.handleDelete} style={{margin: '0 20px'}}>Disable</Button>
                    <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
            </div>
        </div>
        )
    }

}
export default EmployeeDelete