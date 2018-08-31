import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import { Column } from "primereact/components/column/Column";
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import { InputText } from "primereact/components/inputtext/InputText";
import { SplitButton } from "primereact/components/splitbutton/SplitButton";
import {
  DateFormat,
  TimeFormat,
  api,
  openNotificationWithIcon,
  checkdisplay,
  checkAddPrivileges,
  checkUpdatePrivileges
} from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import {
  GET_DEPARTMENT_DATA_REQUEST,
  USER_TABLE_CSV
} from "../../actions/types";

class DepartmentContent extends Component {
  state = {
    page: 1,
    limit: 10,
    fetching: false,
    name: "",
    status: "",
    createdBy: "",
    createdDate: ""
  };
  componentWillMount() {
    this.props.state && checkdisplay("Employee")
      ? ""
      : this.props.history.push("/home/dash");

    this.props.getDepartmentData({
      page: this.state.page,
      limit: this.state.limit
    });
    this.props.onRequestExportCSV(this.dt, ["122"]);
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        <div>{DateFormat(rowData.createdAt)}</div>
        <div> {TimeFormat(rowData.createdAt)}</div>
      </div>
    );
  };
  previliges(rowData, column) {
    let list = "";
    if (rowData.Designation) {
      rowData.Designation.map((value, key) => {
        rowData.Designation[key].privilege.map((value, key1) => {
          rowData.Designation[key].privilege[key1].privilege.map(
            (value, key2) => {
              key1 == 0
                ? (list +=
                    rowData.Designation[key].privilege[key1].privilege[key2]
                      .selectPrivilege)
                : (list +=
                    " , " +
                    rowData.Designation[key].privilege[key1].privilege[key2]
                      .selectPrivilege);
            }
          );
        });
      });
      return <div style={{ wordWrap: "" }}>{list}</div>;
    } else {
      return <div>helllo</div>;
    }
  }
  status = (rowData, column) => {
    let items = [
      {
        label: "Delete",
        icon: "fa-trash",
        command: () => {
          let data = {
            method: "delete",
            url: "employee/removeDepartment",
            data: { DepartmentId: rowData._id }
          };
          api(data).then(res => {
            this.props.getDepartmentData({
              page: this.state.page,
              limit: this.state.limit
            });
            openNotificationWithIcon(
              "success",
              "Department",
              "Department Deleted Successfully"
            );
          });
        }
      }
    ];
    let srce = require("../../images/tick.png");
    let srce2 = require("../../images/cross.png");
    if (rowData.status) {
      return (
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#d2d6de",
              width: "30px",
              padding: "3px",
              borderRadius: "2px",
              marginRight: "10px"
            }}
          >
            <img
              id="UserAvatarimg"
              src={srce}
              alt="av"
              style={{ paddingLeft: "3px" }}
            />
          </div>
          <SplitButton
            style={{
              display:
                this.props.state && checkUpdatePrivileges("Employee")
                  ? "flex"
                  : "none"
            }}
            icon="fa-pencil"
            onClick={() =>
              this.props.history.push({
                pathname: `/home/employee/department/adddepartment`,
                state: rowData
              })
            }
            model={items}
          />
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#d2d6de",
              width: "30px",
              padding: "3px",
              borderRadius: "2px",
              marginRight: "10px"
            }}
          >
            <img
              id="UserAvatarimg"
              src={srce2}
              alt="av"
              style={{ paddingLeft: "4px" }}
            />
          </div>
          <SplitButton
            style={{
              display:
                this.props.state && checkUpdatePrivileges("Employee")
                  ? "flex"
                  : "none"
            }}
            icon="fa-pencil"
            onClick={() =>
              this.props.history.push({
                pathname: `/home/depositncredit/bank/addbank`,
                state: rowData
              })
            }
            model={items}
          />
        </div>
      );
    }
  };
  onPageChange = pageNumber => {
    this.props.getDepartmentData({
      page: pageNumber,
      limit: this.state.limit
    });
  };
  createdByTemplate(rowData, column) {
    if (rowData.createdBy) {
      let srce, ipAddr;
      let path2 = `${imagebasepath}/${rowData.createdBy.picture}`;

      if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
        ipAddr = "192.168.17.9";
      else ipAddr = rowData.createdBy.ip;
      return (
        <div style={{ display: "flex" }}>
          <div id="UserImageDiv">
            {" "}
            <img
              id="UserAvatarimg"
              src={path2}
              alt="av"
              style={{ height: "30px", width: "30px", borderRadius: "50px" }}
            />
          </div>
          <div>
            <div>{rowData.createdBy.userName}</div>
            <div>{ipAddr}</div>
          </div>
        </div>
      );
    }
  }
  export = () => {
    this.dt.exportCSV();
  };
  clearAll = () => {
    this.setState({
      page: 1,
      limit: 10,
      fetching: false,
      name: "",
      status: "",
      createdBy: "",
      createdDate: ""
    });
    this.props.getDepartmentData({
      page: this.state.page,
      limit: this.state.limit
    });
  };
  render() {
    let departmentList = [];
    if (this.props.state.data.projects) {
      this.props.state.data.projects.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        departmentList = departmentList.concat(obj);
      });
    }
    let blankFilter = <InputText readOnly />;
    let createdDateFilter = (
      <DatePicker
        allowClear={false}
        value={this.state.createdDate}
        className="ui-column-filter"
        onChange={(date, dateString) => {
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            createdDate: moment(dateString)
          });
          this.props.getDepartmentData({
            page: 1,
            limit: this.state.limit,
            createdAt: dateString
          });
        }}
      />
    );

    let nameFilter = (
      <InputText
        value={this.state.name}
        onChange={e => {
          this.setState({
            name: e.target.value,
            filterName: "DepartmentName",
            filterData: e.target.value
          });
          this.props.getDepartmentData({
            page: this.state.page,
            limit: this.state.limit,
            DepartmentName: e.target.value
          });
        }}
      />
    );
    let createdByFilter = (
      <InputText
        value={this.state.createdBy}
        onChange={e => {
          this.setState({
            createdBy: e.target.value,
            filterName: "createdBy",
            filterData: e.target.value
          });
          this.props.getDepartmentData({
            page: this.state.page,
            limit: this.state.limit,
            createdBy: e.target.value
          });
        }}
      />
    );
    let statusFilter = (
      <select
        option="field"
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.status}
        onChange={event => {
          this.props.getDepartmentData({
            page: this.state.page,
            limit: this.state.limit,
            status: event.target.value
          });
          this.setState({ status: event.target.value });
        }}
      >
        <option value="">All</option>
        <option value="true">Open</option>
        <option value="false">Lock</option>
      </select>
    );
    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/employee/department">Department</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/employee/designation">Designation</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/employee/previliges">Privileges</Link>
          </Menu.Item>
        </Menu>
        <div className="depositncredit-table-operations">
          <span onClick={this.clearAll} id="resetText">
            Reset Filter
          </span>
          <span id="showText">Show</span>
          <span id="selecNos">
            <select
              id="NoDropDown"
              onChange={event => {
                this.setState({ limit: event.target.value });
                this.props.getDepartmentData({
                  page: this.state.page,
                  limit: event.target.value
                });
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
          <Link to="/home/employee/department/adddepartment">
            <button
              id="btnAdd"
              style={{
                display:
                  this.props.state && checkAddPrivileges("Employee")
                    ? "flex"
                    : "none"
              }}
              style={{ width: "120px" }}
            >
              Add Department
            </button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          scrollHeight={"51vh"}
          ref={el => {
            this.dt = el;
          }}
          scrollable={true}
          value={departmentList}
          loading={this.props.state.fetching}
        >
          <Column
            field="index"
            header="S.No"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="DepartmentId"
            header="Department ID"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "110px" }}
          />
          <Column
            field="DepartmentName"
            header="Department Name"
            filter={true}
            filterElement={nameFilter}
            style={{ width: "120px", textAlign: "center" }}
            className="Image"
          />

          <Column
            field="previliges"
            header="Designation Access"
            filterElement={blankFilter}
            body={this.previliges}
            filter={true}
            style={{ width: "120px", textAlign: "left", whiteSpace: "normal" }}
            // className="CreatedBy"
          />
          <Column
            field="createdAt"
            header="Created Date"
            body={this.createdAt}
            filter={true}
            filterElement={createdDateFilter}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
            // filterElement={statusFilter}
          />

          <Column
            field="CreatedBy"
            header="Created By"
            filter={true}
            body={this.createdByTemplate}
            filterElement={createdByFilter}
            style={{ width: "120px", textAlign: "left" }}
            className="CreatedBy"
          />
          <Column
            field="status"
            header="Status"
            filter={true}
            body={this.status}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
            filterElement={statusFilter}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={
            this.state.fetching == true
              ? 1
              : (this.props.state.data.projects &&
                  this.props.state.data.totalPage) * this.state.limit
          }
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    fetching: state.fetching
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDepartmentData: data =>
      dispatch({ type: GET_DEPARTMENT_DATA_REQUEST, data }),
    onRequestExportCSV: (data, value) =>
      dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentContent);
