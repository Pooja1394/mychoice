import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from '../component/AuctionContent'
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import CustomerOrders from "../component/deliverymanagement/customerOrders"
import OrderAssign from "../component/deliverymanagement/orderAssign"
import Carrier from "../component/deliverymanagement/carrier"
import DeliveryService from "../component/deliverymanagement/deliveryService"
import DeliveryStatus from "../component/deliverymanagement/deliveryStatus"
import AddDeliveryService from "../component/deliverymanagement/AddDeliveryServiceContent"
export default class DeliveryContainer extends Component {
    render() {
      return (
        <div >

          <Route exact
          path='/home/delivery' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Customer Orders & Processing</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Customer Orders & Processing List</span>}
            > 
            <CustomerOrders history={this.props.history}/></Format>
     
          }} />
         
         <Route exact
          path='/home/delivery/orderAssign' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Order Assign & Ongoing</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Order Assign & Ongoing List</span>}
            > 
            <OrderAssign history={this.props.history}/></Format>
          }} />

<Route exact
          path='/home/delivery/deliveryStatus' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Delivery Status & Receiving</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Delivery Status & Receiving List</span>}
            > 
            <DeliveryStatus history={this.props.history}/></Format>
          }} />

<Route exact
          path='/home/delivery/deliveryService' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Delivery Service</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Delivery Service List</span>}
            > 
            <DeliveryService history={this.props.history}/></Format>
          }} />

<Route exact
          path='/home/delivery/carrier' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">carrier</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Carrier List</span>}
            > 
            <Carrier history={this.props.history}/></Format>
          }} />

<Route exact
          path='/home/delivery/deliveryService/addDeliveryService' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Delivery Service</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Create Delivery Service</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
              buttonspan = { <span id="ButtonSpans">
              <Link to="/home/delivery/deliveryService" >  <button id="btnExportCsv">Cancel</button></Link>
              </span>}
            headername={<span id="Usertxt">Create Delivery Service</span>}
            > 
            <AddDeliveryService history={this.props.history}/></Format>
          }} />

        </div>
      )
    }
  }
  