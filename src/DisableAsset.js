import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  import $ from 'jquery'
  
class DisableAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : false
        }
        this.disableAssetFromDb = this.disableAssetFromDb.bind(this)
    }

    disableAssetFromDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/disable`,
            data : {
                asset_id : this.props.asset.asset_id
            }
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.error){
                swal(res.data.error,{
                    buttons: false,
                    timer: 2000,
                  })
                // window.Materialize.toast(res.data.error, 4000)              
            }
            else{
                swal('Asset is Disabled',{
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
                    redirect: true
                })
            }
            console.error(error)
        })
    }


    render(){
        return(
            <div className="no-footer">
                <h5 className="title">Disable Asset</h5>                            
                <p>{`Do you really want to disable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.asset.asset_name} `}
                    </b>
                    {`?`}
                </p>
                <div className="splitModalButtons">
                        <Button onClick = {this.disableAssetFromDb} >OK</Button>
                        <Button className="cancelButton modal-close" >Cancel</Button>
                </div>
                {this.state.redirect ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            </div>
        )
    }
}


export default DisableAsset