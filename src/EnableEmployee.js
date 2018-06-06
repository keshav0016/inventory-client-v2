import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';


class EnableEmployee extends Component{
    constructor(props){
        super(props)
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
                window.Materialize.toast(res.data.error, 4000)              
            }
            else{
                window.Materialize.toast('Employee Enabled', 4000)
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
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
            </div>
        )
    }
}


export default EnableEmployee