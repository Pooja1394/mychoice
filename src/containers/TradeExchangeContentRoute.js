import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from '../component/AuctionContent'
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import {checkdisplay} from "../utils/Method"
import TradeOut from '../component/trade_exchange/tradeout'
import Payment from "../component/trade_exchange/payment"
import TradeStatus from "../component/trade_exchange/trade_status"

export default class TradeExchange extends Component {
  
  componentWillMount() {
  }
  
    render() {
      return (
        <div >
           <Route 
          exact path='/home/tradeexchange/tradeout' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/tradeexchange/tradeout">TradeOut</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Trade Out Product List</span>}
            > 
            <TradeOut history={this.props.history}/></Format>
     
          }} />
            <Route 
            path='/home/tradeexchange/payment' 
            render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/tradeexchange/payment">Payment</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Payment List</span>}
            > 
            <Payment history={this.props.history}/></Format>
          }} />
           <Route 
          path='/home/tradeexchange/tradestatus' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/tradeexchange/tradestatus">Trade Status</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Trade Status List</span>}
            > 
            <TradeStatus history={this.props.history}/>
            </Format>
     
          }} />

        </div>
      )
    }
  }
  