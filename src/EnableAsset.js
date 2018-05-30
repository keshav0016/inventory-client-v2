import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';


class EnableAsset extends Component{
    constructor(props){
        super(props)
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
                window.Materialize.toast(res.data.error, 4000)              
            }
            else{
                window.Materialize.toast('Asset Enabled', 4000)
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
            </div>
        )
    }
}


export default EnableAsset