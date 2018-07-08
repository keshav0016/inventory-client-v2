import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';
import swal from 'sweetalert'
import {
    Redirect
  } from 'react-router-dom';
  import $ from 'jquery'

class EnableConsumable extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : false
        }
        this.enableConsumableFromDb = this.enableConsumableFromDb.bind(this)
    }

    enableConsumableFromDb(){
        axios({
            method : 'post',
            url : `${baseUrl}/consumables/enable`,
            data : {
                consumable_id : this.props.consumable.consumable_id
            }
            ,withCredentials : true
        })
        .then(res => {
            if(res.data.error){
                // window.Materialize.toast(res.data.error, 4000) 
                swal(res.data.error,{
                    buttons: false,
                    timer: 2000,
                  })             
            }
            else if('consumable ennabled successfully'){
                $('.modal-close').trigger('click')

                swal('Consumable is Enabled',{
                    buttons: false,
                    timer: 2000,
                  })
                //   $('.modal').hide()
                //   $('.modal-overlay').hide()

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
            <div  className="no-footer">
                <h5 className="title">Enable Consumable</h5>                            
                <p>{`Do you really want to enable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.consumable.name} `}
                    </b>
                    {`?`}
                </p>
                <div className='splitModalButtons'>
                        <Button onClick = {this.enableConsumableFromDb}>Enable</Button>
                        <Button className="cancelButton modal-close">Cancel</Button>
                </div>
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


export default EnableConsumable