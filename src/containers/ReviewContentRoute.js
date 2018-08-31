import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from '../component/AuctionContent'
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import ReviewListContent from '../component/review/ReviewListContent'
import PermissionsContent from '../component/review/PermissionsContent'
import PackageContent from '../component/review/PackageContent'
import AddPackage from '../component/review/AddPackage'
import AddPermission from '../component/review/AddPermission'
import {checkdisplay} from "../utils/Method"
export default class Review extends Component {
  
  componentWillMount() {
  }
  
    render() {
      return (
        <div >
           <Route 
          exact path='/home/review' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/review">Reviews</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Review List</span>}
            > 
            <ReviewListContent/></Format>
     
          }} />
            <Route 
          path='/home/review/permissions' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/review/permissions">Permissions</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Permission List</span>}
            > 
            <PermissionsContent/></Format>
     
          }} />
           <Route 
          path='/home/review/createpermission' 
          render={()=>{return <Format 
            style={{borderTop:"3px solid #3c8dbc"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/review/permissions">Permissions</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Permission List</span>}
            > 
            <AddPermission history={this.props.history}/>
            </Format>
     
          }} />

           <Route 
          path='/home/review/packages' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/review/packages">Packages</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Package List</span>}
            > 
            <PackageContent/></Format>
     
          }} />
             <Route 
          path='/home/review/createpackage' 
          render={()=>{return <Format 
            history={this.props.history}
            style={{borderTop:"3px solid #3c8dbc"}}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/review/permissions">Package</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Create Package</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Package</span>}
            > 
            <AddPackage history={this.props.history}/>
            </Format>
     
          }} />
       
        </div>
      )
    }
  }
  