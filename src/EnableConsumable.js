import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'react-materialize'
import { baseUrl } from './config';


class EnableConsumable extends Component{
    constructor(props){
        super(props)
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
                window.Materialize.toast(res.data.error, 4000)              
            }
            else{
                window.Materialize.toast('Consumable Enabled', 4000)
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div style={{padding: '20px'}} className="no-footer">
                <h5 style={{fontFamily: 'Roboto', fontWeight: 300}}>Enable Consumable</h5>                            
                <p>{`Do you really want to enable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.consumable.name} `}
                    </b>
                    {`?`}
                </p>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick = {this.enableConsumableFromDb} style={{margin: '0 20px'}}>Enable</Button>
                        <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
                </div>
            </div>
        )
    }
}


export default EnableConsumable