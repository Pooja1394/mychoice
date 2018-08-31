import React, { Component } from 'react'
import "../../style/Content.css"
import {Link} from 'react-router-dom'
import axios from "axios";
import {basepath} from "../../utils/Constant"
import { User_Filter_Call_Request, User_DATA_Call_Request } from '../../actions/types';
import {connect} from "react-redux"
import { Pagination } from 'antd';
class UserListTable extends Component {
  
    state = {
        arr:[],
        searchText:"",
        searchusernametext:"",

      };    
    componentWillMount = () => {
      this.props.onRequestData();
     
    }
    DateFormat=(date)=>{
      var res = date.split("T");
      console.log("sssssssss",res);
    return res[0];
    }
    TimeFormat=(date)=>{
      var res = date.split("T");
      var time= res[1].split(".");
      console.log(time);
    return time[0];
    }
  render() {
    if(this.props.state.loading){
      return(<div>
        loadingg....
      </div>)
    }
    else{
    const { fetching, data, onRequestFilter,onRequestData, error } = this.props;
    return (
      
      
      <div className="user-table-list">
        {console.log('userArrayList123 : ', this.props.userArrayList)}
        <div className="content_container">
      <div className="wrapper">
      <div className="Innercontainer">
      <div className="line"></div>

      <div className="table-operations">
      <span id="UserText">All Users</span>
      <span id="selecNos">
      <select id="NoDropDown">
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
      </select></span>
      <span  id="showText">Show</span>
      <span onClick={this.clearAll} id="resetText">Reset Filter</span>
      </div>

     
 <table>
 <tbody>
     <tr>
       <th id="SNoBox" scope="col">S.NO</th>
       <th id="UserIdBox" scope="col">User ID</th>
       <th id="UserNameBox"scope="col">User Name</th>
       <th id="EmailBox"scope="col">Email</th>
       <th id="TypeBox"scope="col">Type</th>
       <th id="CreadedByBox"scope="col">Created By</th>
       <th id="RegDateBox" scope="col">Registration date</th>
       <th id="LastLoginBox" scope="col">Last Login</th>
       <th id="LevelBox" scope="col">Level</th>
       <th id="BalanceBox"scope="col">Balance</th>
       <th id="SuspendBox" scope="col">Suspend</th>
       <th id="StatusBox" scope="col">Status</th>
     </tr>
   
     
     <tr>
      <td id="SNoBox"></td>
       <td id="UserIdBox"></td>
       <td id="UserNameBox"><input className="filterField" id="UserNameText"type="text"placeholder="Search UserName"
       value={this.state.searchusernametext}
       onChange={(e)=>{
        this.setState({
          searchusernametext:e.target.value,
        });
        onRequestFilter({userName:e.target.value})}}
       /></td>
       <td id="EmailBox"><input className="filterField" id="EmailText"type="text"placeholder="Search Email"
       value={this.state.searchText}
       onChange={(e)=>{
        this.setState({
          searchText:e.target.value,
        });
        onRequestFilter({email:e.target.value})}}
       /></td>
       <td id="TypeBox"></td>
       <td id="CreadedByBox">
       <select className="filterField" 
        onChange={(event)=>{onRequestFilter({createdBy:event.target.value})}}
       >
  <option value="All">All</option>
  <option value="Self">Self</option>
  <option value="Admin" >Admin</option>
      </select></td>
       <td id="RegDateBox" ></td>
       <td id="LastLoginBox"></td>
       <td id="LevelBox">
       <select className="filterField" 
        onChange={(event)=>{onRequestFilter({level:event.target.value})}}>
  <option value="All">All</option>
  <option value="Beginner">Beginner</option>
  <option value="Old">Old</option>
      </select></td>
       <td id="BalanceBox">
       <input className="filterField" type="text"
       onChange={(e)=>{
        onRequestFilter({balance:parseInt(e.target.value)})}}/></td>
       <td id="SuspendBox">
       <select className="filterField" 
        onChange={(event)=>{onRequestFilter({suspend:event.target.value})}}>
  <option value="All">All</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
      </select></td>
       <td id="StatusBox">
       <select className="filterField"
        onChange={(event)=>{onRequestFilter({status:event.target.value})}}>
  <option value="All">All</option>
  <option value="Open">Open</option>
  <option value="Lock">Lock</option>
      </select></td>
       </tr>
    
       
{ this.props.userArrayList.userList && this.props.userArrayList.userList.map((item,key) => {
  console.log('created by ', item.createdBy)
  return  <Link  to={`/home/user/userprofile/usersummary?`+item.userName}>
  <tr>
 <td id="SNoBox" >{key+1}</td>
  <td id="UserIdBox">{item._id}</td>
  <td id="UserNameBox">{item.userName}</td>
  <td id="EmailBox">{item.email}</td>
  <td id="TypeBox">{item.type===undefined?"--":item.type}</td>
  <td id="CreadedByBox">{item.createdBy===undefined?"--":item.createdBy}</td>
  <td id="RegDateBox">
  <div>{this.DateFormat(item.createdAt)}</div>
  {this.TimeFormat(item.createdAt)}
  </td>
  <td id="LastLoginBox">
  <div>{this.DateFormat(item.updatedAt)}</div>
  {this.TimeFormat(item.updatedAt)}</td>
  <td id="LevelBox">{item.level}</td>
  <td id="BalanceBox">{item.balance}</td>
  <td id="SuspendBox">{(item.suspend)?'Yes':'No'}</td>
  <td id="StatusBox">{(item.status)?'Open':'Lock'}</td>
  </tr></Link>
 
})
}
        
   </tbody>
   
 </table>
 <Pagination defaultCurrent={1} total={10}/><br/>
        </div>
       
      </div>
    </div>
      </div>
    )
  }
}
}
const mapStateToProps=(state)=>{
  return{
    state:state,
    userArrayList:state.userArrayList
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onRequestFilter: (data) => dispatch({ type: User_Filter_Call_Request ,data }),
    onRequestData: () => dispatch({type: User_DATA_Call_Request })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserListTable)