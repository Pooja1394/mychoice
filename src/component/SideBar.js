/*This file contains the code for Sider 
Created By-Aviral Garg
Created On-13/04/18
*/
import { Layout, Menu } from 'antd';
import {connect} from "react-redux"
import React, { Component } from 'react'
import logo from "../images/logoSideBar.png";
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom'
import Route from 'react-router-dom/Route';
import "../style/SideBar.css";
import { SET_PRIVILIGES_AT_LOGIN } from '../actions/types';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class SideBar extends Component {
    
    componentDidMount() {
        if(localStorage.getItem("privileges"))
        this.props.setPrivilegesAtLogin(JSON.parse( localStorage.getItem("privileges")))
     else
     {
     console.log("privileges not available")
        }
    }
   checkdisplay=(tab)=>{
       let check=false;
       console.log("emailatlogin",localStorage.getItem("email"))
       if(localStorage.getItem("email")=="admin@gmail.com")
       {
        return true;
       }
      
       else{
        this.props.state.privilegeAtLogin.map((value,key)=> 
        
        {if(value.selectPrivilege==tab)
        {  check=true;}
       })
       return check;
       }
   } 

   
    render() {

        return (


            
<div className="sider_container">
       
        <div className="logo" id="Siderlogo"><img id="Siderimg" src={logo} alt="MyChoice" /> </div>
        <div className="wrapper">
        
      <Sider width={210} >
        <Menu
          mode="inline"
         theme="dark"
         selectedKeys={this.props.state.default?this.props.state.default:""}
          style={{  width: '100%', left: 0 }}
        >
        <div id="SiderInfo">
        <li>
            <img id="Avatarspan" src={localStorage.getItem("picture")}alt="avator" style={{height:"45px",width:"45px",marginTop:"15px",borderRadius:"23px",marginLeft:"15px"}}/>
            <div id="SiderInfodiv">
                <div id="SiderUserspan"><div id="UserNamesidediv" style={{fontFamily:"regularfont"}}>{localStorage.getItem("name")}</div></div>
              <div id="SiderUserspan"><div style={{fontFamily:"regularfont"}}>  <div style={{background:this.props.state.online?"green":"tomato",width:"6px",border:this.props.state.online?"1px solid green":"1px solid tomato",height:"6px",background:this.props.state.online?"green":"tomato",borderRadius:"10px"}}></div>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.state.online?'Online':'Offline'}</div></div>
            </div>
            
        
        </li>
        </div>
        <Menu.Item
         key="50">
                    <NavLink className="nav-text" to="/home/dash"><img style={{width:17,height:17}} src={require("../icons/SideBar/dashboard.png")} alt="user" />&nbsp;&nbsp;Dashboard</NavLink>
                    </Menu.Item>
        <Menu.Item
        style={{display:this.props.state  && this.checkdisplay('users')?'block':'none'}}
       
        key="1">
                    <NavLink className="nav-text" to="/home/user"><img src={require("../icons/SideBar/users.png")} alt="user" />&nbsp;&nbsp;Users</NavLink>
                    </Menu.Item>
                   
          <SubMenu key="2"
          style={{display:this.props.state  && this.checkdisplay("Products")?'block':'none'}}
                    title={<span><img src={require("../icons/SideBar/products.png")} alt="user" />&nbsp;&nbsp;<span>Products</span></span>}>
                        <Menu.Item key="21"><NavLink className="nav-text" to="/home/product">Products</NavLink></Menu.Item>
                        <Menu.Item key="22"><NavLink className="nav-text" to="/home/product/categories">Categories</NavLink></Menu.Item>
                        <Menu.Item key="23"><NavLink className="nav-text" to="/home/product/brands">Brands</NavLink></Menu.Item>
                        <Menu.Item key="24"><NavLink className="nav-text" to="/home/product/suppliers">Suppliers</NavLink></Menu.Item>
            </SubMenu>

            <Menu.Item key="3"
          style={{display:this.props.state  && this.checkdisplay("Auctions")?'block':'none'}}
          
            >
                    <NavLink className="nav-text" to="/home/auction"><img src={require("../icons/SideBar/auctions.png")} alt="user" />&nbsp;&nbsp;Auctions</NavLink>
                    </Menu.Item>
                
                    <SubMenu
          style={{display:this.props.state && this.checkdisplay("Deposits")?'block':'none'}}
          
                        key="4"
                        title={<span><img src={require("../icons/SideBar/deposit-credit.png")} alt="user" />&nbsp;&nbsp;<span>Deposit & Credit</span></span>}>
                        <Menu.Item key="41"><NavLink className="nav-text" to="/home/depositncredit">Payment details</NavLink></Menu.Item>
                        <Menu.Item key="42"><NavLink className="nav-text" to="/home/depositncredit/transfer">Transfer</NavLink></Menu.Item>
                        <Menu.Item key="43"><NavLink className="nav-text" to="/home/depositncredit/buybidsbybank">Buy Bids By Bank</NavLink></Menu.Item>
                        <Menu.Item key="44"><NavLink className="nav-text" to="/home/depositncredit/bidpackages">Bid Packages</NavLink></Menu.Item>
                        <Menu.Item key="45"><NavLink className="nav-text" to="/home/depositncredit/bank">Bank</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu
                     key="5"
          style={{display:this.props.state  && this.checkdisplay("Reviews")?'block':'none'}}
          
                            title={<span><img src={require("../icons/SideBar/reviews.png")} alt="user" />&nbsp;&nbsp;<span>Reviews</span></span>}>
                        <Menu.Item key="51"><NavLink className="nav-text" to="/home/review">Reviews</NavLink></Menu.Item>
                        <Menu.Item key="52"><NavLink className="nav-text" to="/home/review/permissions">Permissions</NavLink></Menu.Item>
                        <Menu.Item key="53"><NavLink className="nav-text" to="/home/review/packages">Packages</NavLink></Menu.Item>
                    </SubMenu>

                    <SubMenu key="6"
          style={{display:this.props.state  && this.checkdisplay("TradeExchange")?'block':'none'}}
          
                    title={<span><img src={require("../icons/SideBar/trade-exchange-control.png")} alt="user" />&nbsp;&nbsp;<span>Trade Exchange</span></span>}>
                        <Menu.Item key="61"><NavLink className="nav-text" to="/home/tradeexchange/tradeout">Trade Out</NavLink></Menu.Item>
                        <Menu.Item key="62"><NavLink className="nav-text" to="/home/tradeexchange/payment">Payment</NavLink></Menu.Item>
                        <Menu.Item key="63"><NavLink className="nav-text" to="/home/tradeexchange/tradestatus">Trade Status</NavLink></Menu.Item>
                    </SubMenu>

                    <SubMenu key="7"
          style={{display:this.props.state  && this.checkdisplay("Coupons")?'block':'none'}}
          
                            title={<span><img src={require("../icons/SideBar/coupons.png")} alt="user" />&nbsp;&nbsp;<span>Coupons</span></span>}>
                        <Menu.Item key="71"><NavLink className="nav-text" to="/home/coupons">Coupons</NavLink></Menu.Item>
                        <Menu.Item key="72"><NavLink className="nav-text" to="/home/coupons/permissions">Permissions</NavLink></Menu.Item>
                        <Menu.Item key="73"><NavLink className="nav-text" to="/home/coupons/packages">Packages</NavLink></Menu.Item>
                    </SubMenu>

                    <Menu.Item
          style={{display:this.props.state  && this.checkdisplay("Logging")?'block':'none'}}
          
                    key="8">
                        <NavLink className="nav-text" to="/home/logs"><img src={require("../icons/SideBar/logging-analytics.png")} alt="user" />&nbsp;&nbsp;Logs</NavLink>
                    </Menu.Item>

                    <SubMenu
                        key="9"
          style={{display:this.props.state  && this.checkdisplay("Reports")?'block':'none'}}
          
                        title={<span><img src={require("../icons/SideBar/reports.png")} alt="user" />&nbsp;&nbsp;<span>Reports</span></span>}>
                        <Menu.Item key="91"><NavLink className="nav-text" to="/home/reports/deposit">Deposit</NavLink></Menu.Item>
                        <Menu.Item key="92"><NavLink className="nav-text" to="/home/reports/coupon">Coupon</NavLink></Menu.Item>
                        <Menu.Item key="93"><NavLink className="nav-text" to="/home/reports/auction">Auction</NavLink></Menu.Item>
                        <Menu.Item key="94"><NavLink className="nav-text" to="/home/reports/retail">Retail</NavLink></Menu.Item>
                        <Menu.Item key="95"><NavLink className="nav-text" to="/home/reports/trade">Trade</NavLink></Menu.Item>
                        <Menu.Item key="96"><NavLink className="nav-text" to="/home/reports/delivery">Delivery</NavLink></Menu.Item>
                    </SubMenu>

                    <Menu.Item key="10"
          style={{display:this.props.state  && this.checkdisplay("CMS")?'block':'none'}}
          
                    >
                        <NavLink className="nav-text" to="/"><img src={require("../icons/SideBar/cms.png")} alt="user" />&nbsp;&nbsp;CMS(English)</NavLink>
                    </Menu.Item>

                    <Menu.Item 
          style={{display:this.props.state  && this.checkdisplay("CMS")?'block':'none'}}
          
                    key="11">
                        <NavLink className="nav-text" to="/"><img src={require("../icons/SideBar/cms-copy.png")} alt="user" />&nbsp;&nbsp;CMS(Myanmar)</NavLink>
                    </Menu.Item>

                    <SubMenu
          style={{display:this.props.state  && this.checkdisplay("Employee")?'block':'none'}}
          
                        key="12"
                        title={<span><img src={require("../icons/SideBar/employee-management.png")} alt="user" />&nbsp;&nbsp;<span>Employees</span></span>}>
                         <Menu.Item key="121"><NavLink className="nav-text" to="/home/employee">Employee</NavLink></Menu.Item>
                         <Menu.Item key="122"><NavLink className="nav-text" to="/home/employee/department">Department</NavLink></Menu.Item>
                         <Menu.Item key="123"><NavLink className="nav-text" to="/home/employee/designation">Designation</NavLink></Menu.Item>
                         <Menu.Item key="124"><NavLink className="nav-text" to="/home/employee/previliges">Privileges</NavLink></Menu.Item>
                       
                    </SubMenu>

                    <SubMenu
                        key="13"
          style={{display:this.props.state  && this.checkdisplay("Delivery")?'block':'none'}}
          
                        title={<span><img src={require("../icons/SideBar/delivery.png")} alt="user" />&nbsp;&nbsp;<span>Deliveries</span></span>}>
                        <Menu.Item key="131"><NavLink className="nav-text" to="/home/delivery">Customer Orders & Processing</NavLink></Menu.Item>
                        <Menu.Item key="132"><NavLink className="nav-text" to="/home/delivery/orderAssign">Order Assign & Ongoing</NavLink></Menu.Item>
                        <Menu.Item key="133"><NavLink className="nav-text" to="/home/delivery/deliveryStatus">Delivery Status & Receiving</NavLink></Menu.Item>
                        <Menu.Item key="134"><NavLink className="nav-text" to="/home/delivery/deliveryService">Delivery Service</NavLink></Menu.Item>
                        <Menu.Item key="135"><NavLink className="nav-text" to="/home/delivery/carrier">Carrier</NavLink></Menu.Item>
                        
                    </SubMenu>

                    <Menu.Item 
          style={{display:this.props.state  && this.checkdisplay("Notification")?'block':'none'}}
          
                    key="14">
                        <NavLink className="nav-text" to="/home/notifications"><img src={require("../icons/SideBar/notification.png")} alt="user" />&nbsp;&nbsp;Notifications</NavLink>
                        </Menu.Item>
                      
         
        </Menu></Sider>
        
         
        </div>
      </div>

        )
    }
}
const mapStateToProps=(state)=>{
    return{
      state:state,
      fetching:state.fetching,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        setPrivilegesAtLogin: data => dispatch({ type: SET_PRIVILIGES_AT_LOGIN, data })

    };
  };
  export default connect(mapStateToProps,mapDispatchToProps)(SideBar)