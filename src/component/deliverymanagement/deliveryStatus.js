import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import "../../style/depositncredit/bank.css";
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat,api, openNotificationWithIcon ,checkdisplay} from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import { GET_CUSTOMER_SERVICE_DATA_REQUEST } from "../../actions/types";

class deliveryStatus extends Component {
  state={
    page:1,
    limit:10,
    selectedOrders:[]
  }
  componentWillMount(){
    this.props.state  && checkdisplay("Delivery")?"":(this.props.history.push('/home/dash'))
    
    this.props.onRequestCustomerOrders({
      page:this.state.page,
      limit:this.state.limit
    })
  }
  userNameTemplate(rowData, column) {
    let srce, ipAddr;
    // let path2=`${rowData.picture}`
    let path2 = `${imagebasepath}/${rowData.user.picture}`;
    if (rowData.user.ip == "" || rowData.user.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.user.ip;
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
  image(rowData,column){
    let path2 = `${imagebasepath}/${rowData.image[0]}`;
    return <img src={path2} alt="pro" style={{width:"50px",height:"50px"}}/>
  }
  createdAt = (rowData, column) => {
    return (
      <div>
      {DateFormat(rowData.createdAt)}&nbsp;&nbsp;
       {TimeFormat(rowData.createdAt)}
      </div>
    );
  };
render()
{
  
  let CustomerOrders = [];
  if (this.props.state.data.data) {
    this.props.state.data.data.map((data, key) => {
      if(this.props.state.data.data[key].status=="Assign")
      {

      
        
      let obj;
      obj = {
        ...data,
        index: key + 1 + (this.state.page - 1) * this.state.limit
      };
      CustomerOrders = CustomerOrders.concat(obj);
    }
    });
  
  }

  let blankFilter = <InputText readOnly />;
    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/delivery">Customer Orders & Processing</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/delivery/orderAssign">Order Assign & Ongoing</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/delivery/deliveryStatus">
              Delivery Status & Recieving
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/delivery/deliveryService">Delivery Service</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/home/delivery/carrier">Carrier</Link>
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
                             }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
            {/* <button id="btnAdd">Assign</button> */}
        
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          value={CustomerOrders}
          resizableColumns={true}
         loading={this.props.fetching}
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
           filterElement={blankFilter}
            style={{ width: "50px", textAlign: "left" }}
          />
          <Column
            field="carrierName"
            header="Image"
            body={this.image}
            filterElement={blankFilter}
            filter={true}
            style={{ width: "90px" }}
            className="BankId"
          />
        
        <Column
            field="productName"
            header="Product Name"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="productId"
            header="Product ID"
            filterElement={blankFilter}
            filter={true}
            style={{ width: "100px" }}
            className="BankId"
          />
        
        <Column
            field="createdAt"
            header="Order Date"
            body={this.createdAt}
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="orderType"
            header="Order Type"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="quantity"
            header="Quantity"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="retailPrice"
            header="Price"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "100px",textAlign:"center" }}
            className="BankId"
          />
        
        <Column
            field="shippingCharge"
            header="Shipping Charges"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "120px",textAlign:"center" }}
            className="BankId"
          />
          
          <Column
            field="status"
            header="Promotion"
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
            className="CreatedDate"
          />
       <Column
            field="coupon"
            header="Coupon"
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            field="totalPrice"
            header="Total Price"
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            field=""
            header="UserName"
            body={this.userNameTemplate}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "160px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            field="status"
            header="Employee"
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
            className="CreatedDate"
          />
        </DataTable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("customer",state)
  return {

    state: state,
    fetching: state.fetching,
  };
 
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestCustomerOrders:data => dispatch({type:GET_CUSTOMER_SERVICE_DATA_REQUEST,data})
    // onRequestExportCSV: (data, value) =>
    //   dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(deliveryStatus);
