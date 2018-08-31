/*This file contains the code for User Profile Trading Transaction Content 
Created By-Aviral Garg
Created On-17/04/18
*/

import React, { Component } from 'react'
import "../../style/userprofile/UserProfileTradingTransaction.css"
export default class UserProfileTradingTransaction extends Component {
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
       <div id="UserProfileTradingTransactionTable">
<table>
 <tbody>
     <tr>
       <th id="SNoBox" scope="col">S.NO</th>
       <th id="ImageBox" scope="col">Image</th>
       <th id="ProductNameBox"scope="col">Product Name</th>
       <th id="ProductIdBox"scope="col">Product Id</th>
       <th id="TraderNameBox"scope="col">Trader Name</th>
       <th id="TradeInOutDateBox" scope="col">Trade In/Trade Out Date</th>
       <th id="BuyerSellerNameBox" scope="col"> Buyer/Seller Name</th>
       <th id="SoldPurchasingDateBox"scope="col">Sold Out/Purchasing Date</th>
       <th id="TradeBalanceBox" scope="col"> Trade Balance</th>
     </tr>
   
     
     <tr>
      <td id="SNoBox"></td>
       <td id="ImageBox"></td>
       <td id="ProductNameBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="ProductIdBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="TraderNameBox"></td>
       <td id="TradeInOutDateBox"></td>
       <td id="BuyerSellerNameBox"><input className="filterField" type="text"/></td>
       <td id="SoldPurchasingDateBox"><input className="filterField" type="text"/></td>
       <td id="TradeBalanceBox"><input className="filterField" type="text"/></td>
     
      </tr>
       
{ this.state.arr.map((item) => {
  console.log('value ->', item)
  return <tr>
  <td id="SNoBox" >{item.SNo}</td>
  <td id="ImageBox">{item.Image}</td>
  <td id="ProductNameBox">{item.ProductName}</td>
  <td id="ProductIdBox">{item.ProductId}</td>
  <td id="TraderNameBox">{item.BrandName}</td>
  <td id="TradeInOutDateBox">{item.OrderDate}</td>
  <td id="BuyerSellerNameBox">{item.BrandName}</td>
  <td id="SoldPurchasingDateBox">{item.OrderDate}</td>
  <td id="TradeBalanceBox">{item.RetailPrice}</td>
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
