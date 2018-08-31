import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import {
  BANK_DETAILS_FILTER_REQUEST,
  USER_TABLE_CSV,
  BID_PACKAGE_DATA_REQUEST
} from "../../actions/types";
import { connect } from "react-redux";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat,api, openNotificationWithIcon, checkAddPrivileges } from "../../utils/Method";
import "../../style/depositncredit/bidpackages.css";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import { basepath, imagebasepath } from "../../utils/Constant";
import moment from 'moment'
import {checkdisplay,checkUpdatePrivileges} from "../../utils/Method"
class BidPackagesContent extends Component {
  state = {
    page: 1,
    limit: 10,
    count: 1,
    loader: false,
    fetching: false,
    bidPackageId: "",
    bidPackageName: "",
    bidAmount: "",
    createdDate: "",
    createdBy: "",
    created: ""
  };
  componentWillMount() {
    this.props.state  && checkdisplay("Deposits")?"":(this.props.history.push('/home/dash'))
    this.props.onRequestExportCSV(this.dt, ["44"]);
    this.props.onRequestFilter({
      page: this.state.page,
      limit: this.state.limit
    });
    this.setState({ loader: false });
  }
  export = () => {
    this.dt.exportCSV();
  };
  createdAt = (rowData, column) => {
    return (
      <div>
        <div>{DateFormat(rowData.createdAt)}</div>
        <div> {TimeFormat(rowData.createdAt)}</div>
      </div>
    );
  };
  amount = (rowData, column) => {
    return (
      <div>{parseInt(rowData.amount).toLocaleString("en-MY")} &nbsp;Ks</div>
    );
  };
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"bank/removepackage",
          data:{bidID:rowData._id},
        }
        api(data).then((res)=>{
          this.props.onRequestFilter({
            page: this.state.page,
            limit: this.state.limit
          });
        openNotificationWithIcon("success","Bid Package","Bid Package Deleted Successfully")
       
        })
        
      }},
     ]
    let srce=require("../../images/tick.png")
    let srce2=require("../../images/cross.png")
    if (rowData.status){
     return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",height:"30px",borderRadius:"2px",marginRight:"10px"}}><img id="UserAvatarimg" src={srce} alt="av" style={{paddingLeft:"2px"}}/></div>
     <SplitButton
          style={{display:this.props.state  && checkUpdatePrivileges('Deposits')?'flex':'none'}}                                                                                                                          
     icon="fa-pencil" onClick={()=>{
      
       this.props.history.push({pathname:`/home/depositncredit/bidpackages/createpackage`,state:rowData})
     }} model={items}></SplitButton>
     </div>
      }
     else {
    return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",height:"30px",borderRadius:"2px",marginRight:"10px"}}>
    <img id="UserAvatarimg" src={srce2} alt="av" style={{paddingLeft:"4px"}}/></div>
     <SplitButton 
          style={{display:this.props.state  && checkUpdatePrivileges('Deposits')?'flex':'none'}}                                                                                                                                    
     icon="fa-pencil"
      onClick={()=>{
        this.props.history.push({pathname:`/home/depositncredit/bidpackages/createpackage`,state:rowData})
     }} model={items}></SplitButton>
     </div>
   }
}
  clearAll = () => {
    this.setState({
      bidPackageId: "",
      bidPackageName: "",
      bidAmount: "",
      createdDate: "",
      createdBy: "",
      created: ""
    });
    this.props.onRequestFilter({
      page: this.state.page,
      limit: this.state.limit
    });
  };
  onPageChange = pageNumber => {
    this.setState({ page: pageNumber });
    this.props.onRequestFilter({ page: pageNumber, limit: this.state.limit });
  };
  userNameTemplate(rowData, column) {
    let ipAddr;
    let path2 = `${imagebasepath}/${rowData.createdBy.img}`
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
          <div>{rowData.createdBy.name}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  }
  render() {
    let createdDateFilter = (
      <DatePicker
        allowClear={false}
        value={this.state.created}
        className="ui-column-filter"
        onChange={(date, dateString) => {
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            created: moment(dateString),
            page: 1
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            createdAt: dateString
          });
        }}
      />
    );
    let bidPackageIdFilter = (
      <InputText readOnly />
    );
    let bidPackageNameFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.bidPackageName}
        onChange={e => {
          this.setState({
            filterName: "bidPackageName",
            filterData: e.target.value,
            page: 1,
            bidPackageName: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            bidPackageName: e.target.value
          });
        }}
      />
    );
    let bidAmountFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.bidAmount}
        onChange={e => {
          this.setState({
            filterName: "amount",
            filterData: e.target.value,
            page: 1,
            bidAmount: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            amount: e.target.value
          });
        }}
      />
    );
    let statusFilter=<select option="field"
    style={{width: '100%'}} className="ui-column-filter" 
    value={this.state.status} 
    onChange={(event)=>{
     this.setState({filterName:"status",filterData:event.target.value,page:1,status:event.target.value}) 
     this.props.onRequestFilter({page:1,limit:this.state.limit,status:event.target.value})}}
    >
    <option value="">All</option>
  <option value="true">Open</option>
  <option value="false">Lock</option>
  </select>
    let SNoFilter = <InputText readOnly />;
    let bidpackagelist = [];
    if (this.props.state.bidpackagelist) {
      this.props.state.bidpackagelist.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        bidpackagelist = bidpackagelist.concat(obj);
      });
    }
    const {
      fetching,
      data,
      onRequestFilter,
      onRequestData,
      error
    } = this.props;
    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["4"]}
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
                onRequestFilter({
                  page: 1,
                  limit: event.target.value,
                  filterName: this.state.filterName,
                  filterData: this.state.filterData

                });
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
          <Link to="/home/depositncredit/bidpackages/createpackage">
            <button id="btnAdd"
          style={{display:this.props.state  && checkAddPrivileges('Deposits')?'flex':'none'}}                                                                                                                          
          
            >Add Package</button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          value={bidpackagelist}
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
            style={{ width: "20px", textAlign: "left" }}
          />
          <Column
            field="_id"
            header="Package ID"
            filter={true}
            filterElement={bidPackageIdFilter}
            style={{ width: "50px" }}
            className="BankId"
          />
          <Column
            field="bidPackageName"
            header="Bid Package Name"
            filter={true}
            filterElement={bidPackageNameFilter}
            style={{ width: "100px" }}
            className="BidPackageName"
          />
          <Column
            field="amount"
            body={this.amount}
            header="Amount"
            filter={true}
            filterElement={bidAmountFilter}
            style={{ width: "100px", textAlign: "center" }}
            className="Amount"
          />
           <Column
            field="noOfBids"
            header="No Of Bids"
            filter={true}
         
            style={{ width: "70px", textAlign: "center" }}
            className="Amount"
          />
          
          <Column
            field="createdAt"
            header="Created Date"
            body={this.createdAt}
            filter={true}
            filterElement={createdDateFilter}
            style={{ width: "70px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="CreatedBy"
            body={this.userNameTemplate}
            header="Created By"
            filter={true}
            style={{ width: "90px" }}
            className="CreatedBy"
          />
            <Column
            field="status"
            header="Status"
            body={this.status}
            style={{ width: "70px", textAlign: "left", overflowX: "visible" }}
            filter={true}
            filterElement={statusFilter}
          />
        </DataTable>
    
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={
            fetching == true
              ? 1
              : (this.props.state.bidpackagelist &&
                this.props.state.bidpackagelist.totalPages) * this.state.limit
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
    bidpackagelist: state.bidpackagelist
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestFilter: data => dispatch({ type: BID_PACKAGE_DATA_REQUEST, data }),
    onRequestExportCSV: (data, value) =>
      dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BidPackagesContent);
