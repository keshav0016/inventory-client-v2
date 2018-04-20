import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';


class AddAssetType extends Component{
    constructor(props){
        super(props)
        this.state = {
            assetType : {
                value: '',
                error: '',
                showError: false
            }
            ,maxRequest : {
                value: 1,
                error: '',
                showError: false
            }
            ,createAssetRequest : false
        }
        this.checkForValidation = this.checkForValidation.bind(this)
        this.setAssetType = this.setAssetType.bind(this)
        this.setMaxRequest = this.setMaxRequest.bind(this)
        this.createAssetTypeInDb = this.createAssetTypeInDb.bind(this)
    }

    checkForValidation(){
        // if(!this.state.assetType){
        //     window.Materialize.toast('All the * marked fields are required', 4000)
        // }
        // else{
        //     this.setState({
        //         createAssetRequest : true
        //     })
        // }
        if(!this.state.assetType.value){
            this.setState({
                assetType: Object.assign(this.state.assetType, {
                    error: 'The Asset Type is required',
                    showError: true
                })
            })
        }
        if(this.state.assetType.value){
            this.setState({
                assetType: Object.assign(this.state.assetType, {
                    error: '',
                    showError: false
                })
            })
        }
        if(Number(this.state.maxRequest.value) < 0) {
            this.setState({
                maxRequest: Object.assign(this.state.maxRequest, {
                    error: 'The Maximum request cannot be negative',
                    showError: true
                })
            })
        }
        if(Number(this.state.maxRequest.value) === 0) {
            this.setState({
                maxRequest: Object.assign(this.state.maxRequest, {
                    error: 'The Maximum request cannot be zero',
                    showError: true
                })
            })
        }
        if(Number(this.state.maxRequest.value) > 0) {
            this.setState({
                maxRequest: Object.assign(this.state.maxRequest, {
                    error: '',
                    showError: false
                })
            })
        }
        if(this.state.assetType.value && Number(this.state.maxRequest.value) > 0) {
            this.setState({
                createAssetRequest : true
            })
        }
    }

    createAssetTypeInDb(){
        axios({
            method: 'post'
            ,url : `${baseUrl}/assetType/create`
            ,withCredentials : true
            ,data : {
                assetType : this.state.assetType.value
                ,maxRequest : this.state.maxRequest.value
            }
        })
        .then(res => {
            if(res.data.message){
                this.setState({
                    createAssetRequest : false
                    ,assetType : {
                        value: '',
                        error: '',
                        showError: false
                    }
                    ,maxRequest : {
                        value: 1,
                        error: '',
                        showError: false
                    }
                })
                $('.modal-overlay').click()
                window.Materialize.toast(res.data.message, 4000)
                if(this.props.setAssetTypeListRequest){
                    this.props.setAssetTypeListRequest()
                }
                else{
                    this.props.setHandleListRequest()
                }
            }
            else{
                // window.Materialize.toast('This Asset Type already exists', 4000)
                this.setState({
                    assetType:Object.assign(this.state.assetType, {
                        error: 'The given Asset type exists.',
                        showError: true
                    }),
                    createAssetRequest :false
                })
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    setAssetType(e){
        this.setState({
            assetType : Object.assign(this.state.assetType, {
                value : e.target.value
            })
        })
    }

    setMaxRequest(e){
        this.setState({
            maxRequest : Object.assign(this.state.maxRequest, {
                value : e.target.value
            })
        })
    }
    
    render(){
        return(
            <div style={{marginLeft: '30px',marginRight: '30px'}}>
                <h3 style={{fontFamily: 'Roboto',fontWeight: 250}}>Add Asset Type</h3 >
                <Row>
                    <Input s={6} value={this.state.assetType.value} label=' ' placeholder="Asset Type*" onChange={this.setAssetType} error={this.state.assetType.showError ? this.state.assetType.error : null}/>
                    <Input s={6} value={this.state.maxRequest.value} label=' ' type="number" min={1} placeholder="Maximum request for this asset?" onChange={this.setMaxRequest} error={this.state.maxRequest.showError ? this.state.maxRequest.error : null} />
                </Row>
                <Button onClick={this.checkForValidation}>Submit</Button>
                {this.state.createAssetRequest ? this.createAssetTypeInDb() : null}
            </div>

        )
    }


}

export default AddAssetType