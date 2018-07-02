import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  import $ from 'jquery'
  
class EnableAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : false
        }
        this.enableAssetFromDb = this.enableAssetFromDb.bind(this)
    }

    enableAssetFromDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/enable`,
            data : {
                asset_id : this.props.asset.asset_id
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
            else{
                // window.Materialize.toast('Asset Enabled', 4000)
                swal('Asset is Enabled',{
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
                    login : true
                })
            }
            console.error(error)
        })
    }


    render(){
        return(
            <div className="no-footer">
                <h5 className="title">Enable Asset</h5>                            
                <p>{`Do you really want to enable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.asset.asset_name} `}
                    </b>
                    {`?`}
                </p>
                <div className="splitModalButtons">
                        <Button onClick = {this.enableAssetFromDb} >Enable</Button>
                        <Button className="modal-close" >Cancel</Button>
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


export default EnableAsset