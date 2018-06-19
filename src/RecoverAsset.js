import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
class DeleteAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            recoverAssetRequest : false,
            recoverInfo : {},
            redirect : false
        }
        this.setRecoverAssetRequest = this.setRecoverAssetRequest.bind(this);
        this.recoverAssetFromDb = this.recoverAssetFromDb.bind(this)
    }

    setRecoverAssetRequest(){
        this.setState({
            recoverAssetRequest : true
        })
    }

    recoverAssetFromDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/asset/recover`,
            data : {
                asset_id : this.props.asset,
                to : new Date()
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
                this.setState({
                    recoverAssetRequest : false
                })                
            }
            else{
                // window.Materialize.toast('Asset recovered', 4000)
                swal('Asset recovered',{
                    buttons: false,
                    timer: 2000,
                  })
                this.setState({
                    recoverAssetRequest : false
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

    componentDidMount(){
        axios({
            method :'get',
            url : `${baseUrl}/asset/recover-info?asset_id=${this.props.asset}`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                recoverInfo : res.data.recoverInfo
            })
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect : true
                })
            }
            console.error(error)
        })
        $('label').addClass('active')
    }

    componentDidUpdate(){
        $('label').addClass('active')
    }

    render(){
        return(
            <div className="no-footer">
                {this.state.recoverInfo.asset && this.state.recoverInfo.user ? <h5 className='recoverTitle' >{`Do you really want to recover ${this.state.recoverInfo.asset.asset_name} from ${this.state.recoverInfo.user.first_name} ${this.state.recoverInfo.user.last_name} ?`}</h5> : null}
                <br /><br />
                <div className="splitModalButtons">
                    <Button onClick = {this.setRecoverAssetRequest}>OK</Button>
                    <Button className="modal-close cancelButton">Cancel</Button>
                </div>
                {this.state.recoverAssetRequest ? this.recoverAssetFromDb() : null}
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


export default DeleteAsset