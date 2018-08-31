import React, { Component } from 'react';
import "../../style/reports/reports.css";
import { Breadcrumb,Row,Col,Menu,DatePicker} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Column } from "primereact/components/column/Column";
import { DataTable } from "primereact/components/datatable/DataTable";
import {ColumnGroup} from 'primereact/components/columngroup/ColumnGroup';
import {connect} from "react-redux";
import {GET_TRADE_REPORT_REQUEST,USER_TABLE_CSV} from "../../actions/types"
import moment from "moment";
import {checkdisplay} from "../../utils/Method"
class TradeReports extends Component {
  constructor(){
    super();
    this.state={

    }
  }
  
  componentDidMount() {
    this.props.state  && checkdisplay("Reports")?"":(this.props.history.push('/home/dash'))
    
  this.props.onRequestExportCSV(this.dt,["51"])
  this.props.getTradeReportsData();
    
  }
    render() {
      const {fetching,getDepositReportsData} =this.props;
      let depositReportList = [];
      if (this.props.state.tradeReportsData) {
        this.props.state.tradeReportsData.finalResult.map((data, key) => {
          let obj;
          obj = {
            ...data,
            index: key + 1
          };
          depositReportList = depositReportList.concat(obj);
        });
      }
        let headerGroup = <ColumnGroup>
        <Row>
            <Column header="S.NO" rowSpan={3} />
            <Column header="Date" rowSpan={3} />
            <Column header="Products" rowSpan={2} />
            <Column header="Trade" colSpan={2} />
            <Column header="%" rowSpan={2} />
            <Column header="Service Fee" rowSpan={2} />
        </Row>
        {/* <Row>
            <Column header="Balance Coupon" colSpan={3} />
        </Row> */}
        <Row>
            <Column header="Retail Price" />
            <Column header="Trade Price" />
        </Row>
    </ColumnGroup>;
        return (
            <div>
               <div className="current_status">
               <div id="Auction_product_list-header">Yearly Report For 2018</div>
               <Row style={{display:"flex"}}>
                  <Col lg={{span:"3"}}>Deposit<div>93,865,000 Ks</div></Col>
                  <Col lg={{span:"3"}}>Coupon<div>93,865,000 Ks</div></Col>
                  <Col lg={{span:"3"}}>Auction<div>93,865,000 Ks</div></Col>
                  <Col lg={{span:"3"}}>Retail<div>93,865,000 Ks</div></Col>
                  <Col lg={{span:"3"}}>Trade<div>93,865,000 Ks</div></Col>
                  <Col lg={{span:"3"}}>Delivery<div>93,865,000 Ks</div></Col>
                  <Col lg={{span:"3"}}>Balance<div>93,865,000 Ks</div></Col>
               </Row>
            </div>
            <div className="reports_table_div" style={{marginTop:"20px"}} >
        <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['5']}
        style={{ lineHeight: '45px' }}
        >
        <Menu.Item key="1"><Link to="/home/reports/deposit">Deposit</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/home/reports/coupon">Coupon</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/home/reports/auction">Auction</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/home/reports/retail">Retail</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/home/reports/trade">Trade</Link></Menu.Item>
        <Menu.Item key="6"><Link to="/home/reports/delivery">Delivery</Link></Menu.Item>

        </Menu>
        <div className="review-table-operations">
        <span id="reseText">From</span>
        <DatePicker 
         className="from-date" 
         allowClear={false}
         placeholder="Select Date"
        //  value={this.state.created}
         onChange={
         (date, dateString)=> {
         console.log("date", dateString);
        //  this.setState({filterName:"createdAt",filterData:dateString,page:1,created:moment(dateString)})
        //   this.props.onRequestFilter({page:1,limit:this.state.limit,created:dateString})
         }}/>
          <span id="reseText">To</span>
        <DatePicker 
         className="from-date" 
         allowClear={false}
         placeholder="Select Date"
        //  value={this.state.created}
         onChange={
         (date, dateString)=> {
         console.log("date", dateString);
        //  this.setState({filterName:"createdAt",filterData:dateString,page:1,created:moment(dateString)})
        //   this.props.onRequestFilter({page:1,limit:this.state.limit,created:dateString})
         }}/>
        <span onClick={this.clearAll} id="resetText">Reset Filter</span>
        <span  id="showText">Show</span>
        <span id="selecNos">
        <select id="NoDropDown"
        // value={this.state.limit}
        onChange={event => {
        //   this.setState({ limit: event.target.value });
        //   getPaymentData({
        //     page: 1,
        //     limit: event.target.value,
        //     [this.state.filterName]: this.state.filterData,
        //     type:"payment"
        //   });
        }}
        >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select></span>
     <button id="accept-button"
     onClick={this.handlePaid}>7 Days</button>
     <button id="monthly-button" onClick={this.handlePaid}>Monthly</button>
     <button id="buttonExportCsv" onClick={()=>this.onExport()}>Export CSV</button>
      </div>
      <div className="auctionTableList_container">
      <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          headerColumnGroup={headerGroup}
          loading={fetching}
          ref={el => {
            this.dt = el;
          }}
          value={depositReportList}
          scrollable={true}
        //   onSelectionChange={(e)=>{console.log("hello",e);this.setState({paymentTradeOutList:e.data})}}
        //   selection={this.state.paymentTradeOutList}
        >
         <Column
            field="index"
            header="S.No"
            // filterElement={SNoFilter}
            // style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="date"
            // filterElement={imageFilter}
            // body={this.image}
            // style={{ width: "130px" }}
          />
          <Column
            field="products"
            // filterElement={productFilter}
            header="Product Name"
            // style={{ width: "140px", textAlign: "center" }}
           
          />
          <Column
            field="retailPrice"
            header="Product ID"
            // style={{ width: "100px" }}
            className="bankName"
          />
          <Column
            field="tradePrice"
            header="Sales Date"
            // body={this.salesDate}
            // filterElement={salesDateFilter}
            // style={{ width: "130px", textAlign: "center" }}
          />
          <Column
          field="percentage"
            header="Trading Date"
            // body={this.tradingDate}
            // filterElement={tradingDateFilter}
            // style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            field="sreviceFee"
            header="Quantity"
            // filterElement={quantityFilter}
            // style={{ width: "150px", textAlign: "center" }}
          />
        </DataTable>
        </div>
        {/* <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={this.props.state.reviewPermissionData?this.props.state.reviewPermissionData.totalPage * this.state.limit:""}
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        /> */}
        </div>
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
    getTradeReportsData: data =>
      dispatch({ type: GET_TRADE_REPORT_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(  mapStateToProps,  mapDispatchToProps)(TradeReports);
