import React, { Component } from 'react'
import { Breadcrumb,Menu,DatePicker,Pagination} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import {imagebasepath} from '../../utils/Constant';
import {DateFormat,TimeFormat,checkdisplay} from '../../utils/Method';
import {Rating} from 'primereact/components/rating/Rating';
import { connect } from "react-redux";
import { GET_REVIEW_PERMISSION_REQUEST,USER_TABLE_CSV } from "../../actions/types";
import moment from "moment";
import "../../style/review/review.css"
class ReviewContent extends Component {
  constructor(){
    super();
    this.state={
      productName:"",
      packageName:"",
      createdAt:"",
      createdBy:"",
      page: 1,
      limit: 10,
     
    }
  }
  onPageChange = pageNumber => {
    this.props.getPermissionData({ page: pageNumber, limit: this.state.limit });
  };
  componentWillMount() {
    this.props.state  && checkdisplay("Reviews")?"":(this.props.history.push('/home/dash'))
    
    this.props.getPermissionData();
    this.props.onRequestExportCSV(this.dt,["51"])
  }
  reviews=(rowData,column)=>{
    return (
      rowData.review.map((v,k)=>{
           return <div style={{display:"flex",justifyContent:"space-between",fontFamily:"semiboldfont"}}>{v.name}
           <Rating value={3} readonly={true} stars={5} cancel={false} />
           </div>
      })
    )
  }
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
    let path2 = `${imagebasepath}/${rowData.createdBy.image}`;
    // let path2=rowData.createdBy.img;
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
          <div>{rowData.createdBy.name}</div>
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
 points(rowData,Column){
   return <div>85</div>

 }
  clearAll=()=>{
    this.props.getPermissionData();
    this.setState({
      productName:"",
      packageName:"",
      createdAt:"",
      createdBy:""
    })
  }
 
    render() {
      const {fetching,getPermissionData} =this.props;
      let permissionList = [];
      if (this.props.state.reviewPermissionData) {
        this.props.state.reviewPermissionData.reviewPckgData.map((data, key) => {
          let obj;
          obj = {
            ...data,
            index: key + 1
          };
          permissionList = permissionList.concat(obj);
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
            this.props.getPermissionData({
              page: 1,
              limit: this.state.limit,
              productNameEn: e.target.value
            });
          }}
        />
      );
      let packageFilter = (
        <InputText
          style={{ width: "100%" }}
          value={this.state.packageName}
          className="ui-column-filter"
          onChange={e => {
            this.setState({
              filterName: "productName",
              filterData: e.target.value,
              page: 1,
              packageName: e.target.value
            });
            this.props.getPermissionData({
              page: 1,
              limit: this.state.limit,
              packageName: e.target.value
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
            this.props.getPermissionData({
              page: 1,
              limit: this.state.limit,
              name: e.target.value
            });
          }}
        />
      );
      let createdAtFilter = (
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
            this.props.getPermissionData({
              page: 1,
              limit: this.state.limit,
              createdAt: dateString
            });
          }}
        />
      );
      let imageFilter=(
        <InputText readOnly/>
      )
      let reviewFilter=(
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
        <Menu.Item key="1"><Link to="/home/review">Reviews</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/home/review/permissions">Permissions</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/home/review/packages">Packages</Link></Menu.Item>
        </Menu>
        <div className="review-table-operations">
        <span onClick={this.clearAll} id="resetText">Reset Filter</span>
        <span  id="showText">Show</span>
        <span id="selecNos">
        <select id="NoDropDown"
        onChange={event => {
          this.setState({ limit: event.target.value });
          getPermissionData({
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
      </select></span>
     <button id="buttonExportCsv">Export CSV</button>
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
          value={permissionList}
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
            field="_id"
            header="Image"
            filterElement={imageFilter}
            body={this.image}
            filter={true}
            style={{ width: "130px" }}
          />
          <Column
            field="productNameEn"
            filter={true}
            filterElement={productFilter}
            header="Product Name"
            style={{ width: "140px", textAlign: "center" }}
           
          />
          <Column
            field="productID"
            header="Product ID"
            filter={true}
            // filterElement={bankNameFilter}
            style={{ width: "100px" }}
            className="bankName"
          />
          <Column
            field="createdAt"
            header="Created Date"
            body={this.createdAt}
            filterElement={createdAtFilter}
            filter={true}
            style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            header="Received Date"
            filter={true}
            body={this.createdAt}
            filterElement={createdAtFilter}
            style={{ width: "130px", textAlign: "center" }}
          />
          <Column
            field="createdAt"
            header="Reviewed By"
            body={this.createdBy}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            header="Deliver Person"
            body={this.createdBy}
            filter={true}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            header="Created By"
            body={this.createdBy}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "150px", textAlign: "left" }}
          />
          <Column
            field="createdAt"
            header="Points"
            body={this.points}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            header="Reviews"
            body={this.reviews}
            filterElement={reviewFilter}
            filter={true}
            style={{ width: "200px", textAlign: "center" }}
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
      getPermissionData: data =>
        dispatch({ type: GET_REVIEW_PERMISSION_REQUEST, data }),
      onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
    };
  };
  export default connect(  mapStateToProps,  mapDispatchToProps)(ReviewContent);
  



  