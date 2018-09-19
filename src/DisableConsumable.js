import React, {Component} from 'react'
import axios from 'axios'
import { Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert';
import {
    Redirect
  } from 'react-router-dom';
  import $ from 'jquery'
class DisableConsumable extends Component{
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
        // this.setState({
        //     deleteConsumableRequest : true
        // })
        this.deleteConsumableFroDb();
    }

    deleteConsumableFroDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/consumables/disable`,
            data : {
                consumable_id : this.props.consumable.consumable_id
            }
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.error){
                swal(res.data.error,{
                    buttons: false,
                    timer: 2000,
                  })
                //   $('.modal').hide()
                //   $('.modal-overlay').hide()
                // window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    deleteConsumableRequest : false
                })                
            }
            else if('Consumable disabled successfully'){
                $('.modal-close').trigger('click')
                swal('consumable is Disabled',{
                    buttons: false,
                    timer: 2000,
                  })

                //   $('.modal').hide()
                //   $('.modal-overlay').hide()

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
                <h5 className="title">Disable Consumable</h5>                            
                <p>{`Do you really want to disable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.consumable.name} `}
                    </b>
                    {`?`}
                </p>
                <div className='splitModalButtons'>
                        <Button onClick = {this.setDeleteConsumableRequest}>Disable</Button>
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


export default DisableConsumable