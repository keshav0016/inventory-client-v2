import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert';
import $ from 'jquery'
import {Redirect} from 'react-router-dom'
class DeleteAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            deleteAssetRequest : false,
            redirect : false
        }
        this.setDeleteAssetRequest = this.setDeleteAssetRequest.bind(this);
        this.deleteAssetFromDb = this.deleteAssetFromDb.bind(this)
    }

    setDeleteAssetRequest(){
        // this.setState({
        //     deleteAssetRequest : true
        // })

        this.deleteAssetFromDb();
    }

    deleteAssetFromDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/delete`,
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
                this.setState({
                    deleteAssetRequest : false
                })                
            }
            else{
                swal("Asset has been deleted",{
                    buttons: false,
                    timer: 2000,
                  })
                  $('.modal').hide()
                  $('.modal-overlay').hide()
                // window.Materialize.toast('Asset deleted', 4000)
                this.setState({
                    deleteAssetRequest : false
                })
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
                <h5 className="title">Delete Asset</h5>                            
                <p>{`Do you really want to delete `}
                    <b style={{color:'teal'}}>
                        {`${this.props.asset.asset_name} `}
                    </b>
                    {`?`}
                </p>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick = {this.setDeleteAssetRequest} style={{margin: '0 20px'}}>Delete</Button>
                        <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
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


export default DeleteAsset