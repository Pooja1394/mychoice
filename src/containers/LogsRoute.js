import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import LogsContent from '../component/logs/logs'
import {checkdisplay} from "../utils/Method"

export default class Logs extends Component {
  
  componentWillMount() {
  }
  
    render() {
        return (
          <div >
          <Route 
            exact path='/home/logs' 
            render={()=>{return <Format 
            style={{borderTop:"3px solid #3c8dbc"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item >Logs</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Log List</span>}
            > 
            <LogsContent history={this.props.history}/></Format>
     
          }} />
        </div>
      )
    }
  }
  