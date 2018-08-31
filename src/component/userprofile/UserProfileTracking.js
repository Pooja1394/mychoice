/*This file contains the code for User Profile Tracking Content 
Created By-Aviral Garg
Created On-17/04/18
*/
import React, { Component } from 'react'
import "../../style/Content.css";
import "../../style/userprofile/UserProfileTracking.css"

export default class UserProfileTracking extends Component {
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
<div className="UserProfileTrackingTable">
<table>
 <tbody>
     <tr>
       <th id="SNoBox" scope="col">S.NO</th>
       <th id="ImageBox" scope="col">Image</th>
       <th id="ProductNameBox"scope="col">Product Name</th>
       <th id="ProductIdBox"scope="col">Product Id</th>
       <th id="OrderDateBox"scope="col">Order Date</th>
       <th id="DeliveryDateBox"scope="col">Delivery Date</th>
       <th id="OrderTypeBox"scope="col">Order Type</th>
       <th id="QuantityBox" scope="col">Quantity</th>
       <th id="PriceBox" scope="col"> Price</th>
       <th id="ShippingChargesBox" scope="col">Shipping Charges</th>
       <th id="PromotionBox" scope="col">Promotion  </th>
       <th id="CouponBox" scope="col">Coupon  </th>
       <th id="TotalPriceBox" scope="col">Total Price</th>
       <th id="ConfirmedByBox"scope="col">Confirmed By</th>
       <th id="DeliveryByBox" scope="col">Delivery By</th>
       <th id="StatusBox"scope="col">Status</th>
     </tr>
   
     
     <tr>
      <td id="SNoBox"></td>
       <td id="ImageBox"></td>
       <td id="ProductNameBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="ProductIdBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="OrderDateBox"></td>
       <td id="DeliveryDateBox" ><input className="filterField" type="text"/></td>
       <td id="OrderTypeBox"></td>
       <td id="QuantityBox"></td>
       <td id="PriceBox"><input className="filterField" type="text"/></td>
       <td id="ShippingChargesBox"></td>
       <td id="PromotionBox"><input className="filterField" type="text"/></td>
       <td id="CouponBox"></td>
       <td id="TotalPriceBox"></td>
       <td id="ConfirmedByBox"></td>
       <td id="DeliveryByBox"><input className="filterField" id="TypeText"type="text"placeholder="Search Type"/></td>
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
  <td id="OrderDateBox">{item.OrderDate}</td>
  <td id="DeliveryDateBox">{item.Quantity}</td>
  <td id="OrderTypeBox">{item.RetailPrice}</td>
  <td id="QuantityBox">{item.RetailPrice}</td>
  <td id="PriceBox">{item.RetailPrice}</td>
  <td id="ShippingChargesBox">{item.Category}</td>
  <td id="PromotionBox">{item.BrandName}</td>
  <td id="CouponBox">{item.SupplierName}</td>
  <td id="TotalPriceBox">{item.SupplierName}</td>
  <td id="ConfirmedByBox">{item.SupplierName}</td>
  <td id="DeliveryByBox">{item.OrderBy}</td>
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
