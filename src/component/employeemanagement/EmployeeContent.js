import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker, Icon } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import { Column } from 'primereact/components/column/Column';
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat, api, openNotificationWithIcon,checkdisplay, checkAddPrivileges, checkUpdatePrivileges } from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import { GET_EMPLOYEES_DATA_REQUEST, USER_TABLE_CSV } from "../../actions/types";
import { SplitButton } from 'primereact/components/splitbutton/SplitButton';
import { relative } from "path";
class EmployeeContent extends Component {
  state = {
    page: 1,
    limit: 10,
    fetching: false,
    createdDate: "",
    name: "",
    email: "",
    lastLogin: "",
    qrNumber: "",
    createdBy: "",
    status: "",
    iconVisibility: 'visible',
    downloadable: true,
  };
  componentWillMount() {
    this.props.state  && checkdisplay("Employee")?"":(this.props.history.push('/home/dash'))
    this.props.getEmployeeData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  onPageChange = pageNumber => {
    this.props.getEmployeeData({
      page: pageNumber,
      limit: this.state.limit
    });
  };
  qrImage(rowData, column) {
    let path = rowData.img1 ? `${imagebasepath}${rowData.img1}` : ""
    return (
      <div>
        <a href={path} download target="_blank" style={{ position: 'relative' }}>
          <img src={path} alt="QR" style={{ position: 'relative', width: '50px' }} />
          {/* <img src={require("../../images/download.png")}style={{position:'absolute',width:'50px'}}/> */}
          <div style={{
            top: '3px',
            position: 'absolute',
            width: '55px',
            left: '-2px',
          }}>
            {/* <Icon type="download"  style={{color:'#80bfff', fontSize:"27px"}}/>*/}
          </div>
        </a>
      </div>

    );

  }
  previliges(rowData, column) {
    let list = "";

    if (rowData.Privileges) {
      rowData.Privileges.privilege.map((value, key) => {
        (key == 0 ? list += (rowData.Privileges.privilege[key].selectPrivilege) : list += " , " + (rowData.Privileges.privilege[key].selectPrivilege))

      })
      return (
        <div style={{ wordWrap: "" }}>
          {list}

        </div>
      );
    }
    else {
      return (
        <div>helllo</div>
      );
    }
  }
  EmployeeNameTemplate(rowData,column){
    let srce;
    let path2=`${imagebasepath}${rowData.img}`
    srce=path2
    return <div style={{display:"flex"}}>
     <div id="UserImageDiv">
     <div id="OnlineCursordiv"
     style={{  background:rowData.online?'green':'#dd4b39'}}
     ></div>
      <img id="UserAvatarimg"src={srce} alt="av" 
      style={{height:"30px",width:"30px",borderRadius:"50px"}}/></div>
      <div><div>{rowData.EmployeeName}</div></div>
      </div>;
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;
       {TimeFormat(rowData.createdAt)}
      </div>
    );
  };

  updatedAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.updatedAt)}&nbsp;&nbsp;
        {TimeFormat(rowData.updatedAt)}
      </div>
    );
  };
  status = (rowData, column) => {
    let items = [
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
          let data = {
            method: "delete",
            url: "employee/removeEmployee",
            data: { EmployeeId: rowData._id },
          }
          api(data).then((res) => {
            this.props.getEmployeeData();
            openNotificationWithIcon(
              'success', 'Delete', "Employee Deleted Successfully"
            )
          })
        }
      },
    ]
    let srce = require("../../images/tick.png")
    let srce2 = require("../../images/cross.png")
    if (rowData.status) {
      return <div style={{ display: "flex" }}>
        <div style={{ background: "#d2d6de", width: "30px", padding: "3px", height: "30px", borderRadius: "2px", marginRight: "10px" }}><img id="UserAvatarimg" src={srce} alt="av" style={{ paddingLeft: "2px" }} /></div>
        <SplitButton 
                   style={{display:this.props.state  && checkUpdatePrivileges('Employee')?'flex':'none'}}                                                                                                                                                                   
        icon="fa-pencil" onClick={() => {

          this.props.history.push({ pathname: `/home/employee/addemployee`, state: rowData })

        }} model={items}></SplitButton>
      </div>
    }
    else {
      return <div style={{ display: "flex" }}>
        <div style={{ background: "#d2d6de", width: "30px", padding: "3px", height: "30px", borderRadius: "2px", marginRight: "10px" }}>
          <img id="UserAvatarimg" src={srce2} alt="av" style={{ paddingLeft: "4px" }} /></div>
        <SplitButton icon="fa-pencil"
                   style={{display:this.props.state  && checkUpdatePrivileges('Employee')?'flex':'none'}}                                                                                                                                                                   
                   
          onClick={() => {
            this.props.history.push({ pathname: `/home/employee/addemployee`, state: rowData })

          }} model={items}></SplitButton>
      </div>
    }
  }
  userNameTemplate(rowData, column) {
    let srce, ipAddr;
    // let path2=`${rowData.picture}`
    if (rowData.createdBy) {

      let path2 = `${imagebasepath}/${rowData.createdBy.picture}`;
      if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
        ipAddr = "192.168.17.9";
      else ipAddr = rowData.createdBy.ip;
      return (
        <div style={{ display: "flex" }}>
          <div id="UserImageDiv">
            <img
              id="UserAvatarimg"
              src={path2}
              alt="av"
              style={{ height: "30px", width: "30px", borderRadius: "50px" }}
            />
          </div>
          <div>
            <div>{localStorage.getItem("name")}</div>
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
      createdDate: "",
      name: "",
      email: "",
      lastLogin: "",
      qrNumber: "",
      createdBy: "",
      status: ""
    })
    this.props.getEmployeeData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  render() {
    let employeeList = [];
    if (this.props.state.data.EmployeeData) {
      this.props.state.data.EmployeeData.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        employeeList = employeeList.concat(obj);
      });
    }

    let blankFilter = <InputText readOnly />;

    let createdDateFilter =
      <DatePicker
        allowClear={false}
        value={this.state.createdDate}
        className="ui-column-filter" onChange={
          (date, dateString) => {
            this.setState({
              filterName: "registrationDate",
              filterData: dateString,
              page: 1,
              createdDate: moment(dateString)
            })
            this.props.getEmployeeData({
              page: 1, limit: this.state.limit, registrationDate: dateString
            })
          }
        } />

    let lastLoginFilter =
      <DatePicker
        allowClear={false}
        value={this.state.lastLogin}
        className="ui-column-filter" onChange={
          (date, dateString) => {
            this.setState({
              filterName: "lastLogin",
              filterData: dateString,
              page: 1,
              lastLogin: moment(dateString)
            })
            this.props.getEmployeeData({
              page: 1, limit: this.state.limit, lastLogin: dateString
            })
          }
        } />


    let qrNumberFilter = <InputText
      value={this.state.qrNumber}
      onChange={(e) => {
        this.setState({
          qrNumber: e.target.value,
          filterName: "qrNumber",
          filterData: e.target.value
        })
        this.props.getEmployeeData({
          page: this.state.page, limit: this.state.limit, qrNumber: e.target.value
        })
      }}
    />;

    let nameFilter = <InputText
      value={this.state.name}
      onChange={(e) => {
        this.setState({
          name: e.target.value,
          filterName: "EmployeeName",
          filterData: e.target.value
        })
        this.props.getEmployeeData({
          page: this.state.page, limit: this.state.limit, EmployeeName: e.target.value
        })
      }}
    />;

    let createdByFilter = <InputText
      value={this.state.createdBy}
      onChange={(e) => {
        this.setState({
          createdBy: e.target.value,
          filterName: "createdBy",
          filterData: e.target.value
        })
        this.props.getEmployeeData({
          page: this.state.page, limit: this.state.limit, createdBy: e.target.value
        })
      }}
    />;

    let statusFilter = <select option="field"
      style={{ width: '100%' }} className="ui-column-filter"
      value={this.state.status}
      onChange={
        (event) => {
          this.props.getEmployeeData({
            page: this.state.page, limit: this.state.limit, status: event.target.value
          })
          this.setState({ status: event.target.value })
        }}

    >
      <option value="">All</option>
      <option value="true">Open</option>
      <option value="false">Lock</option>
    </select>
    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/employee/department">Department</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/employee/designation">Designation</Link>
          </Menu.Item>
          <Menu.Item key="5">
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
                this.props.getEmployeeData({
                  page: this.state.page, limit: event.target.value
                })
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
          <Link to="/home/employee/addemployee">
            <button
           style={{display:this.props.state  && checkAddPrivileges('Employee')?'flex':'none'}}                                                                                                                                                
            id="btnAdd">Add Employee</button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          loading={this.props.state.fetching}
          scrollHeight={"51vh"}
          value={employeeList}
          ref={el => {
            this.dt = el;
          }}
          scrollable={true}
        >
          <Column
            field="index"
            header="S.No"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="EmployeeId"
            header="Employee ID"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "110px" }}
          />
          <Column
            field="EmployeeName"
            filter={true}
            filterElement={nameFilter}
            header="UserName"
            body={this.EmployeeNameTemplate}
            style={{ width: "100px", textAlign: "center" }}
            className="Image"
          />
          <Column
            field="email"
            header="Email"
            filter={true}
            // filterElement={bankNameFilter}
            style={{ width: "200px" }}
          // className="bankName"
          />
          <Column
            field="registrationDate"
            header="Registration Date"
            filter={true}
            filterElement={createdDateFilter}
            body={this.createdAt}
            style={{ width: "140px", textAlign: "center" }}
          // className="ShortName"
          />
          <Column
            field="lastLogin"
            header="Last Login"
            body={this.updatedAt}
            filterElement={lastLoginFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
          // className="CreatedDate"
          />
          <Column
            field="previliges"
            header="Previliges"
            body={this.previliges}
            filter={true}
            filterElement={blankFilter}
            filter={true}
            style={{ width: "120px", textAlign: "left" ,whiteSpace:"initial"}}
          // className="CreatedBy"
          />
          <Column
            field="image"
            header="QR Image"
            body={this.qrImage}
            style={{ width: "120px", textAlign: "center", overflowX: "visible" }}
            filter={true}
            filterElement={blankFilter}
          />
          <Column
            field="qrId"
            header="QR Number"
            // body={this.status}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
            filter={true}
            filterElement={qrNumberFilter}
          />
          <Column
            field="CreatedBy"
            header="Created By"
            body={this.userNameTemplate}
            filter={true}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "160px", textAlign: "center" }}
            className="CreatedBy"
          />
          <Column
            field="status"
            header="Status"
            body={this.status}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
            filter={true}
            filterElement={statusFilter}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={
            this.state.fetching == true
              ? 1
              : (this.props.state.data.EmployeeData &&
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
    fetching: state.fetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEmployeeData: data => dispatch({ type: GET_EMPLOYEES_DATA_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContent);