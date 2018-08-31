import React, { Component } from 'react'
import { Breadcrumb, Menu,Modal,Row,Col,Select ,Checkbox,Pagination,Radio,DatePicker} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { RadioButton } from "primereact/components/radiobutton/RadioButton";
import {connect} from "react-redux";
import moment from "moment";
import {api,DateFormat,TimeFormat,checkdisplay} from "../../utils/Method"
import {imagebasepath} from "../../utils/Constant"
import { openNotificationWithIcon} from "../../utils/Method"
import "../../style/notifications/notificationscontent.css";
import {User_Filter_Call_Request, GET_NOTIFICATION_DATA_REQUEST, USER_TABLE_CSV} from "../../actions/types"
import "../../style/review/review.css";
class NotificationContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     fetching:false,
     title:"",
     type:"",
     content:"",
     page:1,
     limit:10, 
     modal2Visible:false,
     notificationFor:"",
     userSelectedList:[],
     options:[],
     replymodalvisible:false,
     replyTitle:"",
     replyContent:"",
     replyType:"",
     replyIsExchange:false,
     replyIsReply:false,
     createdAt:"",
     notificationselectedlist:[],
     titleFilter:"",
     replyUserId:"",
     userName:"",
     email:"",
     action:"",
     messagesFilter:"",
     senderFilter:"",
     notificationType:""
    };
  }
  componentWillMount() {
    this.props.state  && checkdisplay("Notification")?"":(this.props.history.push('/home/dash'))
    
    this.props.onRequestNotificationData({page: this.state.page,
      limit: this.state.limit});
    this.props.onRequestData({
      page: this.state.page,
      limit: this.state.limit
    });
    this.props.onRequestExportCSV(this.dt,["14"])
    let desigdata = {
      method: "get",
      url: `type/gettype`
    };
    api(desigdata).then(res => {
  
      let data = res.data;
      let results = data[0].type.map((v, k) => {
        return {
          label: v,
          value:v
        };
      });
      this.setState({ 
      options:results });
    
    });
  }
  clearAll = () => {
    this.setState({
      createdAt:"",
      page:1,
      limit:10,
      titleFilter:"",
      type:"",
      action:"",
      senderFilter:"",
      messagesFilter:"",
      notificationType:""
    })
    this.props.onRequestNotificationData({page: this.state.page,
      limit: this.state.limit});
  }
  sender(rowData, column) {

    if(rowData.sender)
    {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.sender.img}`;

    if (rowData.sender.ip == "" || rowData.sender.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.sender.ip;
    return (
      <div style={{ display: "flex" }}>
        <div id="UserImageDiv">
          <img
            id="UserAvatarimg"
            src={path2}
            alt="av"
            style={{ height: "30px", width: "30px", borderRadius: "50px" }}
          />
        </div>
        <div>
          <div>{rowData.sender.name}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  }
}
  onPageChange = (pageNumber) =>{
    // console.log("hello",pageNumber)
    this.props.onRequestData({
      page: pageNumber,
      limit: this.state.limit
    });
    // this.props.onRequestFilter({page:pageNumber,limit:this.state.limit,[this.state.filterName]:this.state.filterData});
  }
  onNotiPageChange = (pageNumber,total) =>{
    console.log("hello",pageNumber,total)
    this.props.onRequestNotificationData({
      page: pageNumber,
      limit: this.state.limit
    });
    // this.props.onRequestFilter({page:pageNumber,limit:this.state.limit,[this.state.filterName]:this.state.filterData});
  }
  
  notificationType(rowData,column){
    return <div style={{display:"flex"}}>
   {rowData.notificationType[0]}
    </div>
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;&nbsp;
         {TimeFormat(rowData.createdAt)}
      </div>
    );
  };
  actioncolumn=(rowData,column)=>{
    if(rowData.action=='exchange')
return <div style={{color:'red'}}>Exchange</div>
else if(rowData.action=='reply')
return <div style={{color:'green'}} onClick={()=>{
 
this.setState({
  replymodalvisible:true,
  replyUserId:rowData.userId,
  replyContent:"This reply is in response of notification "+rowData.title+" with details  "+rowData.content
})
}}>Reply</div>
   else
   return <div></div>
  }
  userNameTemplate(rowData,column){
    let srce,ipAddr;
    let path2=`${imagebasepath}${rowData.picture}`
    if(rowData.picture==""||rowData.picture==undefined)
    {
      srce=""
    }
    else if(rowData.loginType=="Facebook" || rowData.loginType=="Google"){
      srce=rowData.picture
    }
    else
    srce=path2
if(rowData.ipAddress==""||rowData.ipAddress==undefined)
ipAddr="192.168.17.9"
else
ipAddr=rowData.ipAddress;
    return <div style={{display:"flex"}}>
     <div id="UserImageDiv"><div id="OnlineCursordiv"></div> <img id="UserAvatarimg"src={srce} alt="av" style={{height:"30px",width:"30px",borderRadius:"50px"}}/></div>
      <div><div>{rowData.userName}</div><div>{ipAddr}</div></div>
      </div>;
  }
  render() {

    let actionFilter=<select option="field"
    style={{width: '100%'}} className="ui-column-filter" 
    value={this.state.action} 
    onChange={(event)=>{
     this.setState({filterName:"action",filterData:event.target.value,page:1,action:event.target.value}) 
     this.props.onRequestNotificationData({page:1,limit:this.state.limit,action:event.target.value});
    //  this.setState({brand2:event.target.value})
    }}
    >
    <option value="">All</option>
  <option value="reply">Reply</option>
  <option value="exchange">Exchange</option>
  </select>

let notificationtypeFilter= <select option="field"
style={{width: '100%'}} className="ui-column-filter" 
value={this.state.notificationType} 
onChange={(event)=>{
 this.setState({filterName:"notificationType",filterData:event.target.value,page:1,notificationType:event.target.value}) 
 this.props.onRequestNotificationData({page:1,limit:this.state.limit,notificationType:event.target.value});
}}
>
<option value="">All</option>
<option value="report">Report</option>
<option value="alert">Alert</option>
<option value="announce">Announce</option>
<option value="thanks">Thanks</option>
<option value="replied">Replied</option>
</select>

let createdAtFilter=
<DatePicker 
 allowClear={false}
 value={this.state.createdAt}
className="ui-column-filter" onChange={
 (date, dateString)=> {
  this.setState({
    filterName:"createdAt",
    filterData:dateString,
    page:1,
    createdAt: moment(dateString)
  })
   this.props.onRequestNotificationData({page:1,limit:this.state.limit,createdAt:dateString})
}
}/>

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

let userFilter=<InputText className="ui-column-filter"
style={{width: '100%'}}
value={this.state.userName}
onChange={(e)=>{
  this.setState({filterName:"userName",filterData:e.target.value,page:1,userName:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,userName:e.target.value})
}}
/>

let titleFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
value={this.state.titleFilter}
onChange={(e)=>{
  this.setState({filterName:"title",filterData:e.target.value,page:1,titleFilter:e.target.value})
  this.props.onRequestNotificationData({page:1,limit:this.state.limit,title:e.target.value})}}
/>

let messagesFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
value={this.state.messagesFilter}
onChange={(e)=>{
  this.setState({filterName:"messagesFilter",filterData:e.target.value,page:1,messagesFilter:e.target.value})
  this.props.onRequestNotificationData({page:1,limit:this.state.limit,content:e.target.value})}}
/>

let senderFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
value={this.state.senderFilter}
onChange={(e)=>{
  this.setState({filterName:"senderFilter",filterData:e.target.value,page:1,senderFilter:e.target.value})
  this.props.onRequestNotificationData({page:1,limit:this.state.limit,sender:e.target.value})}}
/>


    let blankFilter = <InputText readOnly />;
    let NotificationList=[]
    let userList=[]

    
    if(this.props.state.userArrayList.userList){
      this.props.userArrayList.userList.map((data,key)=>{
        let obj;
        obj={
          ...data,
          index:((key+1)+((this.state.page-1)*this.state.limit))
          }
        userList=userList.concat(obj)
      })
    }
  if(this.props.state.notificationList.data){
    this.props.state.notificationList.data.map((data,key)=>{
      let obj;
      obj={
        ...data,
        index:((key+1)+((this.state.page-1)*this.state.limit))
        }
      NotificationList=NotificationList.concat(obj)
    })
  }
    return (
      <div >
      <div className="main_auction_div">
        <div className="auction_header">
        <div id="header_content">All Notifications</div>
        </div>
        <div style={{height:"50px",display:"flex",justifyContent:"flex-end"}}>
        <span onClick={this.clearAll} id="resetText">Reset Filter</span>
         <button id="buttonExportCsv" style={{ width: "130px", borderRadius: "3px",
            backgroundColor: "#3c8dbc", color: "white"
          }} onClick={()=>{this.setState({modal2Visible:true})}}>Send Notification</button>
 
  <button id="buttonExportCsv" 
  style={{backgroundColor:"#dd4b39" ,color:"white"}}
  disabled={this.state.notificationselectedlist.length==0}
  onClick={()=>{
    let list = [];
    this.state.notificationselectedlist.map((v, k) => {
      list = list.concat(v._id);
    });
   
   if(list.length!=0)
   {
    let data = {
      method: "delete",
      url: `notify/removenotify`,
      data:{
       _id:list
      }
    };
   
    api(data).then(res => {
     openNotificationWithIcon("success","Notification",'Notifications Removed Successfully')
    this.props.onRequestNotificationData({page: this.state.page,
      limit: this.state.limit});
    this.setState({
      notificationselectedlist:[] 
    })
    })}
  }}
  >Delete</button>
        </div>
  </div>
        <Modal
        className="send-notification-modal"
        closable={false}
        width='60%'
    title="Send Notification"
    wrapClassName="vertical-center-modal"
    visible={this.state.modal2Visible}
    okText={"Send"}
  onOk={() => {
    if(this.state.title=="")
    openNotificationWithIcon("warning","Title",'Enter Title field')
    else  if(this.state.notificationType=="")
    openNotificationWithIcon("warning","Type",'Enter Type field')
    else  if(this.state.content=="")
    openNotificationWithIcon("warning","Content",'Enter Content field')
    else  if(this.state.userSelectedList=="")
    openNotificationWithIcon("warning","Users",'Select Some Users')
    else
    {
        let userseleclist = [];
        this.state.userSelectedList.map((v, k) => {
          userseleclist = userseleclist.concat(v._id);
        });
   
       if(userseleclist.length!=0)
       {
      let data = {
        method: "post",
        url: `notify/sendtext`,
        data:{
         title:this.state.title,
         notificationType :this.state.notificationType,
         content:this.state.content,
         userId:userseleclist,
         action:this.state.notificationFor
        }
      };
      api(data).then(res => {
        this.setState({modal2Visible:false})
        openNotificationWithIcon("success","Notification",'Notification Sent Successfully')
      this.props.onRequestNotificationData({page: this.state.page,
        limit: this.state.limit});
      this.setState({
        title:"",
        type:"",
        content:"",
        userSelectedList:[],
        notificationFor:"",
        userName:"",
        email:"",

      })
      })}
     
    }
  }}
     onCancel={() => this.setState({modal2Visible:false})}
  >
  <div>
    <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Title <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 12, offset: 1 }}>
                <InputText
                  className="CreateUserField"
                  value={this.state.title}
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Type <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 12, offset: 1 }}>
              <Dropdown
               value={this.state.notificationType}
              placeholder="Select Type"
                options={this.state.options}
               onChange={e => {
                this.setState({ notificationType: e.value
                });
              }}
              style={{
                width: "75%",
                height: "41px",
                background: "none"
              }}
            />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Content <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 12, offset: 1 }}>
                <InputTextarea
                  className="content-textarea"
                  value={this.state.content}
                  onChange={e => {
                    this.setState({ content: e.target.value });
                  }}
                  rows={7}
                  cols={33}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 4 }} style={{ textAlign: "right" }}>
              <RadioButton 
              name="notiType"
              value="reply"
              onChange={(e)=>{
                this.setState({notificationFor:e.value})
              }}
              checked={this.state.notificationFor === "reply"}
              />Reply
              </Col>
              <Col md={{ span: 12, offset: 1 }}>
              <RadioButton 
              name="notiType"
              value="exchange"
              onChange={(e)=>{
                this.setState({notificationFor:e.value})
              }}
              checked={this.state.notificationFor === "exchange"}
              />Exchange
              </Col>
            </Row>
            <div className="user-table-div">
            <div className="user-table-header">
              <span id="UserText">All Users</span>
            </div>
            <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          loading={this.props.fetching}
          scrollHeight={"51vh"}
          value={userList}
          scrollable={true}
          onSelectionChange={(e)=>{
          this.setState({userSelectedList:e.data,
          })
        }}
          selection={this.state.userSelectedList}
        >
               <Column selectionMode="multiple" style={{width:'30px'}}/>
          <Column
            field="index"
            header="S.No"
            filter={true}
             filterElement={blankFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="_id"
            header="User ID"
            filter={true}
           filterElement={blankFilter}
            style={{ width: "60px" }}
            className="bankName"
          />
           <Column
            header="User Name"
           body={this.userNameTemplate}
            filterElement={userFilter}
            filter={true}
            style={{ width: "110px", textAlign: "center" }}
            className="CreatedDate"
          />
           <Column
            header="Email"
           field="email"
            filterElement={emailFilter}
            filter={true}
            style={{ width: "130px", textAlign: "left" }}
            className="CreatedDate"
          />
           <Column
            header="Type"
           field="loginType"
           filterElement={typeFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
        </DataTable>
        <Pagination
          defaultCurrent={1}
          current={this.state.page}
          pageSize={10}
          total={this.props.userArrayList?(this.props.userArrayList.length==0?1:this.props.userArrayList.totalPage)*(this.state.limit):""}
          // total={this.props.state.reviewData?this.props.state.reviewData.totalpage * 5:""}
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
            </div>
            </div>
  </Modal>
  <Modal
         width='40vw'
        closable={false}
        className="send-notification-modal"
    title="Reply Notification"
    wrapClassName="vertical-center-modal"
    visible={this.state.replymodalvisible}
    okText={"Send"}
  onOk={() => {
    if(this.state.replyTitle=="")
    openNotificationWithIcon("warning","Title",'Enter Title field')
    else  if(this.state.replyType=="")
    openNotificationWithIcon("warning","Type",'Enter Type field')
    else  if(this.state.replyContent=="")
    openNotificationWithIcon("warning","Content",'Enter Content field')
    else
    {
      let actionkey;
      if(this.state.replyIsReply)
      actionkey ="reply"
      else if(this.state.replyIsExchange)
      actionkey="exchange"
      else 
      actionkey=""
      let data = {
        method: "post",
        url: `notify/sendtext`,
        data:{
         title:this.state.replyTitle,
         notificationType :this.state.replyType,
         content:this.state.replyContent,
        userId:this.state.replyUserId,
        action:actionkey
        }
      };
      api(data).then(res => {
        this.setState({replymodalvisible:false})
        openNotificationWithIcon("success","Notification",'Notification Sent Successfully')
        this.props.onRequestNotificationData({page: this.state.page,
          limit: this.state.limit});
        this.setState({
          title:"",
          type:"",
          content:"",
          userSelectedList:[],
          notificationFor:"",
          userName:"",
          email:"",
  
        }) 
      
      })
     
    }
  }}
     onCancel={() => this.setState({replymodalvisible:false})}
  >
  <div>
    <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Title <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <InputText
                  className="CreateUserField"
                  value={this.state.replyTitle}
                  onChange={e => {
                    this.setState({ replyTitle: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Type <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
              <Dropdown
               value={this.state.replyType}
              placeholder="Select Type"
                options={this.state.options}
               onChange={e => {
                this.setState({ replyType: e.value
                });
              }}
              style={{
                width: "75%",
                height: "41px",
                background: "none"
              }}
            />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }} style={{ textAlign: "right" }}>
                <span id="BrandSpan" className="CreateUserText">
                  Content <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 18, offset: 1 }}>
                <InputTextarea
                  className="content-textarea"
                  value={this.state.replyContent}
                  onChange={e => {
                    this.setState({ replyContent: e.target.value });
                  }}
                  rows={7}
                  cols={25}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 5 }} style={{ textAlign: "right" }}>
              <Checkbox onChange={()=>{
                this.setState({replyIsReply:!this.state.replyIsReply})
              }}>Reply</Checkbox>
              </Col>
              <Col md={{ span: 6, offset: 2 }}>
              <Checkbox onChange={()=>{
                this.setState({replyIsExchange:!this.state.replyIsExchange})
              }}>Exchange</Checkbox>
              </Col>
            </Row>
            </div>
        </Modal>
        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loading={this.props.fetching}
          loadingIcon="fas fa-spinner"
          scrollHeight={"100vh"}
          scrollable={true}
          value={NotificationList}
          onSelectionChange={(e)=>{
          this.setState({notificationselectedlist:e.data,
          })
        }}
          selection={this.state.notificationselectedlist}
        >
         <Column selectionMode="multiple" style={{width:'30px'}}/>
        <Column 
            field="index"
            header="S.No"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "50px", textAlign: "left" }}
          />
          <Column
            field="_id"
            header="ID"
          filterElement={blankFilter}
            filter={true}
            style={{ width: "50px" }}
            className="BankId"
          />
          <Column
            field="createdAt"
            filter={true}
            body={this.createdAt}
            filterElement={createdAtFilter}
            header="Received Date"
            style={{ width: "140px", textAlign: "center" }}
            className="Image"
          />
          <Column
            field="title"
            header="Notification Title"
            filter={true}
             filterElement={titleFilter}
            style={{ width: "200px" }}
            className="bankName"
          />
          <Column
            field="content"
            header="Messages"
            filter={true}
            filterElement={messagesFilter}
            style={{ width: "170px", textAlign: "left",whiteSpace:"initial" }}
            className="ShortName"
          />
          <Column
            field="notificationType"
            header="Notification Type"
             body={this.notificationType}
            filterElement={notificationtypeFilter}
            filter={true}
            style={{ width: "160px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="sender"
            header="Sender"
             body={this.sender}
            filter={true}
            filterElement={senderFilter}
            style={{ width: "150px", textAlign: "left" }}
           
          />
          <Column
            field="action"
            header="Action"
           body={this.actioncolumn}
            filter={true}
            filterElement={actionFilter}
            style={{ width: "120px", textAlign: "center" }}
            className="CreatedDate"
          />
        </DataTable>
        <Pagination
          current={this.state.page}
          defaultCurrent={1}
          pageSize={10}
          total={this.props.state.notificationList.data?(this.props.state.notificationList.data==0?1:this.props.state.notificationList.totalPages)*(this.state.limit):""}
          // total={this.props.state.reviewData?this.props.state.reviewData.totalpage * 5:""}
          onChange={(current,total) => {
            this.onNotiPageChange(current,total), this.setState({ page: current });
          }}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {

  return {
    state: state,
    fetching: state.fetching,
    userArrayList: state.userArrayList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestFilter: (data) => dispatch({ type: User_Filter_Call_Request ,data }),
    onRequestData: data => dispatch({ type: User_Filter_Call_Request, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    onRequestNotificationData:data=>dispatch({type:GET_NOTIFICATION_DATA_REQUEST,data})
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationContent);