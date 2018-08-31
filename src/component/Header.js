import { Breadcrumb } from 'antd';
import React, { Component } from 'react'
import 'antd/dist/antd.css'; 
import '../style/HeaderStyle.css'
import { Menu, Dropdown, Icon,Upload,Popover,Button} from 'antd';
import {Link} from 'react-router-dom';
import {openNotificationWithIcon} from '../utils/Method'
import {connect} from "react-redux"
import axios from "axios";
import {basepath} from "../utils/Constant";
import {OverlayPanel} from 'primereact/components/overlaypanel/OverlayPanel';
import {TabView,TabPanel} from 'primereact/components/tabview/TabView';
 class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      userimage:[],
      toggle:false,
      visible:false
    }
  }
  logoutmeth=()=>{
    localStorage.clear();
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // localStorage.removeItem("name");
    // localStorage.removeItem("email");
    // localStorage.removeItem("picture");
    // localStorage.removeItem("privileges")
    console.log("history",this.props.history);
   this.props.history.replace({pathname:"/",state:{}});
  }
  handleChange = ({ fileList }) =>{ 
      let data = new FormData();
     data.append("picture",fileList[0].originFileObj)
     let headers={
      'Authorization':'Bearer '+localStorage.getItem("token"),
      'Accept': 'application/json',
    }

axios({
  method: 'post',
  url: basepath + "admin/uploadImage",
  data: data,
  headers:headers

}).then((response) => {
  openNotificationWithIcon('success',"Profile Picture",'Upload SuccessFull');
localStorage.setItem("picture",response.data.picture);
this.setState({
  toggle:!this.state.toggle
})
})
  .catch((error) => {
    console.log("Error")
  })


} 
componentDidMount() {
  let token=localStorage.getItem('token');
  if(!token)
  {
this.props.history.replace({pathname:"/",state:{}});

  }
}
hide = () => {
  this.setState({
    visible: false,
  });
}

handleVisibleChange = (visible) => {
  this.setState({ visible });
}
  render() {
    const uploadButton = (
      <div id="TopHeaderDropdownUserImage">
        {/* <Icon type="plus" /> */}
        <img id="Avatarspan" src={localStorage.getItem("picture")}alt="avator" style={{width:"70px",height:"70px",borderRadius:"43px"}}/>
      </div>
    );
    const menu = (
      <Menu>
        <Menu.Item key="0">
         <div id="TopHeaderDropdownUser">
         <br/>
         <div id="TopHeaderDropdownUserImage">
         
         <Upload
//  action="//jsonplaceholder.typicode.com/posts/"
  listType="picture-card"
  fileList={this.state.userimage}
  onChange={this.handleChange}
>
  {this.state.userimage.length >= 1 ? null : uploadButton}
</Upload></div>
         <h5>{localStorage.getItem("name")}</h5>
         <h5>{localStorage.getItem("email")}</h5>
         </div>
        </Menu.Item>
        <Menu.Item key="1">
        {/* <a href="#">Change Password</a> */}
        <Link to="/home/user/resetpassword">Change Password</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
        <Link to="/home/user/settings">Settings</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
        <div onClick={()=>{this.logoutmeth()}}>Logout</div>
      
        </Menu.Item>
      </Menu>
    );
    return (
    
        <div className="header_container">
        <div id="HeaderTopDiv">
        <ul id="NotiHeaderDiv">
       
        {/* <OverlayPanel ref={(el) => this.op = el}
         dismissable={true}
        >
    {/* <img src={require("../images/notification.png")} alt="Galleria 1" /> */}
    {/* <div style={{height:"300px",width:"400px",backgroundColor:'red'}}></div>
</OverlayPanel>  */}
<Popover
style={{marginRight:"95px"}}
        content={<div style={{width:"400px",height:"300px"}}>
        <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
    <TabPanel header="Latest Orders">
       Latest Orders
    </TabPanel>
    <TabPanel header="New Users">
        New Users
    </TabPanel>
    <TabPanel header="Messages">
        Messages
    </TabPanel>
</TabView>
        </div>}
        title="Notifications"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
       <li id="belllist">
        <img  
        src={require("../images/notification.png")}alt="avator" 
        style={{height:"23px",marginTop:"12px",borderRadius:"13px",marginRight:"35px"}}/>
        </li>
      </Popover>
        <li id="Avatarspan1"><img id="Avatarspan" src={localStorage.getItem("picture")}alt="avator" style={{height:"27px",marginTop:"12px",borderRadius:"13px",marginRight:"15px"}}/></li>
        <li>
        <Dropdown id="TopDropDown"overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#">
    {localStorage.getItem("name")} <Icon type="down" />
    </a></Dropdown></li>
        </ul></div>
      <div id="HeaderDiv2">
      {this.props.breadcrumb}
      <span id="UserList"> 
      {this.props.headername}
      {this.props.buttonspan}
     </span>
      </div>      
      </div>
   
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    state:state,
  }
}
export default connect(mapStateToProps)(Header);