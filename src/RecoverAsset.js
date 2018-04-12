import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import $ from 'jquery'

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
            url : 'http://localhost:3001/asset/recover',
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
            url : `http://localhost:3001/asset/recover-info?asset_id=${this.props.asset}`,
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
            <div>
                <h4>Do you really want to recover this asset?</h4>
                <br /><br />
                {this.state.recoverInfo.asset && this.state.recoverInfo.user ? <div>
                    <p><b>Asset Name</b> : {this.state.recoverInfo.asset.asset_name}<br /><b>Assigned Employee</b> : {this.state.recoverInfo.user.first_name} {this.state.recoverInfo.user.last_name}</p>
                </div> : null}
                <br /><br />
                <Button onClick = {this.setRecoverAssetRequest}>Recover</Button>
                {this.state.recoverAssetRequest ? this.recoverAssetFromDb() : null}
            </div>
        )
    }
}


export default DeleteAsset