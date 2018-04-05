import React, {Component} from 'react'
import HomePage from './Homepage'
import EmployeeDB from './EmployeeDB';
import {Redirect} from 'react-router-dom'

class AdminProtected extends Component{
    constructor(props){
        super(props)
        this.state = {
            admin : this.props.admin || false,
            employee : this.props.employee || false
        }
    }

    // shouldComponentUpdate(prevProps, prevState){
    //     if(this.props.admin || this.props.employee){
    //         return true
    //     }
    //     else{
    //         return false
    //     }
    // }

    render(){
        if(this.state.admin){                              // admin login authentication
            return <div>
                <HomePage />
                <Redirect push to ='/adminhomepage'/>
            </div>
        }
        else{
            if(this.state.employee){                          // employee login auth
                return <div>
                    <EmployeeDB />
                    <Redirect push to ='/employeehomepage'  user_id={this.state.user_id}/>
                    </div>
            }
            else{
                return <Redirect push to="/" />
            }                           
        }
    }

}

export default AdminProtected