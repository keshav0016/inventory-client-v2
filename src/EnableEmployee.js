import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
import $ from 'jquery'
class EnableEmployee extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : false
        }
        this.enableEmployeeFromDb = this.enableEmployeeFromDb.bind(this)
    }

    enableEmployeeFromDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/employees/enable`,
            data : {
                user_id : this.props.user.user_id
            }
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.error){
                // window.Materialize.toast(res.data.error, 4000)  
                swal(res.data.error,{
                    buttons: false,
                    timer: 2000,
                  })            
            }
            else if(res.data.message === "Employee ennabled successfully"){
                // window.Materialize.toast('Employee Enabled', 4000)
                swal('Employee is enabled',{
                    buttons: false,
                    timer: 2000,
                  })
                $('.modal').hide()
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect : true
                })
            }
            console.error(error)
        })
    }


    render(){
        return(
            <div className="no-footer">
                <h5 className="title">Enable Employee</h5>                            
                <p>{`Do you really want to enable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.user.first_name} `}
                    </b>
                    {`?`}
                </p>
                <div className="splitModalButtons">
                        <Button onClick = {this.enableEmployeeFromDb}>Enable</Button>
                        <Button className="cancelButton modal-close">Cancel</Button>
                </div>
                {this.state.redirect ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            </div>
        )
    }
}


export default EnableEmployee