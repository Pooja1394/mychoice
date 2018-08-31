import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/bank.css";
import moment from "moment";
import { DataTable } from "primereact/components/datatable/DataTable";
import {
  BANK_DETAILS_FILTER_REQUEST,
  USER_TABLE_CSV
} from "../../actions/types";
import { connect } from "react-redux";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat,api, openNotificationWithIcon ,checkdisplay, checkAddPrivileges, checkUpdatePrivileges} from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';

class BankContent extends Component {
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
    status:""
  };
  componentDidMount() {
    this.props.state  && checkdisplay("Deposits")?"":(this.props.history.push('/home/dash'))
    this.props.onRequestExportCSV(this.dt, ["45"]);
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
  userNameTemplate(rowData, column) {
    let srce, ipAddr;
    // let path2=`${rowData.picture}`
    let path2 = `${imagebasepath}/${rowData.createdBy.img}`;
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
  image = (rowData, column) => {
    let srce;
    let path2 = `${rowData.picture}`;
    if (rowData.picture == "" || rowData.picture == undefined) {
      srce = require("../../images/user.png");
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
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"bank/removebank",
          data:{bankID:rowData._id},
        }
        api(data).then((res)=>{
          this.props.onRequestFilter({
            page: this.state.page,
            limit: this.state.limit
          });
          openNotificationWithIcon(
            'success','Delete',"Bank Deleted"
          )
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
       this.props.history.push({pathname:`/home/depositncredit/bank/addbank`,state:rowData})
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
   this.props.history.push({pathname:`/home/depositncredit/bank/addbank`,state:rowData})
     }} model={items}></SplitButton>
     </div>
   }
}
  clearAll = () => {
    this.setState({
      shortName: "",
      bankName: "",
      bankId: "",
      createdAt: "",
      createdBy: "",
      created: ""
    });
    this.props.onRequestFilter({
      page: this.state.page,
      limit: this.state.limit
    });
  };
  onPageChange = pageNumber => {
    this.props.onRequestFilter({ page: pageNumber, limit: this.state.limit });
  };
  render() {
    
    let banklist = [];
    if (this.props.banklist) {
      this.props.state.banklist.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        banklist = banklist.concat(obj);
      });
    }

    let shortNameFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.shortName}
        onChange={e => {
          this.setState({
            filterName: "bankShortName",
            filterData: e.target.value,
            page: 1,
            shortName: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            bankShortName: e.target.value
          });
        }}
      />
    );
    let bankIdFilter = <InputText readOnly />;
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
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            bankName: e.target.value
          });
        }}
      />
    );
    let createdDateFilter = (
      <DatePicker
        allowClear={false}
        value={this.state.created}
        className="ui-column-filter"
        onChange={(date, dateString) => {
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            created: moment(dateString)
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            createdAt: dateString
          });
        }}
      />
    );
    let createdByFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.createdBy}
        onChange={e => {
          this.setState({
            filterName: "createdBy",
            filterData: e.target.value,
            page: 1,
            createdBy: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            createdBy: e.target.value
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
    let ImageFilter = <InputText readOnly />;

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
          defaultSelectedKeys={["5"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/depositncredit">Payment Details</Link>
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
          <Link to="/home/depositncredit/bank/addbank">
            <button 
      style={{display:this.props.state  && checkAddPrivileges('Deposits')?'flex':'none'}}                                                                                                                                               
      
            id="btnAdd">Add Bank</button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          value={banklist}
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
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="_id"
            header="Bank ID"
            filterElement={bankIdFilter}
            filter={true}
            style={{ width: "45px" }}
            className="BankId"
          />
          <Column
            field="picture"
            body={this.image}
            filter={true}
            filterElement={ImageFilter}
            header="Image"
            style={{ width: "100px", textAlign: "center" }}
            className="Image"
          />
          <Column
            field="bankName"
            header="Bank Name"
            filter={true}
            filterElement={bankNameFilter}
            style={{ width: "200px" }}
            className="bankName"
          />
          <Column
            field="bankShortName"
            header="Short Name"
            filter={true}
            filterElement={shortNameFilter}
            style={{ width: "90px", textAlign: "center" }}
            className="ShortName"
          />
          <Column
            field="createdAt"
            header="Created Date"
            body={this.createdAt}
            filterElement={createdDateFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="CreatedBy"
            header="Created By"
            body={this.userNameTemplate}
            filter={true}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "120px", textAlign: "left" }}
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
            fetching == true
              ? 1
              : (this.props.state.banklist &&
                  this.props.state.banklist.totalPages) * this.state.limit
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
    banklist: state.banklist
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestFilter: data =>
      dispatch({ type: BANK_DETAILS_FILTER_REQUEST, data }),
    onRequestExportCSV: (data, value) =>
      dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankContent);
