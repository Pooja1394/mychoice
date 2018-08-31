import React, { Component } from "react";
import { Breadcrumb, Menu, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/addbank.css";
import { Upload, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { openNotificationWithIcon } from "../../utils/Method";
import { Editor } from 'primereact/components/editor/Editor';
import { basepath } from "../../utils/Constant"
import Sliderbutton from "../Sliderbutton"
import AddPreviligeTable from "./AddPreviligeTable"
import { SET_PREVILIGES_IN_STORE_REQUEST } from "../../actions/types";
import { api,checkdisplay } from "../../utils/Method"
class AddDesignation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      DesignationName: "",
      DesignationDesc: "",
      selectedprivilegelist: [],
      desigId: ""
    };
  }

  componentWillMount() {
    this.props.state  && checkdisplay("Employee")?"":(this.props.history.push('/home/dash'))
    
    if (this.props.history.location.state) {
      let designationdata = this.props.history.location.state

      this.setState({
        DesignationName: designationdata.DesignationName,
        DesignationDesc: designationdata.Description,
        status: designationdata.status,
        selectedprivilegelist: designationdata.privilege,
        desigId: designationdata._id
      })
    }
  }
  render() {

    return (
      <div>
        <div className="table-operations">
          <span id="UserText">{this.props.history.location.state ? "Update Designation" : "Create Designation"} </span>
        </div>
        <br />
        <div className="createdesignationlist">
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Designation Name<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 16, offset: 1 }}>
              <input
                className="CreateUserField1"
                type="text"
                maxLength="30"
                value={this.state.DesignationName}
                onChange={(e) => {
                  this.setState({
                    DesignationName: e.target.value
                  })
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Description<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 16, offset: 1 }}>
              <Editor value={this.state.DesignationDesc}
                onTextChange={(e) => {
                  this.setState({
                    DesignationDesc: e.textValue
                  })
                }} style={{ height: "120px" }} />
            </Col>
          </Row>
          <Row>
            <AddPreviligeTable selectedrows={(this.props.history.location.state) ? this.state.selectedprivilegelist : ""} />
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Status<span style={{ color: "red" }}>*</span>
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
            <Col md={{ span: 4, offset: 6 }}>
              <button id="Createbtn" onClick={() => {
                if (this.state.DesignationName == "")
                  openNotificationWithIcon('warning', 'Name', 'Enter Designation Name')
                else if (this.state.DesignationDesc == "")
                  openNotificationWithIcon('warning', 'Description', 'Enter Designation Description')
                else if (this.props.state.selectedprivilegeslist.selectedPrivileges.length == 0)
                  openNotificationWithIcon('warning', 'Privileges', 'Select Some Privileges')

                else {
                  let data;
                  {
                    !this.props.history.location.state ? (data = {
                      method: "post",
                      url: `employee/addDesignation`,
                      data: {
                        status: this.state.status,
                        DesignationName: this.state.DesignationName,
                        Description: this.state.DesignationDesc,
                        privilege: this.props.state.selectedprivilegeslist.selectedPrivileges
                      },
                    }) : (
                      data = {
                        method: "put",
                        url: `employee/updateDesignation`,
                        data: {
                          _id: this.state.desigId,
                          status: this.state.status,
                          DesignationName: this.state.DesignationName,
                          Description: this.state.DesignationDesc,
                          privilege: this.props.state.selectedprivilegeslist.selectedPrivileges
                        },
                      })
                  }
                  api(data).then((res) => {
                    this.setState({
                      status: false,
                      DesignationName: "",
                      DesignationDesc: "",
                    })
                    this.props.setPrivileges({
                      selectedPrivileges: ""
                    });
                    this.props.history.push("/home/employee/designation")
                  })

                }
              }}>{this.props.history.location.state ? "Update" : "Create"}</button>
            </Col>
          </Row>
          <br /><br />
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    fetching: state.fetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPrivileges: (data) => dispatch({ type: SET_PREVILIGES_IN_STORE_REQUEST, data })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDesignation);