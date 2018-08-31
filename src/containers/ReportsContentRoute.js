import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import TradeOut from '../component/trade_exchange/tradeout'
import Payment from "../component/trade_exchange/payment"
import TradeStatus from "../component/trade_exchange/trade_status"
import DepositReports from "../component/reports/depositreport";
import CouponReports from "../component/reports/couponreport";
import AuctionReports from "../component/reports/auctionreport";
import RetailReports from "../component/reports/retailreport";
import TradeReports from "../component/reports/tradereport";
import DeliveryReports from "../component/reports/deliveryreport";
import {checkdisplay} from "../utils/Method"
export default class Reports extends Component {
  
  componentWillMount() {
  }
  
    render() {
      return (
        <div >
           <Route 
            exact path='/home/reports/deposit' 
            render={()=>{
            return <Format 
            style={{background:"#ecf0f5",border:"none"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/reports/tradeout">TradeOut</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Deposit Report List</span>}
            > 
            <DepositReports history={this.props.history}/></Format>
          }} />
            <Route 
            path='/home/reports/coupon' 
            render={()=>{return <Format 
            style={{background:"#ecf0f5",border:"none"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/reports/payment">Payment</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Coupon Report List</span>}
            > 
            <CouponReports history={this.props.history}/></Format>
          }} />
           <Route 
            path='/home/reports/auction' 
            render={()=>{return <Format 
            history={this.props.history}
            style={{background:"#ecf0f5",border:"none"}}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/reports/tradestatus">Trade Status</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Auction Report List</span>}
            > 
            <AuctionReports history={this.props.history}/>
            </Format>
     
          }} />
           <Route 
            path='/home/reports/retail' 
            render={()=>{return <Format 
            style={{background:"#ecf0f5",border:"none"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/reports/tradestatus">Trade Status</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Retail Report List</span>}
            > 
            <RetailReports history={this.props.history}/>
            </Format>
     
          }} /> <Route 
          path='/home/reports/trade' 
          render={()=>{return <Format 
          style={{background:"#ecf0f5",border:"none"}}
          history={this.props.history}
          breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/home/reports/tradestatus">Trade Status</Breadcrumb.Item>
              </Breadcrumb>
            </span>
            }
          headername={<span id="Usertxt">Trade Report List</span>}
          > 
          <TradeReports history={this.props.history}/>
          </Format>
   
        }} /> <Route 
        path='/home/reports/delivery' 
        render={()=>{return <Format 
        style={{background:"#ecf0f5",border:"none"}}
        history={this.props.history}
        breadcrumb={<span id="BreadCrumbspan">
            <Breadcrumb separator=">">
              <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/reports/tradestatus">Trade Status</Breadcrumb.Item>
            </Breadcrumb>
          </span>
          }
        headername={<span id="Usertxt">Delivery Report List</span>}
        > 
        <DeliveryReports history={this.props.history}/>
        </Format>
 
      }} />

        </div>
      )
    }
  }
  