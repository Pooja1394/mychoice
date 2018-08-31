import React, { Component } from 'react'
import Header from "./Header"
import {Breadcrumb} from 'antd'
import '../style/ResetPassword.css'
import axios from "axios";
import {basepath} from "../utils/Constant"
import {notification} from 'antd'

const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};

export default class ResetPassword extends Component {
  constructor(props){
    super(props);
    this.state={
    password:"",
    newpassword:"",
      Confirmpassword:"", 
    }
  }
  setpassword=(e)=>{
    this.setState({
      password:e.target.value,
    });
  }
  setnewpassword=(e)=>{
    this.setState({
      newpassword:e.target.value,
    });
  }
  setConfirmpassword=(e)=>{
    this.setState({
      Confirmpassword:e.target.value,
    });
  }
 
  render() {
    return (
      <div>
         <Header 
        breadcrumb = {<span id="BreadCrumbspan">
                        <Breadcrumb separator=">">
                      <Breadcrumb.Item href="/home/user">Home</Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/user/resetpassword">Change Password</Breadcrumb.Item>
                     </Breadcrumb>
                    </span>
                  }
        headername = {<span id="Usertxt">Change Password</span>}  
        />
        <div className="content_container">
        <div className="wrapper">
        <div className="Innercontainer">
                  
        <div className="table-operations">
      
       
        </div>
  <div id="CreateUserDiv">
  <div><span><span id="FirstNameSpan" className="ResetUserText">Current Password:&nbsp;&nbsp;&nbsp;</span><input className="ResetUserField" type="password" value={this.state.password} onChange={this.setpassword}/></span></div><br/><br/>
  <div><span><span id="LastNameSpan" className="ResetUserText">New Password:&nbsp;&nbsp;&nbsp;</span><input className="ResetUserField" type="password" value={this.state.newpassword} onChange={this.setnewpassword}/></span></div><br/><br/>
  <div><span id="UserSpan" className="ResetUserText"> Retype New Password:&nbsp;&nbsp;&nbsp;</span><input className="ResetUserField" type="password" value={this.state.Confirmpassword} onChange={this.setConfirmpassword}/></div><br/><br/>
  
  <div id="BelowButtons"><button id="Createbtn" onClick={
    ()=>{
      
       if(this.state.password==="")
       openNotificationWithIcon('warning','Empty Field','Enter Password Field');
      else if(this.state.newpassword==="")
      openNotificationWithIcon('warning','Empty Field','Enter New Password Field');
      else if(this.state.Confirmpassword==="")
      openNotificationWithIcon('warning','Empty Field','Enter Confirm Password Field');
      else if(this.state.newpassword!==this.state.Confirmpassword){
      this.setState({
      newpassword:"",
      Confirmpassword:""
       });
       openNotificationWithIcon('warning','Password','Password Fields not same');
      }
  else{
   
      axios({
        method: 'put',
        url: basepath+"admin/changePassword",   
        data:{
          email:"admin@gmail.com",
          password:this.state.password,
          newpassword:this.state.newpassword
        }

        }).then((response) => {
            
             openNotificationWithIcon('success','Change Password ','Password Changed Successfully');
             this.props.history.push("/home/user");
        })
        .catch((error) => {
          openNotificationWithIcon('error','Change Password ',error);
        })
  
  }
  
    }
  }>Save</button><button id="Cancelbtn" onClick={
    ()=>{this.setState({
      newpassword:"",
      Confirmpassword:"",
      password:"",
    });}
  }>Cancel</button></div><br/>  <br/>
  </div>
       
  
          </div>
        </div>
      </div>
      </div>
    )
  }
}
