import React, { Component } from "react";
import { Breadcrumb, Menu, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/addbank.css";
import { Upload, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { openNotificationWithIcon,checkdisplay } from "../../utils/Method";
import { ADD_BANK_REQUEST, EDIT_BANK_REQUEST } from "../../actions/types";
import { basepath } from "../../utils/Constant"
import Sliderbutton from "../Sliderbutton"
class AddBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankname: "",
      bankshortname: "",
      bankimage: [],
      bankId: "",
      status:true
    };
  }

  componentWillMount() {
    
    if (this.props.history.location.state) {
      let bankdata = this.props.history.location.state
      this.setState({
        bankname: bankdata.bankName,
        bankshortname: bankdata.bankShortName,
        // bankimage:bankdata.bankimage
        bankId: bankdata._id,
        bankimage: [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',

          url: bankdata.picture
        }],
        status: bankdata.status
      })
    }
  }
  handleChange = ({ fileList }) => this.setState({ bankimage: fileList });
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { fetching, onBrandCreation, onBankUpdation, error } = this.props;
    return (
      <div>
        <div>
          <div className="table-operations">
            <span id="UserText">Create Bank</span>
          </div>
          <br />
          <div className="createbanklist">
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Bank Name<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <input
                  className="CreateUserField"
                  type="text"
                  value={this.state.bankname}
                  onChange={e => {
                    this.setState({ bankname: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Bank Short Name <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <input
                  className="CreateUserField"
                  type="text"
                  value={this.state.bankshortname}
                  onChange={e => {
                    this.setState({ bankshortname: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="DescSpan" className="CreateUserText">
                  Images <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <div className="clearfix">
                  <Upload
                    multiple={true}
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={this.state.bankimage}
                    onChange={this.handleChange}
                  >
                    {this.state.bankimage.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              </Col>
              <br />
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Status <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <Sliderbutton
                  mainWidth="20%"
                  clickForAllow={() => this.setState({ status: true })}
                  clickFordeny={() => this.setState({ status: false })}
                  background={this.state.status ? '#4ca65a' : '#dc4b38'}
                  left={this.state.status ? '0px' : '50%'}
                  spaninner={this.state.status ? 'Yes' : 'No'}
                  buttonNameAllow="Yes"
                  buttonNameDeny="No"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 18, offset: 6 }} style={{ textAlign: "left" }}>
                <div id="BelowButtos">
                  <button
                    id="Createbtn"
                    onClick={() => {
                      if (this.state.bankname === "")
                        openNotificationWithIcon(
                          "warning",
                          "Bank Name",
                          "Please enter Bank name!"
                        );
                      else if (this.state.bankshortname === "")
                        openNotificationWithIcon(
                          "warning",
                          "Bank Short Name",
                          "Please enter Bank Short name!"
                        );
                      else {
                        let data = new FormData();
                        data.append("bankName", this.state.bankname);
                        data.append("bankShortName", this.state.bankshortname);
                        data.append("bankID", this.state.bankId);
                        data.append("status", this.state.status)
                        if (this.state.bankimage.length == 0) {
                          data.append("picture", "");
                        } else {
                          this.state.bankimage.map((value, key) => {
                            return data.append("picture", value.originFileObj);
                          });
                        }
                        for (const value of data.entries()) {
                        }
                        { this.props.history.location.state ? onBankUpdation(data, this.props.history) : onBrandCreation(data, this.props.history); }
                      }
                    }}
                  >
                    {this.props.history.location.state ? "Update" : "Create"}                  </button>
                  <button
                    id="Cancelbtn"
                    onClick={() => {
                      this.props.history.push("/home/depositncredit/bank");
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
const mapStateToProps = state => {
  return {
    // fetching: state.fetching,
    // data: state.data,
    // error: state.error
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onBrandCreation: (data, history) => dispatch({ type: ADD_BANK_REQUEST, data, history }),
    onBankUpdation: (data, history) => {
      dispatch({ type: EDIT_BANK_REQUEST, data, history })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
