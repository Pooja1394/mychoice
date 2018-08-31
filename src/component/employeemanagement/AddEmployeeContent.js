import React, { Component } from "react";
import { Breadcrumb, Menu, Row, Col,Input  } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/addbank.css";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { Upload, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { openNotificationWithIcon,api ,checkdisplay} from "../../utils/Method";
import { basepath,imagebasepath } from "../../utils/Constant";
import {InputText} from 'primereact/components/inputtext/InputText';
import Sliderbutton from "../Sliderbutton"
const { TextArea } = Input;
export default class AddEmployeeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    employeeName:"",
    email:"",
    department:[],
    options1:[],
    selectedDepartmentId:"",
    designation:[],
    options2:[],
    selectedDesignationId:"",
    privileges:[],
    selectedPrivilegeId:"",
    options3:[],
    images:[],
    address:"",
    township:"",
    division:"",
    phoneNo1:"",
    phoneNo2:"",
    status:false,
    empupdid:"",
    pass:"",
    confirmpass:"",
    passdisplay:"visible"
    };
  }
  componentWillMount() {
    
    if (this.props.history.location.state) {
      let employeedata = this.props.history.location.state
      
      this.setState({
        employeeName:employeedata.EmployeeName,
        email:employeedata.email,
        address:employeedata.Address,
        township:employeedata.TownShip,
        division:employeedata.DivisionORstate,
        phoneNo1:employeedata.phoneNo1,
        phoneNo2:employeedata.phoneNo2,
        status:employeedata.status,
        empupdid:employeedata._id,
        selectedDepartmentId:employeedata.Department._id,
        selectedDesignationId:employeedata.Designation._id,
        selectedPrivilegeId:employeedata.Privileges._id,
        passdisplay:'none',
        images: [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: `${imagebasepath}+employeedata.img`
        }],
        department:{name:employeedata.Department.DepartmentName,
          id:employeedata.Department._id
        },
        designation:{name:employeedata.Designation.DesignationName,
        id:employeedata.Designation._id},
        privileges:{
          name:employeedata.Privileges.privilegeName,
          id:employeedata.Privileges._id
        },
             }
     )
     
      
    
    }
  }
