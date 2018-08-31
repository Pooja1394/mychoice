import React, { Component } from 'react'
import { Breadcrumb, Menu, Row, Col, DatePicker } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import {connect} from "react-redux";
import {ADD_COUPON_PACKAGE_REQUEST} from "../../actions/types"
import moment from "moment"
import Sliderbutton from '../../component/Sliderbutton';
import { api, isEmpty, openNotificationWithIcon,checkdisplay } from "../../utils/Method";
import { InputText } from "primereact/components/inputtext/InputText";
import "../../style/coupons/createcouponpackage.css"
class CreateCouponPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: "",
      packageOwner: "",
      balanceisSelect: true,
      supplier: "",
      brand: "",
      product: "",
      packageType: "",
      couponAmount: "",
      FromDate: "",
      ToDate: "",
      noOfCode: "",
      supplier: [],
      options: [],
      options1:[],
      options2:[],
      options3: [{ label: "Sales",value:"sales" }, { label: "Promoted",value:"promoted"}],
      brands: [],
      products: [],
      packageType: [],
      createdFrom: "",
      createdTo: "",
      status: true,
      couponId:'',
      couponList:[],
      loader:false

    };
  }
  componentDidMount() {
    this.props.state  && checkdisplay("Coupons")?"":(this.props.history.push('/home/dash'))
    
    let data = {
      method: "get",
      url: `brands/getsupplierbrand `
    };
    api(data).then(res => {
      let data = res.data;
      let results = data.map((v, k) => {
        return {
          label: v.supplierNameEn,
          value: { name: v.supplierNameEn, id: v._id }
        };
      });
      this.setState({ options: results });
    });
  }
  onSupplierChange = e => {
    let data = {
      method: "post",
      url: `brands/getbrandsuplier `,
      data: { supplierID: e.value.id }
    };
    api(data).then(res => {
      let data = res.data;
      let results = data.map((v, k) => {
        return {
          label: v.brandNameEn,
          value: { name: v.brandNameEn, id: v._id }
        };
      });
      this.setState({ options1: results, brand: "" });
    });
  };
  onBrandChange = e => {
    let data = {
      method: "get",
      url: `products/getProductsByBrandId` + "?id=" + e.value.id,
      data: { brandId: e.value.id }
    };
    api(data).then(res => {
      let data = res.data;
      let results = data.map((v, k) => {
        return {
          label: v.productNameEn,
          value: { name: v.productNameEn, id: v._id }
        };
      });

      this.setState({ options2: results, products: "" });
    });
  };
  generatecoupons = e => {
    this.setState({loader:true})
    if (this.state.balanceisSelect) { }
    else {
      if (this.state.supplier == "")
        openNotificationWithIcon("warning", "Supplier", "Select Supplier")
      // else if (this.state.brands == "")
      //   openNotificationWithIcon("warning", "Brands", "Select Brand")
      // else if (this.state.products == "")
      //   openNotificationWithIcon("warning", "Product", "Select Product")
      else {
        let data = {
          method: "post",
          url: `coupon/generatePackage`,
          data: {
            supplierId: this.state.supplier.id,
            brandId: this.state.brands.id,
            productId: this.state.products.id
          }
        };
       
        api(data).then(res=>{
         this.setState({couponList:res.data.data,loader:false})
        })
      }
    }

  };
  createPackage = () => {
      // if (this.state.packageName == "")
      //   openNotificationWithIcon("warning", "Package Name", "Please enter Package Name")
      // else if (this.state.packageOwner == "")
      //   openNotificationWithIcon("warning", "Package Owner Name", "Please enter Package Owner Name")
      // else if (!this.state.balanceisSelect) {
      // if (this.state.supplier == "")
      //   openNotificationWithIcon("warning", "Supplier", "Select Supplier")
      // else if (this.state.brands == "")
      //   openNotificationWithIcon("warning", "Brands", "Select Brand")
      // else if (this.state.products == "")
      //   openNotificationWithIcon("warning", "Product", "Select Product")
      // }
      // else if (this.state.coupons == "")
      //   openNotificationWithIcon("warning", "Coupon", "Select Coupon")
      // else if (this.state.couponAmount == "")
      //   openNotificationWithIcon("warning", "Coupon Amount", "Enter Coupon Amount")
      // else if (this.state.FromDate == "")
      //   openNotificationWithIcon("warning", "Date", "Enter From Date")
      // else if (this.state.ToDate == "")
      //   openNotificationWithIcon("warning", "Date", "Enter To Date")
      // else if (this.state.noOfCode == "")
      //   openNotificationWithIcon("warning", "NO Of Codes", "Enter No of Codes")
      // else {
        let couponList=this.state.couponList;
        let couponCode=this.state.couponList.length>0?this.state.couponList[0].couponCode:'';
        let data= {
          name:this.state.packageName,
          owner:this.state.packageOwner,
          packageType:this.state.packageType,
          couponAmount:this.state.couponAmount,
          fromDate:this.state.fromDate,
          toDate:this.state.toDate,
          noOfCode:this.state.noOfCode,
          couponCode:couponCode,
          supplierId: this.state.supplier.id?this.state.supplier.id:"",
          brandId: this.state.brands.id?this.state.brands.id:"",
          productId: this.state.products.id?this.state.products.id:"",
          balance:false,
          status:this.state.status
        }
        
        this.props.onCouponPackageCreation(data,this.props.history)
    // }
  }
  componentDidMount() {
    let data = {
      method: "get",
      url: `brands/getsupplierbrand `
    };
    api(data).then(res => {
      let data = res.data;
      let results = data.map((v, k) => {
        return {
          label: v.supplierNameEn,
          value: { name: v.supplierNameEn, id: v._id }
        };
      });
      this.setState({ options: results });
    });
  }
  onSupplierChange = e => {
    let data = {
      method: "post",
      url: `brands/getbrandsuplier `,
      data: { supplierID: e.value.id }
    };
    api(data).then(res => {
      let data = res.data;
      let results = data.map((v, k) => {
        return {
          label: v.brandNameEn,
          value: { name: v.brandNameEn, id: v._id }
        };
      });
      this.setState({ options1: results, brands: "" });
    });
  };
  onBrandChange=e=>{
    let data = {
      method: "get",
      url: `products/getProductsByBrandId?id=${e.value.id}`,
    };
    api(data).then(res => {
      let data = res.data;
      let results = data.map((v, k) => {
        return {
          label: v.productNameEn,
          value: { name: v.productNameEn, id: v._id }
        };
      });
      this.setState({ options2: results,products:"" });
    });
  };
  generateCoupons=()=>{
if(this.state.packageName=="")
openNotificationWithIcon( "warning","Package Name","Please enter Package name!")
else if(this.state.packageOwner=="")
openNotificationWithIcon( "warning","Package Owner","Please enter Package Owner!")
else if(this.state.couponAmount=="")
openNotificationWithIcon( "warning","Coupon Amount","Please enter Coupon Amount!")
else if(this.state.createdFrom=="")
openNotificationWithIcon( "warning","Created From Date","Please enter Created From Date!")
else if(this.state.createdTo=="")
openNotificationWithIcon( "warning","Created To Date","Please enter Created To Date!")
else if(this.state.noOfCode=="")
openNotificationWithIcon( "warning","No of Code","Please enter No of Codes!")
else{
  console.log("statetetete",this.state)
}


}
  render() {
    let couponList = [];
    if (this.state.couponList) {
      this.state.couponList.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1
        };
        couponList = couponList.concat(obj);
      });
    }

    return (
      <div>
        <div className="table-operations">
          <span id="UserText">Create Package</span>
        </div>
        <br />
        <div className="createcouponpackagelist">
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Package Name<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <input
                className="CreateUserField"
                type="text"
                value={this.state.packageName}
                onChange={e => {
                  this.setState({ packageName: e.target.value });
                }}
                maxLength="30"
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Package Owner<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <input
                className="CreateUserField"
                type="text"
                value={this.state.packageOwner}
                onChange={e => {
                  this.setState({ packageOwner: e.target.value });
                }}
                maxLength="30"
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Balance
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <input
                className="chckbx"
                type="checkbox"
                checked={this.state.balanceisSelect}
                onClick={() => this.setState({
                  balanceisSelect: !this.state.balanceisSelect
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Supplier
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <Dropdown

                value={this.state.supplier}
                placeholder="Select a supplier"
                options={this.state.options}
                disabled={this.state.balanceisSelect}
                onChange={e => {
                  this.setState({ supplier: e.value });
                  this.onSupplierChange(e);
                }}
                style={{
                  width: "100%",
                  height: "41px",
                  background: "none"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Brand
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <Dropdown

                value={this.state.brands}
                placeholder="Select Brand"
                options={this.state.options1}
                disabled={this.state.balanceisSelect}
                onChange={e => {
                  this.setState({ brands: e.value });
                  this.onBrandChange(e);
                }}
                style={{
                  width: "100%",
                  height: "41px",
                  background: "none"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Product
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <Dropdown
                value={this.state.products}
                placeholder="Select Product"
                options={this.state.options2}
                disabled={this.state.balanceisSelect}
                onChange={e => {
                  this.setState({ products: e.value });
                }}
                style={{
                  width: "100%",
                  height: "41px",
                  background: "none"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Coupon Type
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <Dropdown
                value={this.state.packageType}
                placeholder="Select Coupon"
                options={this.state.options3}

                onChange={e => {
            
                  this.setState({ packageType: e.value });
                }}
                style={{
                  width: "100%",
                  height: "41px",
                  background: "none"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Coupon Amount<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 14, offset: 1 }}>
              <InputText
                className="CreateUserField"
                type="text"
                value={this.state.couponAmount}
                onChange={e => {
                  this.setState({ couponAmount: e.target.value });
                }}
                maxLength="30"
              />
            </Col> <Col className="Kspan" md={{ span: 1, offset: 1 }}>
              Ks
              </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                From Date<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
              <DatePicker
                // allowClear={false}
                // value={this.state.fromDate}
                className="ui-column-filter"
                onChange={(date, dateString) => {
                  this.setState({
                    fromDate: dateString
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                To Date<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
              <DatePicker
                // allowClear={false}
                // value={this.state.toDate}
                className="ui-column-filter"
                onChange={(date, dateString) => {
                  this.setState({
                    toDate: dateString
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                No. of code<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
              <input
                className="CreateUserField"
                type="text"
                value={this.state.noOfCode}
                onChange={e => {
                  this.setState({ noOfCode: e.target.value });
                }}
                maxLength="30"
              />
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
              <button className="generatebtn" onClick={this.generatecoupons}>Generate</button>
            </Col>
          </Row>
          <br /><br />
          <hr />
          <div>
            <DataTable
              columnResizeMode="expand"
              resizableColumns={true}
              value={couponList}
              loadingIcon="fas fa-spinner"
              loading={this.state.loader}
              scrollHeight={"51vh"}
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
                // filterElement={bankIdFilter}
                filter={true}
                style={{ width: "100px" }}
                className="BankId"
              />
              <Column
                field="couponCode"
                filter={true}
                // filterElement={ImageFilter}
                header="Coupon Code"
                style={{ width: "120px", textAlign: "center" }}
                className="Image"
              />
              <Column
                field="permission"
                header="Permission"
                filter={true}
                // filterElement={bankNameFilter}
                style={{ width: "200px" }}
                className="bankName"
              />
            </DataTable>
          </div>
          <Row>
            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
                Status<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
            <Sliderbutton 
             mainWidth="90%"
             clickForAllow={()=>this.setState({status:true})}
             clickFordeny={()=>this.setState({status:false})}
             background={this.state.status?'#4ca65a':'#dc4b38'}
             left={this.state.status?'0px':'50%'} 
             spaninner={this.state.status?'Open':'Lock'}     
             buttonNameAllow="Open"
             buttonNameDeny="Lock"  
             />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }} style={{ textAlign: "right" }}>
              <button id="Createbtn" onClick={this.createPackage}>Create</button>
            </Col>

          </Row>
          <br /><br />

        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCouponPackageCreation: (data, history) => dispatch({ type: ADD_COUPON_PACKAGE_REQUEST, data, history }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCouponPackage);