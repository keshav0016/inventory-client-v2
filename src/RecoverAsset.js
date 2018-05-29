import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class DeleteAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            recoverAssetRequest : false,
            recoverInfo : {}
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
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    recoverAssetRequest : false
                })                
            }
            else{
                window.Materialize.toast('Asset recovered', 4000)
                this.setState({
                    recoverAssetRequest : false
                })
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
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
            console.error(error)
        })
        $('label').addClass('active')
    }

    render(){
        return(
            <div style={{padding: '20px'}} className="no-footer">
                <h5 style={{fontFamily : 'Roboto', fontWeight : 250}} className='flow-text' >Do you really want to recover this asset?</h5>
                {this.state.recoverInfo.asset && this.state.recoverInfo.user ? <div>
                    <p><b>Asset Name</b> : {this.state.recoverInfo.asset.asset_name}<br /><b>Assigned Employee</b> : {this.state.recoverInfo.user.first_name} {this.state.recoverInfo.user.last_name}</p>
                </div> : null}
                <br /><br />
                <div className="splitModalButtons">
                    <Button onClick = {this.setRecoverAssetRequest}>Recover</Button>
                    <Button className="modal-close">Cancel</Button>
                </div>
                {this.state.recoverAssetRequest ? this.recoverAssetFromDb() : null}
            </div>
        )
    }
}


export default DeleteAsset