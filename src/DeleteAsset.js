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
            if(res.data.assets === 0) {
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
            }
            if(res.data.error){
                swal(res.data.error,{
                    buttons: false,
                    timer: 2000,
                })
                this.setState({
                    deleteAssetRequest : false
                })                
            }
            else{
                $('.modal-close').trigger('click')
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
                this.setState({
                    deleteAssetRequest : false
                })
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
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
                <div className="splitModalButtons">
                        <Button onClick = {this.setDeleteAssetRequest}>Delete</Button>
                        <Button className="modal-close" >Cancel</Button>
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