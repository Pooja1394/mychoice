import React, { Component } from 'react'
import { Breadcrumb,Menu,DatePicker,Pagination} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import {imagebasepath} from '../../utils/Constant';
import {DateFormat,TimeFormat,api,checkdisplay} from '../../utils/Method';
import {Rating} from 'primereact/components/rating/Rating';
import { connect } from "react-redux";
import { GET_PAYMENT_CONTENT_REQUEST,USER_TABLE_CSV } from "../../actions/types";
import moment from "moment";
import "../../style/tradeexchange.css"

class TradeStatus extends Component {
  constructor(){
    super();
    this.state={
      productName:"",
      quantity:"",
      winningPrice:"",
      retailPrice:"",
      tradePrice:"",
      balance:"",
      serviceFee:"",
      sellers:"",
      buyers:"",
      createdAt:"",
      updatedAt:"",
      page: 1,
      limit: 10,
      paymentTradeOutList:[]
     
    }
  }
  onPageChange = pageNumber => {
    this.props.getPaymentData({ page: pageNumber, limit: this.state.limit });
  };
  componentWillMount() {
    this.props.state  && checkdisplay("TradeExchange")?"":(this.props.history.push('/home/dash'))
    
    this.props.getPaymentData({type:"tradestatus"});
    this.props.onRequestExportCSV(this.dt,["63"])
  }
  onExport = () => {
    this.dt.exportCSV();
  };
  salesDate = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.updatedAt)}&nbsp;&nbsp;{TimeFormat(
          rowData.updatedAt
        )}
      </div>
    );
  };
  tradingDate = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;{TimeFormat(
          rowData.createdAt
        )}
      </div>
    );
  };
  buyers = (rowData, column) => {
    let ipAddr;
    let path2 = `${imagebasepath}/${rowData.buyers.picture}`;
    // let path2=rowData.createdBy.img;
    if (rowData.buyers.ip == "" || rowData.buyers.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.buyers.ip;
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
          <div>{rowData.buyers.userName}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  };
  sellers = (rowData, column) => {
    let ipAddr;
    let path2 = `${imagebasepath}/${rowData.sellers.picture}`;
    // let path2=rowData.createdBy.img;
    if (rowData.sellers.ip == "" || rowData.sellers.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.sellers.ip;
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
          <div>{rowData.sellers.userName}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  };
  image(rowData, column) {
    console.log("helloin", rowData);
    // var src = "showcase/resources/demo/images/car/" + rowData.brand + ".png";
    let srce;
    let path2 = `${imagebasepath}${rowData.image[0]}`;
    if (rowData.image == "" || rowData.image == undefined) {
      srce = "hello";
    } else srce = path2;
    return (
      <div>
        <img
          id="UserAvatarimg"
          src={srce}
          alt="av"
          style={{
            height: "40px",
            width: "120px",
            marginRight: "10px",
          }}
        />
        {rowData.userName}
      </div>
    );
  }
  handlePaid=()=>{
    let ids;
     ids=this.state.paymentTradeOutList.map((v,k)=>{
            return {"_id":v._id}
     })
     console.log("ids",ids);      
     // let _id=this.state.tradeoutList._id;
     // console.log("hello",_id);
   let data = {
       method: "put",
       url: `tradeout/paidTradeOut`,
       data: {"ids":ids}
     };
     api(data).then(res => {
       console.log("helloin js", res,"hello",this.props.history);
       this.props.history.push("/home/tradeexchange/tradestatus");
     }).catch(err =>{
      console.log("error",err)
     })
 } 
  clearAll=()=>{
    this.props.getPaymentData({type:"tradestatus"});
    this.setState({
      productName:"",
      quantity:"",
      winningPrice:"",
      retailPrice:"",
      tradePrice:"",
      balance:"",
      serviceFee:"",
      sellers:"",
      buyers:"",
      createdAt:"",
      updatedAt:"",
      limit:10
    })
  }
 
    render() {
      const {fetching,getPaymentData} =this.props;
      let paymentTradeOut = [];
      if (this.props.state.paymentData) {
        this.props.state.paymentData.tradeoutData.map((data, key) => {
          let obj;
          obj = {
            ...data,
            index: key + 1
          };
          paymentTradeOut = paymentTradeOut.concat(obj);
        });
      }
      let productFilter = (
        <InputText
          style={{ width: "100%" }}
          value={this.state.productName}
          className="ui-column-filter"
          onChange={e => {
            this.setState({
              filterName: "productName",
              filterData: e.target.value,
              page: 1,
              productName: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              productName: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let balanceFilter = (
        <InputText
          value={this.state.balance}
          className="ui-column-filter"
          onChange={e => {
            this.setState({
              filterName: "balance",
              filterData: e.target.value,
              page: 1,
              balance: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              balance: e.target.value,
              type:"tradestatus"
            });
          }}
        />
      );
      let quantityFilter = (
        <InputText
          keyfilter="num"
          className="ui-column-filter"
          value={this.state.quantity}
          onChange={e => {
            this.setState({
              filterName: "quantity",
              filterData: e.target.value,
              page: 1,
              quantity: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              quantity: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let winningPriceFilter = (
        <InputText
          keyfilter="num"
          className="ui-column-filter"
          value={this.state.winningPrice}
          onChange={e => {
            this.setState({
              filterName: "winningPrice",
              filterData: e.target.value,
              page: 1,
              winningPrice: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              winningPrice: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let tradePriceFilter = (
        <InputText
          keyfilter="num"
          value={this.state.tradePrice}
          className="ui-column-filter"
          onChange={e => {
            this.setState({
              filterName: "tradePrice",
              filterData: e.target.value,
              page: 1,
              tradePrice: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              tradePrice: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let serviceFeeFilter = (
        <InputText
          keyfilter="num"
          value={this.state.serviceFee}
          className="ui-column-filter"
          onChange={e => {
            this.setState({
              filterName: "serviceFee",
              filterData: e.target.value,
              page: 1,
              serviceFee: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              serviceFee: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let sellersFilter = (
        <InputText
          className="ui-column-filter"
          value={this.state.sellers}
          onChange={e => {
            this.setState({
              filterName: "sellers",
              filterData: e.target.value,
              page: 1,
              sellers: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              sellers: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let buyersFilter = (
        <InputText
          className="ui-column-filter"
          value={this.state.buyers}
          onChange={e => {
            this.setState({
              filterName: "buyers",
              filterData: e.target.value,
              page: 1,
              buyers: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              buyers: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let retailPriceFilter = (
        <InputText
          keyfilter="num"
          value={this.state.retailPrice}
          className="ui-column-filter"
          onChange={e => {
            this.setState({
              filterName: "retailPrice",
              filterData: e.target.value,
              page: 1,
              retailPrice: e.target.value
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              retailPrice: e.target.value,
              type:'tradestatus'
            });
          }}
        />
      );
      let tradingDateFilter = (
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
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              createdAt: dateString,
              type:"tradestatus"
            });
          }}
        />
      );
      let salesDateFilter = (
        <DatePicker
          className="ui-column-filter"
          allowClear={false}
          value={this.state.updatedAt}
          onChange={(date, dateString) => {
            console.log("date", dateString);
            this.setState({
              filterName: "updatedAt",
              filterData: dateString,
              page: 1,
              updatedAt: moment(dateString)
            });
            this.props.getPaymentData({
              page: 1,
              limit: this.state.limit,
              updatedAt: dateString,
              type:"tradestatus"
            });
          }}
        />
      );
      let imageFilter=(
        <InputText readOnly/>
      )
      let SNoFilter=(
        <InputText readOnly/>
      )
      return (
        <div >
        <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['3']}
        style={{ lineHeight: '45px' }}
        >
        <Menu.Item key="1"><Link to="/home/tradeexchange/tradeout">Trade Out</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/home/tradeexchange/payment">Payment</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/home/tradeexchange/tradestatus">Trade Status</Link></Menu.Item>
        </Menu>
        <div className="review-table-operations">
        <span onClick={this.clearAll} id="resetText">Reset Filter</span>
        <span  id="showText">Show</span>
        <span id="selecNos">
        <select id="NoDropDown"
        value={this.state.limit}
        onChange={event => {
          this.setState({ limit: event.target.value });
          getPaymentData({
            page: 1,
            limit: event.target.value,
            [this.state.filterName]: this.state.filterData,
            type:"tradestatus"
          });
        }}
        >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select></span>
     <button id="buttonExportCsv" onClick={()=>this.onExport()}>Export CSV</button>
      </div>
      <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          loading={fetching}
          scrollHeight={"51vh"}
          ref={el => {
            this.dt = el;
          }}
          value={paymentTradeOut}
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
            filterElement={imageFilter}
            body={this.image}
            filter={true}
            style={{ width: "130px" }}
          />
          <Column
            field="productName"
            filter={true}
            filterElement={productFilter}
            header="Product Name"
            style={{ width: "140px", textAlign: "center" }}
           
          />
          <Column
            field="productId"
            header="Product ID"
            filter={true}
            // filterElement={bankNameFilter}
            style={{ width: "100px" }}
            className="bankName"
          />
          <Column
            header="Sales Date"
            body={this.salesDate}
            filterElement={salesDateFilter}
            filter={true}
            style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            header="Trading Date"
            filter={true}
            body={this.tradingDate}
            filterElement={tradingDateFilter}
            style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            field="quantity"
            header="Quantity"
            filterElement={quantityFilter}
            filter={true}
            style={{ width: "150px", textAlign: "center" }}
          />
          <Column
            field="winningPrice"
            header="Winning Price"
            body={this.createdBy}
            filter={true}
            filterElement={winningPriceFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            field="retailPrice"
            header="Retail Price"
            body={this.createdBy}
            filterElement={retailPriceFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            field="tradePrice"
            header="Trade Price"
            filter={true}
            filterElement={tradePriceFilter}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            field="balance"
            header="Balance"
            filterElement={balanceFilter}
            filter={true}
            style={{ width: "100px", textAlign: "center" }}
          />
           <Column
            field="serviceFee"
            header="Service Fee"
            filterElement={serviceFeeFilter}
            filter={true}
            style={{ width: "100px", textAlign: "center" }}
          /> 
          <Column
          header="Sellers"
          body={this.sellers}
          filter={true}
          filterElement={sellersFilter}
          style={{ width: "200px", textAlign: "left" }}
        />
         <Column
          header="Buyers"
          body={this.buyers}
          filter={true}
          filterElement={buyersFilter}
          style={{ width: "200px", textAlign: "left" }}
        />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={this.props.state.reviewPermissionData?this.props.state.reviewPermissionData.totalPage * this.state.limit:""}
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
        </div>
      )
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
      getPaymentData: data => dispatch({ type: GET_PAYMENT_CONTENT_REQUEST, data }),
      onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
    };
  };
  export default connect(  mapStateToProps,  mapDispatchToProps)(TradeStatus);
  



  