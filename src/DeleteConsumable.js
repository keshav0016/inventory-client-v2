import React, {Component} from 'react'
import axios from 'axios'
import { Button} from 'react-materialize'
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
        // this.setState({
        //     deleteConsumableRequest : true
        // })
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
            <div style={{padding: '20px'}} className="no-footer">
                <h5>Delete Consumable</h5>                            
                <p>{`Do you really want to delete `}
                    <b style={{color:'teal'}}>
                        {`${this.props.consumable.name} `}
                    </b>
                    {`?`}
                </p>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick = {this.setDeleteConsumableRequest} style={{margin: '0 20px'}}>Delete</Button>
                        <Button className="modal-close" style={{margin: '0 20px'}}>Cancel</Button>
                </div>
                {this.state.deleteConsumableRequest ? this.deleteConsumableFroDb : null}
            </div>
        )
    }
}


export default DeleteConsumable