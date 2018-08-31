import React, { Component } from "react";
import { Breadcrumb, Menu, Row, Col ,Checkbox} from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/depositncredit/addbank.css";
import { Upload, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { openNotificationWithIcon,api,checkdisplay } from "../../utils/Method";
import {Editor} from 'primereact/components/editor/Editor';
import { basepath } from "../../utils/Constant"
import Sliderbutton from "../Sliderbutton"
export default class AddPreviliges extends Component {
  constructor(props) {
    super(props);
    this.state = {
     status:false,
     privileges:[],
     latest:"",
     lengtharr:0,
     add:false,
     update:false,
     delete:false,
     view:false,
     previligeName:"",
     previligeDesc:"",
     prevId:""
    };
  }
  componentWillMount() {
    // this.props.state  && checkdisplay("Employee")?"":(this.props.history.push('/home/dash'))
    
    if (this.props.history.location.state) {
      let previligedata = this.props.history.location.state
      this.setState({
        prevId:previligedata._id,
        previligeName: previligedata.privilegeName,
        previligeDesc: previligedata.Description,
        status: previligedata.status
      })
  
     
    }
  }
 
  render() {

    return (
      <div>
       
          <div className="table-operations">
            <span id="UserText">{this.props.history.location.state?"Update Previliges":"Create Previliges"} </span>
          </div>
          <br />
          <div className="createpreviligeslist">
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Privilege Name<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <input
                  className="CreateUserField"
                  type="text"
                  maxLength="30"
                  value={this.state.previligeName}
                  onChange={(e)=>{
                    this.setState({
                      previligeName:e.target.value
                    })
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                 Select Privilege<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 4, offset: 1 }}>
              <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                  selectPrivilege:"users",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"users"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="users")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}
              
              >Users</Checkbox>
              </Col>
              <Col md={{ span: 2, offset: 0 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                 Select Access<span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 4, offset: 1 }}>
              <Checkbox checked={this.state.view} onChange={(e)=>{
                this.state.privileges.map((data,key)=>{
                  if(this.state.privileges[key].selectPrivilege==this.state.latest)
                  {
                    if(e.target.checked)
                    {
                      this.state.privileges[key].view=true
                      this.setState({
                        view:true
                      })
                    }
                    else
                    {
                    this.state.privileges[key].view=false
                    this.setState({
                      view:false
                    })
                    }
                  }
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                })
              }} >View</Checkbox>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 6 }}>
              <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Products",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Products"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Products")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}
            >Products</Checkbox>
              </Col>
             
              <Col md={{ span: 4, offset: 3 }}>
              <Checkbox checked={this.state.add} onChange={(e)=>{
                this.state.privileges.map((data,key)=>{
                  if(this.state.privileges[key].selectPrivilege==this.state.latest)
                  {
                    if(e.target.checked)
                    {
                      this.state.privileges[key].add=true
                      this.state.privileges[key].update=true
                      this.setState({
                        add:true
                      })
                    }
                    else
                    {
                    this.state.privileges[key].add=false
                    this.state.privileges[key].update=false
                    this.setState({
                      add:false
                    })
                    }
                  }
                })
              }} >Add/Edit</Checkbox>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 6 }}>
              <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Auctions",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Auctions"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Auctions")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Auctions</Checkbox>
              </Col>
             
              <Col md={{ span: 4, offset: 3 }}>
              <Checkbox checked={this.state.update} onChange={(e)=>{
                this.state.privileges.map((data,key)=>{
                  if(this.state.privileges[key].selectPrivilege==this.state.latest)
                  {
                    if(e.target.checked)
                    {
                      this.state.privileges[key].update=true
                      this.setState({
                        update:true
                      })
                    }
                    else
                    {
                    this.state.privileges[key].update=false
                    this.setState({
                      update:false
                    })
                    }
                  }
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                })
              }}>Edit/Update</Checkbox>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 6 }}>
              <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Deposits",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Deposits"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Deposits")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Deposits</Checkbox>
              </Col>
             
              <Col md={{ span: 4, offset: 3 }}>
              <Checkbox checked={this.state.delete} onChange={(e)=>{
                this.state.privileges.map((data,key)=>{
                  if(this.state.privileges[key].selectPrivilege==this.state.latest)
                  {
                    if(e.target.checked)
                    {
                     
                      this.state.privileges[key].delete=true
                      this.setState({
                        delete:true
                      })
                    }
                    else
                    {
                    this.state.privileges[key].delete=false
                    this.setState({
                      delete:false
                    })
                    }
                  }
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                })
              }}>Delete</Checkbox>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 6 }}>
              <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Credits",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Credits"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Credits")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Credits</Checkbox>
              </Col>
            </Row>

            <Row>
               
              <Col md={{ span: 4, offset: 6 }}>
             <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Reviews",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Reviews"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Reviews")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Reviews</Checkbox>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"TradeExchange",
                    delete:false,
                    add:false,
                    update:false,
                    view:false 
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"TradeExchange"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="TradeExchange")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}> Trade Exchange</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Coupons",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Coupons"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Coupons")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Coupons</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Logging",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Logging"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Logging")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Logging & Analytics</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Reports",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Reports"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Reports")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Reports</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"CMS",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"CMS"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="CMS")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>CMS</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Employee",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Employee"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Employee")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Employee</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Delivery",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Delivery"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Delivery")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Delivery</Checkbox></Row>
              <Row> <Checkbox onChange={(e)=>{
                this.setState({
                  add:false,
                  update:false,
                  delete:false,
                  view:false
                })
                if(e.target.checked)
                {
                this.state.privileges.push({
                    selectPrivilege:"Notification",
                    delete:false,
                    add:false,
                    update:false,
                    view:false
                  
                })
               this.setState({
                 lengtharr:this.state.privileges.length,
                latest:"Notification"
               });
              }
              else
              {
                this.state.privileges.map((data,key)=>{
                 if(this.state.privileges[key].selectPrivilege=="Notification")
                this.state.privileges.splice(key, 1);
                })
                this.setState({
                  lengtharr:this.state.privileges.length,
                });
              }
            }}>Notification</Checkbox></Row>
              </Col>
              <Col md={{ span: 2, offset: 0 }} style={{ textAlign: "right" }}>
              <span id="BrandSpan" className="CreateUserText">
               Description<span style={{ color: "red" }}>*</span>
              </span>
            </Col>
            <Col md={{ span: 10, offset: 1 }}>
            <Editor  value={this.state.previligeDesc}
                  onTextChange={(e)=>{
                    this.setState({
                      previligeDesc:e.textValue
                    })
                  }}style={{height:"120px"}}/>
            </Col>
            {/* <Col md={{ span: 4, offset: 6 }}>
              <Checkbox>Trade Exchange</Checkbox>
              </Col> */}
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
               if(this.state.previligeName=="")
               openNotificationWithIcon('warning','Name','Enter Privilege Name')
               else if(this.state.previligeDesc=="")
               openNotificationWithIcon('warning','Description','Enter Privilege Description')
               else if(this.state.privileges.length==0)
               openNotificationWithIcon('warning','Privileges','Select Some Privileges')
               else{
                 let data;
                {!this.props.history.location.state?(data={
                  method:"post",
                    url:`employee/privilege`,
                    data:{
                      privilegeName:this.state.previligeName,
                      status:this.state.status,
                      previligeDesc:this.state.previligeDesc,
                      privilege:this.state.privileges
                    },
                 }):(
                  data={
                    method:"put",
                      url:`employee/updatePriviledge`,
                      data:{
                        _id:this.state.prevId,
                        privilegeName:this.state.previligeName,
                        status:this.state.status,
                        previligeDesc:this.state.previligeDesc,
                        privilege:this.state.privileges
                      },
                 })
                }
            
                api(data).then((res)=>{
                 
                 this.setState({
                  status:false,
                  privileges:[],
                  latest:"",
                  lengtharr:0,
                  add:false,
                  update:false,
                  delete:false,
                  view:false,
                  previligeName:"",
                  previligeDesc:""
                 })
                 this.props.history.push("/home/employee/previliges")
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
