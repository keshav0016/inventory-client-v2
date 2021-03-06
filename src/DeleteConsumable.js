import React, {Component} from 'react'
import axios from 'axios'
import { Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
} from 'react-router-dom';
import $ from 'jquery'
class DeleteConsumable extends Component{
    constructor(props){
        super(props)
        this.state = {
            deleteConsumableRequest : false,
            redirect : false
        }
        this.setDeleteConsumableRequest = this.setDeleteConsumableRequest.bind(this);
        this.deleteConsumableFroDb = this.deleteConsumableFroDb.bind(this)
    }

    setDeleteConsumableRequest(){
        this.deleteConsumableFroDb();
    }

    deleteConsumableFroDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/consumables/delete`,
            data : {
                consumable_id : this.props.consumable.consumable_id
            }
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.consumables === 0) {
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
            }
            if(res.data.error){
                swal(res.data.error,{
                    buttons: false,
                    timer: 2000,
                })
                this.setState({
                    deleteConsumableRequest : false
                })                
            }
            else{
                $('.modal-close').trigger('click')
                swal(res.data.message,{
                    buttons: false,
                    timer: 2000,
                })
                this.setState({
                    deleteConsumableRequest : false
                })
                this.props.setHandleListRequest()
            }
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


    render(){
        return(
            <div className="no-footer">
                <h5 className="title">Delete Consumable</h5>                            
                <p>{`Do you really want to delete `}
                    <b style={{color:'teal'}}>
                        {`${this.props.consumable.name} `}
                    </b>
                    {`?`}
                </p>
                <div className='splitModalButtons'>
                        <Button onClick = {this.setDeleteConsumableRequest}>Delete</Button>
                        <Button className="modal-close cancelButton modal-close">Cancel</Button>
                </div>
                {this.state.redirect ?  <Redirect
                                to={{
                                    pathname: "/login",
                                    search: '?sessionExpired=true'
                                }}
                            /> : null}
            </div>
        )
    }
}


export default DeleteConsumable