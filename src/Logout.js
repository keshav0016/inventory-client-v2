import React,{Component} from 'react'
import axios from 'axios'
import {
    Redirect
  } from 'react-router-dom';


class Logout extends Component{
    constructor(props){
        super(props)
        this.state={
           
            loggedin:true
        }
        
        this.handleLogout = this.handleLogout.bind(this)
    }
    render(){
        return(
            <div>
            {this.state.home ? <Redirect push to ='/login'/>:null}
            </div>
        )
    }
    componentWillMount(){
        this.handleLogout()
    }
    handleLogout(){
        axios({
            method:'post',
            url:'http://localhost:3001/user/logout',
            withCredentials: true
        })
        .then((res)=>{
            if(res.data.success === true){
                this.setState({
                    home : true
                })
            }
            
        })
        .catch(error=>{
            alert('error logging out')
        })
    }
}
export default Logout