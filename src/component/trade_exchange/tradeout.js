import React, { Component } from 'react'
import { Breadcrumb,Menu,DatePicker,Pagination} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import {imagebasepath} from '../../utils/Constant';
import {DateFormat,TimeFormat,api,checkdisplay} from '../../utils/Method';
import { connect } from "react-redux";
import { GET_TRADE_OUT_CONTENT_REQUEST,USER_TABLE_CSV } from "../../actions/types";
import moment from "moment";
import "../../style/tradeexchange.css"
class TradeOut extends Component {
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
      createdAt:"",
      page: 1,
      limit: 10,
      tradeoutList:[]
    }
  }
  onPageChange = pageNumber => {
    this.props.getTradeOutData({ page: pageNumber, limit: this.state.limit });
  };
  componentWillMount() {
    this.props.state  && checkdisplay("TradeExchange")?"":(this.props.history.push('/home/dash'))
    
    this.props.getTradeOutData({type:'tradeout'});
    this.props.onRequestExportCSV(this.dt,["61"])
  }
  onExport = () => {
    this.dt.exportCSV();
  };
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;{TimeFormat(
          rowData.createdAt
        )}
      </div>
    );
  };
  createdBy = (rowData, column) => {
    let ipAddr;
    let path2 = `${imagebasepath}/${rowData.sellers.picture}`;
    // let path2=rowData.sellers.img;
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
  clearAll=()=>{
    this.props.getTradeOutData({type:"tradeout"});
    this.setState({
      productName:"",
      quantity:"",
      winningPrice:"",
      retailPrice:"",
      tradePrice:"",
      balance:"",
      serviceFee:"",
      sellers:"",
      createdAt:"",
      limit:10
    })
  }
  handleAccept=()=>{
     let ids;
      ids=this.state.tradeoutList.map((v,k)=>{
             return {"_id":v._id}
      })
      console.log("ids",ids);      
      // let _id=this.state.tradeoutList._id;
      // console.log("hello",_id);
    let data = {
        method: "put",
        url: `tradeout/acceptTradeOut`,
        data: {"ids":ids}
      };
      api(data).then(res => {
        console.log("helloin js", res);
        this.props.history.push("/home/tradeexchange/payment");
      }).catch(err =>{
       console.log("error",err)
      })
  } 
  handleBuy=()=>{
    let ids;
     ids=this.state.tradeoutList.map((v,k)=>{
            return {"_id":v._id}
     })
     console.log("ids",ids);      
     // let _id=this.state.tradeoutList._id;
     // console.log("hello",_id);
   let data = {
       method: "put",
       url: `tradeout/buyTradeOut`,
       data: {"ids":ids}
     };
     api(data).then(res => {
       console.log("helloin js", res);
       this.props.history.push("/home/tradeexchange/payment");
     }).catch(err =>{
      console.log("error",err)
     })
 } 
    render() {
        console.log("trade",this.props.state.tradeOutData);
      const {fetching,getTradeOutData} =this.props;
      let tradeoutList = [];
      if (this.props.state.tradeOutData) {
        this.props.state.tradeOutData.tradeoutData.map((data, key) => {
          let obj;
          obj = {
            ...data,
            index: key + 1
          };
          tradeoutList = tradeoutList.concat(obj);
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              productName: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              balance: e.target.value,
              type:"tradeout"
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              quantity: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              winningPrice: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              tradePrice: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              serviceFee: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              sellers: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              retailPrice: e.target.value,
              type:'tradeout'
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
            this.props.getTradeOutData({
              page: 1,
              limit: this.state.limit,
              createdAt: dateString,
              type:"tradeout"
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
        defaultSelectedKeys={['1']}
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
          getTradeOutData({
            page: 1,
            limit: event.target.value,
            [this.state.filterName]: this.state.filterData,
            type:"tradeout"
          });
        }}
        >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select></span>
     <button id="accept-button" 
      disabled={this.state.tradeoutList.length==0}
      style={{
       opacity:this.state.tradeoutList.length==0?"0.5":"1",
       cursor:this.state.tradeoutList.length==0?"not-allowed":"pointer",
       }} onClick={this.handleAccept}>Accept</button>
     <button id="buy-button" 
      disabled={this.state.tradeoutList.length==0}
      style={{
       opacity:this.state.tradeoutList.length==0?"0.5":"1",
       cursor:this.state.tradeoutList.length==0?"not-allowed":"pointer",
       }}
     onClick={this.handleBuy}>Buy</button>
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
          value={tradeoutList}
          scrollable={true}
          onSelectionChange={(e)=>{console.log("hello",e);this.setState({tradeoutList:e.data})}}
          selection={this.state.tradeoutList}
        >
         <Column selectionMode="multiple" style={{width:'30px'}}/>
        
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
            header="Trading Date"
            body={this.createdAt}
            filterElement={tradingDateFilter}
            filter={true}
            style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            field="quantity"
            header="Quantity"
            filter={true}
            filterElement={quantityFilter}
            style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            field="winningPrice"
            header="Winning Price"
            filterElement={winningPriceFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column 
            field="retailPrice"
            header="Retail Price"
            filter={true}
            filterElement={retailPriceFilter}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            field="tradePrice"
            header="Trade Price"
            filterElement={tradePriceFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            field="balance"
            header="Balance"
            filter={true}
            filterElement={balanceFilter}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            field="serviceFee"
            header="Service Fee"
            filter={true}
            filterElement={serviceFeeFilter}
            style={{ width: "100px", textAlign: "center" }}
          />
           <Column
            header="Sellers"
            body={this.createdBy}
            filter={true}
            filterElement={sellersFilter}
            style={{ width: "150px", textAlign: "left" }}
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
      getTradeOutData: data => dispatch({ type: GET_TRADE_OUT_CONTENT_REQUEST, data }),
      onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
    };
  };
  export default connect(  mapStateToProps,  mapDispatchToProps)(TradeOut);
  



  