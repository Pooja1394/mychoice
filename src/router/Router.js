import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from '../component/Login';
import AdminPanel from '../containers/AdminPanel';
import '../style/login.css';

  export default class RootRouter extends Component {
  render() {
    return (
      <div id="FullDiv1">
        <Router>
          <div>
        <Route exact path='/' component={Login}/>
        <Route path='/home' component={AdminPanel}/>
        </div>
        </Router>
      </div>
    )
  }
}
