import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../style/AuctionContent.css";
import { connect } from "react-redux"
import { api, DateFormat,TimeFormat, checkUpdatePrivileges} from '../utils/Method';
import { imagebasepath } from '../utils/Constant';
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { SplitButton } from 'primereact/components/splitbutton/SplitButton';
import { InputText } from 'primereact/components/inputtext/InputText';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { AUCTION_PRODUCT_LIST_REQUEST, AUCTION_LIST_FILTER_REQUEST, USER_TABLE_CSV } from '../actions/types';
import { Column } from 'primereact/components/column/Column';

class AuctionContent extends Component {
  constructor() {
    super();
    this.state = {
      createdBy: "",
      AuctionArrayList: '',
      selectedItem: '',
      tableData: [],
      statusFilter: '',
      loader: false,
      flag: false,
      limit: 10,
      page: 1,
      filterData: '',
      filterName: '',
      controlBy: "All"
    }
  }

  toggleAction = () => {
    this.setState({
      flag: !this.state.flag,
    })
  }

  componentDidMount() {
    this.props.onAuctionProductList("data");
    this.props.onRequestExportCSV(this.dt, ["3"])
    this.setState({ loader: false })
  }

  status = (rowData, column) => {
    if (rowData.status) {
      return <span style={{ color: "#398862" }}>{"Completed"}</span>;
    }
    else {
      return <span style={{ color: "#dd4b39" }}>{"Running"}</span>;
    }
  }
  Action = (rowData, column) => {
    let token = localStorage.getItem("token");
    let items = [
      {
        label: 'Duplicate', icon: 'fa fa-files-o', command: () => {
          let data = {
            method: "post",
            url: "auction/duplicateProduct",
            data: { auctionId: rowData._id, startDate: rowData.startDate, endDate: rowData.endDate },
          }
          api(data).then((res) => {
            this.props.onAuctionProductList("data");
            // this.growl.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });

            console.log("====>", res)
          })
          console.log("hello", { _id: rowData._id })
        }
      },

      {
        label: 'Delete', icon: 'fa-trash', command: () => {
          let data = {
            method: "delete",
            url: "auction/removeAuction",
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            data: { auctionId: rowData._id },
          }
          api(data).then((res) => {
            this.props.onAuctionProductList("data");
            // this.growl.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
          })
        }
      },

    ]
    let srce = require("../images/tick.png")
    let srce2 = require("../images/cross.png")
    if (rowData.status) {
      return <div style={{ display: "flex" }}>
        <div style={{ background: "#d2d6de", width: "30px", padding: "3px", height: "30px", borderRadius: "2px",marginRight:"10px" }}><img id="UserAvatarimg" src={srce} alt="av" style={{ paddingLeft: "2px" }} /></div>
        <SplitButton 
        // disabled={!rowData.latest.status}
     style={{
       display:this.props.state  && checkUpdatePrivileges('Auctions')?'flex':'none'}}                                                                                                                      
      icon="fa-pencil" onClick={() => {
          this.props.history.push(`/home/auction/createauction/producttocreateauction?id=${rowData._id}` )
        }} model={items}></SplitButton>
      </div>
    }
    else {
      return <div style={{ display: "flex" }}>
        <div style={{ background: "#d2d6de", width: "30px", padding: "3px", height: "30px", borderRadius: "2px",marginRight:"10px" }}>
          <img id="UserAvatarimg" src={srce2} alt="av" style={{ paddingLeft: "4px" }} /></div>
        <SplitButton
        // disabled={!rowData.latest.status}
     style={{display:this.props.state  && checkUpdatePrivileges('Auctions')?'flex':'none'}}                                                                                                                           
        icon="fa-pencil"
          onClick={() => {
            this.props.history.push( `/home/auction/createauction/producttocreateauction?id=${rowData._id}`)
          }} model={items}></SplitButton>
      </div>
    }
  }
  contolBy = () => {
    let srce1 = require("../icons/free_auction.png");
    let srce2 = require("../icons/one_per_user.png");
    let srce3 = require("../icons/5_no_jumper_limit.png");
    let srce4 = require("../icons/experience_auction.png");
    return <div>
      <img src={srce1} style={{ height: 30, width: 30 }} />
      <img src={srce2} style={{ height: 30, width: 30 }} />
      <img src={srce3} style={{ height: 30, width: 30 }} />
      <img src={srce4} style={{ height: 30, width: 30 }} />
    </div>
  }


  start_Date = (rowData, column) => {
    return <div><div>{DateFormat(rowData.startDate)}</div>
      {TimeFormat(rowData.startDate)}
    </div>
  }

  end_date = (rowData, column) => {
    return <div><div>{DateFormat(rowData.endDate)}</div>
      {TimeFormat(rowData.endDate)}
    </div>
  }
  createdAt = (rowData, column) => {
    return <div><div>{DateFormat(rowData.createdAt)}</div>
      {TimeFormat(rowData.createdAt)}
    </div>
  }
  createdBy = (rowData, column) => {
    console.log("hello", rowData);
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.createdBy.picture}`;
    // let path2=rowData.createdBy.picture;
    if (rowData.createdBy.picture == "" || rowData.createdBy.picture == undefined) {
      srce = "User";
    } else srce = path2;
    if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.createdBy.ip;
    return (
      <div style={{ display: "flex" }}>
        <div id="UserImageDiv">
          <img
            id="UserAvatarimg"
            src={srce}
            alt="av"
            style={{ height: "30px", width: "30px", borderRadius: "50px" }}
          />
        </div>
        <div>
          <div>{rowData.createdBy.userName}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  };
  productName = (rowData, column) => {
    return <div>{rowData.products.productName}</div>
  }
  image(rowData, column) {
    console.log("helloin", rowData);
    let srce;
    let path2 = `${imagebasepath}${rowData.products.image[0]}`;
    if (rowData.products.image == "" || rowData.products.image == undefined) {
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
            borderRadius: "10px"
          }}
        />
        {rowData.userName}
      </div>
    );
  }
  render() {
    const { fetching, data, onAuctionProductList, onAuctionFilter, error } = this.props;
    console.log("arr----------->", this.props.state)
    let auctionList = [];
    if (this.props.state.auctionProductList) {
      this.props.state.auctionProductList.auctionData.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1
        };
        auctionList = auctionList.concat(obj);
      });
    }

    // //console.log("selectedItem----------->",AuctionListData)    
    // let arr=[];
    //     arr=AuctionListData;
    //   let auctionProductData=[]; 
    //    arr && arr.map((value,key)=>{ 
    //       // if(value.products.length>0){
    //         console.log("productname--------------",value.products?value.products.productName:value.products)
    //         // value.products.map((v,k)=>{
    //           let dataProduct={
    //               index:key+1,
    //               _id:value._id,
    //               productName:value.products.productName?value.products.productName:'--',
    //               retailPrice:value.retailPrice?value.retailPrice:'--',
    //               CurrentBid:"--",
    //               startDate:value.startDate?value.startDate:'--',
    //               endDate:value.endDate?value.endDate:'--',
    //               CreatedBy:'--',
    //               status:value.status?'Completed':'Running',
    //             }         
    //             auctionProductData.push(dataProduct)
    // })
    // }
    // else
    // {
    //   let dataProduct={
    //   index:key+1,
    //   _id:value._id,  
    //   ProductName:value.products.productName,
    //   retailPrice:value.retailPrice,
    //   CurrentBid:"--",
    //   startDate:value.startDate,
    //   endDate:value.endDate,
    //   CreatedBy:'--',
    //   ControlBy:'--',
    //   status:value.status?'Completed':'Running'
    //   }
    //   auctionProductData.push(dataProduct)
    // }
    // })
    // let tableData=[]
    // if(AuctionListData){
    //   AuctionListData.map((data,key)=>{
    //     let obj;

    //     if(data.status){obj={
    //       ...data,status:'Completed'
    //     }
    //   }else{
    //     obj={
    //       ...data,status:'Running'
    //     }
    //   }
    //   obj={
    //     ...obj,index:((key+1))
    //     }
    //   tableData=tableData.concat(obj)
    //   })
    // }


    let productname_Filter = <InputText className="ui-column-filter" style={{ width: '100%' }}
      onChange={(e) => {
        this.setState({ filterData: e.target.value, page: 1 })
        this.props.onAuctionFilter({ page: 1, limit: this.state.limit, productName: e.target.value })
      }}
    />

    let retailFilter = <InputText className="ui-column-filter" style={{ width: '100%' }}
      onChange={(e) => {
        this.setState({ filterData: e.target.value, page: 1 })
        this.props.onAuctionFilter({ page: 1, limit: this.state.limit, retailPrice: e.target.value })
      }}
    />

    let controlFilter = <select option="field"
      style={{ width: '100%' }} className="ui-column-filter"
      value={this.state.controlBy}
      onChange={(event) => {
        console.log("select---------", event.target.value),
        this.setState({ controlBy: event.target.value, page: 1 })
        this.props.onAuctionFilter({ page: 1, limit: this.state.limit, controlBy: event.target.value })
      }}
    >
      <option value="All">All</option>
      <option value="Half Price">Half Price</option>
      <option value="Free">Free</option>
      <option value="OPU">OPU</option>
      <option value="JumperLimit">No Jumper Limit</option>
      <option value="Beginner">Beginner</option>
      <option value="Penny">Penny</option>
    </select>

    let status = <select option="field"
      style={{ width: '100%' }} className="ui-column-filter"
      value={this.state.filterData}
      onChange={(event) => {
        console.log("select---------", event.target.value), this.setState({ filterData: event.target.value, page: 1 })
        this.props.onAuctionFilter({ page: 1, limit: this.state.limit, status: event.target.value })
      }}
    >
      <option value="">All</option>
      <option value="true">Completed</option>
      <option value="false">Running</option>
    </select>

    const dateFormat = 'YYYY-MM-DD';
    let startDateFilter =
      <DatePicker format={dateFormat} className="ui-column-filter" onChange={
        (date, dateString) => {
          console.log("date", dateString);
          this.setState({ filterData: dateString, page: 1 })
          this.props.onAuctionFilter({ page: 1, limit: this.state.limit, startDate: dateString })
        }
      } />

    let endDate =
      <DatePicker format={dateFormat} className="ui-column-filter" onChange={
        (date, dateString) => {
          console.log("date", dateString);
          this.setState({ filterName: "endDate", filterData: dateString, page: 1 })
          this.props.onAuctionFilter({ page: 1, limit: this.state.limit, endDate: dateString })
        }
      } />
    return (
      <div className="main_auction_div">
        {/* <Growl ref={(el) => { this.growl = el; }}></Growl> */}
        <div className="auction_header">
          <div id="header_content">all auction products</div>
          <div id="filter_content">
            <ul>
              <li>Reset Filter</li>
              <li>Show</li>
              <li>
                <select onChange={(event) => {
                  console.log("select-show---------", event.target.value),
                    this.setState({ limit: event.target.value })
                }}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </li>
            </ul>
          </div>
        </div>{/*--------end of auction_header----------- */}

        <div className="auction_main_table_container">
          <DataTable
            resizableColumns={true}
             columnResizeMode="expand"
            scrollHeight={"200px"} 
            scrollable={true} 
            value={auctionList}
            style={{ marginTop: '30px', width: '100%' }}
            selection={this.state.selectedItem}
             onSelectionChange={(e) => { this.setState({ selectedItem: e.data }), this.props.deleteAuctionProductList(e.data) }}
            loading={fetching} 
            loadingIcon="fas fa-spinner"
            onRowDoubleClick={(e) => { this.props.history.push(`/home/auction/auctionproduct`) }}
          //  onRowClick={(e)=>{this.onTableRow_handle(e.data)}}
          >
            <Column selectionMode="multiple" style={{ width: '2em' }} />
            <Column field="index" header="S.NO" filter={true} style={{ width: "45px", textAlign: 'left' }} />
            <Column header="Image" body={this.image} filter={true} style={{ width: "135px", textAlign: 'center' }} />
            <Column field="_id" header="Auction ID" filter={true} style={{ width: "80px", textAlign: 'center' }} />
            <Column header="Product Name" body={this.productName} filterElement={productname_Filter} filter={true} style={{ width: "200px", textAlign: 'left' }} />
            <Column header="Created Date" body={this.createdAt} filterElement={startDateFilter} filter={true} style={{ width: "100px", textAlign: 'center' }} />
            <Column field="retailPrice" header="Retail Price" filterElement={retailFilter} filter={true} style={{ width: "100px", textAlign: 'right' }} />
            <Column field="currentBid" header="Current Bid" filter={true} style={{ width: "130px", textAlign: 'right' }} />
            <Column header="Start Time" filterElement={startDateFilter} body={this.start_Date} filter={true} style={{ width: "130px", textAlign: 'center' }} />
            <Column field="endDate" header="End Time" filterElement={endDate} body={this.end_date} filter={true} style={{ width: "130px", textAlign: 'center' }} />
            <Column field="CreatedBy" header="Created By" body={this.createdBy} filter={true} style={{ width: "150px", textAlign: 'left' }} />
            <Column field="ControlBy" header="Control By" body={this.contolBy} filterElement={controlFilter} filter={true} style={{ width: "150px", textAlign: 'center' }} />
            <Column field="status" header="Status" body={this.status} filterElement={status} filter={true} style={{ width: "100px", textAlign: 'center' }} />
            <Column header="Action" body={this.Action} filter={true} style={{ width: "150px",overflowX:'visible'}} />

          </DataTable>
          <Pagination
            defaultCurrent={1}
            current={this.state.page}
            pageSize={this.state.limit}
            total={this.props.state.auctionProductList ? (this.props.state.auctionProductList.totalPage) * (this.state.limit) : "1"}
            onChange={(current) => {
              this.onPageChange(current),
                this.setState({ page: current })

            }}
          />

        </div>          {/*--------end of main_table_container----------- */}


      </div>/*=================end of main_auction_div========================*/

    )
  }
}



const mapStateToProps = (state) => {

  return {
    state: state,
    fetching: state.fetching,
    // AuctionArrayList:state.auctionProductList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuctionProductList: (data) => dispatch({ type: AUCTION_PRODUCT_LIST_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    onAuctionFilter: (data) => dispatch({ type: AUCTION_LIST_FILTER_REQUEST, data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionContent)

