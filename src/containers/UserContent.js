/*This file contains the code for UserInformation in admin panel 
Created By-Aviral Garg
Created On-13/04/18
*/

import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Content.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyContent from "../component/MyContent";
import { Breadcrumb } from "antd";
import Header from "../component/Header";
import CreateUserContent from "../component/CreateUserContent";
import UserProfile from "./UserProfile";
import UserListTable from "../component/userprofile/UserListTable";
import Format from "../component/format";
import {checkdisplay,checkAddPrivileges} from "../utils/Method"
class UserContent extends Component {
  state={
    createuservisible:true
  }
  csvDownload = () => {
    console.log("=====>", this.props.state);
    this.props.state.userTableCSV.exportCSV();
  };
  
  // componentWillMount() {
  //   this.props.state  && checkdisplay("users")?"":(this.props.history.push('/home/dash'))
  // }
  
  render() {
    return (
      <div>
        {/* <Route 
          path='/home/user' 
            component={UserListTable}/>
        <Route 
        path='/home/user/createuser'
          component={CreateUserContent}/> */}
        <Route
          path="/home/user"
          render={() => {
            return (
              <Format
                style={{ borderTop: "3px solid #3c8dbc" }}
                history={this.props.history}
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item href="">Users</Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">User List</span>}
                buttonspan={
                  <span id="ButtonSpans" style={{display:'flex'}}>
                    <Link to="/home/user/createuser">
                      <button id="btnCreateUser"
                      style={{display:this.props.state  && checkAddPrivileges('users')?'flex':'none'}}
                      >Create User</button>
                    </Link>
                    <button
                      id="btnExportCsv"
                      onClick={() => {
                        this.csvDownload();
                      }}
                    >
                      Export CSV
                    </button>
                  </span>
                }
              >
                <UserListTable history={this.props.history} />
              </Format>
            );
          }}
        />

        <Route
          path="/home/user/createuser"
          render={() => {
            return (
              <Format
                style={{ borderTop: "3px solid #3c8dbc" }}
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/user">Users</Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/user/createuser">
                        Create User
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">Create User</span>}
                buttonspan={
                  <span id="ButtonSpans">
                    <Link to="/home/user">
                      <button id="btnExportCsv" style={{ color: "#333333" }}>
                        Cancel
                      </button>
                    </Link>
                  </span>
                }
              >
                <CreateUserContent history={this.props.history} />
              </Format>
            );
          }}
        />
        <Route
          path="/home/user/userprofile"
          render={() => {
            return (
              <Format
                history={this.props.history}
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/user">Users</Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/user/createuser">
                        User List
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">User Profile</span>}
                buttonspan={
                  <span id="ButtonSpans">
                    <Link to="/home/user">
                      <button id="btnExportCsv" style={{ color: "#333333" }}>
                        Cancel
                      </button>
                    </Link>
                  </span>
                }
              >
                <UserProfile history={this.props.history} />
              </Format>
            );
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("===11111111111>", state);
  return {
    state: state,
    fetching: state.fetching,
    userArrayList: state.userArrayList
  };
};
export default connect(
  mapStateToProps,
  null
)(UserContent);
