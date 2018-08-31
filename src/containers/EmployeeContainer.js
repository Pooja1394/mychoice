import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Breadcrumb,Menu } from 'antd';
import Format from '../component/format';
import EmployeeContent from "../component/employeemanagement/EmployeeContent"
import DepartmentContent from "../component/employeemanagement/DepartmentContent"
import DesignationContent from "../component/employeemanagement/DesignationContent"
import PreviligesContent from "../component/employeemanagement/PreviligesContent"
import AddEmployeeContent from "../component/employeemanagement/AddEmployeeContent"
import AddDepartment from "../component/employeemanagement/AddDepartment"
import AddDesignation from "../component/employeemanagement/AddDesignation"
import AddPreviliges from "../component/employeemanagement/AddPreviliges"

export default class EmployeeContainer extends Component {
    render() {
      return (
        <div >

          <Route exact
          path='/home/employee' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Employee</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Employee List</span>}
            > 
            <EmployeeContent history={this.props.history}/>
            </Format>
     
          }} />
         <Route exact
          path='/home/employee/department' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Department</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Department List</span>}
            > 
            <DepartmentContent history={this.props.history}/>
            </Format>
     
          }} />
          <Route exact
          path='/home/employee/designation' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Designation</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Designation List</span>}
            > 
            <DesignationContent history={this.props.history}/>
            </Format>
     
          }} />
           <Route exact
          path='/home/employee/previliges' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Previliges</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Previliges List</span>}
            > 
            <PreviligesContent history={this.props.history}/>
            </Format>
     
          }} />
          <Route exact
          path='/home/employee/addemployee' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Employee</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> Create Employee</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Employee</span>}
            buttonspan = { <span id="ButtonSpans">
            <Link to="/home/employee" >  <button id="btnExportCsv">Cancel</button></Link>
            </span>}
            > 
            <AddEmployeeContent history={this.props.history}/>
            </Format>
     
          }} />

<Route exact
          path='/home/employee/department/adddepartment' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Department</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> Create Department</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Department</span>}
            buttonspan = { <span id="ButtonSpans">
            <Link to="/home/employee/department" >  <button id="btnExportCsv">Cancel</button></Link>
            </span>}
            > 
            <AddDepartment history={this.props.history}/>
            </Format>
     
          }} />
            <Route exact
          path='/home/employee/designation/adddesignation' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Designation</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> Create Designation</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Designation</span>}
            buttonspan = { <span id="ButtonSpans">
            <Link to="/home/employee/designation" >  <button id="btnExportCsv">Cancel</button></Link>
            </span>}
            > 
            <AddDesignation history={this.props.history}/>
            </Format>
     
          }} />
            <Route exact
          path='/home/employee/previliges/addpreviliges' 
          render={()=>{return <Format 
            history={this.props.history}
            breadcrumb={<span id="BreadCrumbspan">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item><img src={require("../images/home icon.png")}/>&nbsp;Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Previliges</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> Create Previliges</Breadcrumb.Item>
                </Breadcrumb>
              </span>
              }
            headername={<span id="Usertxt">Previliges</span>}
            buttonspan = { <span id="ButtonSpans">
            <Link to="/home/employee/previliges" >  <button id="btnExportCsv">Cancel</button></Link>
            </span>}
            > 
            <AddPreviliges history={this.props.history}/>
            </Format>
     
          }} />
        </div>
      )
    }
  }
  