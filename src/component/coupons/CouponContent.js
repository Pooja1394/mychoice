import React, { Component } from 'react'
import { Breadcrumb, Menu ,DatePicker} from 'antd';
import moment from "moment"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { connect } from "react-redux";
import {imagebasepath} from "../../utils/Constant"
import {DateFormat,TimeFormat,checkdisplay} from "../../utils/Method"
import "../../style/review/review.css"
import { GET_ALL_COUPONS_REQUEST } from '../../actions/types';
class CouponContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     fetching:false,
     couponlist:[] ,
     page:1,
     limit:10, 
     filterName:"",
     filterData:"",
     created:"",
     used:"",
     sending:""
    };
  }
  
  componentWillMount(){
    this.props.state  && checkdisplay("Coupons")?"":(this.props.history.push('/home/dash'))
    
    this.props.getAllCouponsData({limit:this.state.limit,page:this.state.page})
  }
  couponImage(rowData,column){
    let path2 = `${imagebasepath}${rowData.image}`;
    return  <img
    id="UserAvatarimg"
    src={path2}
    alt="av"
    style={{ height: "30px", width: "30px", borderRadius: "50px" }}
  />
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
    let couponlist = []
    if (this.props.state.data.data) {
      this.props.state.data.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        couponlist = couponlist.concat(obj);
      });
    }
    let SNoFilter = <InputText readOnly />;
    let ImageFilter = <InputText readOnly />;
    let couponCodeFilter=<InputText onChange={(e)=>{
      this.setState({
        filterName:"couponCode",
        filterData:e.target.value
      })
      this.props.getAllCouponsData({
        limit:this.state.limit,
        page:1,
        couponCode: e.target.value
      })
    }}/>
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
          this.props.getAllCouponsData({
            limit:this.state.limit,
            page:1,
            createdAt: dateString
          })
          
        }}
      />
    );
    let usedDateFilter = (
      <DatePicker
        allowClear={false}
        value={this.state.used}
        className="ui-column-filter"
        onChange={(date, dateString) => {
          this.setState({
            filterName: "usedAt",
            filterData: dateString,
            page: 1,
            used: moment(dateString)
          });
          this.props.getAllCouponsData({
            limit:this.state.limit,
            page:1,
            usedDate: dateString
          })
          
        }}
      />
    );
    let sendingDateFilter = (
      <DatePicker
        allowClear={false}
        value={this.state.sending}
        className="ui-column-filter"
        onChange={(date, dateString) => {
          this.setState({
            filterName: "sendingAt",
            filterData: dateString,
            page: 1,
            sending: moment(dateString)
          });
          this.props.getAllCouponsData({
            limit:this.state.limit,
            page:1,
            sendingDate: dateString
          })
          
        }}
      />
    );
    let packageTypeFilter=<InputText onChange={(e)=>{
      this.setState({
        filterName:"packageType",
        filterData:e.target.value
      })
      this.props.getAllCouponsData({
        limit:this.state.limit,
        page:1,
        packageType: e.target.value
      })
    }}/>
    let salesFilter=<InputText onChange={(e)=>{
      this.setState({
        filterName:"sales",
        filterData:e.target.value
      })
      this.props.getAllCouponsData({
        limit:this.state.limit,
        page:1,
        sales: e.target.value
      })
    }}/>
    let promotedFilter=<InputText onChange={(e)=>{
      this.setState({
        filterName:"promoted",
        filterData:e.target.value
      })
      this.props.getAllCouponsData({
        limit:this.state.limit,
        page:1,
        promoted: e.target.value
      })
    }}/>
    let amountFilter=<InputText onChange={(e)=>{
      this.setState({
        filterName:"amount",
        filterData:e.target.value
      })
      this.props.getAllCouponsData({
        limit:this.state.limit,
        page:1,
        amount: e.target.value
      })
    }}/>
    let createdByFilter=<InputText onChange={(e)=>{
      this.setState({
        filterName:"createdBy",
        filterData:e.target.value
      })
      this.props.getAllCouponsData({
        limit:this.state.limit,
        page:1,
        createdBy: e.target.value
      })
    }}/>
    return (
      <div >

        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '45px' }}
        >
          <Menu.Item key="1"><Link exact to="/home/coupons">Coupons</Link></Menu.Item>
          <Menu.Item key="2"><Link exact to="/home/coupons/permissions">Permissions</Link></Menu.Item>
          <Menu.Item key="3"><Link exact to="/home/coupons/packages">Packages</Link></Menu.Item>

        </Menu>
        <div className="depositncredit-table-operations">
          <button id="buttonExportCsv">Export CSV</button>
          <span id="selecNos">
            <select id="NoDropDown"
            onChange={event => {
              this.setState({ limit: event.target.value });
              this.props.getAllCouponsData({
                limit:event.target.value,
                page:this.state.page,
                [this.state.filterName]: this.state.filterData
              })
            
            }}>
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
          value={couponlist}
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
            header="Image"
            body={this.couponImage}
            filterElement={ImageFilter}
            filter={true}
            style={{ width: "80px" }}
            className="BankId"
          />
          <Column
            field="code"
            filter={true}
            filterElement={couponCodeFilter}
            header="Coupon Code"
            style={{ width: "150px", textAlign: "center" }}
            className="Image"
          />
          <Column
            field="createdAt"
            header="Created Date"
            filter={true}
            body={this.createdAt}
             filterElement={createdDateFilter}
            style={{ width: "160px" }}
            className="bankName"
          />
          <Column
            field="sendingDate"
            header="Sending Date"
            filter={true}
            filterElement={sendingDateFilter}
            style={{ width: "160px", textAlign: "center" }}
            className="ShortName"
          />
          <Column
            field="usedDate"
            header="Used Date"
            // body={this.createdAt}
            filterElement={usedDateFilter}
            filter={true}
            style={{ width: "160px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="packageType"
            header="Package Type"
            // body={this.userNameTemplate}
            filter={true}
             filterElement={packageTypeFilter}
            filter={true}
            style={{ width: "120px", textAlign: "left" }}
            className="CreatedBy"
          />
          <Column
            field="sales"
            header="Sales"
            // body={this.createdAt}
             filterElement={salesFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="promoted"
            header="Promoted"
            // body={this.createdAt}
            filterElement={promotedFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="amount"
            header="Amount"
            // body={this.createdAt}
            filterElement={amountFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="createdBy"
            header="Created By"
            body={this.createdByTemplate}
             filterElement={createdByFilter}
            filter={true}
            style={{ width: "170px", textAlign: "center" }}
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
    getAllCouponsData: (data,history) => dispatch({ type: GET_ALL_COUPONS_REQUEST, data,history }),
    // onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CouponContent);