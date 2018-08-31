/*This file contains the code for CreateUser/SignUp New User 
Created By-Riyasat Ali
Created On-14/05/18
*/

import React, { Component } from "react";
import Header from "../Header";
import { Breadcrumb, notification, Row, Col,Pagination } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ADD_REVIEW_REQUEST, GET_REVIEW_REQUEST } from "../../actions/types";
import { Editor } from "primereact/components/editor/Editor";
import { RadioButton } from "primereact/components/radiobutton/RadioButton";
import { AutoComplete } from "primereact/components/autocomplete/AutoComplete";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { Upload, Icon, Modal } from "antd";
import { api ,checkdisplay} from "../../utils/Method";
import { basepath } from "../../utils/Constant";
import Sliderbutton from "../../component/Sliderbutton";
const openNotificationWithIcon = (type, notimsg, notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc
  });
};

class AddPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName:"",
      status: "Open",
      reviews:[],
      reviewName:"",
      page:1
    };
  }

componentWillMount() {
  this.props.state  && checkdisplay("Reviews")?"":(this.props.history.push('/home/dash'))
  
    this.props.getReviews();
}

 handleCreateReview=()=>{
   console.log("reviewslist",this.state.reviews);
  let data = {
    method: "post",
    url: "review/addreview",
    data: { name: this.state.reviewName }
  };
  api(data).then(res => {
    this.props.getReviews();
    this.setState({reviewName:""})
})
}
onPageChange=(e)=>{
  this.props.getReviews({page:e})
}
  render() {
    let productList = [];
    if (this.props.state.reviewData) {
      this.props.state.reviewData.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1+ (this.state.page - 1) * 5
        };
        productList = productList.concat(obj);
      });
    }
    const {
      fetching,
      data,
      onBrandCreation,
      onBrandUpdation,
      error
    } = this.props;
    return (
      <div>
          <div>
            <div className="table-operations">
              <span id="UserText">Create Package</span>
            </div>
            <div id="CreateUserDiv">
              <Row>
                <Col md={{ span: 4 }} style={{ textAlign: "right" }}>
                  <span id="BrandSpan" className="CreateUserText">
                    Package Name<span style={{ color: "red" }}>*</span>
                  </span>
                </Col>
                <Col md={{ span: 16, offset: 1 }}>
                  <input
                    className="CreateUserField1"
                    type="text"
                    value={this.state.packageName}
                    onChange={e => {
                      this.setState({ packageName: e.target.value });
                    }}
                    maxLength="150"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4 }} style={{ textAlign: "right" }}>
                  <span id="BrandSpan" className="CreateUserText">
                    Review Name
                  </span>
                </Col>
                <Col md={{ span: 10, offset: 1 }}>
                  <input
                    className="CreateUserField1"
                    type="text"
                    value={this.state.reviewName}
                    onChange={e => {
                      this.setState({ reviewName: e.target.value });
                    }}
                    maxLength="200"
                  />
                </Col>
                <Col md={{ span: 4 }} style={{ marginLeft: "2%" }}>
                  <button
                    type="button"
                    id="Createbtn"
                    onClick={()=>this.handleCreateReview()}
                    maxLength="200"
                  >
                    Add Review
                  </button>
                </Col>
              </Row>
              <DataTable
                columnResizeMode="expand"
                resizableColumns={true}
                loading={fetching}
                loadingIcon="fas fa-spinner"
                scrollable={true}
                value={productList}
                onSelectionChange={(e)=>{console.log("hello",e);this.setState({reviews:e.data})}}
                selection={this.state.reviews}
                style={{marginTop:"50px",padding:"none"}}
              >
               <Column selectionMode="multiple" style={{width:'10px'}}/>
                <Column
                  field="index"
                  header="S.No"
                  filter={true}
                  // filterElement={SNoFilter}
                  style={{ width: "50px",height:"50px", textAlign: "left" }}
                />
                <Column
                  field="name"
                  header="Review Names"
                  filter={true}
                  // filterElement={SNoFilter}
                  style={{ width: "150px", textAlign: "left" }}
                />
              </DataTable>
          
              <Row>
                <Col md={{ span: 4 }} style={{ textAlign: "right" }}>
                  <span id="StatuSpan" className="CreateUserText">
                    Status <span style={{ color: "red" }}>*</span>
                  </span>
                </Col>
                <Col md={{ span: 18, offset: 1 }} style={{ textAlign: "left" }}>
                  <Sliderbutton
                    mainWidth="20%"
                    clickForAllow={() => this.setState({ status: "Open" })}
                    clickFordeny={() => this.setState({ status: "Lock" })}
                    background={this.state.status =="Open" ? "#4ca65a" : "#dc4b38"}
                    left={this.state.status =="Open"? "0px" : "50%"}
                    spaninner={this.state.status =="Open"? "Open" : "Lock"}
                    buttonNameAllow="Open"
                    buttonNameDeny="Lock"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 18, offset: 5 }} style={{ textAlign: "left" }}>
                  <div id="BelowButtos">
                    <button
                      id="Createbtn"
                      onClick={() => {
                        if (this.state.packageName===""){
                        openNotificationWithIcon('warning','Package Name','Please enter Package Name');
                        // else if(this.state.lastName==="")
                        // openNotificationWithIcon('warning','Last name','Please enter Last Name');
                        // else if(this.state.userName==="")
                        // openNotificationWithIcon('warning','Username','Please enter User Name');
                        }
                        else {
                          let reviews=this.state.reviews;
                          let review=reviews.map((v,k)=>{
                            return {
                              "_id":v._id,
                              "name":v.name,
                              "rating":v.rating
                            }
                          })
                          let data={
                            packageName:this.state.packageName,
                            review:review,
                            status:this.state.status
                          }
                          let history=this.props.history;
                          console.log("history",this.props);
                          
                          this.props.onReviewCreation(data,history)
                        }
                      }}
                    >
                      Update
                    </button>
                    <button
                      id="Cancelbtn"
                      onClick={() => {
                        this.props.history.push("/home/review/packages");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <br />
                </Col>
              </Row>
            </div>
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
    getReviews: (data, history) => dispatch({ type: GET_REVIEW_REQUEST, data, history }),
    onReviewCreation: (data, history) => dispatch({ type: ADD_REVIEW_REQUEST, data, history })
  };
};
export default connect(  mapStateToProps,  mapDispatchToProps)(AddPackage);
