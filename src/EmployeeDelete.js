import React, { Component } from 'react';
import axios from 'axios';
import { Button} from 'react-materialize';
import { baseUrl } from './config';
import $ from 'jquery';
import swal from 'sweetalert';
// import LoginForm  from './LoginForm'
import {
    Redirect
} from 'react-router-dom';

class EmployeeDelete extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect : false
        }
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
            if(res.data.message === 'Employee disabled successfully'){
                this.props.setHandleListRequest(true)
                // window.Materialize.toast('Employee disabled successfully', 4000)
                swal("Employee is disabled successfully",{
                    buttons: false,
                    timer: 2000,
                  })
            }else if(res.data.message === 'recover the assets first'){
                // window.Materialize.toast(`Recover the assets first `, 4000)
                swal("Recover the assets first",{
                    buttons: false,
                    timer: 2000,
                  })
            }else if(res.data.message === 'can not disable employee'){
                // window.Materialize.toast(res.data.message, 4000)
                swal("Can not disable the employee",{
                    buttons: false,
                    timer: 2000,
                  })
            }
            $('.modal-overlay').trigger('click')
        })
        .catch(error => {
            if(error.response.status === 401){
                // swal("session expired, so you need to login again",{
                //     buttons: false,
                //     timer: 2000,
                // })
                this.setState({
                    redirect : true
                })
            }else{
                swal("Can not disable Employee",{
                    buttons: false,
                    timer: 2000,
                  })
                $('.modal-overlay').trigger('click')
            }
            // window.Materialize.toast('can not disable employee', 4000)
        })
        
    }
    render(){
        return(
            <div className="no-footer">
                <h5 className="title">Disable Employee</h5>                            
                <p>{`Do you really want to disable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.user.first_name} `}
                    </b>
                    {`?`}
                </p>
                <div className="splitModalButtons">
                        <Button onClick = {this.handleDelete} >Disable</Button>
                        <Button className="modal-close cancelButton" >Cancel</Button>
                </div>
                {this.state.redirect? 
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />
                    :null}
            </div>  
        )
    }

}
export default EmployeeDelete