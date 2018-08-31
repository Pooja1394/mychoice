/*This file contains the code for LoginPage of Superadmin 
Created By-Aviral Garg
Created On-13/04/18
*/

import React, { Component } from 'react';
import "../style/login.css";
import logo from "../images/logo.png";
import email from "../icons/email.png";
import pass from "../icons/password.png";
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { USER_API_CALL_REQUEST } from '../actions/types';
import { fetchData } from '../sagas/AllWatcherSagas';
import {  notification } from 'antd';
import SimpleCryptoJS from 'simple-crypto-js';
import CryptoJS from 'crypto-js';

var base64 = require('base-64');

const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};

const SECRET_KEY = SimpleCryptoJS.generateRandom(50);
let simpleCrypto = new SimpleCryptoJS(SECRET_KEY);
let encryptedpass,encryptedemail;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      Password: "",
      visiblestate:"hidden",
      error:"",
     
    }
  }

  componentWillMount=()=>{
    let checkBox1 = document.getElementById("chckRem");
    if(localStorage.getItem("token")){
    this.props.history.push("/home/user");
    }
if(localStorage.getItem("user")  ){
    let encrypt=Buffer.from(localStorage.getItem("user"),'base64').toString();
    if(encrypt){ 
          const decryptdata = encrypt.split(":");
          const email =decryptdata[0].toLowerCase();
          const password =decryptdata[1];
          this.setState({
            userName:email,
            Password:password,
          })
     }
     
    }
  }

  setEmail = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }
  setPass = (e) => {
    this.setState({
      Password: e.target.value
    });
  }
  handleLogin=()=>{
    if (this.state.userName === "")
              {
                openNotificationWithIcon('warning','Enter UserName','UserName field is blank');
                this.setState({
                  visiblestate: "visible"
                });
              }
              else if (this.state.Password === "")
              openNotificationWithIcon('warning','Enter Password','Password field is blank');
              else {
                var checkBox = document.getElementById("chckRem");
                if (checkBox.checked == true){
                  var encodedString=base64.encode(this.state.userName.toLowerCase() + ':' + this.state.Password );
          
                  localStorage.setItem("user",encodedString );
                }
                this.props.onRequestLogin({
                  email: this.state.userName,
                  password: this.state.Password,
                  history: this.props.history
                })

              }
  }
  render() {
    const { fetching, data, onRequestLogin, error } = this.props;
    return (
      <div id="LoginWholeDiv">
        <div id="Logindiv">
          <div id="logoDiv"><img src={logo} alt="MyChoice" /></div>
          <p id="WelTxt" className="LoginText">Welcome MyChoice!</p>
          <p id="BelTxt" className="LoginText">Enter your email address to login your account.</p><br />
          <Input 
          className="LoginField" 
          value={this.state.userName} 
          prefix={<img src={email} alt="email" />} 
          placeholder="&nbsp;Email Id" 
          onChange={this.setEmail} 
          onKeyPress={(event)=>{if(event.charCode==13){this.handleLogin()}}}
          /><br /><br />
          {/* <div id="paradiv" style={{visibility:this.state.visiblestate }}>hello</div> */}
         
          <Input 
          className="LoginField"  
          value={this.state.Password} 
          prefix={<img src={pass} alt="email" />} 
          type="password" placeholder="&nbsp;Password" 
          onChange={this.setPass} 
          onKeyPress={(event)=>{if(event.charCode==13){this.handleLogin()}}}
          /><br /><br />
          <div className="LoginText1">
           <div style={{display:"inline-flex"}}> 
            <input 
            onKeyPress={(event)=>{if(event.charCode==13){this.handleLogin()}}}
            id="chckRem" type="checkbox" checked={localStorage.getItem("user")} />&nbsp;&nbsp;<p className="remember_p">Remember me</p></div>
            <Button id="LoginButton" type="primary" onClick={() => {
              this.handleLogin()
            }}>
              Login&nbsp;&nbsp;&nbsp;<img src={require("../icons/forma.png")} alt="arr" />
            </Button>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inLogin",state)
  return {
    error: state.error,
  data:state.data
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestLogin: (data) => dispatch({ type: USER_API_CALL_REQUEST, data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)