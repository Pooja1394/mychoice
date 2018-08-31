// import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import {connect} from "react-redux";
// import { Breadcrumb } from 'antd';
// import { Pagination } from 'antd';
// import { DatePicker } from 'antd';
// import {DateFormat} from '../../utils/Method';
// import "../../style/auction/CreateAuctionList.css";
// import {basepath} from "../../utils/Constant";
// import {InputText} from 'primereact/components/inputtext/InputText';
// import {DataTable} from 'primereact/components/datatable/DataTable';
// import {Column} from 'primereact/components/column/Column';
// import { PRODUCT_LIST_REQUEST } from '../../actions/types';

// class CreateAuctionListContent extends Component {
//     constructor()
//     {
//       super();
//       this.state={
//         createdBy:'',
//         selectedItem:'',
//         selectRow_count:'10',
//         limit:10,
//         page:1,
//         filterData:'',
        
        
//     }
//   }

    
//     // componentDidMount()
//     // {
//     //   this.props.onProductList("data")
//     //   this.setState({loader:false})
//     // }

//     // image=(rowData,key)=>{
//     //   return <img src={rowData.image}/>
//     //  }



//      image=(rowData,column)=>{
//       let srce;
//         let path2=`${basepath}/${rowData.image}`
//         return <div>
//           <img id="UserAvatarimg" src={path2} alt="av" style={{height:"30px",width:"100px",marginRight:"10px",borderRadius:"10px"}}/>
//           </div>
//       } 
     

//      TimeFormat=(date)=>{
//       let res = date.split("T");
//       let time= res[1].split("Z");
//       return time[0];
//       }

//   created=(rowData,column)=>{
//     return <div><div>{DateFormat(rowData.createdAt)}</div>
//       {this.TimeFormat(rowData.createdAt)}
//       </div>
//   }
//     render() {
//       const { fetching, data, onProductList, onRequestFilter, error } = this.props;
//       let product= this.props.state.productList?this.props.state.productList.data:this.props.state.productList; 

     
// //start filterElements-----------------------------------------------------*/
    

//   let product_nameFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
//       onChange={(e)=>{
//       this.setState({filterData:e.target.value,page:1})
//       this.props.onRequestFilter({page:1,limit:this.state.limit,productName:e.target.value})}}
//     />                     
    
//     let product_ID_Filter=<InputText className="ui-column-filter" style={{width: '100%'}}
//       onChange={(e)=>{
//       this.setState({filterData:e.target.value,page:1})
//       this.props.onRequestFilter({page:1,limit:this.state.limit,productID:e.target.value})}}
//     />                     
    
//     const dateFormat = 'YYYY-MM-DD';        
//       let createDate=
//       <DatePicker format={dateFormat} className="ui-column-filter" onChange={
//       (date, dateString)=> {
      
//         this.setState({filterData:dateString,page:1})
//         this.props.onRequestFilter({page:1,limit:this.state.limit,created:dateString})
//       }
//       }/>

//       let quantity=<InputText className="ui-column-filter" style={{width: '100%'}}
//       onChange={(e)=>{
//       this.setState({filterData:e.target.value,page:1})
//       this.props.onRequestFilter({page:1,limit:this.state.limit,quantity:e.target.value})}}
//     />

//     let retail_Price=<InputText className="ui-column-filter" style={{width: '100%'}}
//       onChange={(e)=>{
//       this.setState({filterData:e.target.value,page:1})
//       this.props.onRequestFilter({page:1,limit:this.state.limit,retailPrice:e.target.value})}}
//     />

//     let category=<InputText className="ui-column-filter" style={{width: '100%'}}
//       onChange={(e)=>{
//       this.setState({filterData:e.target.value,page:1})
//       this.props.onRequestFilter({page:1,limit:this.state.limit,catagoryName:e.target.value})}}
//     />

//     let brand_name=<InputText className="ui-column-filter" style={{width: '100%'}}
//     onChange={(e)=>{
//     this.setState({filterData:e.target.value,page:1})
//     this.props.onRequestFilter({page:1,limit:this.state.limit,brandName:e.target.value})}}
//     />   
    
//     let supplierFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
//     onChange={(e)=>{
//     this.setState({filterData:e.target.value,page:1})
//     this.props.onRequestFilter({page:1,limit:this.state.limit,supplierName:e.target.value})}}
//     />   

