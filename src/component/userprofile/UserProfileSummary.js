/*This file contains the code for User Profile Summary Content 
Created By-Aviral Garg
Created On-17/04/18
*/

import React, { Component } from 'react'
import "../../style/userprofile/UserProfileSummary.css";
import { USER_PROFILE_DETAILS_CALL_REQUEST } from '../../actions/types';
import { connect } from "react-redux"
import axios from "axios";
import { basepath } from "../../utils/Constant"
import { notification } from 'antd'
import { DateFormat, checkUpdatePrivileges } from '../../utils/Method';
import Sliderbutton from '../../component/Sliderbutton';
const openNotificationWithIcon = (type, notimsg, notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};

class UserProfileSummary extends Component {
  state = {
    userprofiledata: {},
    loader: false,
    Enablebtncolor: '#3c8dbc',
    Disablebtnclr: '#97a0b3'
  };
 
  TimeFormat=(date)=>{
  //   if(date==undefined)
  //  date="2018-05-07T09:54:38.00:00";
  console.log("===>",date)
    let res = date.split("T");
    let time = res[1].split(".");
    let datee=new Date(date);
   console.log("===>hello",datee.toLocaleTimeString())
    return datee.toLocaleTimeString();
  }
  TimeFormat2=(date)=>{
    let res = date.split("T");
    let time= res[1].split("+");
    let datee=new Date(date);
   console.log("===>hello",datee.toLocaleTimeString())
   return datee.toLocaleTimeString();
  }
  // UserData=()=>{
  //   this.setState({loader:true})

  UserData = () => {
    this.setState({ loader: true })

    var loc = window.location.href;
    var res = loc.split("?");
    axios({
      method: 'post',
      url: basepath + "admin/summary",
      data: {
        email: res[1]
      }

    }).then((response) => {
      console.log("Response in usersummary", response.data);
      this.setState({
        userprofiledata: response.data,
        loader: false
      });


    })
      .catch((error) => {
        console.log("Error")
      })
  }
  componentWillMount = () => {
    // console.log(window.location.href);
    // var loc=window.location.href;
    // var res = loc.split("?");
    // console.log("resourceeeee",res[1]);
    // this.props.onProfileDetails(res[1].trim());
    this.UserData();
  }

