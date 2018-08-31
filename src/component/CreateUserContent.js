/*This file contains the code for CreateUser/SignUp New User 
Created By-Aviral Garg
Created On-14/04/18
*/

import React, { Component } from 'react'
import "../style/Content.css";
import "../style/createUserContent.css";
import Header from "./Header";
import {Breadcrumb,notification,Row,Col} from 'antd';
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import { USER_REGISTER_CALL_REQUEST } from '../actions/types';
import Sliderbutton from '../component/Sliderbutton';
import Format from './format';

const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};


class CreateUserContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:"",
      lastName:"",
      userName:"",
      email:"",
      password:"",
      Confirmpassword:"",
      suspend:false,
      status:false,
    }
  }

  setFirstName=(e)=>{
    this.setState({
      firstName:e.target.value,
    });
  }
  setLastName=(e)=>{
    this.setState({
      lastName:e.target.value,
    });
  }
  setUserName=(e)=>{
    this.setState({
      userName:e.target.value,
    });
  }
  setEmail=(e)=>{
    this.setState({
     email:e.target.value,
    });
  }
  setPass=(e)=>{
    console.log("In SetPass");
    this.setState({
      password:e.target.value
    });
  }
  setRePass=(e)=>{
    console.log("In SetRePass");
    this.setState({
      Confirmpassword:e.target.value
    });
  }

  CancelRegistration=()=>{
    this.setState({
      firstName:"",
      lastName:"",
      userName:"",
      email:"",
      password:"",
      Confirmpassword:"",
      fleg:false,
    });
  }


/*================susponed yes or no buttton adding transition=================*/

    
  suspendYes=()=>{
    var  suspnedButton_span =document.getElementsByClassName("both_button_span")[0];
    var  NoButton=document.getElementsByClassName("noButton")[0];
     this.setState({
      suspend:true
     })   
  } 
  suspendNo=()=>{
   var  suspnedButton_span =document.getElementsByClassName("both_button_span")[0];
        this.setState({
          suspend:false
         }) 
  }
  /*================susponed yes or no buttton adding transition=================*/

  statusOpen=()=>{
    var  status_span =document.getElementsByClassName("status_span")[0];
    var  b=document.getElementsByClassName("StatusLock")[0];
         this.setState({
           status:false
         })
  }

  statusLock=()=>{
    var  status_span =document.getElementsByClassName("status_span")[0];
    var  b=document.getElementsByClassName("StatusOpen")[0];
        this.setState({
          status:true
        })
  }


  
  render() {
    const { fetching, data, onRequestRegister, error } = this.props;

    return (
      <div className="create-user-content">
        <div className="table-operations">
        <span id="UserText">Create User</span>
        </div>
  <div id="CreateUserDiv">
  <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">First Name<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}><input className="CreateUserField1" type="text" value={this.state.firstName} onChange={(e)=>{this.setState({firstName:e.target.value})}} maxLength="30"/></Col></Row>
 <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Last Name<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}><input className="CreateUserField1" type="text" value={this.state.lastName} onChange={(e)=>{this.setState({lastName:e.target.value})}} maxLength="30"/></Col></Row>
 <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Username<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}><input className="CreateUserField1" type="text" value={this.state.userName} onChange={(e)=>{this.setState({userName:e.target.value})}} maxLength="30"/></Col></Row>
 <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Email<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}><input className="CreateUserField1" type="text" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} maxLength="30"/></Col></Row>
 <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Password<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}><input className="CreateUserField1" type="password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} maxLength="30"/></Col></Row>
 <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Confirm Password<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}><input className="CreateUserField1" type="password" value={this.state.Confirmpassword} onChange={(e)=>{this.setState({Confirmpassword:e.target.value})}} maxLength="30"/></Col></Row>
 <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Suspend<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}>
    <Sliderbutton 
    mainWidth="20%"
    clickForAllow={this.suspendYes}
    clickFordeny={this.suspendNo}
    background={this.state.suspend?'#4ca65a':'#dc4b38'}
    left={this.state.suspend?'0px':'50%'} 
    spaninner={this.state.suspend?'Yes':'No'}
    buttonNameAllow="Yes"
    buttonNameDeny="No"     
    />
  </Col></Row>
  <Row><Col md={{span:3,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText">Status<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:16,offset:1}}> <Sliderbutton 
  mainWidth="20%"
    clickForAllow={this.statusOpen}
    clickFordeny={this.statusLock}
    background={!this.state.status?'#4ca65a':'#dc4b38'}
    left={!this.state.status?'0px':'50%'} 
    spaninner={this.state.status?'Lock':'Open'}     
    buttonNameAllow="Open"
    buttonNameDeny="Lock"  
    /></Col></Row>
<Row> <Col md={{span:16,offset:5}} style={{textAlign:"left"}}><div id="BelowButtos">
<button id="Createbtn" 
onClick={()=>{

  if(this.state.firstName==="")
  openNotificationWithIcon('warning','First name','Please enter First Name');
  else if(this.state.lastName==="")
  openNotificationWithIcon('warning','Last name','Please enter Last Name');
  else if(this.state.userName==="")
  openNotificationWithIcon('warning','Username','Please enter User Name');
  else if(this.state.email==="")
  openNotificationWithIcon('warning','Email','Please enter Email');
  else if(this.state.password==="")
  openNotificationWithIcon('warning','Password','Please enter Password');
  else if(this.state.Confirmpassword==="")
  openNotificationWithIcon('warning','Confirm Password','Please enter Confirm Password');
  else if(this.state.password!==this.state.Confirmpassword){
  this.setState({
  password:"",
  Confirmpassword:""
   });
   openNotificationWithIcon('warning','Password not Match','Please check password & Confirm Password');
  }
else{
let data={
firstName:this.state.firstName,
lastName:this.state.lastName,
userName:this.state.userName,
email:this.state.email,
password:this.state.password,
createdBy:"Admin",
suspend:this.state.suspend,
status:this.state.status,
  email:this.state.email,
  password:this.state.password,
  Confirmpassword:this.state.Confirmpassword,
}
console.log("==>hello",data)
onRequestRegister(
data,this.props.history);
}
}}>Create</button>
</div><br/>  
  </Col></Row>
  </div>
       
  
          </div>
       
    )
  }
}
const mapStateToProps=(state)=>{
  return{
  
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onRequestRegister: (data,history) => dispatch({ type: USER_REGISTER_CALL_REQUEST ,data,history })
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(CreateUserContainer)