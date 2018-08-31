import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker, Row, Col, Input } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import "../../style/depositncredit/bank.css";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { connect } from "react-redux";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat, api, openNotificationWithIcon ,checkdisplay} from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import { SplitButton } from 'primereact/components/splitbutton/SplitButton';
import Sliderbutton from "../Sliderbutton"
import { GET_LOCATION_DATA } from "../../actions/types";
const { TextArea } = Input;

class AddDeliveryService extends Component {
  state = {
    carrierName: "",
    divisionState: "",
    township: "",
    carrierOptions: [],
    divisionOptions: [],
    townshipOptions: [],
    shippingDays: "",
    deliveryFee: "",
    Address: "",
    officeDivision: "",
    officeTownship: "",
    status: false
  }
  componentWillMount() {
    this.props.state  && checkdisplay("Delivery")?"":(this.props.history.push('/home/dash'))
    
    // if(this.props.history.location.state)
    let data = {
      method: "get",
      url: `delivery/getcar`,
    }


    api(data).then((res) => {
      let list = [];
      res.data.map((v, k) => {
        list = list.concat({ label: v.carrierName, id: v._id, "value": v.carrierName });
      });
      this.setState({
        carrierOptions: list
      })
    })
  }
  componentDidMount() {
    this.props.onGetLocation()
  }
  render() {
    let divisionOptions = []
    this.props.state.locationData.map((v, k) => {
      divisionOptions = divisionOptions.concat({
        "label": v.city,
        "value": v.city
      })
    })

    let townshipOptions, officeTownshipOptions;
    this.props.state.locationData.map((v, k) => {
      if (v.state = this.state.divisionState) {
        townshipOptions = v.township.map((town, key) => {
          return {
            "label": town,
            "value": town
          }
        })
      }

      if (v.state = this.state.officeDivision) {
        officeTownshipOptions = v.township.map((town, key) => {
          return {
            "label": town,
            "value": town
          }
        })
      }
    })
    return (
      <div>
        <div>
          <div className="table-operations">
            <span id="UserText">Create Delivery Service</span>
          </div>
          <br />
          <div className="createpackagelist">
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Carrier Name<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 14, offset: 1 }}>
                <Dropdown
                  value={this.state.carrierName}
                  placeholder="Select Carrier"
                  options={this.state.carrierOptions}
                  onChange={e => {
                    this.setState({
                      carrierName: e.value,
                    });

                  }}
                  style={{
                    width: "100%",
                    height: "41px",
                    background: "none"
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Division/State<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
                <Dropdown
                  value={this.state.divisionState}
                  placeholder="Select Division"
                  options={divisionOptions}
                  onChange={e => {
                    this.setState({
                      divisionState: e.value,
                      // selectedDepartmentId:e.value.id
                    });
                  }}
                  style={{
                    width: "100%",
                    height: "41px",
                    background: "none"
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Township<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
                <Dropdown
                  value={this.state.township}
                  placeholder="Select Township"
                  options={townshipOptions}
                  onChange={e => {
                    this.setState({
                      township: e.value,
                      // selectedDepartmentId:e.value.id
                    });
                  }}
                  style={{
                    width: "100%",
                    height: "41px",
                    background: "none"
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Shipping Date<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
                <input
                  className="CreateUserField"
                  type="text"
                  value={this.state.shippingDays}
                  onChange={e => {
                    this.setState({ shippingDays: e.target.value });
                  }}
                  maxLength="30"
                /> Days
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Delivery Fee<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 10, offset: 1 }}>
                <input
                  className="CreateUserField"
                  type="text"
                  value={this.state.deliveryFee}
                  onChange={e => {
                    this.setState({ deliveryFee: e.target.value });
                  }}
                  maxLength="30"
                />
                <button
                  style={{ marginLeft: "10px" }}
                  id="Createbtn"
                  onClick={() => {
                  }}
                >
                  Add
                  </button>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Office Address<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <TextArea className="CreateUserField"
                  rows={4}
                  value={this.state.Address}
                  onChange={(e) => {
                    this.setState({
                      Address: e.target.value
                    })
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Division/State<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 5, offset: 1 }}>
                <Dropdown
                  value={this.state.officeDivision}
                  placeholder="Select Division"
                  options={divisionOptions}
                  onChange={e => {
                    this.setState({
                      officeDivision: e.value,
                      // selectedDepartmentId:e.value.id
                    });
                  }}
                  style={{
                    width: "100%",
                    height: "41px",
                    background: "none"
                  }}
                />
              </Col>
              <Col md={{ span: 2, offset: 0 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  Township<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 7, offset: 1 }}>
                <Dropdown
                  value={this.state.officeTownship}
                  placeholder="Select Township"
                  options={officeTownshipOptions}
                  onChange={e => {
                    this.setState({
                      officeTownship: e.value,
                      // selectedDepartmentId:e.value.id
                    });
                  }}
                  style={{
                    width: "80%",
                    height: "41px",
                    background: "none"
                  }}
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
                <Sliderbutton
                  mainWidth="20%"
                  clickForAllow={() => this.setState({ status: true })}
                  clickFordeny={() => this.setState({ status: false })}
                  background={this.state.status ? '#3c8dbc' : '#dc4b38'}
                  left={this.state.status ? '0px' : '50%'}
                  spaninner={this.state.status ? 'Yes' : 'No'}
                  buttonNameAllow="Yes"
                  buttonNameDeny="No"
                />
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={{ span: 18, offset: 6 }} style={{ textAlign: "left" }}>
                <div id="BelowButtos">
                  <button
                    id="Createbtn"
                    onClick={() => {
                      if (this.state.carrierName == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Select Carrier Name')
                      else if (this.state.divisionState == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Select State')
                      else if (this.state.township == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Select Township')
                      else if (this.state.shippingDays == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Enter Shipping Days')
                      else if (this.state.deliveryFee == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Enter Delivery Fee')
                      else if (this.state.Address == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Enter Address')
                      else if (this.state.officeDivision == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Select Office Division')
                      else if (this.state.officeTownship == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Select Office Township')
                      else if (this.state.status == "")
                        openNotificationWithIcon('warning', 'Empty Field', 'Select Status')

                      else {
                        let data = {
                          method: "post",
                          url: `delivery/insertservice`,
                          data: {
                            carrierName: this.state.carrierName,
                            _state: this.state.divisionState,
                            township: this.state.township,
                            shippingDate: this.state.shippingDays,
                            deliveryFee: this.state.deliveryFee,
                            offAddress: this.state.Address,
                            division: this.state.officeDivision,
                            townShip: this.state.officeTownship,
                            status: this.state.status
                          },
                        }

                        api(data).then((res) => {

                          openNotificationWithIcon('success', 'Service', 'Service Added SuccessFully')
                          this.props.history.push("/home/delivery/deliveryService")

                        })
                      }
                    }}
                  >
                    {this.props.history.location.state ? "Update" : "Create"}
                  </button>
                  <button
                    id="Cancelbtn"
                    onClick={() => {
                      this.props.history.push(
                        "/home/delivery/deliveryService"
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
const mapStateToProps = (state) => {
  return {
    state: state,
    fetching: state.fetching,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onSupplierCreation: (data,history) => dispatch({ type: ADD_PRODUCT_SUPPLIER_REQUEST ,data,history }),
    // onSupplierUpdation: (data,history) => dispatch({ type: EDIT_PRODUCT_SUPPLIER_REQUEST ,data,history }),
    onGetLocation: (data, history) => dispatch({ type: GET_LOCATION_DATA })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeliveryService)
