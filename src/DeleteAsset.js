import React, {Component} from 'react'
import axios from 'axios'
import {Icon, Button} from 'react-materialize'


class DeleteAsset extends Component{
    constructor(props){
        super(props)
        this.state = {
            deleteAssetRequest : false
        }
        this.setDeleteAssetRequest = this.setDeleteAssetRequest.bind(this);
        this.deleteAssetFromDb = this.deleteAssetFromDb.bind(this)
    }

    setDeleteAssetRequest(){
        this.setState({
            deleteAssetRequest : true
        })
    }

    deleteAssetFromDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/asset/delete',
            data : {
                asset_id : this.props.asset.asset_id
            }
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.error){
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    deleteAssetRequest : false
                })                
            }
            else{
                window.Materialize.toast('Asset deleted', 4000)
                this.setState({
                    deleteAssetRequest : false
                })
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
                <Icon large>delete forever</Icon>
                <h4>{`Do you really want to delete `}<b style={{color:'teal'}}>{`${this.props.asset.asset_name} `}</b>{`?`}</h4>
                <Button onClick = {this.setDeleteAssetRequest}>Delete</Button>
                {this.state.deleteAssetRequest ? this.deleteAssetFromDb() : null}
            </div>
        )
    }
}


export default DeleteAsset