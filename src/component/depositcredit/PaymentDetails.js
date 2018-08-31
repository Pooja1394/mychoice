import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import "../../style/depositncredit/paymentdetails.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import "font-awesome/css/font-awesome.css";
import { InputText } from 'primereact/components/inputtext/InputText';
import { connect } from "react-redux";
import { DateFormat, TimeFormat,checkdisplay } from "../../utils/Method"
import { PAYMENT_DETAILS_DATA_REQUEST, USER_TABLE_CSV } from "../../actions/types";
import { imagebasepath } from "../../utils/Constant";
import moment from 'moment';

class PaymentDetails extends Component {
  state = {
    page: 1,
    limit: 10,
    count: 1,
    loader: false,
    fetching: false,
    shortName: "",
    bankName: "",
    bankId: "",
    createdAt: "",
    createdBy: "",
    created: "",
    email: "",
    type: "",
    balance: "",
    userName: "",
    TransferType: "",
    amount: "",
    transferDate: ""
  };
  componentWillMount() {
    this.props.state  && checkdisplay("Deposits")?"":(this.props.history.push('/home/dash'))

    this.props.onRequestExportCSV(this.dt, ["41"]);
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
    this.setState({ loader: false });
  }
  export = () => {
    this.dt.exportCSV();
  };
  updatedAt = (rowData, column) => {
    return <div> <div>{DateFormat(rowData.updatedAt)}</div>
      <div>     {TimeFormat(rowData.updatedAt)}</div></div>
  }
  onPageChange = pageNumber => {
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
  };
  amount = (rowData, column) => {
    return (
      <div>{parseInt(rowData.amount).toLocaleString("en-MY")} &nbsp;B</div>
    );
  };
  balance = (rowData, column) => {
    return (
      <div>{parseInt(rowData.balance).toLocaleString("en-MY")} &nbsp;B</div>
    );
  };
  totalAmount = (rowData, column) => {
    return (
      <div>{parseInt(rowData.totalAmt).toLocaleString("en-MY")} &nbsp;Ks</div>
    );
  };
  createdByTemplate(rowData, column) {
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
  userNameTemplate(rowData, column) {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.name.img}`;
    if (rowData.name.img == "" || rowData.name.img == undefined) {
      srce =  srce = require("../../images/user.png");
    } else if (
      rowData.loginType == "Facebook" ||
      rowData.loginType == "Google"
    ) {
      srce = rowData.name.img;
    } else srce = path2;
    if (rowData.name.ip == "" || rowData.name.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.name.ip;
    return (
      <div style={{ display: "flex" }}>
        <div id="UserImageDiv">
         {" "}
          <img
            id="UserAvatarimg"
            src={srce}
            alt="av"
            style={{ height: "30px", width: "30px", borderRadius: "50px" }}
          />
        </div>
        <div>
          <div>{rowData.name.userName}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  }
  clearAll = () => {
    this.setState({
      created: "",
      email: "",
      type: "",
      balance: "",
      userName: "",
      TransferType: "",
      amount: "",
      transferDate: ""
    })
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  render() {


    //Email filter
    let emailFilter = <InputText className="ui-column-filter" style={{ width: '100%' }}
      value={this.state.email}
      onChange={(e) => {
        this.setState({ filterName: "email", filterData: e.target.value, page: 1, email: e.target.value })
        this.props.onRequestData({
          page: this.state.page,
          limit: this.state.limit,
          email: e.target.value
        });
      }}
    />

    //userName filter
    let userFilter = <InputText className="ui-column-filter"
      style={{ width: '100%' }}
      value={this.state.userName}
      onChange={(e) => {
        this.setState({ filterName: "userName", filterData: e.target.value, page: 1, userName: e.target.value })
        this.props.onRequestData({ page: 1, limit: this.state.limit, userName: e.target.value })
      }}
    />


    //LoginType filter
    let typeFilter = <InputText className="ui-column-filter" value={this.state.type} style={{ width: '100%' }}
      value={this.state.type}
      onChange={(e) => {
        this.setState({ filterName: "loginType", filterData: e.target.value, page: 1, type: e.target.value })
        this.props.onRequestData({ page: 1, limit: this.state.limit, loginType: e.target.value })
      }}
    />

    //Balance Filter
    let balanceFilter = <InputText className="ui-column-filter" value={this.state.balance} style={{ width: '100%' }}
      value={this.state.balance}
      onChange={(e) => {
        this.setState({ filterName: "balance", filterData: e.target.value, page: 1, balance: e.target.value })
        this.props.onRequestData({ page: 1, limit: this.state.limit, balance: parseInt(e.target.value) })
      }}
    />

    //Amount Filter
    let amountFilter = <InputText className="ui-column-filter" value={this.state.amount} style={{ width: '100%' }}
      value={this.state.amount}
      onChange={(e) => {
        this.setState({ filterName: "amount", filterData: e.target.value, page: 1, amount: e.target.value })
        this.props.onRequestData({ page: 1, limit: this.state.limit, amount: parseInt(e.target.value) })
      }}
    />

    //transferTypeFilter

    let transferTypeFilter = <InputText className="ui-column-filter" value={this.state.TransferType} style={{ width: '100%' }}
      value={this.state.TransferType}
      onChange={(e) => {
        this.setState({ filterName: "TransferType", filterData: e.target.value, page: 1, TransferType: e.target.value })
        this.props.onRequestData({ page: 1, limit: this.state.limit, transfer: e.target.value })
      }}
    />
    let transferDateFilter =
      <DatePicker
        allowClear={false}
        value={this.state.transferDate}
        className="ui-column-filter" onChange={
          (date, dateString) => {
            this.setState({
              filterName: "transferDate",
              filterData: dateString,
              page: 1,
              transferDate: moment(dateString)
            })
            this.props.onRequestData({ page: 1, limit: this.state.limit, updatedAt: dateString })
          }
        } />
    //userId filter
    let userIdFilter = (
      <InputText readOnly />
    );
    let paymentlist = [];
    if (this.props.state.data.data) {
      this.props.state.data.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        paymentlist = paymentlist.concat(obj);
      });
    }
    const { fetching } = this.props
    return (
      <div className="payment-table-list">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/depositncredit">
              Payment Details
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/depositncredit/transfer">Transfer</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/depositncredit/buybidsbybank">
              Buy Bids By Bank
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/depositncredit/bidpackages">Bid Packages</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/home/depositncredit/bank">Bank</Link>
          </Menu.Item>
        </Menu>
        <div>
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
                  this.props.onRequestData({
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
            <button id="buttonExportCsv" onClick={() => this.export()}>Export CSV</button>
          </div>

          <DataTable
            columnResizeMode="expand"
            resizableColumns={true}
            loading={fetching}
            loadingIcon="fas fa-spinner"
            scrollHeight={"51vh"}
            value={paymentlist}
            ref={el => {
              this.dt = el;
            }}

            scrollable={true}
          >
            <Column
              field="index"
              header="S.No"
              style={{ width: "50px", textAlign: "left" }}
            />
            <Column
              field="_id"
              header="User ID"
              filter={true}
              filterElement={userIdFilter}
              style={{ width: "60px", textAlign: "center" }}
              className="userId"
            />
            <Column
              field="userName"
              header="User Name"
              filter={true}
              filterElement={userFilter}
              body={this.userNameTemplate}
              style={{ width: "180px" }}
              className="userName"
            />
            <Column
              field="email"
              header="Email"
              filter={true}
              filterElement={emailFilter}
              style={{ width: "200px", textAlign: "left" }}
              className="Email"
            />
            <Column
              field="loginType"
              header="Type"
              filter={true}
              filterElement={typeFilter}
              style={{ width: "70px", textAlign: "center" }}
              className="Type"
            />
            <Column
              field="amount"
              header="Bids"
              body={this.amount}
              filter={true}
              filterElement={amountFilter}
              style={{ width: "100px", textAlign: "right" }}
              className="Amount"
            />
             <Column
              field="totalAmt"
              header="Amount"
              body={this.totalAmount}
              filter={true}
              // filterElement={balanceFilter}
              style={{ width: "100px", textAlign: "right" }}
              className="amount"
            />
            <Column
              field="transfer"
              header="Transfer Type"
              filter={true}
              filterElement={transferTypeFilter}
              style={{ width: "100px", textAlign: "center" }}
              className="TransferType"
            />
             <Column
              field="transferBy"
              header="Transfer By"
              filter={true}
              
              style={{ width: "100px", textAlign: "center" }}
              className="TransferType"
            />
            <Column
              field="balance"
              header="Balance"
              body={this.balance}
              filter={true}
              filterElement={balanceFilter}
              style={{ width: "90px", textAlign: "right" }}
              className="Balance"
            />
            
           
            <Column
              field="updatedAt"
              header="Transfer Date"
              body={this.updatedAt}
              filter={true}
              filterElement={transferDateFilter}
              style={{ width: "130px", textAlign: "center" }}
              className="TransferDate"
            />
            <Column
              field="CreatedBy"
              header="Created By"
              body={this.createdByTemplate}
              filter={true}
              style={{ width: "150px", textAlign: "center" }}
              className="CreatedBy"
            />
          </DataTable>

          <Pagination
            defaultCurrent={0}
            pageSize={this.state.limit}

            total={(this.props.state.data.length == 0 ? 1 : this.props.state.data.totalPages) * (this.state.limit)}
            // total={30}
            onChange={current => {
              this.onPageChange(current), this.setState({ page: current });
            }}
          />
          <br />
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
    onRequestData: data =>
      dispatch({ type: PAYMENT_DETAILS_DATA_REQUEST, data }),
    onRequestExportCSV: (data, value) =>
      dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
