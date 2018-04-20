import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';

class UpdateAssetType extends Component{
    constructor(props){
        super(props)
        this.state = {
            updateAssetTypeRequest : false
            // ,assetType : this.props.assetType
            ,maxRequest : {
                value: this.props.maxRequest,
                error: '',
                showError: false
            }
        }
        // this.setAssetType = this.setAssetType.bind(this)
        this.setMaxRequest = this.setMaxRequest.bind(this)
        this.updateAssetTypeInDb = this.updateAssetTypeInDb.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
    }

    checkForValidation(){
        // if(this.state.maxRequest <= 0 ){
        //     window.Materialize.toast('Max request should be atleast 1', 4000)
        // }
        // else{
        //     this.setState({
        //         updateAssetTypeRequest : true
        //     })
        // }
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
        if(Number(this.state.maxRequest.value > 0)) {
            this.setState({
                updateAssetTypeRequest : true
            })
        }
    }

    updateAssetTypeInDb(){
        axios({
            method :'post'
            ,url : `${baseUrl}/assetType/update`
            ,withCredentials : true
            ,data : {
                // assetType : this.state.assetType
                maxRequest : this.state.maxRequest.value
                ,id : this.props.id
            }
        })
        .then(res => {
            this.setState({
                updateAssetTypeRequest : false
            })
            if(res.data.message){
                window.Materialize.toast(res.data.message, 4000)
                this.props.setHandleListRequest()
            }
            else{
                window.Materialize.toast('This asset type already exists', 4000)
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    // setAssetType(e){
    //     this.setState({
    //         assetType : e.target.value
    //     })
    // }

    setMaxRequest(e){
        this.setState({
            maxRequest : Object.assign(this.state.maxRequest, {
                value : e.target.value
            })
        })
    }

    componentDidMount(){
        $('label').addClass('active')
    }

    render(){
        return(
            <div>
                <Row>
                    {/* <Input  value={this.state.assetType} onChange={this.setAssetType} s={6} label="Asset Type" />       */}
                    <Input  value={this.state.maxRequest.value} onChange={this.setMaxRequest}s={6} label="Max Request" type="number" error={this.state.maxRequest.showError ? this.state.maxRequest.error : null} />
                </Row>
                 <Button onClick={this.checkForValidation}>Edit</Button>
                 {this.state.updateAssetTypeRequest ? this.updateAssetTypeInDb() : null}
            </div>
        )
    }
}

export default UpdateAssetType