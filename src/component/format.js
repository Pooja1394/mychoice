/*This file contains the code for UserInformation in admin panel 
Created By-Aviral Garg
Created On-13/04/18
*/

import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Table, Breadcrumb } from 'antd';
// import "../style/Content.css"
import Header from "./Header";
import { Link } from 'react-router-dom';
// import CreateUserContent from '../component/CreateUserContent'
// import Format from './MyContent';

export default class Format extends Component {
    render() {
        return (
            <div>

                <Header
                    history={this.props.history}
                    breadcrumb={this.props.breadcrumb}
                    headername={this.props.headername}
                    buttonspan={this.props.buttonspan}
                />
                <div className="content_container">
                    <div className="wrapper">
                    {/* {console.log("border----->",this.props.borderall,this.props.border)} */}
                        <div className="Innercontainer" style={this.props.style}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
