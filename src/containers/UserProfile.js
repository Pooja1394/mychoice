import React, { Component } from 'react'
import Header from "../component/Header"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Breadcrumb,Menu,notification,Modal,Input,Button} from 'antd';
import "../style/UserProfile.css";
import User from "../images/user.png";
import UserProfileRoute from "../component/userprofile/UserProfileRoute"
import axios from "axios";
import {basepath,imagebasepath} from "../utils/Constant"
import { checkUpdatePrivileges } from '../utils/Method';


const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};

export default class UserProfile extends Component {
  state = {
    userprofiledata:{},
    loader:false,
    msg:"",
    modal2Visible: false,
    password:"",
    confirmpass:"",
   
  };
  hide = () => {
    this.setState({
      modal2Visible: false,
    });
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  UserData=()=>{
    this.setState({loader:true})
    var loc=window.location.href;
    var res = loc.split("?");
      axios({
        method: 'post',
        url: basepath+"admin/summary",   
        data:{
          email:res[1]
        }
    
        }).then((response) => {
          console.log("statattata11",response)
             this.setState({
              userprofiledata:response.data,
              loader:false
             });
            
        })
        .catch((error) => {
alert(error);
        })
    }
    componentWillMount = () => {
    this.UserData();
  }
  render() {
    if(this.state.loader){
      return(
        <h1>Loading...</h1>
      )
    }
    else{
      console.log("statattata",this.state)
      let srce;
  let path2=
  (this.state.userprofiledata? `${imagebasepath}/${this.state.userprofiledata.picture}`:"")
 
  if(this.state.userprofiledata.picture==""||this.state.userprofiledata.picture==undefined)
  {
    srce=User
  }
  else if(this.state.userprofiledata.loginType=="Facebook" || this.state.userprofiledata.loginType=="Google"){
    srce=this.state.userprofiledata.picture
  }
  else
  srce=path2
    return (
      <div>
        <div className="UserProfileContainer">
      <div  id="UserProfileInnerContainer">
    {console.log("userprofile",this.state.userprofiledata)
    }
   <img src={srce} alt="user" id="UserImage"style={{height:"150px"}}/>
      <div className="UserDetails">
      <ul id="UserName" className="UserDetailSpan">
      <li>{this.state.userprofiledata.userName}</li></ul>
      <ul><li className="UserDetailSpan" id="UserIdTit">User Id:</li><li className="UserDescli" id="UserIdDesc">{this.state.userprofiledata._id}</li></ul>
      <ul><li className="UserDetailSpan"id="EmailTit">Email:</li><li  className="UserDescli" id="EmailDesc">{this.state.userprofiledata.email}</li></ul>
      <ul><li className="UserDetailSpan"id="TypeTit">Type:</li><li className="UserDescli" id="TypeDesc">{this.state.userprofiledata.loginType}</li></ul>
      <ul><li className="UserDetailSpan"id="CreatedByTit">Created By:</li><li className="UserDescli" id="CreatedByDesc">{this.state.userprofiledata.createdBy}</li></ul>
      <ul><li className="UserDetailSpan"id="BalanceAmountTit">Balance Amount:</li><li  className="UserDescli" id="BalanceAmountDesc">{this.state.userprofiledata.balance}</li></ul>
      </div>
      <Modal className="ResetPassModal"
          title="Reset Password"
          style={{ top: '30vh' }}
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          onCancel={() => {
            this.setState({
              password:"",
              confirmpass:""
            })
            this.setModal2Visible(false)
          }}
          footer={[
            <Button key="submit" type="primary" onClick={() => {
              if(this.state.password=="")
              {openNotificationWithIcon('warning','Password Fields','Enter Password!');}
              else if(this.state.confirmpass=="")
              {openNotificationWithIcon('warning','Password Fields','Enter Confirm Password!');}
              else{
              if(this.state.password!=this.state.confirmpass)
              {
                openNotificationWithIcon('warning','Password Fields','Password Fields not match!');
                this.setState({
                  password:"",
                  confirmpass:""
                })
              }
              else{ 
                var loc=window.location.href;
                var res = loc.split("?");
              axios({
              method: 'put',
              url: basepath+"admin/resetPassword",   
              data:{
                email:res[1],
                password:this.state.password,
              }
          
              }).then((response) => {
                openNotificationWithIcon('success','Password Reset','Password Reset Successful!');
                   this.setState({
                    loader:false,
                    password:"",
                    confirmpass:""
                   });
                  
              })
              .catch((error) => {
                openNotificationWithIcon('error','Password Reset','Password Not Reset !');
              })
                this.setModal2Visible(false)
              }
            }
            }}>Reset</Button>,
            <Button key="back"  onClick={() => {
              this.setState({
                password:"",
                confirmpass:""
              })
              this.setModal2Visible(false)
            }}>
              Cancel
            </Button>,
          ]}
          
          
        >
         Password:<Input type="password" placeholder="Password" value={this.state.password} onChange={(e)=>{ this.setState({
      password:e.target.value,
    });}}/><br/><br/>
           Confirm Password<Input type="password" placeholder="Confirm Password"value={this.state.confirmpass} onChange={(e)=>{ this.setState({
      confirmpass:e.target.value,
    });}} />
        </Modal>
       
        {this.state.userprofiledata.loginType=="Manual"?
        <button id="ResetPass"
        style={{display:this.props.state  && checkUpdatePrivileges('users')?'block':'none'}}
        onClick={() => this.setModal2Visible(true)}>Reset Password</button>:""}
      {/* {this.state.userprofiledata.loginType=="Manual"?  
      
      <button id="ResetPass"
    //    onClick={
    //     ()=>{
    //       var loc=window.location.href;
    // var res = loc.split("?");
    //       axios({
    //         method: 'put',
    //         url: basepath+"admin/resetPassword",   
    //         data:{
    //           email:res[1]
    //         }
        
    //         }).then((response) => {
    //           openNotificationWithIcon('success','Password Reset','Password Reset Successful!');
    //              this.setState({
    //               loader:false
    //              });
                
    //         })
    //         .catch((error) => {
    //         })
    //     }
    //   }
      >Reset Password</button> 
      </Popover>:""}
    */}
      </div>
      <div className="UserDetailSummary">
      <div id="UserDetailHeader">
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '45px' }}
        >
        <Menu.Item key="1"><Link  to="/home/user/userprofile/usersummary">Summary</Link></Menu.Item>
        <Menu.Item key="2"><Link  to="/home/user/userprofile/usertracking">Tracking</Link></Menu.Item>
        <Menu.Item key="3"><Link  to="/home/user/userprofile/usertradingstatus">Trading Status</Link></Menu.Item>
        <Menu.Item key="4"><Link  to="/home/user/userprofile/usertradingtransaction">Trading Transaction</Link></Menu.Item>
        <Menu.Item key="5"><Link  to="/home/user/userprofile/userwinningtransaction">Winning Transaction</Link></Menu.Item>
        <Menu.Item key="6"><Link  to="/home/user/userprofile/userbuyittransaction">Buy It Now transaction</Link></Menu.Item>
        <Menu.Item key="7"><Link  to="/home/user/userprofile/userbidsbuytransaction">Bids Buy Transaction</Link></Menu.Item>
        <Menu.Item key="8"><Link  to="/home/user/userprofile/usercoupontransaction">Coupon Transaction</Link></Menu.Item>
        <Menu.Item key="9"><Link  to="/home/user/userprofile/usernotification">Notification</Link></Menu.Item>
        <Menu.Item key="10"><Link  to="/home/user/userprofile/userbadges">Badges</Link></Menu.Item>
        <Menu.Item key="11"><Link  to="/home/user/userprofile/userplayinghistory">Playing History</Link></Menu.Item>
      </Menu>
      
      </div><br/>
     
      <Route path='/home/user/userprofile' component={UserProfileRoute}/>
    
      </div>
      </div>
      </div>
    )
  }}
}
