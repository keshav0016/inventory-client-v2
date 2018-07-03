import React, {Component} from 'react'
import axios from 'axios'
import {Row, Input, Button} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  
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
            },
            redirect : false
        }
        // this.setAssetType = this.setAssetType.bind(this)
        this.setMaxRequest = this.setMaxRequest.bind(this)
        this.updateAssetTypeInDb = this.updateAssetTypeInDb.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
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
                // window.Materialize.toast(res.data.message, 4000)
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                  })
                  $('.modal').hide()
                  $('.modal-overlay').hide()
                  
                //   setTimeout((function() {
                //     window.location.reload();
                //   }), 2100);
                this.props.setHandleListRequest()
            }
            else{
                // window.Materialize.toast('This asset type already exists', 4000)
                swal('This asset type already exists',{
                    buttons: false,
                    timer: 2000,
                  })
            }
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    redirect : true
                })
            }
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

    cancelAll(){
        this.setState({
            maxRequest : {
                value: this.props.maxRequest,
                error: '',
                showError: false
            }
        })
        $(".modal-overlay").trigger('click');
    }

    componentDidMount(){
        $('label').addClass('active')
    }

    componentDidUpdate(){
        $('label').addClass('active')
    }

    render(){
        return(
            <div style={{marginLeft: '30px',marginRight: '30px'}}>
                <h5 className="flow-text title" >Update the {this.props.assetType}'s Max Request</h5>
                <Row>
                    {/* <Input  value={this.state.assetType} onChange={this.setAssetType} s={6} label="Asset Type" />       */}
                    <Input  value={this.state.maxRequest.value} onChange={this.setMaxRequest} l={6} s={8} m={6} label="Max Request" type="number" error={this.state.maxRequest.showError ? this.state.maxRequest.error : null} />
                </Row>
                <div className="splitModalButtons">
                    <Button onClick={this.checkForValidation} >Update</Button>
                    <Button onClick={this.cancelAll} className="cancelButton modal-close" >Cancel</Button>
                </div>
                 {this.state.updateAssetTypeRequest ? this.updateAssetTypeInDb() : null}
                 {this.state.redirect ? <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            </div>
        )
    }
}

export default UpdateAssetType