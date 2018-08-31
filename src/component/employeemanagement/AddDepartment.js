import React, { Component } from "react";
import { Breadcrumb, Menu, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/addbank.css";
import { Upload, Icon, Modal } from "antd";
import {Editor} from 'primereact/components/editor/Editor';
import { connect } from "react-redux";
import { openNotificationWithIcon } from "../../utils/Method";
import { basepath } from "../../utils/Constant"
import Sliderbutton from "../Sliderbutton"
import AddDesignationTable from "./AddDesignationTable"
import { SET_DESIGNATION_IN_STORE_REQUEST } from "../../actions/types";
import {api,checkdisplay} from "../../utils/Method"

class AddDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
     status:false,
     departmentName:"",
     description:"",
     depId:""
    };
  }

  componentWillMount() {
    this.props.state  && checkdisplay("Employee")?"":(this.props.history.push('/home/dash'))
    
    if (this.props.history.location.state) {
      let departmentdata = this.props.history.location.state
      this.setState({
        depId:departmentdata._id,
        departmentName: departmentdata.DepartmentName,
        description: departmentdata.Description,
        status: departmentdata.status
      })

    }
  }
  render() {
    return (
      <div>
       
          <div className="table-operations">
            <span id="UserText">{this.props.history.location.state?"Update Department":"Create Department"} </span>
          </div>
          <br />
          <div className="createdepartmentlist">
          <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Department Name<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 16, offset: 1 }}>
            <input
              className="CreateUserField1"
              type="text"
              maxLength="30"
              value={this.state.departmentName}
              onChange={(e)=>{
                this.setState({
                  departmentName:e.target.value
                })
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Description<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 16, offset: 1 }}>
          <Editor value={this.state.description}
                  onTextChange={(e)=>{
                    this.setState({
                      description:e.textValue
                    })
                  }}  style={{height:"120px"}}/>               
          </Col>
        </Row>
        <Row>
          <AddDesignationTable/>
        </Row>
        <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Status<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
              <Sliderbutton 
    mainWidth="20%"
    clickForAllow={()=>this.setState({status:true})}
    clickFordeny={()=>this.setState({status:false})}
    background={this.state.status?'#3c8dbc':'#dc4b38'}
    left={this.state.status?'0px':'50%'} 
    spaninner={this.state.status?'Yes':'No'}     
    buttonNameAllow="Yes"
    buttonNameDeny="No"  
    />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 6 }}>
              <button id="Createbtn" onClick={()=>{
       
               if(this.state.departmentName=="")
               openNotificationWithIcon('warning','Name','Enter Department Name')
               else if(this.state.description=="")
               openNotificationWithIcon('warning','Description','Enter Department Description')
               else if(this.props.state.selectedDesignationList.selectedDesignation.length==0)
               openNotificationWithIcon('warning','Designation','Select Some Designation')
            
               else{
                let data;
                {!this.props.history.location.state?(data={
                  method:"post",
                    url:`employee/addDepartment`,
                    data:{
                      status:this.state.status,
                      DepartmentName:this.state.departmentName,
                      Description:this.state.description,
                      Designation:this.props.state.selectedDesignationList.selectedDesignation
                    },
                 }):(
                  data={
                    method:"put",
                      url:`employee/updateDepartment`,
                      data:{
                        _id:this.state.depId,
                        status:this.state.status,
                        DepartmentName:this.state.departmentName,
                        Description:this.state.description,
                        Designation:this.props.state.selectedDesignationList.selectedDesignation
                      },
                 })
                }
              
                api(data).then((res)=>{
                 this.setState({
                  status:false,
                  departmentName:"",
                  description:"",
                 })
            //    this.props.setDe({
            //  selectedPrivileges:""
            // });
                 this.props.history.push("/home/employee/department")
                  })

               }
              }}>{this.props.history.location.state?"Update":"Create"}</button>
              </Col>
            </Row>
           <br/><br/>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    fetching: state.fetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setDesignation:(data)=>dispatch({type:SET_DESIGNATION_IN_STORE_REQUEST,data})
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);