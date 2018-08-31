import React, { Component } from 'react';
import {connect} from "react-redux"
import {GET_LOGS_CONTENT_REQUEST,USER_TABLE_CSV} from "../../actions/types"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../style/logs/logscontent.css";
import { api, DateFormat,TimeFormat} from '../../utils/Method';
import { imagebasepath } from '../../utils/Constant';
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { SplitButton } from 'primereact/components/splitbutton/SplitButton';
import { InputText } from 'primereact/components/inputtext/InputText';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import {checkdisplay} from '../../utils/Method';
import moment from "moment";
class LogsContent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: '',
      createdAt: '',
      userType: [],
      objectType: '',
      activities: '',
      limit: 10,
      page: 1,
      filterData: '',
      filterName: '',
    }
  }

  componentWillMount() {
    this.props.state  && checkdisplay("Logging")?"":(this.props.history.push('/home/dash'))
    
    this.props.getLogsData();
    this.props.onRequestExportCSV(this.dt,["8"])
  }
  componentDidMount() {
    this.setState({ loader: false })
  }
  users(rowData, column) {
    if(rowData.users)
    {
    let srce, ipAddr;
    let path2 = `${imagebasepath}${rowData.users.picture}`;

    if (rowData.users.ip == "" || rowData.users.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.users.ip;
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
          <div>{rowData.users.userName}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  }
}
createdAt = (rowData, column) => {
  return (
    <div>
      {DateFormat(rowData.createdAt)}&nbsp;&nbsp;
       {TimeFormat(rowData.createdAt)}
    </div>
  );
};
clearAll=()=>{
  this.setState({
  userName: "",
  email: '',
  createdAt: '',
  userType: [],
  objectType: '',
  activities: ''
  });
  this.props.getLogsData();
}

  render() {
    let blankFilter = <InputText readOnly />;
    
    let userFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
    value={this.state.userName}
    onChange={(e)=>{
    this.setState({filterName:"userName",filterData:e.target.value,page:1,userName:e.target.value})
    this.props.getLogsData({page:1,limit:this.state.limit,userName:e.target.value})}}
    />

    let emailFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
    value={this.state.email}
    onChange={(e)=>{
    this.setState({filterName:"loginType",filterData:e.target.value,page:1,email:e.target.value})
    this.props.getLogsData({page:1,limit:this.state.limit,email:e.target.value})}}
    />

    let userTypeFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
    value={this.state.userType}
    onChange={(e)=>{
    this.setState({filterName:"loginType",filterData:e.target.value,page:1,userType:e.target.value})
    this.props.getLogsData({page:1,limit:this.state.limit,userType:e.target.value})}}
    />

    let objectTypeFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
    value={this.state.objectType}
    onChange={(e)=>{
    this.setState({filterName:"loginType",filterData:e.target.value,page:1,objectType:e.target.value})
    this.props.getLogsData({page:1,limit:this.state.limit,objectType:e.target.value})}}
    />

    let activitiesFilter=<InputText className="ui-column-filter" style={{width: '100%'}}
    value={this.state.activities}
    onChange={(e)=>{
    this.setState({filterName:"loginType",filterData:e.target.value,page:1,activities:e.target.value})
    this.props.getLogsData({page:1,limit:this.state.limit,activities:e.target.value})}}
    />

    let dateFilter=
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
    this.props.getLogsData({page:1,limit:this.state.limit,createdAt:dateString})
}
}/>
    console.log("logs",this.props.state);
    let logsList=[];
    if(this.props.state.logsData){
      this.props.state.logsData.logModelData.map((data,key)=>{
        let obj;
        obj={
          ...data,
          index:((key+1)+((this.state.page-1)*this.state.limit))
          }
        logsList=logsList.concat(obj)
      })
    }
    const { fetching, data, onAuctionProductList, onAuctionFilter, error } = this.props;
    return (
      <div className="main_auction_div">
        {/* <Growl ref={(el) => { this.growl = el; }}></Growl> */}
        <div className="auction_header">
          <div id="header_content">All Logs</div>
          <div id="filter_content">
            <ul>
              <li onClick={this.clearAll}>Reset Filter</li>
              <li>Show</li>
              <li>
                <select onChange={(event) => {
                    this.setState({ limit: event.target.value })
                }}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </li>
            </ul>
          </div>
        </div>{/*--------end of auction_header----------- */}

        <div className="logs-main-div">
          <DataTable
            resizableColumns={true}
             columnResizeMode="expand"
            scrollHeight={"200px"} 
            scrollable={true} 
            value={logsList}
            style={{ marginTop: '30px', width: '100%' }}
            selection={this.state.selectedItem}
             onSelectionChange={(e) => { this.setState({ selectedItem: e.data }), this.props.deleteAuctionProductList(e.data) }}
            loading={fetching} 
            loadingIcon="fas fa-spinner"
          >
            <Column field="index" header="S.NO" filter={true} filterElement={blankFilter} style={{ width: "45px", textAlign: 'left' }} />
            <Column field="_id" header="ID" filterElement={blankFilter} filter={true} style={{ width: "50px", textAlign: 'center' }} />
            <Column header="Username" body={this.users} filterElement={userFilter} filter={true} style={{ width: "120px", textAlign: 'left' }} />
            <Column field="email" header="Email" filterElement={emailFilter} filter={true} style={{ width: "160px", textAlign: 'left' }} />
            <Column header="Date" body={this.createdAt} filterElement={dateFilter} filter={true} style={{ width: "120px", textAlign: 'center' }} />
            <Column field="userType" header="User Type" filterElement={userTypeFilter} filter={true} style={{ width: "70px", textAlign: 'center' }} />
            <Column field="objectType" header="Object Type" filterElement={objectTypeFilter} filter={true} style={{ width: "100px", textAlign: 'left' }} />
            <Column field="activities" header="Activities" filterElement={activitiesFilter} filter={true} style={{ width: "200px", textAlign: 'left' }} />
          </DataTable>
          <Pagination
          current={this.state.page}
          defaultCurrent={1}
          pageSize={10}
          total={this.props.state.logsData?this.props.state.logsData.totalPage*(this.state.limit):""}
          onChange={(current,total) => {
            this.onPageChange(current,total), this.setState({ page: current });
          }}
        />

        </div>          {/*--------end of main_table_container----------- */}


      </div>/*=================end of main_auction_div========================*/

    )
  }
}

const mapStateToProps = state => {
    return {
      state: state,
      fetching: state.fetching
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      getLogsData: data =>
        dispatch({ type: GET_LOGS_CONTENT_REQUEST, data }),
      onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value })
    };
  };
  export default connect(  mapStateToProps,  mapDispatchToProps)(LogsContent);
  