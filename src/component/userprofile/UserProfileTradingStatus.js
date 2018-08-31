/*This file contains the code for User Profile Trading Status Content 
Created By-Aviral Garg
Created On-17/04/18
*/

import React, { Component } from 'react'
import "../../style/userprofile/UserProfileTradingStatus.css"
export default class UserProfileTradingStatus extends Component {
  state = {
    arr:[
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"3000",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
      {SNo:1,Image:123,ProductName:'abc',ProductId:"123",OrderDate:"yyyyyyy",Quantity:"300",RetailPrice:"2500",Category:"Electronics",BrandName:"Samsung",SupplierName:"Onida",OrderBy:"admin",Status:"Open"},
          ],
    searchText:""
  };
  render() {
    return (
      <div>
         <div className="table-operations">
      <span id="selecNos">
      <select >
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
      </select></span>
      <span  id="showProductText">Show</span>
      <span id="resetProductFilters">Reset Filter</span>    
       </div>
       <div id="UserProfileTradingStatusTable">
<table>
 <tbody>
     <tr>
       <th id="SNoBox" scope="col">S.NO</th>
       <th id="ImageBox" scope="col">Image</th>
       <th id="ProductNameBox"scope="col">Product Name</th>
       <th id="ProductIdBox"scope="col">Product Id</th>
       <th id="TradingDateBox"scope="col">Trading Date</th>
       <th id="QuantityBox" scope="col">Quantity</th>
       <th id="PriceBox" scope="col"> Price</th>
       <th id="StatusBox"scope="col">Status</th>
     </tr>
   
     
     <tr>
      <td id="SNoBox"></td>
       <td id="ImageBox"></td>
       <td id="ProductNameBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="ProductIdBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="TradingDateBox"></td>
       <td id="QuantityBox"></td>
       <td id="PriceBox"><input className="filterField" type="text"/></td>
      <td id="StatusBox"><select className="filterField">
  <option value="All">All</option>
  <option value="Open">Open</option>
  <option value="Lock">Lock</option>
      </select></td>
      </tr>
       
{ this.state.arr.map((item) => {
  console.log('value ->', item)
  return <tr>
  <td id="SNoBox" >{item.SNo}</td>
  <td id="ImageBox">{item.Image}</td>
  <td id="ProductNameBox">{item.ProductName}</td>
  <td id="ProductIdBox">{item.ProductId}</td>
  <td id="TradingDateBox">{item.OrderDate}</td>
  <td id="QuantityBox">{item.RetailPrice}</td>
  <td id="PriceBox">{item.RetailPrice}</td>
  <td id="StatusBox">{item.Status}</td>
  </tr>
})
}
</tbody>
 </table>
</div>
      </div>
    )
  }
}
