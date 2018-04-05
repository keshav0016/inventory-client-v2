import React, {Component} from 'react'
import HomePage from './Homepage'
import EmployeeDB from './EmployeeDB';
import {Redirect} from 'react-router-dom'

class AdminProtected extends Component{
    constructor(props){
        super(props)
    }


    render(){
        if(false){                              // admin login authentication
            return <HomePage />
        }
        else{
            if(false){                          // employee login auth
                return <EmployeeDB />
            }
            else{
                return <Redirect push to="/" />
            }                           
        }
    }

}

export default AdminProtected