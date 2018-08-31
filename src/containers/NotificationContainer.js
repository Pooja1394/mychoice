import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import NotificationContent from "../component/notifications/NotificationContent"
export default class NotificationContainer extends Component {
    render() {
      return (
        <div >
           <Route 
          exact path='/home/notifications' 
          render={()=>{return <Format 
            style={{borderTop:"3px solid #3c8dbc"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/notifications">Notifications</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Notifications List</span>}
            > 
            <NotificationContent/></Format>
     
          }} />
           
       
        </div>
      )
    }
  }
  