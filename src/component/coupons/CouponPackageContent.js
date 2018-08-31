import React, { Component } from 'react'
import { Breadcrumb, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { connect } from "react-redux";
import {
  GET_COUPON_PACKAGE_REQUEST,
} from "../../actions/types";
import "../../style/review/review.css"
import {imagebasepath} from "../../utils/Constant"
import {DateFormat,TimeFormat,checkdisplay, checkAddPrivileges} from "../../utils/Method"
class CouponPackageContent extends Component {
  
  componentWillMount() {
    this.props.state  && checkdisplay("Coupons")?"":(this.props.history.push('/home/dash'))
    
    this.props.getCouponPackageData()
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;
         {TimeFormat(rowData.createdAt)}
      </div>
    );
  };
  createdByTemplate(rowData, column) {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.createdBy.image}`;

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
          <div>{rowData.createdBy.name}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  }
  render() {
    let couponPackagelist = [];
    if (this.props.state.couponPackageData) {
      this.props.state.couponPackageData.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 
          // + (this.state.page - 1) * this.state.limit
        };
        couponPackagelist = couponPackagelist.concat(obj);
      });
    }
    return (
      <div >

        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['3']}
          style={{ lineHeight: '45px' }}

        >
          <Menu.Item key="1"><Link to="/home/coupons">Coupons</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/home/coupons/permissions">Permissions</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/home/coupons/packages">Packages</Link></Menu.Item>

        </Menu>
        <div className="depositncredit-table-operations">


          <button id="buttonExportCsv">Export CSV</button>
          <Link to="/home/coupons/packages/createpackage"> <button id="buttonExportCsv"
            style={{ width: "110px", borderRadius: "3px",
             backgroundColor: "#3c8dbc", color: "white",
             display:this.props.state  && checkAddPrivileges('Coupons')?'flex':'none'             
             }}>
            Add Package</button></Link>

          <span id="selecNos">
            <select id="NoDropDown">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select></span>
          <span id="showText">Show</span>
          <span onClick={this.clearAll} id="resetText">Reset Filter</span>
        </div>

        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          scrollHeight={"51vh"}
          value={couponPackagelist}
          scrollable={true}
        >
          <Column
            field="index"
            header="S.No"
            filter={true}
            // filterElement={SNoFilter}
            style={{ width: "50px", textAlign: "left" }}
          />
          <Column
            field="_id"
            header="Permission Id"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "100px" }}
            className="BankId"
          />
          <Column
            field="name"
            filter={true}
            // filterElement={ImageFilter}
            header="Package Name"
            style={{ width: "120px", textAlign: "center" }}
            className="Image"
          />
          <Column
            field="packageType"
            header="Package Type"
            filter={true}
            // filterElement={bankNameFilter}
            style={{ width: "150px" }}
            className="bankName"
          />
          <Column
            field="noOfCode"
            header="No. of Code"
            filter={true}
            // filterElement={shortNameFilter}
            style={{ width: "90px", textAlign: "center" }}
            className="ShortName"
          />
          <Column
            field="couponAmount"
            header="Amount"
            // body={this.createdAt}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="createdAt"
            header="Created Date"
            body={this.createdAt}
            filter={true}
            // filterElement={createdByFilter}
            filter={true}
            style={{ width: "140px", textAlign: "left" }}
            className="CreatedBy"
          />
          <Column
            field="owner"
            header="Package Owner"
            // body={this.createdAt}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "120px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            header="Created By"
            body={this.createdByTemplate}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "160px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="status"
            header="Status"
            // body={this.createdAt}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />

        </DataTable>
      </div>
    )
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
    getCouponPackageData: (data,history) => dispatch({ type: GET_COUPON_PACKAGE_REQUEST, data,history }),
    // onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CouponPackageContent);