/*This file contains the code for CreateUser/SignUp New User 
Created By-Riyasat Ali
Created On-17/05/17
*/

import React, { Component } from "react";
import "../style/AddProductContent.css";
import Header from "./Header";
import { Breadcrumb, notification, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  ADD_PRODUCT_CONTENT_REQUEST,
  EDIT_PRODUCT_CONTENT_REQUEST,
  HANDLE_CATEGORY_AUTOFILL_REQUEST
} from "../actions/types";
import { Editor } from "primereact/components/editor/Editor";
import { RadioButton } from "primereact/components/radiobutton/RadioButton";
import { AutoComplete } from "primereact/components/autocomplete/AutoComplete";
import { InputText } from "primereact/components/inputtext/InputText";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { Upload, Icon, Modal } from "antd";
import { api, isEmpty,checkdisplay } from "../utils/Method";
import { basepath,imagebasepath } from "../utils/Constant";
import Sliderbutton from "../component/Sliderbutton";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import "font-awesome/css/font-awesome.css";
const openNotificationWithIcon = (type, notimsg, notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc
  });
};
class AddProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNameEn: "",
      productNameMn: "",
      productDescriptionEn: "",
      productDescriptionMn: "",
      images: [],
      video: "",
      footerDescriptionEn: "",
      footerDescriptionMn: "",
      quantity: "",
      productTag: "",
      retailPrice: "",
      profit: "",
      // supplier: "",
      brand: "",
      createdBy: "",
      status: false,
      previewVisible: false,
      previewImage: "",
      supplierNameEnglish: "",
      supplier: [],
      category: [],
      options: [],
      options1: [],
      isLoading:false
    };
  }
  componentWillMount() {
    console.log("heycat", this.props.state.categoryAutoAdd);

    //  let cat=this.state.category;
    //  this.setState({category:cat});
    this.props.state  && checkdisplay("Products")?"":(this.props.history.push('/home/dash'))
    if (!isEmpty(this.props.state.autofill)) {
      console.log("heycat yupp", this.props.state.categoryAutoAdd);
      let value = this.props.state.autofill;
      let category;
      if (!isEmpty(this.props.state.categoryAutoAdd)) {
        console.log(
          "heycat1",
          value.category,
          this.props.state.categoryAutoAdd
        );
        category = value.category.concat(
          this.props.state.categoryAutoAdd.cateNameEn
        );
      }
      console.log("heycat2", value.category);
      this.setState({
        productNameEn: value.productNameEn,
        productNameMn: value.productNameMn,
        productDescriptionEn: value.descriptionEn,
        productDescriptionMn: value.descriptionMn,
        images: value.images,
        video: value.video,
        footerDescriptionEn: value.footerDescEn,
        footerDescriptionMn: value.footerDescMn,
        quantity: value.quantity,
        productTag: value.productTag,
        retailPrice: value.retailPrice,
        profit: value.profit,
        category: category,
        brand: value.brand,
        status: value.status
      });
    }
    if (this.props.history.location.search) {
      this.setState({isLoading:true});
        let _id=this.props.history.location.search.split("=")[1];
        console.log("===>", _id);
        let data = {
          method: "post",
          url: `products/autofillproduct`,
          data:{
            _id:_id
          }
        };
        api(data).then(res => {
          console.log("helloin js", res);
          let data = res.data.task;
          let images = data.image.map((v, k) => {
            return {
              uid: k,
              name: v,
              status: "done",
              url: `${imagebasepath}${v}`
            };
          });
          this.setState({
            isLoading:false,
            productNameEn: data.productNameEn,
            productNameMn: data.productNameMn,
            productDescriptionEn: data.descriptionEn,
            productDescriptionMn: data.descriptionMn,
            video: data.video,
            footerDescriptionEn: data.footerDescEn,
            footerDescriptionMn: data.footerDescMn,
            quantity: data.quantity,
            productTag: data.productTag,
            retailPrice: data.retailPrice,
            profit: data.profit,
            supplier: data.supplierName,
            category: data.category,
            brand: data.brand,
            status: data.status,
            id: data._id,
            images: images
          });
        });
      }
  }
  componentDidMount() {
    let data = {
      method: "get",
      url: `brands/getsupplierbrand `
    };
    api(data).then(res => {
      console.log("helloin js", res);
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
    console.log("ali",e);
    let data = {
      method: "post",
      url: `brands/getbrandsuplier `,
      data: { supplierID: e.value.id }
    };
    api(data).then(res => {
      console.log("helloin js", res);
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
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  handleChange = ({ fileList }) => {
    let arr= fileList.filter((v)=>{
      if(v.hasOwnProperty("lastModified"))
      {
        return v;
      }
     })
     console.log("array==>",arr);
  this.setState({ images: fileList,image:arr});
  }
  setproductName = e => {
    console.log("====>hello");
    this.setState({
      productName: e.target.value
    });
  };
  onProductTagChange = e => {
    this.setState({ productTag: e.value });
  };
  filterSuppliers = event => {
    console.log("hello", event);
    let data = {
      method: "get",
      url: `products/searchsupplierapi?search=${event.query}`
    };
    api(data).then(res => {
      console.log("helloin js", res);
      let data = res.data.data;
      let results = data.map((v, k) => {
        return v.supplierNameEn;
      });
      this.setState({ filteredSuppliers: results });
    });
  };
  filterCategories = event => {
    console.log("hello", event);
    let data = {
      method: "get",
      url: `products/categorysearch?search=${event.query}`
    };
    api(data).then(res => {
      console.log("helloin js", res);
      let data = res.data.data;
      let results = data.map((v, k) => {
        return v.cateNameEn;
      });
      this.setState({ filteredCategories: results });
    });
  };
  render() {
    console.log("log", this.state.productNameEn);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      fetching,
      data,
      onProductCreation,
      onProductUpdation,
      error
    } = this.props;
    return (
      <div>
        {console.log("category-------->", this.state.category)}
        {fetching || this.state.isLoading ? (
          <div
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
                src={require("../images/loader1.gif")}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="table-operations">
              <span id="UserText">Create Product</span>
            </div>
            <div id="CreateUserDivi">
              <Row>
                <Col md={{ span: 19 }}>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="" className="CreateUserText">
                        Product Name (English)<span style={{ color: "red" }}>
                          *
                        </span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <input
                        className="CreateUserField1"
                        type="text"
                        value={this.state.productNameEn}
                        onChange={e => {
                          this.setState({ productNameEn: e.target.value });
                        }}
                        maxLength="150"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="" className="CreateUserText">
                        Product Name (Myanmar)<span style={{ color: "red" }}>
                          *
                        </span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <input
                        className="CreateUserField1"
                        type="text"
                        value={this.state.productNameMn}
                        onChange={e =>
                          this.setState({ productNameMn: e.target.value })
                        }
                        maxLength="200"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="DescSpan" className="CreateUserText">
                        Product Description (English)
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <Editor
                        style={{ height: "120px" }}
                        value={this.state.productDescriptionEn}
                        onTextChange={e => {
                          this.setState({ productDescriptionEn: e.htmlValue });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="DescSpan" className="CreateUserText">
                        Product Description (Myanmar)<span
                          style={{ color: "red" }}
                        >
                          *
                        </span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <Editor
                        style={{ height: "120px" }}
                        value={this.state.productDescriptionMn}
                        onTextChange={e =>
                          this.setState({ productDescriptionMn: e.htmlValue })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="PassSpan" className="CreateUserText">
                        Images <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <div className="clearfix">
                        <Upload
                          action="//jsonplaceholder.typicode.com/posts/"
                          listType="picture-card"
                          fileList={this.state.images}
                          onPreview={this.handlePreview}
                          onChange={this.handleChange}
                          
                          onRemove={e => {
                            let token=localStorage.getItem("token")
                            console.log("productdelete",e,this.state.id)
                            let data={
                            method:"put",
                            url:"user/deleteimg",
                             data:{_id:this.state.id,type:"product",index:e.uid},
                          }
                           api(data)
                        }}
                          multiple
                        >
                          {this.state.images.length >= 15 ? null : uploadButton}
                        </Upload>
                        <Modal
                          visible={previewVisible}
                          footer={null}
                          onCancel={this.handleCancel}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage}
                          />
                        </Modal>
                      </div>
                    </Col>
                    <br />
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">
                        Video (URL) <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <input
                        className="CreateUserField1"
                        type="text"
                        value={this.state.video}
                        onChange={e => this.setState({ video: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="FooterSpan" className="CreateUserText">
                        Footer Description (English)
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <Editor
                        style={{ height: "120px" }}
                        value={this.state.footerDescriptionEn}
                        onTextChange={e =>
                          this.setState({ footerDescriptionEn: e.htmlValue })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="FooterSpan" className="CreateUserText">
                        Footer Description (Myanmar)<span
                          style={{ color: "red" }}
                        >
                          *
                        </span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <Editor
                        style={{ height: "120px" }}
                        value={this.state.footerDescriptionMn}
                        onTextChange={e =>
                          this.setState({ footerDescriptionMn: e.htmlValue })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">
                        Quantity <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <input
                        className="CreateUserField1"
                        type="text"
                        value={this.state.quantity}
                        onChange={e =>
                          this.setState({ quantity: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">Product Tag </span>
                    </Col>
                    <Col
                      md={{ span: 17 }}
                      style={{ textAlign: "left", marginLeft: "2%" }}
                    >
                      <RadioButton
                        inputId="rb1"
                        value="Featured"
                        onChange={this.onProductTagChange}
                        checked={this.state.productTag === "Featured"}
                      />
                      <label htmlFor="rb1">Featured</label>
                      <RadioButton
                        inputId="rb2"
                        value="Hot"
                        onChange={this.onProductTagChange}
                        checked={this.state.productTag === "Hot"}
                      />
                      <label htmlFor="rb2">Hot</label>
                      <RadioButton
                        inputId="rb2"
                        value="None"
                        onChange={this.onProductTagChange}
                        checked={this.state.productTag === "None"}
                      />
                      <label htmlFor="rb2">None</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">Retail Price </span>
                    </Col>
                    <Col md={{ span: 16 }} style={{ marginLeft: "2%" }}>
                      <InputText
                        keyfilter="num"
                        className="CreateUserField1"
                        type="text"
                        value={this.state.retailPrice}
                        onChange={e =>
                          this.setState({ retailPrice: e.target.value })
                        }
                      />
                    </Col>&nbsp;&nbsp;<span>Ks</span>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">Commission/Profit </span>
                    </Col>
                    <Col md={{ span: 16 }} style={{ marginLeft: "2%" }}>
                      <InputText
                        keyfilter="num"
                        className="CreateUserField1"
                        type="text"
                        value={this.state.profit}
                        onChange={e =>
                          this.setState({ profit: e.target.value })
                        }
                      />
                    </Col>&nbsp;&nbsp;<span>Ks</span>
                  </Row>
                  <Row>
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">Supplier Name</span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      {/* <AutoComplete id="category" value={this.state.supplier} suggestions={this.state.filteredSuppliers} completeMethod={this.filterSuppliers}
                minLength={1} placeholder="Search Supplier" style={{width:"100%"}} multiple={true} onChange={(e) => {console.log("hello",e);this.setState({supplier: e.value})}} /></Col></Row> */}
                      <Dropdown
                        value={this.state.supplier}
                        placeholder="Select a supplier"
                        options={this.state.options}
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
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span className="CreateUserText">Brand </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <Dropdown
                        value={this.state.brand}
                        placeholder="Select a brand"
                        options={this.state.options1}
                        onChange={e => {
                          this.setState({ brand: e.value });
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
                    <Col md={{ span: 6 }} style={{ textAlign: "right" }}>
                      <span id="StatuSpan" className="CreateUserText">
                        Status <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 17 }} style={{ marginLeft: "2%" }}>
                      <Sliderbutton
                        mainWidth="25%"
                        clickForAllow={() => this.setState({ status: true })}
                        clickFordeny={() => this.setState({ status: false })}
                        background={this.state.status ? "#4ca65a" : "#dc4b38"}
                        left={this.state.status ? "0px" : "50%"}
                        spaninner={this.state.status ? "Yes" : "No"}
                        buttonNameAllow="Yes"
                        buttonNameDeny="No"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 17 }} style={{ marginLeft: "26.9%" }}>
                      <div id="BelowButtos">
                        <button
                          id="Createbtn"
                          onClick={() => {
                            if (this.state.productNameEn === "")
                              openNotificationWithIcon(
                                "warning",
                                "Product Name (English)",
                                "Please enter product name(english)!"
                              );
                            else if (this.state.productNameMn === "")
                              openNotificationWithIcon(
                                "warning",
                                "Product Name (Myanmar)",
                                "Please enter product name(myanmar)!"
                              );
                            else if (this.state.productDescriptionEn === "")
                              openNotificationWithIcon(
                                "warning",
                                "Product Description (English)",
                                "Please enter header description (english)!"
                              );
                            else if (this.state.productDescriptionMn === "")
                              openNotificationWithIcon(
                                "warning",
                                "Product Description (Myanmar)",
                                "Please enter header description (myanmar)"
                              );
                            else if (this.state.images.length == 0)
                              openNotificationWithIcon(
                                "warning",
                                "Images",
                                "Please upload images!"
                              );
                            else if (this.state.video === "")
                              openNotificationWithIcon(
                                "warning",
                                "video (URL)",
                                "Please enter video(URL)"
                              );
                            else if (this.state.footerDescriptionEn === "")
                              openNotificationWithIcon(
                                "warning",
                                "Footer Description (English)",
                                "Please enter footer description (english)!"
                              );
                            else if (this.state.footerDescriptionMn === "")
                              openNotificationWithIcon(
                                "warning",
                                "Footer Description (Myanmar)",
                                "Please enter footer description (myanmar)"
                              );
                            else if (this.state.quantity === "")
                              openNotificationWithIcon(
                                "warning",
                                "Quantity",
                                "Please enter quantity!"
                              );
                            else if (this.state.category.length === 0)
                              openNotificationWithIcon(
                                "warning",
                                "Categories",
                                "Please select categories!"
                              );
                            else {
                              let data = new FormData();
                              data.append(
                                "productNameEn",
                                this.state.productNameEn
                              );
                              data.append(
                                "productNameMn",
                                this.state.productNameMn
                              );
                              data.append(
                                "descriptionEn",
                                this.state.productDescriptionEn
                              );
                              data.append(
                                "descriptionMn",
                                this.state.productDescriptionMn
                              );
                              data.append("video", this.state.video);
                              data.append(
                                "footerDescEn",
                                this.state.footerDescriptionEn
                              );
                              data.append(
                                "footerDescMn",
                                this.state.footerDescriptionEn
                              );
                              data.append("quantity", this.state.quantity);
                              data.append("productTag", this.state.productTag);
                              data.append(
                                "retailPrice",
                                this.state.retailPrice
                              );
                              data.append("profit", this.state.profit);
                              data.append(
                                "supplierName",
                                JSON.stringify(this.state.supplier)
                              );
                              data.append(
                                "brand",
                                JSON.stringify(this.state.brand)
                              );
                              this.state.category.map((value, key) => {
                                data.append("category", value);
                              });
                              data.append("categoryList", this.state.category);
                              data.append("status", this.state.status);
                              if (this.props.history.location.search) {
                                data.append("_id", this.state.id);
                                if (this.state.images.length==0) {
                                  data.append("image", "");
                                } else {
                                  this.state.images.map((value, key) => {
                                    return data.append(
                                      "image",
                                      value.originFileObj
                                    );
                                  });
                                }
                              }
                              else{
                                this.state.images.map((value, key) => {
                                  return data.append(
                                    "image",
                                    value.originFileObj
                                  );
                                })
                              }
                              for (const value of data.entries()) {
                                console.log("==========>", value);
                              }
                              if (this.props.history.location.search) {
                                onProductUpdation(data, this.props.history);
                              } else {
                                onProductCreation(data, this.props.history);
                              }
                            }
                          }}
                        >
                          {this.props.history.location.search
                            ? "Update"
                            : "Create"}
                        </button>
                        <button
                          id="Cancelbtn"
                          onClick={() => {
                            this.props.history.push("/home/product");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                      <br />
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5 }} style={{ marginTop: "20px" }}>
                  <div>
                    <p style={{ fontFamily: "semiboldfont", color: "#333333" }}>
                      Categories<span style={{ color: "red" }}>*</span>
                    </p>
                    <div
                      style={{
                        border: "1px solid #d2d6de",
                        borderRadius: "3px",
                        padding: "10px",
                        height: 150
                      }}
                    >
                      <AutoComplete
                        id="category"
                        value={this.state.category}
                        suggestions={this.state.filteredCategories}
                        completeMethod={this.filterCategories}
                        minLength={1}
                        placeholder="Search Categories"
                        multiple={true}
                        onChange={e => this.setState({ category: e.value })}
                      />
                    </div>
                  </div>
                  <div>
                    {console.log("history", this.props.history)}
                    <p
                      style={{
                        fontFamily: "semiboldfont",
                        color: "#333333",
                        paddingTop: "10px"
                      }}
                    >
                      Create a new category
                    </p>
                    <button
                      type="button"
                      style={{
                        color: "#3c8dbc",
                        background: "none",
                        border: "1px solid #d5d5d5",
                        padding: "5px"
                      }}
                      onClick={() => {
                        let data = {
                          productNameEn: this.state.productNameEn,
                          productNameMn: this.state.productNameMn,
                          descriptionEn: this.state.productDescriptionEn,
                          descriptionMn: this.state.productDescriptionMn,
                          video: this.state.video,
                          images: this.state.images,
                          footerDescEn: this.state.footerDescriptionEn,
                          footerDescMn: this.state.footerDescriptionEn,
                          quantity: this.state.quantity,
                          productTag: this.state.productTag,
                          retailPrice: this.state.retailPrice,
                          profit: this.state.profit,
                          category: this.state.category,
                          status: this.state.status
                        };
                        this.props.onCategoryChangeHandler(
                          data,
                          this.props.history
                        );
                        this.props.history.push("/home/product/createcategory");
                      }}
                    >
                      + Create a category
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    state: state
    // data: state.data,
    // error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProductCreation: (data, history) =>
      dispatch({ type: ADD_PRODUCT_CONTENT_REQUEST, data, history }),
    onProductUpdation: (data, history) =>
      dispatch({ type: EDIT_PRODUCT_CONTENT_REQUEST, data, history }),
    onCategoryChangeHandler: (data, history) =>
      dispatch({ type: HANDLE_CATEGORY_AUTOFILL_REQUEST, data, history })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AddProductContainer
);
