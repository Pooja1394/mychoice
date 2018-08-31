import React, { Component } from 'react'
import {checkdisplay} from "../../utils/Method"
export default class AuctionReports extends Component {
    
    componentWillMount() {
        this.props.state  && checkdisplay("Reports")?"":(this.props.history.push('/home/dash'))
        
    }
    
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}