  render() {
    if (this.state.loader) {
      return (
        <h1>Loading...</h1>
      )
    }
    else {
      
      const { fetching, data, onProfileDetails, error } = this.props;
      var loc = window.location.href;
      var res = loc.split("?");
      console.log("resourceeeee", this.state.userprofiledata);
      return (
        <div id="SummaryDiv">
          <ul id="UserBioDiv">
            <li className="UserProfileSummaryTit">User Bio</li>
            <li className="UserProfileSummaryDesc">{(this.state.userprofiledata)&&(this.state.userprofiledata.bio === undefined ? "--" : this.state.userprofiledata.bio)}</li>
            <li id="UserBiobtnSpan"
    style={{display:this.props.state  && checkUpdatePrivileges('users')?'block':'none'}}
    
            >
            <Sliderbutton 
              button="50%"   
              clickForAllow={() => {
                  axios({
                    method: 'put',
                    url: basepath + "admin/userbio",
                    data: {
                      bioStatus: "enable",
                      email: res[1]
                    }

                  }).then((response) => {
                    console.log("Response", response);
                    this.setState({
                      Enablebtncolor: '#3c8dbc',
                      Disablebtnclr: '#97a0b3'
                    });
                    this.UserData();
                    openNotificationWithIcon('success', 'User ', 'User is Enabled');
                  })
                    .catch((error) => {
                      console.log("Error")
                })
                }
              }
              clickFordeny={() => {
                  axios({
                    method: 'put',
                    url: basepath + "admin/userbio",
                    data: {
                      bioStatus: "disable",
                      email: res[1]
                    }

                  }).then((response) => {
                    console.log("Response", response);
                    openNotificationWithIcon('success', 'User ', 'User is Disabled');
                    this.setState({
                      Disablebtnclr: '#3c8dbc',
                      Enablebtncolor: '#97a0b3'
                    });
                    this.UserData();
                  })
                    .catch((error) => {
                      console.log("Error")
              
                    })
                }
              }
              background={(this.state.userprofiledata)&&(this.state.userprofiledata.isEnabled?'#00a65a':'#dd4b39')}
              left={(this.state.userprofiledata)&&(this.state.userprofiledata.isEnabled?'0px':'50%')} 
              spaninner={(this.state.userprofiledata)&&(this.state.userprofiledata.isEnabled?'Enable':'Disable')}
              buttonNameAllow="Enable"
              buttonNameDeny="Disable"     
              />              
            </li>

          </ul>
          <ul className="Userprofilesumul" id="AddressDiv">
            <li className="UserProfileSummaryTit">Address</li>
            <li className="UserProfileSummaryDesc">{(this.state.userprofiledata)&&(this.state.userprofiledata.localadd==undefined?"---":
            <div>
            {this.state.userprofiledata.localadd},
            {this.state.userprofiledata.township},<br/>
            {this.state.userprofiledata.city},
            {this.state.userprofiledata.state}
            </div>)
            }
            </li>
          </ul>
          <ul className="Userprofilesumul" id="IPAddressDiv">
            <li className="UserProfileSummaryTit">IP Address</li>
            <li className="UserProfileSummaryDesc">{(this.state.userprofiledata)&&((this.state.userprofiledata.ipAddress=="")?"192.168.1.1":this.state.userprofiledata.ipAddress)}</li>
          </ul>
          <ul className="Userprofilesumul" id="RegistrationDateDiv">
            <li className="UserProfileSummaryTit">Registration Date</li>
            <li className="UserProfileSummaryDesc"> {(this.state.userprofiledata)&&(DateFormat(this.state.userprofiledata.createdAt))}, &nbsp;
  {this.TimeFormat(this.state.userprofiledata.createdAt)}</li>
          </ul>
          <ul className="Userprofilesumul" id="LastLoginDiv">
            <li className="UserProfileSummaryTit">Last Login</li>
            <li className="UserProfileSummaryDesc"> {DateFormat(this.state.userprofiledata.updatedAt)}, &nbsp;
  {this.TimeFormat(this.state.userprofiledata.updatedAt)}</li>
          </ul>
          <ul className="Userprofilesumul" id="LevelDiv">
            <li className="UserProfileSummaryTit">Level</li>
            <li className="UserProfileSummaryDesc">{this.state.userprofiledata.level}</li>
          </ul>
          <ul className="Userprofilesumul" id="BalanceDiv">
            <li className="UserProfileSummaryTit">Balance</li>
            <li className="UserProfileSummaryDesc">{this.state.userprofiledata.balance} Ks</li>
          </ul>
          <ul className="Userprofilesumul" id="SuspendDiv"
    style={{display:this.props.state  && checkUpdatePrivileges('users')?'flex':'none'}}
                                
          >
            <li className="UserProfileSummaryTit">Suspend</li>
            <li className="UserProfileSummaryDesc1">
            <div style={{width:'33.9%',marginTop:"5px"}}>  
            
            <Sliderbutton
            // disabled={(this.props.state  && checkUpdatePrivileges('users'))}
     
            clickForAllow={() => {
                axios({
                  method: 'put',
                  url: basepath + "admin/userbio",
                  data: {
                    suspend: "yes",
                    email: res[1]
                  }
          

                }).then((response) => {
                  console.log("Response", response);
                  openNotificationWithIcon('success', 'User Suspend', 'User is Suspended');
                  this.UserData();
                })
                  .catch((error) => {
                    console.log("Error")
                  })
              }
            }
            clickFordeny={() => {
                    
                axios({
                  method: 'put',
                  url: basepath + "admin/userbio",
                  data: {
                    suspend: "no",
                    email: res[1]
                  }
                    // axios({
                    //   method: 'put',
                    //   url: basepath + "admin/userbio",
                    //   data: {
                    //     suspend: "yes",
                    //     email: res[1]
                    //   }

                }).then((response) => {
                  console.log("Response in SUer profile", response);
                  openNotificationWithIcon('success', 'User Suspend', 'User is Active');
                  this.UserData();
                })
                  .catch((error) => {
                    console.log("Error")
                  })
              }
            }
            background={this.state.userprofiledata.suspend?'#4ca65a':'#dc4b38'}
            left={this.state.userprofiledata.suspend?'0px':'50%'} 
            spaninner={this.state.userprofiledata.suspend ?'Yes':'No'}
            buttonNameAllow="Yes"
            buttonNameDeny="No"     
            />

            </div>
              
            </li>
          </ul>
          <ul className="Userprofilesumul" id="StatusDiv"
    style={{display:this.props.state  && checkUpdatePrivileges('users')?'flex':'none'}}
    
          >
            <li className="UserProfileSummaryTit">Status</li>
            <li className="UserProfileSummaryDesc1">
            <div style={{width:'33.9%',marginTop:"5px"}}>
           

            <Sliderbutton 
            clickForAllow={() => {
                axios({
                  method: 'put',
                  url: basepath + "admin/userbio",
                  data: {
                    Status: "open",
                    email: res[1]
                  }

                }).then((response) => {
                  console.log("Response", response);
                  openNotificationWithIcon('success', 'User status', 'User is Opened');
                  this.UserData();
                })
                  .catch((error) => {
                    console.log("Error")
                  })
              }  
            }
            clickFordeny={() => {
              axios({
                method: 'put',
                url: basepath + "admin/userbio",
                data: {
                  Status: "lock",
                  email: res[1]
                }

              }).then((response) => {
                console.log("Response", response);
                openNotificationWithIcon('success', 'User Status ', 'User is Locked');
               this.UserData()
              })
                .catch((error) => {
                  console.log("Error")
                })
            }
          }
            background={this.state.userprofiledata.status?'#dc4b38':'#4ca65a'}
            left={this.state.userprofiledata.status?'50%':'0px'} 
            spaninner={this.state.userprofiledata.status ?'Lock':'Open'}
            buttonNameAllow="Open"
            buttonNameDeny="Lock"     
            />
            </div>    
            
              
            </li>
          </ul>
          <br /><br />
        </div>
      )
    }
   
  }
}
const mapStateToProps = (state) => {
  return {
    state: state,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    onProfileDetails: (username) => dispatch({ type: USER_PROFILE_DETAILS_CALL_REQUEST, username })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileSummary)