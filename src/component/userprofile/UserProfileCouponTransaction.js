/*This file contains the code for User Profile Coupn Transaction Content 
Created By-Aviral Garg
Created On-18/04/18
*/

import React, { Component } from 'react'
import "../../style/userprofile/UserProfileCouponTransaction.css"
export default class UserProfileCouponTransaction extends Component {
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
<div id="UserProfileCouponTransactionTable">
<table>
 <tbody>
     <tr>
       <th id="SNoBox" scope="col">S.NO</th>
       <th id="ImageBox" scope="col">Image</th>
       <th id="CouponCodeBox"scope="col">Coupon Code</th>
       <th id="UsedDateBox"scope="col">Used Date</th>
       <th id="PackageTypeBox"scope="col">Package Type</th>
       <th id="CreatedByBox"scope="col">Created By</th>
       
     </tr>
   
     
     <tr>
      <td id="SNoBox"></td>
       <td id="ImageBox"></td>
       <td id="CouponCodeBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="UsedDateBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="PackageTypeBox"></td>
       <td id="CreatedByBox" ><input className="filterField" type="text"/></td>
        </tr>
       
{ this.state.arr.map((item) => {
  console.log('value ->', item)
  return <tr>
  <td id="SNoBox" >{item.SNo}</td>
  <td id="ImageBox">{item.Image}</td>
  <td id="CouponCodeBox">{item.ProductName}</td>
  <td id="UsedDateBox">{item.ProductId}</td>
  <td id="PackageTypeBox">{item.OrderDate}</td>
  <td id="CreatedByBox">{item.Quantity}</td>
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
