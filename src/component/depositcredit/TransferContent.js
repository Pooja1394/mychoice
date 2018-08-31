import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, Checkbox } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/transfer.css";
import User from '../../images/user.png'
import { imagebasepath } from "../../utils/Constant";
import { InputText } from "primereact/components/inputtext/InputText";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import "../../style/depositncredit/paymentdetails.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import "font-awesome/css/font-awesome.css";
import { openNotificationWithIcon,checkdisplay } from "../../utils/Method";
import { basepath } from "../../utils/Constant";
import axios from "axios";
import {
  User_DATA_Call_Request,
  UPDATE_AMOUNT_REQUEST,
  UPDATE_AMOUNT_IN_INPUT,
  UPDATE_AMOUNT_FAILURE,
  UPDATE_AMOUNT_IN_STORE,
  USER_TABLE_CSV,
  UPDATE_SELECT_VALUE,
  User_Filter_Call_Request
} from "../../actions/types";
import { connect } from "react-redux";
class TransferContent extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      loader: false,
      page: 1,
      limit: 10,
      count: 1,
      filterName: "",
      filterData: "",
      amountObj: {},
      flag: false,
      valueenteredflag: false,
      selectedrow: {},
      allSelect: false,
      userId: "",
      userName: "",
      email: "",
      type: "",
      balance: "",
      selectedflag: false,
    };
  }
  export = () => {
    this.dt.exportCSV();
  };
  componentWillMount() {
    this.props.state  && checkdisplay("Deposits")?"":(this.props.history.push('/home/dash'))
    
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
    this.props.onRequestExportCSV(this.dt, ["42"]);
  }
  onPageChange = pageNumber => {
    this.props.onRequestData({ page: pageNumber, limit: this.state.limit });
  };
  amountentered = (rowData, column) => {
  
  };
  userNameTemplate(rowData, column) {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.picture}`
    if (rowData.picture == "" || rowData.picture == undefined) {
      srce = User
    }
    else if (rowData.loginType == "Facebook" || rowData.loginType == "Google") {
      srce = rowData.picture
    }
    else
      srce = path2
    if (rowData.ipAddress == "" || rowData.ipAddress == undefined)
      ipAddr = "192.168.17.9"
    else
      ipAddr = rowData.ipAddress;
    return <div style={{ display: "flex" }}>
      <div id="UserImageDiv"> <img id="UserAvatarimg" src={srce} alt="av" style={{ height: "30px", width: "30px", borderRadius: "50px" }} /></div>
      <div><div>{rowData.userName}</div><div>{ipAddr}</div></div>
    </div>;
  }
  getReadOnly=(rowData)=>{
    let readOnlyValue=false;
    if(this.state.amountObj.id!=''){
   
      if((rowData.isSelected==true )
        && (rowData.amount==this.state.amountObj.amount)
        && (rowData._id!=this.state.amountObj.id)){
        
          readOnlyValue=true
        }else{
          readOnlyValue= false
        }
    }else{
      readOnlyValue= false
    }
    return readOnlyValue
  }
  amountcolumn = (rowData, column) => {
    return (
      <InputText
        style={{ textAlign: "right" }}
        value={rowData.amount}
        disabled={rowData.suspend}
        keyfilter="num"
        placeholder="Amount"
        readOnly={this.getReadOnly(rowData)}
        onFocus={(e) => {
          this.props.setUpdatedInUserList({
            _id: rowData._id,
            _key: 'amount',
            val: e.target.value == 0 ? "" : e.target.value,
          });
        }}
        onBlur={(e) => {
          this.props.setUpdatedInUserList({
            _id: rowData._id,
            _key: 'amount',
            val: e.target.value == "" ? 0 : e.target.value,
          });
        }}
        onChange={e => {
          this.props.setUpdatedInUserList({
            _id: rowData._id,
            _key: 'actions',
            val: e.target.value == 0 ? "" : e.target.value,
          });
          this.props.setUpdatedInUserList({
            _id: rowData._id,
            _key: 'amount',
            val: e.target.value == 0 ? "" : e.target.value,
          });
          // this.props.setSelectedValue({
          //   _id: rowData._id,
          //   val: false
          // });
          this.setState({ amountObj: { "amount": e.target.value, "id": e.target.value == "" ? "" : rowData._id }, flag: true });
   
          if (rowData.isSelected == true) {
            this.props.userArrayList.userList && this.props.userArrayList.userList.map((userData, userCount) => {
              if (userData.isSelected == true) {
                this.props.setUpdatedInUserList({
                  _id: userData._id,
                  _key: 'amount',
                  val: e.target.value == "" ? 0 : e.target.value,
                });
              }
            })
          }
          if (e.target.value > 0) this.setState({ valueenteredflag: true });
          else if (e.target.value < 0)
            this.setState({ valueenteredflag: true });
          else if (rowData.amount == 0 || rowData.amount == "" || rowData.amount == "-")
            this.setState({ valueenteredflag: false, flag: false });
        }}
      />
    );
  };
  balance=(rowData,column)=>{
    return <div>{rowData.balance}&nbsp;B</div>
  }
  buttoncolumn = (rowData, column) => {
    let myuserList = [];
    if (this.state.valueenteredflag && rowData.actions != 0)
      return rowData.actions > 0 ? (
        <button
          className="Trasferbtn"
          onClick={() => {
            let token = localStorage.getItem("token");
            let headers = {
              Authorization: "Bearer " + token,
              Accept: "application/json"
            };

              this.props.userArrayList.userList.map((user, userCount) => {
                {
                  if (user.isSelected) {
                    myuserList = myuserList.concat({ _id: user._id, amount: user.amount })
                  }
                }

              });
              if (myuserList == "")
                myuserList = myuserList.concat({ _id: rowData._id, amount: rowData.amount })
            
              axios({
                method: "post",
                url: basepath + "transfer/createtransfer",
                data: {
                  userId: myuserList,
                  _id : "5b279d36e863dc18853119f4"
                },
                headers: headers
              })
                .then(response => {
                  this.setState({ allSelect: false })
                  this.props.onRequestData({
                    page: this.state.page,
                    limit: this.state.limit
                  });
                  openNotificationWithIcon(
                    "success",
                    "Amount Transfer",
                    "Amount Transfered  successfully"
                  );

                })
                .catch(error => {
                  console.log("Error");
                });
        
          }}
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingBottom: "8px",
            paddingTop: "8px",
            border: "0px",
            borderRadius: "3px",
            backgroundColor: "#3c8dbc"
          }}
        >
          Transfer
        </button>
      ) : (
          <button
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingBottom: "8px",
              paddingTop: "8px",
              border: "0px",
              borderRadius: "3px",
              backgroundColor: "#dd4b39"
            }} onClick={() => {

              let token = localStorage.getItem("token");
              let headers = {
                Authorization: "Bearer " + token,
                Accept: "application/json"
              };
            
                let myuserList = [];
                this.props.userArrayList.userList.map((user, userCount) => {
                  {
                    if (user.isSelected) {
                      myuserList = myuserList.concat({ _id: user._id, amount: user.amount })
                    }
                  }

                });
                if (myuserList == "")
                  myuserList = myuserList.concat({ _id: rowData._id, amount: rowData.amount })
           
                axios({
                  method: "post",
                  url: basepath + "transfer/createtransfer",
                  data: {
                    userId: myuserList,
                    _id : "5b279d36e863dc18853119f4"
                  },
                  headers: headers
                })
                  .then(response => {
                    this.setState({ allSelect: false })
                    this.props.onRequestData({
                      page: this.state.page,
                      limit: this.state.limit
                    });
                    openNotificationWithIcon(
                      "success",
                      "Amount Withdraw",
                      "Amount Withdraw  successfully"
                    );

                  })
                  .catch(error => {
                    console.log("Error");
                  });
          
            }

            }
          >
            Withdraw
        </button>
        );
    else return;
  };
  clearAll = () => {
    this.setState({
      userId: "",
      userName: "",
      email: "",
      type: "",
      balance: "",
      allSelect: false,
    });
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
  };
  render() {
    //Email filter
    let emailFilter = <InputText className="ui-column-filter" value={this.state.email} style={{ width: '100%' }}
      value={this.state.email}
      onChange={(e) => {
        this.setState({ filterName: "email", filterData: e.target.value, page: 1, email: e.target.value })
        this.props.onRequestData({ page: 1, limit: this.state.limit, email: e.target.value })
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
        this.props.onRequestData({ page: 1, limit: this.state.limit, balance: e.target.value })
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

    //Amount filter
    let amountFilter = <InputText readOnly />;

    //Action Fi;lter
    let actionFilter = <InputText readOnly />;
    let userList = [];
    if (this.props.userArrayList.userList) {
      this.props.userArrayList.userList.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit,
          // isSelected:true,
        };
        userList = userList.concat(obj);
      });
    }
    const {
      fetching,
      data,
      onRequestData,
      setAmountOnSelect,
      onUpdateAmount,
      error
    } = this.props;
    let selectboxheader =
      <input type="checkbox"
        checked={this.state.allSelect}
        style={{ width: "20px", height: "20px" }} onClick={() => {
          if (!this.state.allSelect) {
            if (this.props.userArrayList.userList) {
              this.props.userArrayList.userList.map((data, key) => {
                if (this.state.flag == true)
                  this.props.setUpdatedInUserList({
                    _id: data._id,
                    _key: 'amount',
                    val: this.state.amountObj.amount
                  });

                let val = this.state.allSelect ? false : true
                this.props.setSelectedValue({
                  _id: data._id,
                  val: val
                });
              });
            }
          }
          else {
            if (this.props.userArrayList.userList) {
              this.props.userArrayList.userList.map((data, key) => {
                if (this.state.flag == true)
                  this.props.setUpdatedInUserList({
                    _id: data._id,
                    _key: 'amount',
                    val: this.state.amountObj.id == data._id ? data.amount : 0
                  });
                this.props.setUpdatedInUserList({
                  _id: data._id,
                  _key: 'actions',
                  val: this.state.amountObj.id == data._id ? data.actions : 0
                });

                let val = this.state.allSelect ? false : true
                this.props.setSelectedValue({
                  _id: data._id,
                  val: val
                });
              });
            }
            this.setState({
              flag: false
            })
          }
          this.setState({
            allSelect: !this.state.allSelect
          })


        }} />
    let checkboxcolumn = (rowData, column) => {
      return <input type="checkbox"
        style={{ width: "20px", height: "20px", background: "white" }}
        checked={rowData.isSelected} 
        onClick={() => {
       
          let amount = this.state.amountObj.amount;
          // if (rowData.index - (this.state.page - 1) * 10 == 1)
          this.setState({ selectedflag: true });
          let isSelected = false;
          this.props.userArrayList.userList && this.props.userArrayList.userList.map((userData, userCount) => {
            if (userData.amount != '' && userData.isSelected == true)
              isSelected = true
          })
          if (rowData.isSelected) {
            amount = 0;
          }
          this.props.setSelectedValue({
            _id: rowData._id,
            val: !rowData.isSelected
          });
          if (this.state.amountObj.amount != '' && (isSelected == true || rowData.isSelected == true)) {
            this.props.setUpdatedInUserList({
              _id: rowData._id,
              _key: 'amount',
              val: amount
            });
          }
        }} />;
    };
    let userIdFilter = (
      <InputText readOnly />
    );
    return (
      <div className="transfer-table-list">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
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
                  onRequestData({ page: 1, limit: event.target.value });
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
            columnResizeMode="fit"
            value={userList}
            loading={fetching}
            resizableColumns={true}
            loadingIcon="fas fa-spinner"
            scrollHeight={"51vh"}
            rowClassName={(e) => {
            
            }}
            ref={el => {
              this.dt = el;
            }}
            scrollable={true}
          >
            <Column
              field="index"
              header="S.No"
              filter={true}
              style={{ width: "50px", textAlign: "left" }}
            />
            <Column
              field="_id"
              header="User ID"
              filter={true}
              filterElement={userIdFilter}
              style={{ width: "60px" }}
              className="userId"
            />
            <Column
              field="userName"
              header="User Name"
              body={this.userNameTemplate}
              filter={true}
              filterElement={userFilter}
              style={{ width: "150px" }}
              className="userName"
            />
            <Column
              field="email"
              header="Email"
              filter={true}
              filterElement={emailFilter}
              style={{ width: "250px" }}
              className="email"
            />
            <Column
              field="loginType"
              header="Type"
              filter={true}
              filterElement={typeFilter}
              style={{ width: "70px" }}
              className="Type"
            />
            <Column
              field="balance"
              header="Balance"
              body={this.balance}
              filter={true}
              filterElement={balanceFilter}
              style={{ width: "100px", textAlign: "right" }}
              className="Balance"
            />
            <Column
              body={checkboxcolumn}
              filter={true}
              filterElement={selectboxheader}
              style={{ width: "50px" }}
              className="checked"
            />
            <Column
              body={this.amountcolumn}
              header="Amount"
              filter={true}
              filterElement={amountFilter}
              style={{ width: "100px", textAlign: "right" }}
              className="Amount"
            />
            <Column
              field="Action"
              body={this.buttoncolumn}
              header="Action"
              filter={true}
              filterElement={actionFilter}
              style={{ width: "100px", textAlign: "center" }}
              className="Action"
            />
          </DataTable>
          <Pagination
            defaultCurrent={0}
            pageSize={this.state.limit}
            total={
              (this.props.userArrayList.length == 0
                ? 1
                : this.props.userArrayList.totalPage) * this.state.limit
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
    fetching: state.fetching,
    userArrayList: state.userArrayList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    onRequestData: data => dispatch({ type: User_Filter_Call_Request, data }),
    onUpdateAmount: data => dispatch({ type: UPDATE_AMOUNT_REQUEST, data }),
    setUpdatedInUserList: data => dispatch({ type: UPDATE_AMOUNT_IN_STORE, data }),
    setAmountOnSelect: data => dispatch({ type: UPDATE_AMOUNT_IN_INPUT, data }),
    setSelectedValue: data => dispatch({ type: UPDATE_SELECT_VALUE, data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransferContent);
