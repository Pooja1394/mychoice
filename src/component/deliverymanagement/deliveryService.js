import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import "../../style/depositncredit/bank.css";
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat,api, openNotificationWithIcon,checkdisplay } from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import { GET_DELIVERY_SERVICE_DATA_REQUEST } from "../../actions/types";

class DeliveryService extends Component {
  state={
    limit:10,
    page:1
  }
  componentWillMount(){
    this.props.state  && checkdisplay("Delivery")?"":(this.props.history.push('/home/dash'))
    
    this.props.onRequestDeliveryServiceData({
      page:this.state.page,
      limit:this.state.limit
    })
  }
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"employee/removeEmployee",
          data:{EmployeeId:rowData._id},
        }
        // api(data).then((res)=>{
        //   this.props.getEmployeeData();
        //   openNotificationWithIcon(
        //     'success','Delete',"Employee Deleted Successfully"
        //   )
        //       })
      }},
     ]
    let srce=require("../../images/tick.png")
    let srce2=require("../../images/cross.png")
    if (rowData.status){
     return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",height:"30px",borderRadius:"2px",marginRight:"10px"}}><img id="UserAvatarimg" src={srce} alt="av" style={{paddingLeft:"2px"}}/></div>
     <SplitButton icon="fa-pencil" onClick={()=>{
       this.props.history.push({pathname:`/home/delivery/deliveryService/addDeliveryService`,state:rowData})
       
     }} model={items}></SplitButton>
     </div>
      }
     else {
    return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",height:"30px",borderRadius:"2px",marginRight:"10px"}}>
    <img id="UserAvatarimg" src={srce2} alt="av" style={{paddingLeft:"4px"}}/></div>
     <SplitButton icon="fa-pencil"
      onClick={()=>{
        this.props.history.push({pathname:`home/delivery/deliveryService/addDeliveryService`,state:rowData})
        
     }} model={items}></SplitButton>
     </div>
   }
}
render()
{
  let deliveryService = [];
  if (this.props.state.data.data) {
    this.props.state.data.data.map((data, key) => {
      let obj;
      obj = {
        ...data,
        index: key + 1 + (this.state.page - 1) * this.state.limit
      };
      deliveryService = deliveryService.concat(obj);
    });
  }

    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["4"]}
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
          <Link to="/home/delivery/deliveryService/addDeliveryService">
            <button id="btnAdd" style={{width:"150px"}}>Add Delivery Service</button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          value={deliveryService}
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
            // filterElement={SNoFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="carrierName"
            header="Carrier Name"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="_state"
            header="Division/State"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="townShip"
            header="Township"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="shippingDate"
            header="Shipping Date"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="deliveryFee"
            header="Delivery Fee"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="offAddress"
            header="Office Address"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="division"
            header="Division/State"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
        
        <Column
            field="township"
            header="Township"
            // filterElement={bankIdFilter}
            filter={true}
            style={{ width: "140px" }}
            className="BankId"
          />
          
          <Column
            field="status"
            header="Status"
            body={this.status}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
            className="CreatedDate"
          />
      
        </DataTable>
       
        {/* <Pagination
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
        /> */}
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
    onRequestDeliveryServiceData:data =>
    dispatch({type:GET_DELIVERY_SERVICE_DATA_REQUEST,data})
    // onRequestFilter: data =>
    //   dispatch({ type: BANK_DETAILS_FILTER_REQUEST, data }),
    // onRequestExportCSV: (data, value) =>
    //   dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryService);
