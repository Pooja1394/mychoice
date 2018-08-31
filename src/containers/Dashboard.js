import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from '../component/AuctionContent'
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import DashboardContent from "../component/dashboard/dashboard"
export default class Dashboard extends Component {
    render() {
      return (
        <div >
           <Route exact
          path='/home/dash' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons">Dashboard</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Dashboard</span>}
            > 
            <DashboardContent/></Format>
     
          }} />
        </div>
      )
    }
  }
  