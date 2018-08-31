import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from '../component/AuctionContent'
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import {checkdisplay} from "../utils/Method"
import CouponContent from "../component/coupons/CouponContent"
import PermissionContent from "../component/coupons/PermissionContent"
import CouponPackageContent from "../component/coupons/CouponPackageContent"
import CreateCouponPackage from "../component/coupons/CreateCouponPackage"
import CreateCouponPermission from "../component/coupons/CreateCouponPermission"
export default class CouponManagement extends Component {
  
  componentWillMount() {
  }
  
    render() {
      return (
        <div >
           <Route exact
          path='/home/coupons' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons">Coupons</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Coupon List</span>}
            > 
            <CouponContent/></Format>
     
          }} />
            <Route exact
          path='/home/coupons/permissions' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons/permissions">Permissions</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Permission List</span>}
            > 
            <PermissionContent/></Format>
     
          }} />

           <Route exact
          path='/home/coupons/packages' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons/packages">Packages</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Package List</span>}
            > 
            <CouponPackageContent/></Format>
     
          }} />
          
          
         <Route exact
          path='/home/coupons/packages/createpackage' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons/packages">Packages</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons/packages/createpackage">Create Package</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Package</span>}
            buttonspan={<Link to="/home/coupons/packages"><button id="buttonExportCsv">Cancel</button></Link>}
            > 
            <CreateCouponPackage/></Format>
     
          }} />

<Route exact
          path='/home/coupons/permissions/createpermission' 
          render={()=>{return <Format 
            history={this.props.history}
            style={{borderTop:"3px solid #3c8dbc"}}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons/permissions">Permission</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/coupons/permissions/createpermission">Add Permission</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Permission</span>}
            buttonspan={<Link to="/home/coupons/permissions"><button id="buttonExportCsv">Cancel</button></Link>}
            > 
            <CreateCouponPermission history={this.props.history}/></Format>
     
          }} />
        </div>
      )
    }
  }
  