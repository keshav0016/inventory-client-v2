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
            <div className="no-footer">
                <h5>Delete Consumable</h5>                            
                <p>{`Do you really want to disable `}
                    <b style={{color:'teal'}}>
                        {`${this.props.consumable.name} `}
                    </b>
                    {`?`}
                </p>
                <div className='splitModalButtons'>
                        <Button onClick = {this.setDeleteConsumableRequest}>Disable</Button>
                        <Button className="modal-close">Cancel</Button>
                </div>
            </div>
        )
    }
}


export default DeleteConsumable