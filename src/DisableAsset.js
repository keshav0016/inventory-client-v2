import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';


class DisableAsset extends Component{
    constructor(props){
        super(props)
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
                window.Materialize.toast(res.data.error, 4000)              
            }
            else{
                window.Materialize.toast('Asset Disabled', 4000)
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
                <h5 style={{fontFamily: 'Roboto', fontWeight: 300}}>Disable Asset</h5>                            
                <p>{`Do you really want to disable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.asset.asset_name} `}
                    </b>
                    {`?`}
                </p>
                <div className="splitModalButtons">
                        <Button onClick = {this.disableAssetFromDb} >Disable</Button>
                        <Button className="modal-close" >Cancel</Button>
                </div>
            </div>
        )
    }
}


export default DisableAsset