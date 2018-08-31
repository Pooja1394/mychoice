
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/auction/AuctionProduct.css";
import {InputText} from 'primereact/components/inputtext/InputText';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import { Breadcrumb,Row,Col} from 'antd';
export default class AuctionProduct extends Component {
    render() {
      return (
        <div className="mainAuction_product_container">
            <div className="Auction_product_list">
               <div id="Auction_product_list-header">auction product</div>
               <div className="auctionTableList_container">
               </div>
            </div> {/*-----end of  Auction_product_list------------- */}
            
            <div className="current_status">
               <Row style={{display:"flex"}}>
                  <Col md={{span:"4"}}>Bidders<div>12</div></Col>
                  <Col md={{span:"4",offset:"1"}}>Current Bid<div>75</div></Col>
                  <Col md={{span:"4",offset:"1"}}>Current Highest Bidder<div>SeniorReady4Win</div></Col>
                  <Col md={{span:"4",offset:"1"}}>Retail Price<div>10,000 Ks</div></Col>
                  <Col md={{span:"4",offset:"1"}}>Current Price<div>1,500 Ks</div></Col>
               </Row>

            </div> {/*-----end of  Auction_product_list------------- */}

            <Row>
             <Col md={7}>
             <div className="bid-history-body">
               <div id="bid-history-header">Bid History</div>
               <div id="filter_content">
                   <ul>
                     <li>Reset Filter</li>
                     <li>Show</li>
                     <li>
                       <select onChange={(event)=>{
                        
                         this.setState({limit:event.target.value})}}>
                         <option value="10">10</option>
                         <option value="20">20</option>
                         <option value="30">30</option>
                         <option value="40">40</option>
                       </select>
                     </li> 
                   </ul>
                </div>
               <div className="bid-history-table-container">
               <DataTable 
               scrollHeight={"200px"} 
               scrollable={true} 
              //  value={auctionList}
               style={{ width: '100%'}}
               >
              <Column field="index" header="S.NO" />
              <Column field="Image" header="Bid"/>
              <Column field="_id" header="Users"/>
              <Column header="Time" />
            </DataTable>  
               </div>
            </div>
             </Col>
             <Col md={{span:8,offset:1}}>
             <div className="player-record-body">
               <div id="player-record-header">Player Record</div>
               <div className="player-record-table-container">
               </div>
            </div>
             </Col>
             <Col md={{span:7,offset:1}}>
             <Row className="past-history-row">
               <Col>
               <div className="Auction_product_list">
               <div id="Auction_product_list-header">Past Plays</div>
               <div className="auctionTableList_container">
               <DataTable 
               scrollHeight={"200px"} 
               scrollable={true} 
              //  value={auctionList}
               style={{ width: '100%'}}
               >
              <Column field="index" header="S.NO" />
              <Column field="Product Name" header="Product Name"/>
              <Column field="_id" header="Product ID"/>
              <Column header="Bid Date" />
               </DataTable>
               </div>
               </div>
               </Col>
               <Col>
               <div className="Auction_product_list" style={{marginTop:"20px"}}>
               <div id="Auction_product_list-header">Past Winners</div>
               <div className="auctionTableList_container">
               <DataTable 
               scrollHeight={"200px"} 
               scrollable={true} 
              //  value={auctionList}
               style={{ width: '100%'}}
               >
              <Column field="index" header="S.NO" />
              <Column field="Image" header="Bid"/>
              <Column field="_id" header="Users"/>
              <Column header="Time" />
              </DataTable>
               </div>
               </div>
               </Col>
             </Row>
             </Col>
            </Row>
        </div> 
      )
    }
  }
  