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
            <div style={{padding: '20px'}} className="no-footer">
                <h5 style={{fontFamily: 'Roboto', fontWeight: 300}}>Enable Asset</h5>                            
                <p>{`Do you really want to enable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.user.first_name} `}
                    </b>
                    {`?`}
                </p>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick = {this.enableEmployeeFromDb} style={{margin: '0 20px'}}>Enable</Button>
                        <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
                </div>
            </div>
        )
    }
}


export default EnableEmployee