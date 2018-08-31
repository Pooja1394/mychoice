// /*This file contains the code for UserInformation in admin panel 
// Created By-Aviral Garg
// Created On-13/04/18
// */

// import React, { Component } from 'react'
// import { Route } from 'react-router-dom';
// import { Table, Breadcrumb } from 'antd';
// import "../style/Content.css"
// import Header from "./Header";
// import { Link } from 'react-router-dom';
// import CreateUserContent from '../component/CreateUserContent'
// import MyContent from './MyContent';
// import {connect} from "react-redux"
//  class Content extends Component {
//   // constructor(props){
//   //   super(props);
//   //   this.child=React.createRef();
//   // }
// //   handleExportCSV() {
// //     this.dt.exportCSV();
// // }
// exportCSV=()=>{
//   this.props.userTableCSV.exportCSV()
// }
//   render() {
//     return (
//       <div>
       
//        <Header 
//        history={this.props.history}       
//         breadcrumb = {<span id="BreadCrumbspan">
//                         <Breadcrumb separator=">">
//                       <Breadcrumb.Item>Home</Breadcrumb.Item>
//                       <Breadcrumb.Item href="">Users</Breadcrumb.Item>
//                       </Breadcrumb>
//                     </span>
//                   }
//         headername = {<span id="Usertxt">User List</span>}  
//         buttonspan = { <span id="ButtonSpans">
//         <Link to="/home/user/createuser"><button id="btnCreateUser">Create User</button></Link>
//         <button id="btnExportCsv" onClick={()=>{this.exportCSV()}}>Export CSV</button>
//         </span>}               
//         />
//         <Route path='/home/user' component={MyContent} ref="child" />
      
//     </div>
//     )
//   }
// }
// const mapStateToProps=(state)=>{
//   return{   
//     ...state,
//   }
// }

// export default connect(mapStateToProps,null)(Content)
