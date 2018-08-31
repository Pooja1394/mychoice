/*This file contains the code for UserInformation in admin panel 
Created By-Aviral Garg
Created On-13/04/18
*/

import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Table, Breadcrumb } from 'antd';
import "../style/Content.css"
import Header from "./Header";
import { Link } from 'react-router-dom';
import CreateUserContent from '../component/CreateUserContent'
import MyContent from './MyContent';
import {connect} from "react-redux"
import ProductManagementSuppliersList from './productmanagement/ProductManagementSuppliersList'
import ProductManagementCategoryList from './productmanagement/ProductManagementCategoryList'
import ProductManagementBrandsList from './productmanagement/ProductManagementBrandsList'
import Products from './productmanagement/Products'
 class ProductContent extends Component {
exportCSV=()=>{
  this.props.userTableCSV.exportCSV()
}
  render() {
    return (
      <div>
          <div>jjjjjjjjjjjjjjjjjjjj</div>
          <Route exact path='/home/product' component={Products}/>
          <Route path='/home/product/categories' component={ProductManagementSuppliersList}/>
          <Route path='/home/product/brands' component={ProductManagementSuppliersList}/>
          <Route path='/home/product/suppliers' component={ProductManagementSuppliersList}/>
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{   
    ...state,
  }
}

export default connect(mapStateToProps,null)(ProductContent)