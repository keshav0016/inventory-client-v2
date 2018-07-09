import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';

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
        this.cancelAll = this.cancelAll.bind(this)
    }

    componentDidMount(){
        $(document).ready(function(){
          $('label').addClass('active');
      }) 
      }
    
      componentDidUpdate(){
        $(document).ready(function(){
          $('label').addClass('active');
      }) 
    }
    
    checkForValidation(){

        var assetType = /^\s{0,}[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*\s{0,}$/
        if(!assetType.test(this.state.assetType.value)){
            this.setState({
                assetType: Object.assign(this.state.assetType, {
                    error: "The Asset Type should only contain alphabets",
                    showError: true
                })
            })
        }
        if(!this.state.assetType.value){
            this.setState({
                assetType: Object.assign(this.state.assetType, {
                    error: 'The Asset Type is required',
                    showError: true
                })
            })
        }
        if(assetType.test(this.state.assetType.value)){
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
        if(assetType.test(this.state.assetType.value) && Number(this.state.maxRequest.value) > 0) {
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
                assetType : this.state.assetType.value.trim()
                ,maxRequest : this.state.maxRequest.value
            }
        })
        .then(res => {
            let assetTypeName = this.state.assetType.value.trim()
            assetTypeName = assetTypeName.charAt(0).toUpperCase() + assetTypeName.slice(1).toLowerCase()
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
                $('.assettypeclose').trigger('click')

                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                  })
                //   $('.modal').hide()
                //   $('.modal-overlay').hide()
                //   setTimeout((function() {
                //     window.location.reload();
                //   }), 2100);
                if(this.props.setAssetTypeListRequest){
                    this.props.setAssetTypeListRequest(assetTypeName)
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
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    login: true
                })
            }
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

    cancelAll(){
        this.setState({
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
        })
        if(this.props.setAssetTypeListRequest){
            this.props.setAssetTypeListRequest()
        }
        else{
            this.props.setHandleListRequest()
        }
        
        $(".modal-overlay").trigger('click');
    }
    
    render(){
        return(
            <div className="no-footer">
                <h5 className='title' >Add Asset Type</h5 >
                <Row>
                    <Input s={12} defaultValue={this.state.assetType.value.trim()} label="Asset Type*" onChange={this.setAssetType} error={this.state.assetType.showError ? this.state.assetType.error : null}/>
                    <Input s={12} value={this.state.maxRequest.value} type="number" min={1} label="Maximum request for this asset?" onChange={this.setMaxRequest} error={this.state.maxRequest.showError ? this.state.maxRequest.error : null} />
                </Row>
                <div className="splitModalButtons">
                    <Button onClick={this.checkForValidation} >Submit</Button>
                    <Button onClick={this.cancelAll} className="cancelButton assettypeclose modal-close" >Cancel</Button>
                </div>
                {this.state.createAssetRequest ? this.createAssetTypeInDb() : null}
                {this.state.login ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            />: null}
            </div>

        )
    }


}

export default AddAssetType