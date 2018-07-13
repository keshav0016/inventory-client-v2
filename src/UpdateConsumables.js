import React, { Component } from 'react'
import axios from 'axios'
import {Row, Input, Button, Autocomplete, Badge} from 'react-materialize'
import $ from 'jquery'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom'
import moment from 'moment'

class UpdateConsumables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consumable_id : this.props.consumable.consumable_id,
            name : {
                value:this.props.consumable.name,
                error:'',
                showError:false
            },
            description : {
                value: this.props.consumable.description,
                showError: false,
                error: ""
            },
            
            updateConsumableRequest : false,
            redirect: false,
            consumableNamesListObj : {

            },
            consumableNameList : [],


        }

        this.setConsumableName=this.setConsumableName.bind(this)
        this.UpdateConsumable=this.UpdateConsumable.bind(this)
        this.checkForValidation = this.checkForValidation.bind(this)
        this.getConsumableNameList = this.getConsumableNameList.bind(this)
        this.cancelAll = this.cancelAll.bind(this)
        this.setDescription = this.setDescription.bind(this)


    }
    cancelAll(){
        this.setState({
            name : {
                value:this.props.consumable.name,
                error:'',
                showError:false
            },
            description : {
                value: this.props.consumable.description,
                showError: false,
                error: ""
            },  
        })
        this.props.onFinish()
    }

    checkForValidation(){
        var alpha = /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/
        var alphaNum = /^\s{0,}[a-zA-Z0-9]*[a-zA-Z]{1}[a-zA-Z0-9]*(\s{1}[a-zA-Z0-9]+)*\s{0,}$/
        var descriptionNum = /^\s{0,}[a-zA-Z0-9_@.:,"'-/#+&-*]+(\s{1,1}[a-zA-Z0-9_@.:,"'-/#+&-*]+)*\s{0,}$/

        if (!alphaNum.test(this.state.name.value)) {
            this.setState({
                name: Object.assign(this.state.name, {
                    alphaError: true,
                })
            })
        }
        if (!this.state.name.value) {
            this.setState({
                name: Object.assign(this.state.name, {
                    showError: true,
                })
            })
        }
        if (this.state.name.value) {
            this.setState({
                name: Object.assign(this.state.name, {
                    showError: false,
                })
            })
        }
        if (alphaNum.test(this.state.name.value)) {
            this.setState({
                name: Object.assign(this.state.name, {
                    alphaError: false,
                })
            })
        }
        if(!this.state.description.value){
            this.setState({
                description: Object.assign(this.state.description, {
                    error: "Description is required",
                    showError: true
                })
            })
        }
        if(this.state.description.value && !descriptionNum.test(this.state.description.value)){
            this.setState({
                description: Object.assign(this.state.description, {
                    error: "Enter a valid Description",
                    showError: true
                })
            })
        }
        if(this.state.description.value && descriptionNum.test(this.state.description.value)){
            this.setState({
                description: Object.assign(this.state.description, {
                    error: "",
                    showError: false
                })
            })
        }
        
        
        if(this.state.name.value && alphaNum.test(this.state.name.value) && !this.state.description.showError  ){
            this.setState({
                updateConsumableRequest : true
            })
        }
    }

    

    componentDidMount(){
        $(document).ready(function(){
            $('label').addClass('active');
        })
        axios({
            method : 'get',
            url : `${baseUrl}/consumables/listNames`,
            withCredentials : true
        })
        .then(res => {
            this.setState({
                consumableNameList : res.data.consumablesNames,
                getConsumableName : false
            })
            this.getConsumableNameList()
        })
        .catch(error => {
            if(error.response.status === 401){
                this.setState({
                    login : true
                })
            }
            console.error(error)
        })
    }    
    getConsumableNameList(){
        let consumableNamesObj = {}
        this.state.consumableNameList.map((obj)=>{
            return consumableNamesObj[obj.name] = null
        })
        this.setState({
            consumableNamesListObj : consumableNamesObj,
        })
    }
    componentDidUpdate(){
        $(document).ready(function(){
            $('label').addClass('active');
        }) 
    }

    setConsumableName(e, value) {
        this.setState({
            name : Object.assign(this.state.name, {
                value: value
            })
        })
    }


    UpdateConsumable() {
        axios({
            method: 'post',
            url: `${baseUrl}/consumables/update`,
            data: {
                consumable_id : this.state.consumable_id,
                name : this.state.name.value.trim(),
                description : this.state.description.value


            },
            withCredentials:true
        })
        .then(obj => {
            this.setState({
                updateConsumableRequest : false
            })
            // window.Materialize.toast('Consumable Updated Successfully', 4000)
            swal('Consumable Updated Successfully',{
                buttons: false,
                timer: 2000,
              })
            //   $('.modal').hide()
            //   $('.modal-overlay').hide()
            //   setTimeout((function() {
            //     window.location.reload();
            //   }), 2100);
            this.props.setHandleListRequest()
            this.props.onFinish()
            
        })
        .catch(error => {
            if(error.response.status === 401){
                $('.modal-overlay').remove()
                $('body').removeAttr( 'style' )
                this.setState({
                    redirect : true
                })
            }
            console.error(error)
        })
    }
   
    setDescription(e){
        this.setState({
            description : Object.assign(this.state.description, {
                value: e.target.value
            })
        })
    }


    render() {
        return (
            <div className="no-footer">
            <h5 className="title">Edit Consumable</h5>
                <Row>
                    {/* <Input s={12} m={6} l={6} label="Consumable"  type="text" value={this.state.name.value} onChange = {this.setConsumableName} error={this.state.name.showError ? this.state.name.error : null}/> */}
                        <Autocomplete s={12} m={6} l={6}
                            className={this.state.name.showError ? 'consumable-empty-error': (this.state.name.alphaError ? 'consumable-alpha-error' : null)}
                            autoFocus
                            title='Consumable'
                            data={
                                this.state.consumableNamesListObj
                            }
                            onChange = {this.setConsumableName}
                            value={this.state.name.value.trim()}
                        />
                    <Input s={12} m={6} l={6} label="Description"  type="text" value={this.state.description.value} onChange = {this.setDescription} error={this.state.description.showError ? this.state.description.error : null}/>
                
                </Row>
                <div className="splitModalButtons">
                    <Button waves='light' onClick={this.checkForValidation}>Update</Button>
                    <Button onClick={this.cancelAll} className="cancelButton modal-close">Cancel</Button>
                </div>
                {this.state.updateConsumableRequest ? this.UpdateConsumable() : null}
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

export default UpdateConsumables