//     let created_By=<InputText className="ui-column-filter" style={{width: '100%'}}
//     onChange={(e)=>{
//     this.setState({filterData:e.target.value,page:1})
//     this.props.onRequestFilter({page:1,limit:this.state.limit,createdBy:e.target.value})}}
//     />   
//       return (
//         <div className="main_auction_div">
//           <div className="product_list_header">
//                 <div id="header_content">products list to create an action</div>
//                 <div id="filter_content">
//                    <ul>
//                      <li>Reset Filter</li>
//                      <li>Show</li>
//                      <li>
//                        <select onChange={(event)=>{this.setState({selectRow_count:event.target.value})}}>
//                          <option>10</option>
//                          <option>20</option>
//                          <option>30</option>
//                        </select>
//                      </li> 
//                    </ul>
//                 </div>
//            </div>{/*--------end of auction_header----------- */}

//            <div className="main_product_table_container">
          
//            <DataTable 
//                scrollHeight={"200px"} scrollable={true} value={product}
//                style={{marginTop:'30px', width: '100%'}}
//                selection={this.state.selectedItem} onSelectionChange={(e)=>{this.setState({selectedItem:e.data}),this.props.multipleSelectProductList(e.data)}}
//                loading={fetching} loadingIcon="fas fa-spinner"
//                >
//               <Column selectionMode="multiple" style={{width:'2em'}}/>
//               <Column field="index" header="S.NO"  filter={true} style={{width:"45px",textAlign:'center'}} />
//               <Column field="image" header="Image"  style={{width:"180px",textAlign:'center'}}/>
//               <Column field="productNameEn" header="Product Name" filterElement={product_nameFilter} filter={true} style={{width:"200px",textAlign:'left'}}/>
//               <Column field="_id" header="Product ID" filterElement={product_ID_Filter} filter={true} style={{width:"210px",textAlign:'center'}}/>
//               <Column field="createdAt" header="Created Date" filterElement={createDate} body={this.created} filter={true} style={{width:"150px",textAlign:'center'}}/>
//               <Column field="quantity" header="Quantity" filterElement={quantity} filter={true} style={{width:"130px",textAlign:'center'}}/>
//               <Column field="retailPrice" header="Retail Price" filterElement={retail_Price} filter={true} style={{width:"150px",textAlign:'right'}}/>
//               <Column field="category" header="Category" filterElement={category} filter={true} style={{width:"180px",textAlign:'left'}}/>
//               <Column field="brandName" header="Brand Name" filterElement={brand_name} filter={true} style={{width:"100px",textAlign:'left'}}/>
//               <Column field="supplierName" header="Supplier Name" filterElement={supplierFilter} filter={true} style={{width:"150px",textAlign:'left'}}/>
//               <Column field="" header="Created By" filterElement={created_By} filter={true} style={{width:"100px",textAlign:'center'}}/>
                        
//             </DataTable>  

//             <Pagination  
//               defaultCurrent={0}
//               pageSize={this.state.limit} 
              
//               total={(this.props.state.productList && this.props.state.productList.data.length==0?1:this.props.state.productList && this.props.state.productList.totalPages)*(this.state.limit)}
//               onChange={(current)=>{
//               this.onPageChange(current),
//               this.setState({page:current})
            
//             }}
//              />
            
//            </div>          {/*--------end of main_product_table_container----------- */}


//         </div>/*=================end of main_auction_div========================*/
//       )
//     }
//   }
  


//   const mapStateToProps=(state)=>{
   
//     return{
//       state:state,
//       fetching:state.fetching,
//       productList:state.productList
//     }
//   }
  
//   const mapDispatchToProps=(dispatch)=>{
//     return{
//       onProductList: data => dispatch({ type: GET_PRODUCTS_CALL_REQUEST, data }),
//       // onRequestFilter: (data) => dispatch({ type: PRODUCT_LIST_REQUEST ,data }),
//     }
//   }
  
//   export default connect(mapStateToProps,mapDispatchToProps)(CreateAuctionListContent)
/*This file contains the code for Product Information in admin panel 
Created By-RIYASAT ALI
Created On-16/04/18
*/

