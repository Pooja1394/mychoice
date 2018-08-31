import React, { Component } from 'react'
import { USER_TABLE_CSV } from '../../actions/types';
import {connect} from "react-redux"
class DashboardContent extends Component {
    componentDidMount(){
this.props.onRequestExportCSV(this.dt, ["50"])
    }
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);