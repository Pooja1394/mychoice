import React, { Component } from "react";
import { Breadcrumb, Menu,DatePicker,Pagination } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { InputText } from "primereact/components/inputtext/InputText";
import { Column } from "primereact/components/column/Column";
import { connect } from "react-redux";
import {imagebasepath,basepath} from "../../utils/Constant";
import {DateFormat,TimeFormat,checkdisplay,checkAddPrivileges} from '../../utils/Method';
import {Rating} from 'primereact/components/rating/Rating';
import moment from "moment";
import {
  GET_PACKAGE_REQUEST,
  USER_TABLE_CSV
} from "../../actions/types";
import "../../style/review/review.css";

class PackageContent extends Component {
  constructor(){
    super();
    this.state={
      packageName:"",
      createdBy:"",
      createdAt:"",
      status:true,
      page: 1,
      limit: 10
    }
  }
  onPageChange = pageNumber => {
    this.props.getPackageData({ page: pageNumber, limit: this.state.limit });
  };
componentWillMount() {
  this.props.state  && checkdisplay("Reviews")?"":(this.props.history.push('/home/dash'))
  
  this.props.getPackageData();
  this.props.onRequestExportCSV(this.dt,["53"])
}
export = () => {
  this.dt.exportCSV();
};
status=(rowData,column)=>{
     
  if (rowData.status=="Open"){
   return <span style={{color: "#00a65a"}}>{rowData.status}</span>;
  }
  else {
   return <span style={{color: "#dd4b39"}}>{rowData.status}</span>;
  }
}
createdBy = (rowData, column) => {
  let srce, ipAddr;
  let path2 = `${imagebasepath}/${rowData.createdBy.img}`;
  // let path2=rowData.createdBy.img;
  if (rowData.createdBy.img == "" || rowData.createdBy.img == undefined) {
    srce = "User";
  } else srce = path2;
  if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
    ipAddr = "192.168.17.9";
  else ipAddr = rowData.createdBy.ip;
  return (
    <div style={{ display: "flex" }}>
      <div id="UserImageDiv">
        <img
          id="UserAvatarimg"
          src={srce}
          alt="av"
          style={{ height: "30px", width: "30px", borderRadius: "50px" }}
        />
      </div>
      <div>
        <div>{rowData.createdBy.name}</div>
        <div>{ipAddr}</div>
      </div>
    </div>
  );
};
createdAt = (rowData, column) => {
  return (
    <div>
      {DateFormat(rowData.createdAt)}&nbsp;&nbsp;{TimeFormat(
        rowData.createdAt
      )}
    </div>
  );
};
reviews=(rowData,column)=>{
  return (
    rowData.review.map((v,k)=>{
         return <div style={{display:"flex",justifyContent:"space-between",fontFamily:"semiboldfont"}}>{v.name}
         <Rating value={3} readonly={true} stars={5} cancel={false} />
         </div>
    })
  )
}
clearAll=()=>{
  this.props.getPackageData()
  this.setState({
    packageName:"",
    createdBy:"",
    createdAt:"",
    status:""
  })
}

  render() {
    const {fetching,getPackageData} =this.props;
    let userList = [];
    if (this.props.state.packageData) {
      this.props.state.packageData.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1
        };
        userList = userList.concat(obj);
      });
    }
    let packageFilter = (
      <InputText
        style={{ width: "100%" }}
        value={this.state.packageName}
        className="ui-column-filter"
        onChange={e => {
          this.setState({
            filterName: "productName",
            filterData: e.target.value,
            page: 1,
            packageName: e.target.value
          });
          this.props.getPackageData({
            page: 1,
            limit: this.state.limit,
            packageName: e.target.value
          });
        }}
      />
    );
    let createdByFilter = (
      <InputText
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.createdBy}
        onChange={e => {
          // this.props.onRequestFilter({createdBy:e.target.value})}}
          this.setState({
            filterName: "createdBy",
            filterData: e.target.value,
            page: 1,
            createdBy: e.target.value
          });
          this.props.getPackageData({
            page: 1,
            limit: this.state.limit,
            createdBy: e.target.value
          });
        }}
      />
    );
    let createdAtFilter = (
      <DatePicker
        className="ui-column-filter"
        allowClear={false}
        value={this.state.createdAt}
        onChange={(date, dateString) => {
          console.log("date", dateString);
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            createdAt: moment(dateString)
          });
          this.props.getPackageData({
            page: 1,
            limit: this.state.limit,
            createdAt: dateString
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
          this.setState({
            filterName: "status",
            filterData: event.target.value,
            page: 1,
            status: event.target.value
          });
          this.props.getPackageData({
            page: 1,
            limit: this.state.limit,
            status: event.target.value
          });
        }}
      >
        <option value="">All</option>
        <option value="Open">Open</option>
        <option value="Lock">Lock</option>
      </select>
    );
    let reviewFilter=(
      <InputText readOnly/>
    )
    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/review">Reviews</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/review/permissions">Permissions</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/review/packages">Packages</Link>
          </Menu.Item>
        </Menu>
        <div className="review-table-operations">
          <span onClick={this.clearAll} id="resetText">
            Reset Filter
          </span>
          <span id="showText">Show</span>
          <span id="selecNos">
            <select id="NoDropDown"
              onChange={event => {
              this.setState({ limit: event.target.value });
              getPackageData({
                page: 1,
                limit: event.target.value,
                [this.state.filterName]: this.state.filterData
              });
            }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
          <Link to="/home/review/createpackage">
          <button
           style={{display:this.props.state  && checkAddPrivileges('Reviews')?'flex':'none'}}                                                                                                                                                                                       
          id="btnAdd">Add Package</button>
          </Link>
          <button id="buttonExportCsv" onClick={this.export}>Export CSV</button>
        </div>
        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          loading={fetching}
          scrollHeight={"51vh"}
          value={userList}
          scrollable={true}
          ref={el => {
            this.dt = el;
          }}
        >
          <Column
            field="index"
            header="S.No"
            filter={true}
            // filterElement={SNoFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="packageName"
            header="Package Name"
            filter={true}
            filterElement={packageFilter}
            style={{ width: "200px" }}
          />
           <Column
            header="Created Date"
            body={this.createdAt}
            filterElement={createdAtFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
          />
           <Column
            header="Created By"
            body={this.createdBy}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "90px", textAlign: "left" }}
          />
           <Column
            header="Status"
            body={this.status}
            filterElement={statusFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
          />
         
          <Column
            header="Reviews"
            body={this.reviews}
            filterElement={reviewFilter}
            filter={true}
            style={{ width: "130px", textAlign: "center" }}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={this.props.state.packageData?this.props.state.packageData.totalpage * this.state.limit:""}
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
    getPackageData: data => dispatch({ type: GET_PACKAGE_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PackageContent);