import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Table, Breadcrumb, Menu } from "antd";
// import "../../style/Content.css"
import Header from "../Header";
// import "../../style/ProductContent.css";
import "../../style/auction/CreateAuctionList.css";
import { connect } from "react-redux";
import {
  User_Filter_Call_Request,
  User_DATA_Call_Request,
  USER_TABLE_CSV,
  GET_PRODUCTS_CALL_REQUEST,
  HANDLE_CATEGORY_AUTOFILL_REQUEST
} from "../../actions/types";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { Calendar } from "primereact/components/calendar/Calendar";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { InputText } from "primereact/components/inputtext/InputText";
import { Pagination, DatePicker } from "antd";
import moment from "moment";
import { DateFormat, api } from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import { Growl } from "primereact/components/growl/Growl";
import { SplitButton } from "primereact/components/splitbutton/SplitButton";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import "font-awesome/css/font-awesome.css";
class CreateAuctionListContent extends Component {
  state = {
    arr: [],
    searchText: "",
    searchusernametext: "",
    productName: "",
    productId: "",
    createdAt: "",
    quantity: "",
    retailPrice: "",
    category: "",
    brandName: "",
    supplierName: "",
    createdBy: "",
    status: "",
    loader: false,
    page: 1,
    limit: 10,
    count: 1,
    filterName: "",
    filterData: ""
  };
  componentDidMount() {
    this.props.onRequestExportCSV(this.dt,['3']);
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  onPageChange = pageNumber => {
    this.props.onRequestData({ page: pageNumber, limit: this.state.limit });
  };

  TimeFormat = date => {
    let res = date.split("T");
    let time = res[1].split(".");
    console.log(time);
    let datee = new Date(date);
    console.log("===>hello", datee.toLocaleTimeString());
    return datee.toLocaleTimeString();
  };
  brandTemplate(rowData, column) {
    // console.log("helloin",rowData)
    // var src = "showcase/resources/demo/images/car/" + rowData.brand + ".png";
    let srce;
    if (rowData.level == "Beginner") {
      srce = require("../../images/layer-539.png");
    } else {
      srce = require("../../images/layer-538-copy.png");
    }
    return <img src={srce} />;
  }
  status = (rowData, column) => {
    let items = [
      {
        label: "Delete",
        icon: "fa-trash",
        command: () => {
          let data = {
            method: "delete",
            url: "products/deleteproduct",
            data: { _id: rowData._id }
          };
          api(data).then(res => {
            this.props.onRequestData({
              page: this.state.page,
              limit: this.state.limit
            });
            this.growl.show({
              severity: "success",
              summary: "Delete",
              detail: "Data Deleted"
            });

            console.log("====>", res);
          });
          console.log("hello", rowData);
        }
      }
    ];
    let srce = require("../../images/tick.png");
    let srce2 = require("../../images/cross.png");
    if (rowData.status) {
      return (
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#d2d6de",
              width: "30px",
              padding: "3px",
              height: "30px",
              borderRadius: "2px",
              marginRight: "10px"
            }}
          >
            <img
              id="UserAvatarimg"
              src={srce}
              alt="av"
              style={{ paddingLeft: "2px" }}
            />
          </div>
          <SplitButton
            icon="fa-pencil"
            onClick={() => {
              console.log("==>", this.props.history);
              this.props.history.push(
                `/home/product/createproduct?id=${rowData._id}`
              );
              this.props.onCategoryChangeHandler({});
            }}
            model={items}
          />
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#d2d6de",
              width: "30px",
              padding: "3px",
              height: "30px",
              borderRadius: "2px",
              marginRight: "10px"
            }}
          >
            <img
              id="UserAvatarimg"
              src={srce2}
              alt="av"
              style={{ paddingLeft: "4px" }}
            />
          </div>
          <SplitButton
            icon="fa-pencil"
            onClick={() => {
              this.props.history.push(
                `/home/product/createproduct?id=${rowData._id}`
              );
              this.props.onCategoryChangeHandler({});
            }}
            model={items}
          />
        </div>
      );
    }
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
            borderRadius: "10px"
          }}
        />
        {rowData.userName}
      </div>
    );
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;{this.TimeFormat(
          rowData.createdAt
        )}
      </div>
    );
  };
  category = (rowData, column) => {
    console.log("==>hello1", rowData.supplierName);
    return <div>{rowData.category.join()}</div>;
  };
  supplier = (rowData, column) => {
    // console.log("==>hello1",rowData.supplierName[0].name)
    return <div>{rowData.supplierName.name}</div>;
  };
  brand = (rowData, column) => {
    return <div>{rowData.brand?rowData.brand.name:"hello"}</div>;
  };
  retailPrice = (rowData, Column) => {
    return (
      <div>
        {parseInt(rowData.retailPrice).toLocaleString("en-IN") + " " + "Ks"}
      </div>
    );
  };
  createdBy = (rowData, column) => {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.createdBy.img}`;
    // let path2=rowData.createdBy.img;
    if (rowData.createdBy.img == "" || rowData.createdBy.img == undefined) {
      srce = "User";
    } else srce = path2;
    if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.createdBy.ip;
    return (
      <div style={{ display: "flex" }}>
        <div id="UserImageDiv">
          {" "}
          <img
            id="UserAvatarimg"
            src={srce}
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
  };
  render() {
    console.log("data", this.props.state.productsList);
    let userList = [];
    if (this.props.state.productsList) {
      this.props.state.productsList.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1
        };
        userList = userList.concat(obj);
      });
    }
    let imageFilter = <InputText readOnly />;
    let statusFilter = (
      <select
        option="field"
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.status}
        onChange={event => {
          this.setState({
            filterName: "status",
            filterData: event.target.value,
            page: 1,
            status: event.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            status: event.target.value
          });
        }}
      >
        <option value="">All</option>
        <option value="true">Open</option>
        <option value="false">Lock</option>
      </select>
    );
    let idFilter = (
      <InputText
        style={{ width: "100%" }}
        value={this.state.productId}
        className="ui-column-filter"
        onChange={e => {
          this.setState({
            filterName: "productID",
            filterData: e.target.value,
            page: 1,
            productId: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            productID: parseInt(e.target.value)
          });
        }}
      />
    );
    let userFilter = (
      <InputText
        style={{ width: "100%" }}
        onChange={e => {
          this.props.onRequestFilter({ userName: e.target.value });
        }}
      />
    );
    let retailFilter = (
      <InputText
        style={{ width: "100%" }}
        value={this.state.retailPrice}
        className="ui-column-filter"
        onChange={e => {
          this.setState({
            filterName: "retailPrice",
            filterData: e.target.value,
            page: 1,
            retailPrice: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            retailPrice: e.target.value
          });
        }}
      />
    );

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
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            productName: e.target.value
          });
        }}
      />
    );
    let quantityFilter = (
      <InputText
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.quantity}
        onChange={e => {
          this.setState({
            filterName: "quantity",
            filterData: e.target.value,
            page: 1,
            quantity: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            quantity: e.target.value
          });
        }}
      />
    );
    let supplierFilter = (
      <InputText
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.supplierName}
        onChange={e => {
          this.setState({
            filterName: "supplierName",
            filterData: e.target.value,
            supplierName: e.target.value,
            page: 1
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            supplierName: e.target.value
          });
        }}
      />
    );
    let brandFilter = (
      <InputText
        style={{ width: "100%" }}
        value={this.state.brandName}
        className="ui-column-filter"
        onChange={e => {
          this.setState({
            filterName: "brand",
            filterData: e.target.value,
            page: 1,
            brandName: e.target.value
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            brandName: e.target.value
          });
        }}
      />
    );
    let categoryFilter = (
      <InputText
        style={{ width: "100%" }}
        value={this.state.category}
        className="ui-column-filter"
        onChange={e => {
          this.setState({
            filterName: "categoryName",
            filterData: e.target.value,
            category: e.target.value,
            page: 1
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            catagoryName: e.target.value
          });
        }}
      />
    );
    let createdByFilter = (
      <InputText
        style={{ width: "100%" }}
        className="ui-column-filter"
        value={this.state.createdBy}
        onChange={e => {
          // this.props.onRequestFilter({createdBy:e.target.value})}}
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
    let createdAtFilter = (
      <DatePicker
        className="ui-column-filter"
        allowClear={false}
        value={this.state.created}
        onChange={(date, dateString) => {
          console.log("date", dateString);
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            created: moment(dateString)
          });
          this.props.onRequestFilter({
            page: 1,
            limit: this.state.limit,
            created: dateString
          });
        }}
      />
    );
    let SNoFilter = <InputText readOnly />;
    const {
      fetching,
      data,
      onRequestFilter,
      onRequestData,
      error
    } = this.props;
    console.log("state",this.props.state);
    {console.log("haan hai",this.props.history.location);
    }
    return (
      <div>
        {/* <div className="product_content_container"> */}
        {/* <div className="Innercontainer" style={{margin:"0px"}}> */}
        <Growl
          ref={el => {
            this.growl = el;
          }}
        />
        <div className="createAuctionResetDiv">
         {/* <p>Products List to Create Auction</p> */}
          {/* <span className="selectSpan">
            <select
              className="selectBox"
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
          <span className="showSpan">Show</span>
          <span
            className="resetSpan"
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => {
              this.props.onRequestData();
              this.setState({
                productName: "",
                productId: "",
                created: "",
                quantity: "",
                retailPrice: "",
                category: "",
                brandName: "",
                supplierName: "",
                createdBy: "",
                status: ""
              });
            }}
          >
            Reset Filter
          </span> */}
               <div id="createAuctionChildDiv">
               <p>Products List To Create An Auction</p>
             <ul>
                     <li>Reset filter</li>
                     <li>Show</li>
                     <li>
                       <select onChange={(event)=>{console.log("select-show---------",event.target.value),this.setState({selectRow_count:event.target.value})}}>
                         <option>10</option>
                         <option>20</option>
                         <option>30</option>
                         <option>40</option>
                       </select>
                     </li>
                   </ul>
                   </div>
        </div>
        <DataTable
          loading={fetching}
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          scrollHeight={"80%)"}
          value={userList}
          scrollable={true}
          selection={this.state.selectedItem} onSelectionChange={(e)=>{this.setState({selectedItem:e.data}),this.props.multipleSelectProductList(e.data)}}
        >
          <Column selectionMode="multiple" style={{width:'2em'}}/>
          <Column
            field="index"
            header="S.No"
            filter={true}
            filterElement={SNoFilter}
            style={{ width: "50px" }}
          />
          <Column
            field="_id"
            header="Product Id"
            filter={true}
            filterElement={idFilter}
            style={{ width: "78px" }}
          />
          <Column
            field="image"
            header="Image"
            filter={true}
            filterElement={imageFilter}
            body={this.image}
            style={{ width: "150px" }}
          />
          <Column
            field="productNameEn"
            header="Product Name"
            filter={true}
            filterElement={productFilter}
            style={{ width: "150px" }}
          />
          <Column
            field="createdAt"
            header="Created Date"
            body={this.createdAt}
            filter={true}
            filterElement={createdAtFilter}
            style={{ width: "200px" }}
          />
          <Column
            field="quantity"
            header="Quantity"
            filter={true}
            filterElement={quantityFilter}
            style={{ width: "100px", textAlign: "center" }}
          />
          <Column
            field="retailPrice"
            header="Retail Price"
            body={this.retailPrice}
            filter={true}
            filterElement={retailFilter}
            style={{ width: "100px", textAlign: "right" }}
          />
          <Column
            field="category"
            header="Category"
            body={this.category}
            style={{ width: "200px", textAlign: "left" }}
            filter={true}
            filterElement={categoryFilter}
          />
          <Column
            field="brand"
            header="Brand Name"
            style={{ width: "100px" }}
            body={this.brand}
            filter={true}
            filterElement={brandFilter}
          />
          <Column
            field="supplierName"
            header="Supplier Name"
            filter={true}
            body={this.supplier}
            filterElement={supplierFilter}
            style={{ width: "150px" }}
          />
          <Column
            field="createdBy"
            header="Created By"
            filter={true}
            body={this.createdBy}
            filterElement={createdByFilter}
            style={{ width: "200px", textAlign: "left" }}
          />
          <Column
            field="status"
            header="Status"
            body={this.status}
            filter={true}
            filterElement={statusFilter}
            style={{ width: "150px", overflowX: "visible" }}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={this.props.state.productsList?this.props.state.productsList.totalPages * this.state.limit:""}         onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
      </div>
      // </div>
      // </div>
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
    onRequestFilter: data => dispatch({ type: GET_PRODUCTS_CALL_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    onRequestData: data => dispatch({ type: GET_PRODUCTS_CALL_REQUEST, data }),
    onCategoryChangeHandler: (data, history) => dispatch({ type: HANDLE_CATEGORY_AUTOFILL_REQUEST, data, history })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateAuctionListContent
);
