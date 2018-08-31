import React, { Component } from "react";
import { Breadcrumb, Menu, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/createpackage.css";
import { openNotificationWithIcon,checkdisplay } from "../../utils/Method";
import { InputText } from "primereact/components/inputtext/InputText";
import { basepath } from "../../utils/Constant";
import axios from "axios";
import SliderButton from "../Sliderbutton"
export default class CreatePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidpackagename: "",
      amount: "0",
      bidnumber: "0",
      bidId:"",
      status:""
    };
  }
  suspendYes=()=>{
    var  suspnedButton_span =document.getElementsByClassName("both_button_span")[0];
    var  NoButton=document.getElementsByClassName("noButton")[0];
     this.setState({
      status:true
     })   
  } 
  suspendNo=()=>{
   var  suspnedButton_span =document.getElementsByClassName("both_button_span")[0];
        this.setState({
          status:false
         }) 
  }
  componentWillMount(){
    
    if(this.props.history.location.state)
    {
    let bidpackagedata=this.props.history.location.state
    this.setState({
      bidpackagename:bidpackagedata.bidPackageName,
      amount:bidpackagedata.amount,
      // bankimage:bidpackagedata.bankimage
      bidnumber:bidpackagedata.noOfBids,
      bidId:bidpackagedata._id,
      status:bidpackagedata.status
    })
  
  }
}
  render() {
    return (
      <div>
        <div>
          <div className="table-operations">
            <span id="UserText">Create Package</span>
          </div>
          <br />
          <div className="createpackagelist">
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Bid Package Name<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <input
                  className="CreateUserField"
                  type="text"
                  value={this.state.bidpackagename}
                  onChange={e => {
                    this.setState({ bidpackagename: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  {" "}
                  No. Of Bids <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <InputText
                  keyfilter="num"
                  className="CreateUserField"
                  value={this.state.bidnumber}
                  onChange={e => {
                    this.setState({ bidnumber: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  {" "}
                  Amount <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <InputText
                  keyfilter="num"
                  className="CreateUserField"
                  value={this.state.amount}
                  onChange={e => {
                    this.setState({ amount: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                 Status <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
              <SliderButton
                 mainWidth="20%"
                 clickForAllow={this.suspendYes}
                 clickFordeny={this.suspendNo}
                 background={this.state.status?'#4ca65a':'#dc4b38'}
                 left={this.state.status?'0px':'50%'} 
                 spaninner={this.state.status?'Open':'Lock'}
                 buttonNameAllow="Open"
                 buttonNameDeny="Lock"    />
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={{ span: 18, offset: 6 }} style={{ textAlign: "left" }}>
                <div id="BelowButtos">
                  <button
                    id="Createbtn"
                    onClick={() => {
                      if (this.state.bidpackagename === "")
                        openNotificationWithIcon(
                          "warning",
                          "Bid Package Name",
                          "Please enter Bid Package name!"
                        );
                      else if (this.state.amount === "")
                        openNotificationWithIcon(
                          "warning",
                          "Amount",
                          "Please enter Amount!"
                        );
                      else if (this.state.bidnumber === "")
                        openNotificationWithIcon(
                          "warning",
                          "No Of Bids",
                          "Please enter Number of Bids!"
                        );
                      else {
                    
                        let token = localStorage.getItem("token");
                        let headers = {
                          Authorization: "Bearer " + token,
                          Accept: "application/json"
                        };
                        {this.props.history.location.state?
                          axios({
                            method: "post",
                            url: basepath + "bank/updatepackage",
                            data: {
                              bidPackageName: this.state.bidpackagename,
                              noOfBids: this.state.bidnumber,
                              amount: this.state.amount,
                              bidID:this.state.bidId,
                              status:this.state.status
                            },
                            headers: headers
                          })
                            .then(response => {
                              openNotificationWithIcon(
                                "success",
                                " Package",
                                "Package updated successfully"
                              );
                              this.props.history.push(
                                "/home/depositncredit/bidpackages"
                              );
                            })
                            .catch(error => {
                              console.log("Error");
                            })
                          :
                        axios({
                          method: "post",
                          url: basepath + "bank/addpackage",
                          data: {
                            bidPackageName: this.state.bidpackagename,
                            noOfBids: this.state.bidnumber,
                            amount: this.state.amount,
                            status:this.state.status
                          },
                          headers: headers
                        })
                          .then(response => {
                            openNotificationWithIcon(
                              "success",
                              "Add Package",
                              "Package added successfully"
                            );
                            this.props.history.push(
                              "/home/depositncredit/bidpackages"
                            );
                          })
                          .catch(error => {
                            console.log("Error");
                          });}
                      }
                    }}
                  >
                    {this.props.history.location.state?"Update":"Create"}   
                  </button>
                  <button
                    id="Cancelbtn"
                    onClick={() => {
                      this.props.history.push(
                        "/home/depositncredit/bidpackages"
                      );
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <br />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
