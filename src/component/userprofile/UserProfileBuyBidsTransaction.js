/*This file contains the code for User Profile Buy Bids Transaction Content 
Created By-Aviral Garg
Created On-18/04/18
*/
import React, { Component } from 'react'
import "../../style/userprofile/UserProfileBuyBidsTransaction.css"
export default class UserProfileBuyBidsTransaction extends Component {
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
<div id="UserProfileBuyBidsTransactionTable">
<table>
 <tbody>
     <tr>
       <th id="SNoBox" scope="col">S.NO</th>
       <th id="TransactionIdBox" scope="col">Transaction Id</th>
       <th id="BidsPackageBox"scope="col">Bids Package</th>
       <th id="AmountBox"scope="col">Amount</th>
       <th id="PaymentDateBox"scope="col">Payment Date</th>
       <th id="TransferDateBox"scope="col">Transfer Date</th>
       <th id="PaymentTypeBox"scope="col">Payment Type</th>
       <th id="BankDetailsBox"scope="col">Bank Details</th>
       <th id="InvoiceNumberBox"scope="col">Invoice Number</th>
       <th id="TransferByBox" scope="col">Transfer By</th>
       
     </tr>
   
     
     <tr>
      <td id="SNoBox"></td>
       <td id="TransactionIdBox"></td>
       <td id="BidsPackageBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="AmountBox"><input className="filterField" type="text"placeholder="Search Product"/></td>
       <td id="PaymentDateBox"></td>
       <td id="TransferDateBox" ><input className="filterField" type="text"/></td>
       <td id="PaymentTypeBox"></td>
       <td id="BankDetailsBox" ><input className="filterField" type="text"/></td>
       <td id="InvoiceNumberBox"></td>
       <td id="TransferByBox"><input className="filterField" id="TypeText"type="text"placeholder="Search Type"/></td>
      </tr>
       
{ this.state.arr.map((item) => {
  console.log('value ->', item)
  return <tr>
  <td id="SNoBox" >{item.SNo}</td>
  <td id="TransactionIdBox">{item.Image}</td>
  <td id="BidsPackageBox">{item.ProductName}</td>
  <td id="AmountBox">{item.ProductId}</td>
  <td id="PaymentDateBox">{item.OrderDate}</td>
  <td id="TransferDateBox">{item.Quantity}</td>
  <td id="PaymentTypeBox">{item.RetailPrice}</td>
  <td id="BankDetailsBox">{item.RetailPrice}</td>
  <td id="InvoiceNumberBox">{item.RetailPrice}</td>
  <td id="TransferByBox">{item.Status}</td>
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
