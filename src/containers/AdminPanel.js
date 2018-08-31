/*This file contains the code for AdminPanel 
Created By-Aviral Garg
Created On-13/04/18
*/

import React, { Component } from 'react';
import SideBar from '../component/SideBar';
import Content from '../component/UserContent'
import CreateUserContent from '../component/CreateUserContent'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../style/adminpanel.css"
import UserProfile from "./UserProfile"
import ResetPassword from "../component/ResetPassword"
import { Breadcrumb } from 'antd';
import "../style/Content.css"
import Header from "../component/Header";
import Dashboard from "./Dashboard"
import UserContent from "./UserContent"
import ProductContentRoute from './ProductContentRoute'
import Auction from './AuctionContentRoute.js'
import DepositnCredit from './DepositnCredit'
import Review from './ReviewContentRoute'
import CouponManagement from "./CouponManagement"
import AdminSettings from "./AdminSettings";
import Reports from "./ReportsContentRoute";
import Logs from "./LogsRoute"
import NotificationContainer from "./NotificationContainer"
import EmployeeContainer from "./EmployeeContainer"
import TradeExchange from './TradeExchangeContentRoute';
import DeliveryContainer from './DeliveryContainer';
import {connect} from "react-redux"
import { CONNECT_TO_WEBSOCKET} from '../actions/types';

class AdminPanel extends Component {
  componentDidMount=()=>{
    console.log("called")
    this.props.createConnection(localStorage.getItem('userId'))
  }
  render() {
    return (
     
        <div className="parent_container">
        <SideBar /> 
         <div>
          <Route path='/home/dash' component={Dashboard}/>
          <Route path='/home/user' component={UserContent}/>
          <Route path="/home/product" component={ProductContentRoute}/>
          <Route path='/home/user/resetpassword' component={ResetPassword}/>
          <Route path="/home/user/settings" component={AdminSettings}/>
          <Route path="/home/auction" component={Auction}/>
          <Route path="/home/depositncredit" component={DepositnCredit}/>
          <Route path="/home/tradeexchange" component={TradeExchange}/>
          <Route path="/home/review" component={Review}/>
          <Route path="/home/coupons" component={CouponManagement}/>
          <Route path="/home/reports" component={Reports}/>
          <Route path="/home/logs" component={Logs}/>
          <Route path="/home/notifications" component={NotificationContainer}/>
          <Route path="/home/employee" component={EmployeeContainer}/>
          <Route path="/home/delivery" component={DeliveryContainer}/>
           </div> 
      </div>
      
    )
  }
}
const mapStateToProps=(state)=>{
}
const mapDispatchToProps=(dispatch)=>{
  return{
    createConnection: (id) => dispatch({type:CONNECT_TO_WEBSOCKET,id})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdminPanel)