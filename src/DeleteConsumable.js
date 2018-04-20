import React, {Component} from 'react'
import axios from 'axios'
import {Icon, Button} from 'react-materialize'
import { baseUrl } from './config';


class DeleteConsumable extends Component{
    constructor(props){
        super(props)
        this.state = {
            deleteConsumableRequest : false
        }
        this.setDeleteConsumableRequest = this.setDeleteConsumableRequest.bind(this);
        this.deleteConsumableFroDb = this.deleteConsumableFroDb.bind(this)
    }

    setDeleteConsumableRequest(){
        this.setState({
            deleteConsumableRequest : true
        })
    }

        // handleDelete(index){
    //     axios({
    //         method : 'post',
    //         url : 'http://localhost:3001/consumables/delete',
    //         data : {
    //             consumable_id : this.state.consumableList[index].consumable_id
    //         },
    //         withCredentials:true
    //     })
    //     .then(obj => {
    //         this.setState({
    //             handleListRequest:true
    //         })
    //         window.Materialize.toast('Consumable Deleted Successfully', 4000)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

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
            if(res.data.error){
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    deleteConsumableRequest : false
                })                
            }
            else{
                window.Materialize.toast(res.data.error, 4000)
                this.setState({
                    deleteConsumableRequest : false
                })
                this.props.setHandleListRequest()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
                <h3 style={{fontFamily : 'Roboto', fontWeight : 250}}>Delete Consumable</h3>                            
                <Icon large>delete forever</Icon>
                <h4>{`Do you really want to delete `}<b style={{color:'teal'}}>{`${this.props.consumable.name} `}</b>{`?`}</h4>
                <Button onClick = {this.setDeleteConsumableRequest}>Delete</Button>
                {this.state.deleteConsumableRequest ? this.deleteConsumableFroDb() : null}
            </div>
        )
    }
}


export default DeleteConsumable