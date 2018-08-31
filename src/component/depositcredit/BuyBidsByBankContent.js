import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/buybidsbybank.css";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import "../../style/depositncredit/paymentdetails.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import { InputText } from "primereact/components/inputtext/InputText";
import "font-awesome/css/font-awesome.css";
import { connect } from "react-redux";
import { DateFormat, TimeFormat, api,checkdisplay } from "../../utils/Method";
import { Growl } from 'primereact/components/growl/Growl';
import { imagebasepath } from "../../utils/Constant";
import { openNotificationWithIcon } from "../../utils/Method"
import moment from 'moment'
import { DATA_BIDS_BY_BANK_REQUEST, USER_TABLE_CSV } from "../../actions/types";
class BuyBidsByBankContent extends Component {
  state = {
    arr: [],
    loader: false,
    page: 1,
    limit: 10,
    count: 1,
    filterName: "",
    filterData: "",
    userId: "",
    userName: "",
    email: "",
    type: "",
    bidPackage: "",
    bankName: "",
    invoiceNumber: "",
    transferDate: "",
    created: ""
  };
  onPageChange = pageNumber => {
    this.props.onRequestBIdsByBankData({
      page: pageNumber,
      limit: this.state.limit
    });
  };
  componentWillMount() {
    this.props.state  && checkdisplay("Deposits")?"":(this.props.history.push('/home/dash'))
    this.props.onRequestExportCSV(this.dt, ["43"]);
    this.props.onRequestBIdsByBankData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  export = () => {
    this.dt.exportCSV();
  };
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
  actionColumn = (rowData, column) => {
    return (
      <div>
        <button className="transferbtn" 
        //  style={{backgroundColor:rowData.suspend?'blue':''}}
        disabled={rowData.suspend} onClick={() => {
       
          let data = {
            method: "post",
            url: "buybank/actionbuybank",
            data: {
              userId: rowData.userId,
              actionType: "Transfer",
              buyID: rowData._id
            },
          }
          api(data).then((res) => {
            this.props.onRequestBIdsByBankData({ page: this.state.page, limit: this.state.limit })
            openNotificationWithIcon(
              "success",
              "Amount Status",
              "Amount Transferred"
            );
          })
        }}>Transfer</button>
        <button className="rejectbtn" onClick={() => {
          let data = {
            method: "post",
            url: "buybank/actionbuybank",
            data: {
              userId: rowData.userId,
              actionType: "Reject",
              buyID: rowData._id
            },
          }
          api(data).then((res) => {
            this.props.onRequestBIdsByBankData({ page: this.state.page, limit: this.state.limit })
            openNotificationWithIcon(
              "success",
              "Amount Status",
              "Transfer Rejected"
            );
          })
        }}>Reject</button>
      </div>
    );
  };
  BankImage = (rowData, column) => {
    let srce;
    let path2 = `${rowData.picture}`;
    if (rowData.picture == "" || rowData.picture == undefined) {
      srce = "hello";
    } else srce = path2;
    return (
      <div>
        <img
          id="UserAvatarimg"
          src={srce}
          alt="av"
          style={{ height: "40px", width: "60px", marginRight: "10px" }}
        />
      </div>
    );
  };
  updatedAt = (rowData, column) => {
    if (rowData.createdAt == "" || rowData.createdAt == undefined) {
      return <div>--</div>;
    } else {
      return (
        <div>
          <div>{DateFormat(rowData.createdAt)}</div>
          <div> {TimeFormat(rowData.createdAt)}</div>
        </div>
      );
    }
  };
  clearAll = () => {
    this.setState({
      filterName: "",
      filterData: "",
      userId: "",
      userName: "",
      email: "",
      type: "",
      bidPackage: "",
      bankName: "",
      invoiceNumber: "",
      transferDate: "",
      created: ""
    });
    this.props.onRequestBIdsByBankData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  render() {
    let transferDateFilter = (
      <DatePicker
        className="ui-column-filter"
        value={this.state.created}
        onChange={(date, dateString) => {
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            created: moment(dateString)
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            createdAt: dateString
          });
        }}
      />
    );

    let userNameFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.userName}
        onChange={e => {
          this.setState({
            filterName: "userName",
            filterData: e.target.value,
            page: 1,
            userName: e.target.value
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            userName: e.target.value
          });
        }}
      />
    );

    let userIdFilter = (
      <InputText readOnly />
    );

    let emailFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.email}
        onChange={e => {
          this.setState({
            filterName: "email",
            filterData: e.target.value,
            page: 1,
            email: e.target.value
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            email: e.target.value
          });
        }}
      />
    );

    let bankNameFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.bankName}
        onChange={e => {
          this.setState({
            filterName: "bankName",
            filterData: e.target.value,
            page: 1,
            bankName: e.target.value
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            bankName: e.target.value
          });
        }}
      />
    );

    let invoiceNumberFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.invoiceNumber}
        onChange={e => {
          this.setState({
            filterName: "invoice",
            filterData: e.target.value,
            page: 1,
            invoiceNumber: e.target.value
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            invoice: e.target.value
          });
        }}
      />
    );

    let bidPackageFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.bidPackage}
        onChange={e => {
          this.setState({
            filterName: "noOfBids",
            filterData: e.target.value,
            page: 1,
            bidPackage: e.target.value
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            noOfBids: e.target.value
          });
        }}
      />
    );
    let actionFilter = (
      <InputText readOnly />
    )
    let loginTypeFilter = (
      <select
        option="field"
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.loginType}
        onChange={event => {
          this.setState({
            filterName: "loginType",
            filterData: event.target.value,
            page: 1,
            loginType: event.target.value
          });
          this.props.onRequestBIdsByBankData({
            page: 1,
            limit: this.state.limit,
            loginType: event.target.value
          });
          this.setState({ brand3: event.target.value });
        }}
      >
        <option value="">All</option>
        <option value="Google">Google</option>
        <option value="Facebook">Facebook</option>
        <option value="Manual">Manual</option>
      </select>
    );
    let SNoFilter = <InputText readOnly />;
    let ImageFilter = <InputText readOnly />;
    let userList = [];
    if (this.props.state.data && this.props.state.data.buyBidList) {
      this.props.state.data.buyBidList.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        userList = userList.concat(obj);
      });
    }
    const { fetching, data, error, onRequestBIdsByBankData } = this.props;
    return (
      <div className="BuyBidsByBank-table-list">
        <Growl ref={(el) => { this.growl = el; }}></Growl>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
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
                  this.props.onRequestBIdsByBankData({
                    page: this.state.page,
                    limit: this.state.limit
                  });
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
            </span>
            <button id="buttonExportCsv" onClick={() => this.export()}>
              Export CSV
            </button>
          </div>

          <DataTable
            columnResizeMode="expand"
            value={userList}
            resizableColumns={true}
            loading={fetching}
            loadingIcon="fas fa-spinner"
            scrollHeight={"51vh"}
            ref={el => {
              this.dt = el;
            }}
            scrollable={true}
          >
            <Column
              field="index"
              header="S.No"
              filter={true}
              filterElement={SNoFilter}
              style={{ width: "50px", textAlign: "left" }}
            />
            <Column
              field="userId"
              header="User ID"
              filter={true}
              filterElement={userIdFilter}
              style={{ width: "60px", textAlign: "center" }}
              className="userId"
            />
            <Column
              field="userName"
              body={this.userNameTemplate}
              filterElement={userNameFilter}
              header="User Name"
              filter={true}
              style={{ width: "170px" }}
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
              filterElement={loginTypeFilter}
              style={{ width: "70px", textAlign: "center" }}
              className="Type"
            />
            <Column
              field="bidPackageName"
              header="Bid Package"
              filterElement={bidPackageFilter}
              filter={true}
              style={{ width: "90px", textAlign: "center" }}
              className="BidPackage"
            />
            <Column
              field="BankImage"
              body={this.BankImage}
              header="Bank Image"
              filter={true}
              filterElement={ImageFilter}
              style={{ width: "90px", textAlign: "center" }}
              className="BankImage"
            />
            <Column
              field="bankName"
              header="Bank Name"
              filter={true}
              filterElement={bankNameFilter}
              style={{ width: "170px", textAlign: "center" }}
              className="BankName"
            />
            <Column
              field="invoice"
              header="Invoice Number"
              filter={true}
              filterElement={invoiceNumberFilter}
              style={{ width: "130px", textAlign: "center" }}
              className="InvoiceNumber"
            />
            <Column
              field="createdAt"
              body={this.updatedAt}
              header="Transfer Date"
              filter={true}
              filterElement={transferDateFilter}
              style={{ width: "130px", textAlign: "center" }}
              className="TransferDate"
            />
            <Column
              field="Action"
              header="Action"
              filter={true}
              filterElement={actionFilter}
              body={this.actionColumn}
              style={{ width: "200px" }}
              className="Action"
            />
          </DataTable>

          <Pagination
            defaultCurrent={0}
            pageSize={this.state.limit}
            total={
              this.props.state.data.length == 0
                ? 1
                : this.props.state.data.totalPage * this.state.limit
            }
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
    fetching: state.fetching
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    onRequestBIdsByBankData: data => dispatch({ type: DATA_BIDS_BY_BANK_REQUEST, data })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BuyBidsByBankContent);
