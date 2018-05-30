import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';


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
            </div>
        )
    }
}


export default DeleteAsset