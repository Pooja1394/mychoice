/*This file contains the code for CreateUser/SignUp New User 
Created By-Riyasat Ali
Created On-14/05/18
*/

import React, { Component } from "react";
import Header from "../Header";
import { Breadcrumb, notification, Row, Col,Pagination,DatePicker } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET_PACKAGE_REQUEST,ADD_REVIEW_PERMISSION_REQUEST,GET_PRODUCTS_CALL_REQUEST } from "../../actions/types";
import { Editor } from "primereact/components/editor/Editor";
import { RadioButton } from "primereact/components/radiobutton/RadioButton";
import { AutoComplete } from "primereact/components/autocomplete/AutoComplete";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { Upload, Icon, Modal } from "antd";
import { api } from "../../utils/Method";
import Sliderbutton from "../../component/Sliderbutton";
import {imagebasepath,basepath} from "../../utils/Constant";
import {DateFormat,TimeFormat,checkdisplay} from '../../utils/Method';
import {Rating} from 'primereact/components/rating/Rating';
import { InputText } from "primereact/components/inputtext/InputText";
import moment from "moment";

const openNotificationWithIcon = (type, notimsg, notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc
  });
};

class AddPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Open",
      reviews:[],
      reviewName:"",
      page:1,
      packageList:[],
      productList:[]
    };
  }

  componentWillMount() {
    this.props.state  && checkdisplay("Reviews")?"":(this.props.history.push('/home/dash'))
    
    this.props.getPackageData();
    this.props.onRequestData();
  }
  status=(rowData,column)=>{
     
    if (rowData.status=="Open"){
     return <span style={{color: "#00a65a"}}>{rowData.status}</span>;
    }
    else {
     return <span style={{color: "#dd4b39"}}>{rowData.status}</span>;
    }
  }
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
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;{TimeFormat(
          rowData.createdAt
        )}
      </div>
    );
  };
  reviews=(rowData,column)=>{
    return (
      rowData.review.map((v,k)=>{
           return <div style={{display:"flex",justifyContent:"space-between",fontFamily:"semiboldfont"}}>{v.name}
           <Rating value={3} readonly={true} stars={5} cancel={false} />
           </div>
      })
    )
  }
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
onPageChange=(e)=>{
  this.props.getReviews({page:e})
}
  render() {
    let userList = [];
    if (this.props.state.packageData) {
      this.props.state.packageData.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1
        };
        userList = userList.concat(obj);
      });
    }
    let productList = [];
    if (this.props.state.productsList) {
      this.props.state.productsList.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 
        };
        productList = productList.concat(obj);
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
      onBrandCreation,
      onBrandUpdation,
      error
    } = this.props;
    return (
      <div>
        {/* fetching || this.state.isLoading ? ( */}
          {/* <div
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              textAlign: "center",
              opacity: "0.5"
            }}
          >
            <div style={{ height: "calc(100vh - 135px)" }}>
              <img
                style={{ marginTop: "16%", height: "60px", width: "60px" }}
                src={require("../../images/loader1.gif")}
              />
            </div>
          </div>
        ) : ( */}
            <div className="table-operations">
              <span id="UserText">Create Permission</span>
            </div>
            <div id="CreateUserDiv">
            <p>Select Product<span style={{ color: "red" }}>*</span></p>
            <div className="inner_div">
            <div className="table-operations">
              <span id="UserText">All Products</span>
            </div>
            <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          loading={fetching}
          scrollHeight={"51vh"}
          value={userList}
          scrollable={true}
          onSelectionChange={(e)=>{console.log("hello",e);this.setState({packageList:e.data})}}
          selection={this.state.packageList}
        >
               <Column selectionMode="single" style={{width:'30px'}}/>
        
          <Column
            field="index"
            header="S.No"
            filter={true}
            filterElement={SNoFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="packageName"
            header="Package Name"
            filter={true}
            // filterElement={bankNameFilter}
            style={{ width: "170px" }}
            className="bankName"
          />
           <Column
            header="Created Date"
            body={this.createdAt}
            filterElement={createdAtFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            header="Created By"
            body={this.createdBy}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "100px", textAlign: "left" }}
            className="CreatedDate"
          />
           <Column
            header="Status"
            body={this.status}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
         
          <Column
            header="Reviews"
            body={this.reviews}
            // filterElement={createdDateFilter}
            filter={true}
            style={{ width: "140px", textAlign: "center" }}
            className="CreatedDate"
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={5}
          total={this.props.state.reviewData?this.props.state.reviewData.totalpage * 5:""}
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
            </div>
            </div>
            <div id="CreateUserDiv">
            <p>Select Package<span style={{ color: "red" }}>*</span></p>
            <div className="inner_div">
            <div className="table-operations">
              <span id="UserText">All Packages</span>
            </div>
            <DataTable
          loading={fetching}
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          onSelectionChange={(e)=>{console.log("hello",e);this.setState({productList:e.data})}}
          selection={this.state.productList}
          value={productList}
          scrollable={true}
        >
               <Column selectionMode="multiple" style={{width:'30px'}}/>
        
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
            header="Brand Name"
            style={{ width: "100px" }}
            body={this.brand}
            filter={true}
            filterElement={brandFilter}
          />
          <Column
            header="Supplier Name"
            filter={true}
            body={this.supplier}
            filterElement={supplierFilter}
            style={{ width: "150px" }}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={10}
          total={this.props.state.productsList.totalPages * 10}
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
            </div>
            <Row>
                <Col md={{ span: 18 }} style={{ textAlign: "left" }}>
                  <div id="BelowButtos">
                    <button
                      id="Createbtn"
                      onClick={() => {
                        let packageList=this.state.packageList;
                        console.log("hello",packageList);
                        
                        let Id1=packageList._id
                        // packageList.map((v,k)=>{
                          // return v._id
                        // })
                        let productList=this.state.productList;
                        console.log("productList",this.state.productList);
                        
                        let Id2=productList.map((v,k)=>{
                           return v._id
                        })
                        let data={
                          packageID:Id1,
                          products:Id2
                          
                        }
                        console.log("data",data);
                        this.props.onCreatePermission(data,this.props.history)
                        

                      }}
                    >
                      Create
                    </button>
                    <button
                      id="Cancelbtn"
                      onClick={() => {
                        this.props.history.push("/home/review/permissions");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Col>
              </Row>
          </div>
      </div>
    );
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
    getPackageData: data => dispatch({ type: GET_PACKAGE_REQUEST, data }),
    onRequestData: data => dispatch({ type: GET_PRODUCTS_CALL_REQUEST, data }),
    onCreatePermission:(data,history) => dispatch({type:ADD_REVIEW_PERMISSION_REQUEST,data,history})
    
  };
};
export default connect(  mapStateToProps,  mapDispatchToProps)(AddPermission);

