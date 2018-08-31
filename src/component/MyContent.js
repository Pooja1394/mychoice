import React, { Component } from 'react'
import Route from 'react-router-dom/Route';
import {Link} from 'react-router-dom'
import CreateUserContent from './CreateUserContent'
import UserListTable from './userprofile/UserListTable'
import UserProfile from "../containers/UserProfile"
import { Breadcrumb } from 'antd';
import "../style/Content.css"
import Header from "./Header";
export default class MyContent extends Component {
  render() {
    return (
      <div>
          {/* <UserListTable/> */}
          MyContent
          {/* <Route exact path='/home/user' component={UserListTable}/>
        <Route  path='/home/user/createuser' component={CreateUserContent}/>
        <Route  path="/home/user/userprofile" component={UserProfile}/> */}
      </div>
    )
  }
}
