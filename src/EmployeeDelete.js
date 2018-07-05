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
           if(res.data.message === 'recover the assets first'){

                swal("Recover the assets first",{
                    buttons: false,
                    timer: 2000,
                  })
            }else if(res.data.message === 'can not disable employee'){

                swal("Can not disable the employee",{
                    buttons: false,
                    timer: 2000,
                  })
            }else  if(res.data.message === 'Employee disabled successfully'){ 
                $('.modal-close').trigger('click')
                               
                swal("Employee is disabled successfully",{
                    buttons: false,
                    timer: 2000,
                  })

                // $('.modal').hide()
                // $('.modal-overlay').hide()
                this.props.setHandleListRequest()

            }
        })
        .catch(error => {
            console.log(error)
            if(error.response.status === 401){

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