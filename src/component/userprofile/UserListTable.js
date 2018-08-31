import React, { Component } from 'react'
import "../../style/Content.css"
import {Link} from 'react-router-dom'
import axios from "axios";
import User from '../../images/user.png'
import {basepath,imagebasepath} from "../../utils/Constant";
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import {InputText} from 'primereact/components/inputtext/InputText';
import { User_Filter_Call_Request, User_DATA_Call_Request ,USER_TABLE_CSV, CONNECT_TO_WEBSOCKET, GET_PRODUCT_DETAIL} from '../../actions/types';
import {connect} from "react-redux"
import { Pagination } from 'antd';
import { DatePicker } from 'antd';
import { T } from 'antd/lib/upload/utils';
import {DateFormat,checkdisplay} from '../../utils/Method';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Calendar} from 'primereact/components/calendar/Calendar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import Format from '../format';
import { Breadcrumb } from 'antd';
import moment from "moment";
import store from '../../store/store';
class UserListTable extends Component {  
    state = {
        arr:[],
        searchText:"",
        searchusernametext:"",
        userId:"",
        userName:"",
        email:"",
        type:"",
        createdBy:"",
        level:"",
        balance:"",
        suspend:"",
        status:"",
        loader:false   ,
        page:1,
        limit:10,
        count:1,    
        filterName:"",
        filterData:"",
        status:true,
        createdReg:"",
        createdLogin:""
      };    
    componentDidMount() {
      // this.props.createConnection(localStorage.getItem('userId'))
      this.props.onRequestExportCSV(this.dt,["1"]),
      this.props.onRequestData({page:this.state.page,limit:this.state.limit}),
      this.setState({loader:false})
      this.props.state  && checkdisplay("users")?"":(this.props.history.push('/home/dash'))

    }
    onPageChange = (pageNumber) =>{
      this.props.onRequestFilter({page:pageNumber,limit:this.state.limit,[this.state.filterName]:this.state.filterData});
    }
    TimeFormat=(date)=>{
      let res = date.split("T");
      let time= res[1].split(".");
    // return time[0];
    let datee=new Date(date);
     return datee.toLocaleTimeString();
    }
    TimeFormat2=(date)=>{
      let res = date.split("T");
      let time= res[1].split("+");
      let datee=new Date(date);
       return datee.toLocaleTimeString();
    // return time[0];
    }
    userNameTemplate(rowData,column){
      let srce,ipAddr;
      let path2=`${imagebasepath}/${rowData.picture}`
      if(rowData.picture==""||rowData.picture==undefined)
      {
        srce=User
      }
      else if(rowData.loginType=="Facebook" || rowData.loginType=="Google"){
        srce=path2
      }
      else
      srce=path2
if(rowData.ipAddress==""||rowData.ipAddress==undefined)
ipAddr="192.168.17.9"
else
ipAddr=rowData.ipAddress;
      return <div style={{display:"flex"}}>
       <div id="UserImageDiv">
       <div id="OnlineCursordiv"
       style={{  background:rowData.online?'green':'#dd4b39'}}
       ></div>
        <img id="UserAvatarimg"src={srce} alt="av" 
        style={{height:"30px",width:"30px",borderRadius:"50px"}}/></div>
        <div><div>{rowData.userName}</div><div>{ipAddr}</div></div>
        </div>;
    }
    brandTemplate(rowData,column){
    
      let srce
      if (rowData.level=="Beginner"){
      srce=require("../../images/layer-539.png");
      }
      else {
      srce=require("../../images/layer-538-copy.png");        
      }
      return <img src={srce}/>;
    }
    status=(rowData,column)=>{
     
       if (rowData.status=="Open"){
        return <span style={{color: "#00a65a"}}>{rowData.status}</span>;
       }
       else {
        return <span style={{color: "#dd4b39"}}>{rowData.status}</span>;
       }
    }
    suspend=(rowData,column)=>{
    
       if (rowData.suspend=="Yes"){
        return <span style={{color: "#00a65a"}}>{rowData.suspend}</span>;
       }
       else {
        return <span style={{color: "#dd4b39"}}>{rowData.suspend}</span>;
       }
    }
    createdAt=(rowData,column)=>{
     return <div>{DateFormat(rowData.createdAt)}&nbsp;&nbsp;
      {this.TimeFormat(rowData.createdAt)}</div>
    }
    updatedAt=(rowData,column)=>{
      if (rowData.updatedAt=="" || rowData.updatedAt==undefined){
        return <div>--</div>
      }
      else{
      return <div>{DateFormat(rowData.updatedAt)}&nbsp;&nbsp;
       {this.TimeFormat2(rowData.updatedAt)}</div>
      }
     }
//   export=()=> {
    
    
// }
  exportCSV=()=>{
    alert("called")
  }
  onBrandChange=(event) =>{
    // this.dt.filter(event.value, 'brand', 'equals');
    this.setState({brand: event.value});
   
}
  render() {
    let userList=[]
    console.log("hello",this.props);
    
    if(this.props.state.userArrayList.userList){
      this.props.userArrayList.userList.map((data,key)=>{
        let obj;
        if(data.suspend){obj={
            ...data,suspend:'Yes'
          }
        }else{
          obj={
            ...data,suspend:'No'
          }
        }
        if(data.status){
          obj={
            ...obj,status:'Lock'
          }
        }else{
          obj={
            ...obj,status:'Open'
          }
        }
        obj={
          ...obj,index:((key+1)+((this.state.page-1)*this.state.limit))
          }
        userList=userList.concat(obj)
      })
    }
  
  //Suspend Filter
    let suspendFilter=<select option="field"
    style={{width: '100%'}} className="ui-column-filter" 
    value={this.state.suspend} 
    onChange={(e)=>{
      this.setState({filterName:"suspend",filterData:e.target.value,suspend:e.target.value})
      this.props.onRequestFilter({page:1,limit:this.state.limit,suspend:e.target.value});
    }}
    >
    <option value="">All</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
  </select>

  //status filter
   let statusFilter=<select option="field"
   style={{width: '100%'}} className="ui-column-filter" 
   value={this.state.status} 
   onChange={(event)=>{
    this.setState({filterName:"status",filterData:event.target.value,page:1,status:event.target.value}) 
    this.props.onRequestFilter({page:1,limit:this.state.limit,status:event.target.value});this.setState({brand2:event.target.value})}}
   >
   <option value="">All</option>
 <option value="Lock">Open</option>
 <option value="Open">Lock</option>
 </select>
//CreatedBy Filter
   let createdFilter=<select option="field"
   style={{width: '100%'}} className="ui-column-filter" 
   value={this.state.createdBy} 
   onChange={(event)=>{
    this.setState({filterName:"createdBy",filterData:event.target.value,page:1,createdBy:event.target.value}) 
     this.props.onRequestFilter({page:1,limit:this.state.limit,createdBy:event.target.value});this.setState({brand3:event.target.value})}}
   >
   <option value="">All</option>
 <option value="Self">Self</option>
 <option value="Admin">Admin</option>
 </select>

 //level filter
  let levelFilter=<select option="field"
  style={{width: '100%'}} className="ui-column-filter" 
  value={this.state.level} 
  onChange={ (e)=>{
    this.setState({filterName:"level",filterData:e.target.value,page:1,level:e.target.value}) 
    this.props.onRequestFilter({page:1,limit:this.state.limit,level:e.target.value});this.setState({brand4:e.target.value})}}
  >
  <option value="">All</option>
<option value="Beginner">Beginner</option>
<option value="Old">Old</option>
</select>
let userFilter=<InputText className="ui-column-filter"
style={{width: '100%'}}
value={this.state.userName}
onChange={(e)=>{
  this.setState({filterName:"userName",filterData:e.target.value,page:1,userName:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,userName:e.target.value})
}}
/>

//Email filter
let emailFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
value={this.state.email}
onChange={(e)=>{
  this.setState({filterName:"email",filterData:e.target.value,page:1,email:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,email:e.target.value})}}
/>

//LoginType filter
let typeFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
value={this.state.type}
onChange={(e)=>{
  this.setState({filterName:"loginType",filterData:e.target.value,page:1,type:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,loginType:e.target.value})}}
/>

//Balance Filter
let balanceFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
value={this.state.balance}
onChange={(e)=>{
  this.setState({filterName:"balance",filterData:e.target.value,page:1,balance:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,balance:parseInt(e.target.value)})}}
/>

//CreatedAt Filter
let registrationDateFilter=
<DatePicker 
 allowClear={false}
 value={this.state.createdReg}
className="ui-column-filter" onChange={
 (date, dateString)=> {
  this.setState({
    filterName:"createdAt",
    filterData:dateString,
    page:1,
    createdReg: moment(dateString)
  })
   this.props.onRequestFilter({page:1,limit:this.state.limit,createdAt:dateString})
}
}/>
let indexFilter=<InputText readOnly={true} className="ui-column-filter"/>
let lastLoginFilter=
<DatePicker
 allowClear={false}
 value={this.state.createdLogin}
  className="ui-column-filter" onChange={
 (date, dateString)=> {
  this.setState({
    filterName:"lastLogin",
    filterData:dateString,
    page:1,
    createdLogin: moment(dateString)
  })
   this.props.onRequestFilter({page:1,limit:this.state.limit,lastLogin:dateString})
}
}/>

    if(this.props.state.loading){
      return(<div>
        loadingg....
      </div>)
    }
    else{
    const { fetching, data, onRequestFilter,onRequestData, error } = this.props;
    return (
      <div className="user-profile-table-list">
      <div className="table-operations">
      <span id="UserText">All Users</span>
      <span id="selecNos"> {console.log("admin---------->",this.props.state)}
          
      <select id="NoDropDown"
      onChange={(event)=>{
        this.setState({limit:event.target.value})
        onRequestFilter({page:1,limit:event.target.value,[this.state.filterName]:this.state.filterData})
       }}>
        <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
      </select></span>
      <span  id="showText">Show</span>
      <span onClick={()=>{this.setState({
         userId:"",
         userName:"",
         email:"",
         type:"",
         createdBy:"",
         level:"",
         balance:"",
         suspend:"",
         status:"",
         createdReg:"",
         createdLogin:""
      });this.props.onRequestData({page:this.state.page,limit:this.state.limit})}} id="resetText" style={{cursor:"pointer"}}>Reset Filter</span>
      {/* <button onClick={this.export}>hello</button> */}
      </div>
      
     <DataTable columnResizeMode="expand" resizableColumns={true} loading={fetching} loadingIcon="fas fa-spinner" scrollHeight={"51vh"} ref={(el)=>{this.dt=el;}} onRowClick={(e)=>{this.props.history.push(`/home/user/userprofile/usersummary?${e.data.email}`)}} value={userList} scrollable={true}>
        <Column field="index" header="S.No" filter={true} filterElement={indexFilter} style={{width:"50px"}}/>
        <Column field="_id" header="User ID" filter={true}  style={{width:"59px"}} className='userId'/>       
        <Column field="userName" header="User Name" body={this.userNameTemplate} filter={true} filterElement={userFilter} style={{width:"200px"}}/>
        <Column field="email" header="Email" filter={true} filterElement={emailFilter} style={{width:"250px",textAlign:"left"}}/>
        <Column field="loginType"  header="Type" filter={true} filterElement={typeFilter} style={{width:"90px",textAlign:'center'}}/>       
        <Column field="createdBy" header="Created By" filter={true} filterElement={createdFilter} style={{width:"100px",textAlign:"center"}}/>
        <Column field="createdAt" header="Registration Date" body={this.createdAt} filterElement={registrationDateFilter} filter={true} style={{width:"150px"}} />
        <Column field="lastLogin" header="Last Login" body={this.updatedAt} filterElement={lastLoginFilter} filter={true} style={{width:"150px"}}/>
        <Column field="level" header="Level" body={this.brandTemplate} filter={true} filterElement={levelFilter} style={{width:"70px",textAlign:'center'}}/>
        <Column field="balance" header="Balance" filter={true} filterElement={balanceFilter} style={{width:"100px", textAlign:"right"}}/>
        <Column field="suspend" body={this.suspend} header="Suspend" style={{width:"80px"}} filter={true} filterElement={suspendFilter} />
        <Column field="status"  header="Status" body={this.status}style={{width:"80px",textAlign:"center"}} filter={true} filterElement={statusFilter} /> 
      </DataTable>

 <Pagination  defaultCurrent={0} 
 pageSize={this.state.limit} 
 total={this.props.userArrayList?(this.props.userArrayList.length==0?1:this.props.userArrayList.totalPage)*(this.state.limit):""}
 onChange={(current)=>{
this.onPageChange(current),
this.setState({page:current})
 }} /><br/>
        </div>
    )
  }
}
}
const mapStateToProps=(state)=>{
  return{
    state:state,
    fetching:state.fetching,
    userArrayList:state.userArrayList
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onRequestFilter: (data) => dispatch({ type: User_Filter_Call_Request ,data }),
    onRequestExportCSV: (data,value)=> dispatch({type:USER_TABLE_CSV,data,value}),
    onRequestData: (data) => dispatch({type: User_DATA_Call_Request,data }),
    // createConnection: (id) => dispatch({type:CONNECT_TO_WEBSOCKET,id}),
    // getProductDetail: () => dispatch({type:GET_PRODUCT_DETAIL}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserListTable)