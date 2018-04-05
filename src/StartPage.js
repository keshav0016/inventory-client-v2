import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class StartPage extends Component{

    render(){
        return(
            <div className="loginBackground" >
                <Redirect push to='/login' /> 
            </div>
        )
    }
}

export default StartPage