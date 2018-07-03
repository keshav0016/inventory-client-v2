import React, {Component} from 'react';
import {Input} from 'react-materialize'
import moment from 'moment';
// import $ from 'jquery';


class DateInput extends Component{
    constructor(props){
        super(props);

        this.input = null;
    }
    componentDidUpdate(prevProps, prevState){
        // if(prevProps.options.min !== this.props.options.min){
        //     // this.forceUpdate();
        //     console.log(
        //         $(this.input)
        //     )
        // }
        let self = this;
        const $ = window.jQuery;
        try {
            $(`#${self.input._id}`).pickadate('picker').set('min', self.props.options.min)
            // $((self.input).dateInput).pickadate('set', 'min', self.props.options.min);
        } catch (error) {
            console.error(error)
        }
        
    }
    render(){
        return (
            <Input s={12} 
                ref={(node)=>{this.input = node}}
                type='date' label={this.props.label} 
                options={this.props.options}
                className='datepicker' 
                value = {this.props.value} 
                onChange = {this.props.onChange} 
                error={this.props.error} 
            />
        )
    }
}

export default DateInput;

