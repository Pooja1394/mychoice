import React, { Component } from "react";
import Header from "../component/Header";
import { Breadcrumb, Row, Col, Upload, Icon } from "antd";
import { InputText } from "primereact/components/inputtext/InputText";
import "../style/ResetPassword.css";
import axios from "axios";
import { basepath } from "../utils/Constant";
import { notification } from "antd";
import { api } from "../utils/Method";
import Sliderbutton from "../component/Sliderbutton";
const openNotificationWithIcon = (type, notimsg, notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc
  });
};
const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);
export default class AdminSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suspend: false,
      status: true,
      images: [],
      priceIncrement: 0,
      timeIncrement: 0,
      timeZone: "",
      exchangeRate: 0,
      bidsellingprice: 0
    };
  }
  componentWillMount() {
    let data = {
      method: "get",
      url: "setting/check"
    };
    api(data).then(res => {
      console.log("response", res);
      this.setState({
        bidsellingprice: res.data[0].bidSellingPrice,
        exchangeRate: res.data[0].bidExchange,
        timeIncrement: res.data[0].timeIncrement,
        priceIncrement: res.data[0].priceIncrement
      });
    });
  }
  render() {
    return (
      <div>
        <Header
          breadcrumb={
            <span id="BreadCrumbspan">
              <Breadcrumb separator=">">
                <Breadcrumb.Item href="/home/user">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/home/user/settings">
                  Settings
                </Breadcrumb.Item>
              </Breadcrumb>
            </span>
          }
          headername={<span id="Usertxt">Settings</span>}
        />
        <div className="content_container">
          <div className="wrapper">
            <div className="Innercontainer">
              <div className="table-operations">
                <span id="UserText">Configuration</span>
              </div>
              <br />
              <div id="CreateUserDiv">
                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      All Users Account Suspend<span style={{ color: "red" }}>
                        *
                      </span>
                    </span>
                  </Col>
                  <Col md={{ span: 18, offset: 1 }}>
                    <Sliderbutton
                      mainWidth="20%"
                      clickForAllow={() => this.setState({ suspend: true })}
                      clickFordeny={() => this.setState({ suspend: false })}
                      background={this.state.suspend ? "#4ca65a" : "#dc4b38"}
                      left={this.state.suspend ? "0px" : "50%"}
                      spaninner={this.state.suspend ? "Yes" : "No"}
                      buttonNameAllow="Yes"
                      buttonNameDeny="No"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      All Users Account Status<span style={{ color: "red" }}>
                        *
                      </span>
                    </span>
                  </Col>
                  <Col md={{ span: 18, offset: 1 }}>
                    <Sliderbutton
                      mainWidth="20%"
                      clickForAllow={() => this.setState({ status: true })}
                      clickFordeny={() => this.setState({ status: false })}
                      background={this.state.status ? "#3c8dbc" : "#dc4b38"}
                      left={this.state.status ? "0px" : "50%"}
                      spaninner={this.state.status ? "Open" : "Lock"}
                      buttonNameAllow="Open"
                      buttonNameDeny="Lock"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      Buy Bid Images<span style={{ color: "red" }}>*</span>
                    </span>
                  </Col>
                  <Col md={{ span: 18, offset: 1 }}>
                    <Upload
                      multiple={true}
                      action="//jsonplaceholder.typicode.com/posts/"
                      listType="picture-card"
                      fileList={this.state.images}
                      onChange={({ fileList }) =>
                        this.setState({ images: fileList })
                      }
                    >
                      {this.state.images.length >= 2 ? null : uploadButton}
                    </Upload>
                  </Col>
                </Row>

                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      Bid Selling Price<span style={{ color: "red" }}>*</span>
                    </span>
                  </Col>
                  <Col md={{ span: 5, offset: 1 }}>
                    <InputText
                      keyfilter="num"
                      className="CreateUserField"
                      value={this.state.bidsellingprice}
                      onChange={e => {
                        this.setState({ bidsellingprice: e.target.value });
                      }}
                      maxLength="30"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      Auction's Current Price<span style={{ color: "red" }}>
                        *
                      </span>
                    </span>
                  </Col>
                  <Col md={{ span: 5, offset: 1 }}>
                    <InputText
                      keyfilter="num"
                      className="CreateUserField"
                      value={this.state.exchangeRate}
                      onChange={e => {
                        this.setState({ exchangeRate: e.target.value });
                      }}
                      maxLength="30"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      Price Increment<span style={{ color: "red" }}>*</span>
                    </span>
                  </Col>
                  <Col md={{ span: 5, offset: 1 }}>
                    <InputText
                      keyfilter="num"
                      className="CreateUserField"
                      value={this.state.priceIncrement}
                      onChange={e => {
                        this.setState({ priceIncrement: e.target.value });
                      }}
                      maxLength="30"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={{ span: 4, offset: 1 }}
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <span id="BrandSpan" className="CreateUserText">
                      Time Increment<span style={{ color: "red" }}>*</span>
                    </span>
                  </Col>
                  <Col md={{ span: 5, offset: 1 }}>
                    <InputText
                      keyfilter="num"
                      className="CreateUserField"
                      value={this.state.timeIncrement}
                      onChange={e => {
                        this.setState({ timeIncrement: e.target.value });
                      }}
                      maxLength="30"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 5, offset: 6 }}>
                    <button
                      id="Createbtn"
                      onClick={() => {
                        if (this.state.exchangeRate == 0)
                          openNotificationWithIcon(
                            "warning",
                            "Exchange Rate",
                            "Enter Exchange Rate"
                          );
                        else if (this.state.bidsellingprice == 0)
                          openNotificationWithIcon(
                            "warning",
                            "Bid Selling Rate",
                            "Enter Bid Selling Price"
                          );
                        else if (this.state.timeIncrement == 0)
                          openNotificationWithIcon(
                            "warning",
                            "Time Increment",
                            "Enter Time Increment"
                          );
                        else if (this.state.priceIncrement == 0)
                          openNotificationWithIcon(
                            "warning",
                            "Price Increment",
                            "Enter Price Increment"
                          );
                        else {
                          let data = {
                            method: "put",
                            url: "setting/update",
                            data: {
                              bidExchange: this.state.exchangeRate,
                              bidSellingPrice: this.state.bidsellingprice,
                              _id: "5b279d36e863dc18853119f4",
                              timeIncrement: this.state.timeIncrement,
                              priceIncrement: this.state.priceIncrement
                            }
                          };
                          api(data).then(res => {
                            console.log("response", res);
                            localStorage.setItem("bidPrice",res.data.bidSellingPrice)
                            openNotificationWithIcon(
                              "success",
                              "Settings",
                              "Settings Updated Successfully"
                            );
                            this.props.history.push("/home/user");
                          });
                        }
                      }}
                    >
                      Save
                    </button>
                    <button
                      id="Cancelbtn"
                      onClick={() => {
                        this.setState({
                          suspend: "",
                          status: "",
                          images: [],
                          priceIncrement: 0,
                          timeIncrement: 0,
                          timeZone: "",
                          exchangeRate: 0,
                          bidsellingprice: 0
                        });
                        this.props.history.push("/home/user");
                      }}
                    >
                      Cancel
                    </button>
                  </Col>
                </Row>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
