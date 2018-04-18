import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'


class AddAssetType extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetType : ''
            ,maxRequest : 1
            ,createAssetRequest : false
        }
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setAssetType = this.setAssetType.bind(this)
        this.setMaxRequest = this.setMaxRequest.bind(this)
        this.createAssetTypeInDb = this.createAssetTypeInDb.bind(this)
    }

    checkForValidation(){
        if(!this.state.assetType){
            window.Materialize.toast('All the * marked fields are required', 4000)
        }
        else{
            this.setState({
                createAssetRequest : true
            })
        }
    }

    createAssetTypeInDb(){
        axios({
            method: 'post'
            ,url : 'http://localhost:3001/assetType/create'
            ,withCredentials : true
            ,data : {
                assetType : this.state.assetType
                ,maxRequest : this.state.maxRequest
            }
        })
        .then(res => {
            if(res.data.message){
                this.setState({
                    createAssetRequest : false
                })
                $('.modal-overlay').click()
                window.Materialize.toast(res.data.message, 4000)
                this.props.setAssetTypeListRequest()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    setAssetType(e){
        this.setState({
            assetType : e.target.value
        })
    }

    setMaxRequest(e){
        this.setState({
            maxRequest : e.target.value
        })
    }
    
    render(){
        return(
            <div>
                <Row>
                    <Input s={6} value={this.state.assetType} label="Asset Type*" onChange={this.setAssetType} />
                    <Input s={6} value={this.state.maxRequest} type="number" min={1} label="Maximum request for this asset?" onChange={this.setMaxRequest} />
                </Row>
                <Button onClick={this.checkForValidation}>Submit</Button>
                {this.state.createAssetRequest ? this.createAssetTypeInDb() : null}
            </div>

        )
    }


}

export default AddAssetType