componentDidMount(){
  let desigdata = {
    method: "get",
    url: `employee/getallDesignation `
  };
  api(desigdata).then(res => {
  
    let data = res.data;
    let results = data.map((v, k) => {
      return {
        label: v.DesignationName,
        value: { name: v.DesignationName, id: v._id }
      };
    });
    this.setState({ 
    options2:results });

  });
  let depdata  = {
    method: "get",
    url: `employee/getallDepartment `
  };
  api(depdata).then(res => {
   
    let data = res.data;
    let results = data.map((v, k) => {
      return {
        label: v.DepartmentName,
        value: { name: v.DepartmentName, id: v._id }
      };
    });
    this.setState({ 
    options3:results });
   
  });
  let privdata  = {
    method: "get",
    url: `employee/getallPrivileges `
  };
  api(privdata).then(res => {
  
    let data = res.data;
    let results = data.map((v, k) => {
      return {
        label: v.privilegeName,
        value: { name: v.privilegeName, id: v._id }
      };
    });
    this.setState({ 
    options1:results });
   
  });
}
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
    
  this.setState({ images: fileList,image:arr});
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
       
          <div className="table-operations">
            <span id="UserText">{this.props.history.location.state?"Update Employee":"Create Employee"} </span>
          </div>
          <br />
          <div className="createemployeelist">
          <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Employee Name<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <input
              className="CreateUserField"
              type="text"
             value={this.state.employeeName}
               onChange={e => {
                this.setState({ employeeName: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
             Email<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <input
              className="CreateUserField"
              type="text"
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
        </Row>
        
        <Row style={{display:this.state.passdisplay}}>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
             Password<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <input
              className="CreateUserField"
              type="password"
              value={this.state.pass}
              onChange={e => {
                this.setState({ pass: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
        </Row>
        <Row style={{display:this.state.passdisplay}}>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
             Confirm Password<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <input
              className="CreateUserField"
              type="password"
              value={this.state.confirmpass}
              onChange={e => {
                this.setState({ confirmpass: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Department
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <Dropdown

               value={this.state.department}
              placeholder="Select Department"
               options={this.state.options3}
               onChange={e => {
                
                this.setState({ department: e.value,
                selectedDepartmentId:e.value.id
                });
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
              Designation
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <Dropdown

              value={this.state.designation}
              placeholder="Select Designation"
               options={this.state.options2}
               onChange={e => {
                this.setState({ designation: e.value,
                selectedDesignationId:e.value.id
                });
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
              Privileges
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
            <Dropdown
               value={this.state.privileges}
              placeholder="Select Privileges"
              options={this.state.options1}
              onChange={e => {
                this.setState({ privileges: e.value,
                selectedPrivilegeId:e.value.id
                });
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
                    <Col md={{ span: 4 ,offset:1 }} style={{ textAlign: "right" }}>
                      <span id="PassSpan" className="CreateUserText">
                        Images <span style={{ color: "red" }}>*</span>
                      </span>
                    </Col>
                    <Col md={{ span: 18 ,offset:1}} >
                      <div className="clearfix">
                        <Upload
                          action="//jsonplaceholder.typicode.com/posts/"
                          listType="picture-card"
                          fileList={this.state.images}
                          onPreview={this.handlePreview}
                          onChange={this.handleChange}
                          multiple
                        >
                          {this.state.images.length >= 5 ? null : uploadButton}
                        </Upload>
                        <Modal
                          visible={this.statepreviewVisible}
                          footer={null}
                          onCancel={this.handleCancel}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={this.state.previewImage}
                          />
                        </Modal>
                      </div>
                    </Col>
                    <br />
                  </Row>

                  <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Address<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 14, offset: 1 }}>
          <TextArea rows={4} value={this.state.address}
                  onChange={(e)=>{
                    this.setState({
                      address:e.target.value
                    })
                  }} />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Township<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 4, offset: 1 }}>
            <input
              className="CreateUserField1"
              type="text"
              value={this.state.township}
              onChange={e => {
                this.setState({ township: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
          <Col md={{ span: 4, offset: 0 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Division/State<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <input
              className="CreateUserField1"
              type="text"
              value={this.state.division}
              onChange={e => {
                this.setState({ division: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
             Phone No. 1<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 4, offset: 1 }}>
          <InputText 
           className="CreateUserField1"
           type="text"
           value={this.state.phoneNo1}
           onChange={e => {
             this.setState({ phoneNo1: e.target.value });
           }}
           maxLength="10"
          />
           
          </Col>
          <Col md={{ span: 4, offset: 0 }} style={{ textAlign: "right" }}>
            <span id="BrandSpan" className="CreateUserText">
              Phone No. 2<span style={{ color: "red" }}>*</span>
            </span>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <input
              className="CreateUserField1"
              type="text"
              value={this.state.phoneNo2}
              onChange={e => {
                this.setState({ phoneNo2: e.target.value });
              }}
              maxLength="30"
            />
          </Col>
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
                if (this.state.employeeName=="")
                openNotificationWithIcon('warning','Employee Name','Enter Employee Name')
                else if (this.state.email=="")
                openNotificationWithIcon('warning','Email','Enter Email')
               
                else if (this.state.selectedDepartmentId=="")
                openNotificationWithIcon('warning','Department','Select Department')
                else if (this.state.selectedDesignationId=="")
                openNotificationWithIcon('warning','Designation','Select Designation')
                else if (this.state.selectedPrivilegeId=="")
                openNotificationWithIcon('warning','Privileges','Select Privileges')
                else if (this.state.images=="")
                openNotificationWithIcon('warning','Image','Upload Image')
                else if (this.state.address=="")
                openNotificationWithIcon('warning','Address','Enter Address')
                else if (this.state.township=="")
                openNotificationWithIcon('warning','TownShip','Enter TownShip')
                else if (this.state.division=="")
                openNotificationWithIcon('warning','Division','Enter Division')
                else if (this.state.phoneNo1=="")
                openNotificationWithIcon('warning','Phone Number','Enter Phone Number 1')
                else if (this.state.township=="")
                openNotificationWithIcon('warning','Phone Number','Enter Phone Number 2')
                else if (!this.props.history.location.state && this.state.pass=="")
                openNotificationWithIcon('warning','Password','Enter Password')
                else if (!this.props.history.location.state && this.state.confirmpass=="")
                openNotificationWithIcon('warning','Confirm Password','Enter Confirm Password')
                else if (this.state.pass!=this.state.confirmpass)
                {
                  openNotificationWithIcon('warning','Password','Password Not match');
                  this.setState({
                    pass:"",
                    confirmpass:""
                  })
                }
               
               
                else
                {
                  let empdata = new FormData();
                  
                  empdata.append("EmployeeName", this.state.employeeName);
                  empdata.append("email", this.state.email);
                  empdata.append("Department", this.state.selectedDepartmentId);
                  empdata.append("Designation", this.state.selectedDesignationId)
                  empdata.append("Privileges", this.state.selectedPrivilegeId);
                  empdata.append("Address", this.state.address)
                  empdata.append("TownShip", this.state.township);
                  empdata.append("DivisionORstate", this.state.division)
                  empdata.append("phoneNo1", this.state.phoneNo1);
                  empdata.append("phoneNo2", this.state.phoneNo2)
                  empdata.append("status", this.state.status);
                 
                
                  if (this.state.images.length == 0) {
                    empdata.append("img", "");
                  } else {
                    this.state.images.map((value, key) => {
                      return empdata.append("img", value.originFileObj);
                    });
                  }
                  for (const value of empdata.entries()) {
                   
                  }
                  let data,data1;
                  {!this.props.history.location.state?(
                    empdata.append("password",this.state.confirmpass),
                    data={
                    method:"post",
                      url:`employee/addEmployee`,
                      data:empdata
                   },
                   api(data).then((res)=>{
                    this.props.history.push("/home/employee")
                      }) .catch(error => {
                        console.log("Error1111",error);
                      }),
                      data1={
                        method:"post",
                        url:`admin/register`,
                        data:empdata
                      },
                      api(data1).then((res)=>{
                        console.log("User Registered")
                           }) .catch(error => {
                             console.log("Error1111",error);
                           })
                  
                  ):(
                    empdata.append("_id",this.state.empupdid),
                    data={
                      method:"put",
                        url:`employee/updateEmployee`,
                        data:empdata
                   },
                   api(data).then((res)=>{
                    this.props.history.push("/home/employee")
                      }) .catch(error => {
                        console.log("Error1111",error);
                      })
                  )
                  
                  
                      
                  }
                 
            
               
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
