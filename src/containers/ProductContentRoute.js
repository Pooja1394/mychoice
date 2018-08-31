/*This file contains the code for UserInformation in admin panel 
Created By-Aviral Garg
Created On-13/04/18
*/

import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import "../style/Content.css";
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import MyContent from '../component/MyContent';
import { Breadcrumb } from 'antd';
import { HANDLE_CATEGORY_AUTOFILL_REQUEST} from '../actions/types';
import "../style/Content.css"
import Header from "../component/Header";
import CreateUserContent from '../component/CreateUserContent'
import ProductManagementProductsList from '../component/productmanagement/ProductManagementProductsList'
import AddProductContent from "../component/AddProductContent"
import AddProductCategory from "../component/AddProductCategory"
import AddProductSupplier from "../component/AddProductSupplier"
import AddProductBrand from "../component/AddProductBrand"
import ProductManagementCategoryList from '../component/productmanagement/ProductManagementCategoryList'
import ProductManagementBrandsList from '../component/productmanagement/ProductManagementBrandsList'
import ProductManagementSuppliersList from '../component/productmanagement/ProductManagementSuppliersList'
import Format from '../component/format'
import {checkAddPrivileges} from "../utils/Method"
class ProductContentRoute extends Component {
  csvDownload=()=>{
    console.log("=====>",this.props.state)
    this.props.state.userTableCSV.exportCSV();      
   }
  render() {
    return (
      <div>
        {/* {<Format> <UserListTable/></Format>} */}
        <Route
          exact path='/home/product'
          render={() => {
            return <Format
            history={this.props.history}
              breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="">Products</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
              headername={<span id="Usertxt">Product List</span>}
              buttonspan={<span id="ButtonSpans" style={{display:'flex'}}>
              <Link to="/home/product/createproduct">
              <button id="btnCreateUser" 
              style={{display:this.props.state  && checkAddPrivileges('Products')?'flex':'none'}}                                    
              onClick={()=>this.props.onCategoryChangeHandler({})}>
              Add Product</button></Link>
              <button id="btnExportCsv" onClick={()=>{this.csvDownload()}}>Export CSV</button>
          </span>}
            >
              <ProductManagementProductsList history={this.props.history}/>
              </Format> 
          }}
           />
  <Route
          path='/home/product/createproduct'
          // render={()=>{return <div>hhh</div>}}
          render={() => {
            return <Format
            history={this.props.history}
            style={{borderTop:"4px solid #3c8dbc"}}
              breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/home/product">Products</Breadcrumb.Item>
                  <Breadcrumb.Item href="">Create Product</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
              headername={<span id="Usertxt">Product</span>}
          //     buttonspan={<span id="ButtonSpans">
          //     <button id="btnExportCsv" onClick={()=>this.props.history.push("/home/product")}>Cancel</button>
          // </span>}
            >
              <AddProductContent history={this.props.history}/>
              </Format> 
          }}
           />
        <Route path='/home/product/categories' render={() => {
          return <Format
          history={this.props.history}
          display="none"
            breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/product/categories">Categories</Breadcrumb.Item>

              </Breadcrumb>
            </span>
            }
            headername={<span id="Usertxt">Category List</span>}
            buttonspan={<span id="ButtonSpans" style={{display:'flex'}}>
            <Link to="/home/product/createcategory" > 
             <button 
              style={{display:this.props.state  && checkAddPrivileges('Products')?'flex':'none'}}                                                  
             id="btnCreateUser">Add Category </button></Link>
            <button id="btnExportCsv" onClick={()=>{this.csvDownload()}}>Export CSV</button>
        </span>}
          > <ProductManagementCategoryList history={this.props.history}/></Format>
        }} />
         <Route path='/home/product/createcategory' render={() => {
          return <Format
          history={this.props.history}
          style={{borderTop:"4px solid #3c8dbc"}}
            breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/product/categories">Categories</Breadcrumb.Item>
                <Breadcrumb.Item href="">Create Category</Breadcrumb.Item>
              </Breadcrumb>
            </span>
            }
            headername={<span id="Usertxt">Category</span>
          }
      //     buttonspan={<span id="ButtonSpans">
      //     <button id="btnExportCsv" onClick={()=>this.props.history.push("/home/product/categories")}>Cancel</button>
      // </span>}
          > <AddProductCategory history={this.props.history} /></Format>
        }} />
       
       <Route path='/home/product/brands' render={() => {
          return <Format
          history={this.props.history}
          display="none"
            breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/product/brands">Brands</Breadcrumb.Item>

              </Breadcrumb>
            </span>
            }
            headername={<span id="Usertxt">Brand List</span>}
            buttonspan={<span id="ButtonSpans" style={{display:'flex'}}>
                  <Link to="/home/product/createbrand" > 
                   <button 
              style={{display:this.props.state  && checkAddPrivileges('Products')?'flex':'none'}}                                                  
              
                   id="btnCreateUser">Add Brand </button></Link>
                  <button id="btnExportCsv" onClick={()=>{this.csvDownload()}}>Export CSV</button>
              </span>}
          > <ProductManagementBrandsList  history={this.props.history} /></Format>
        }} />
         <Route path='/home/product/createbrand' render={() => {
          return <Format
          history={this.props.history}
          style={{borderTop:"4px solid #3c8dbc"}}
          
          
            breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/product/brands">Brands</Breadcrumb.Item>
                <Breadcrumb.Item href="">Create Brand</Breadcrumb.Item>
              </Breadcrumb>
            </span>
            }
            headername={<span id="Usertxt">Brand</span>}
        //     buttonspan={<span id="ButtonSpans">
        //     <button id="btnExportCsv" onClick={()=>this.props.history.push("/home/product/brands")}>Cancel</button>
        // </span>}
          > <AddProductBrand history={this.props.history}/></Format>
        }} />
       <Route path='/home/product/suppliers' render={() => {
          return <Format
          history={this.props.history}
          display="none"
            breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/product/suppliers">Suppliers</Breadcrumb.Item>

              </Breadcrumb>
            </span>
            }
            headername={<span id="Usertxt">Suppliers List</span>}
            buttonspan={<span id="ButtonSpans" style={{display:'flex'}}>
            <Link to="/home/product/createsupplier">
            <button
              style={{display:this.props.state  && checkAddPrivileges('Products')?'flex':'none'}}                                                                
            id="btnCreateUser">Add Supplier</button></Link>
            <button id="btnExportCsv" onClick={()=>{this.csvDownload()}}>Export CSV</button>
        </span>}
          > <ProductManagementSuppliersList  history={this.props.history}/></Format>
        }} />
         <Route path='/home/product/createsupplier' render={() => {
          return <Format
          history={this.props.history}
          style={{borderTop:"4px solid #3c8dbc"}}
            breadcrumb={<span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/product/suppliers">Suppliers</Breadcrumb.Item>
                <Breadcrumb.Item href="">Create Supplier</Breadcrumb.Item>
              </Breadcrumb>
            </span>
            }
            headername={<span id="Usertxt">Supplier</span>}
        //     buttonspan={<span id="ButtonSpans">
        //     <button id="btnExportCsv" onClick={()=>this.props.history.push("/home/product/suppliers")}>Cancel</button>
        // </span>}
          > <AddProductSupplier history={this.props.history}/></Format>
        }} />
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  console.log("===11111111111>",state)
  return{
    state:state,
    fetching:state.fetching,
    userArrayList:state.userArrayList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryChangeHandler:(data)=> dispatch({ type: HANDLE_CATEGORY_AUTOFILL_REQUEST, data })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductContentRoute)