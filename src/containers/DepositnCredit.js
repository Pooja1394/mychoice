import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from '../component/AuctionContent'
import { Breadcrumb,Menu } from 'antd';
import{checkdisplay} from "../utils/Method"
import Format from '../component/format';
import PaymentDetails from '../component/depositcredit/PaymentDetails';
import TransferContent from '../component/depositcredit/TransferContent';
import BuyBidsByBankContent from '../component/depositcredit/BuyBidsByBankContent';
import BidPackagesContent from '../component/depositcredit/BidPackagesContent';
import BankContent from '../component/depositcredit/BankContent';
import CreatePackage from '../component/depositcredit/CreatePackage'
import AddBank from '../component/depositcredit/AddBank'

export default class DepositnCredit extends Component {
  
  componentWillMount() {
    // this.props.state  && checkdisplay("Deposits")?"":(this.props.history.push('/home/dash'))
  }
  
    render() {
      return (
        <div >

          <Route exact
          path='/home/depositncredit' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Payment Details</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Payment Detail List</span>}
            > 
            <PaymentDetails history={this.props.history}/></Format>
     
          }} />
          <Route exact path='/home/depositncredit/transfer'  
           render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/transfer">Transfer</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Transfer List</span>}
            > 
            <TransferContent history={this.props.history}/></Format>
     
          }} />
          <Route exact path='/home/depositncredit/buybidsbybank'   
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/buybidsbybank">Buy Bids By Bank</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Buy Bids By Bank</span>}
            > 
            <BuyBidsByBankContent history={this.props.history}/></Format>
     
          }} />
          <Route exact path='/home/depositncredit/bidpackages'  
           render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/bidpackages">Bid Packages</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Bid Package List</span>}
            > 
            <BidPackagesContent history={this.props.history}/></Format>
     
          }} />
          <Route exact path='/home/depositncredit/bank'  
           render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/bank">Bank</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Bank List</span>}
            > 
            <BankContent history={this.props.history}/></Format>
     
          }} />

           <Route path='/home/depositncredit/bidpackages/createpackage' 
             render={()=>{return <Format 
            style={{borderTop:"3px solid #3c8dbc"}}
              history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/bidpackages">Bid Package</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/bidpackages/createpackage">Create Package</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Package</span>}
            buttonspan = { <span id="ButtonSpans">
            <Link to="/home/depositncredit/bidpackages" >  <button id="btnExportCsv">Cancel</button></Link>
            </span>}
            > 
            <CreatePackage  history={this.props.history}/></Format>
     
          }} />

          <Route path='/home/depositncredit/bank/addbank'   
          render={()=>{return <Format 
            style={{borderTop:"3px solid #3c8dbc"}}
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/bank">Bank</Breadcrumb.Item>
                    <Breadcrumb.Item href="/home/depositncredit/bank/addbank">Create Bank</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Bank</span>}
            buttonspan = { <span id="ButtonSpans">
            <Link to="/home/depositncredit/bank" >  <button id="btnExportCsv">Cancel</button></Link>
            </span>}
            > 
            <AddBank history={this.props.history} /></Format>
     
          }} />
        </div>
      )
    }
  }
  