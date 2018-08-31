import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import {Column} from 'primereact/components/column/Column';
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat,api, openNotificationWithIcon } from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import { GET_PRIVILEGES_DATA_REQUEST, USER_TABLE_CSV, SET_PREVILIGES_IN_STORE_REQUEST } from "../../actions/types";

class AddPreviligeTable extends Component {
  state = {
    page: 1,
    limit: 10,
    fetching: false,
    createdDate:"",
    filterName:"",
    filterData:"",
    name:"",
    createdBy:"",
    status:"",
    selectedPrivileges:[],
  };
  componentWillMount(){
    this.props.onRequestExportCSV(this.dt, ["124"]);
    this.props.getPreviligesData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  componentDidMount(){
        let selec=[];
        if (this.props.selectedrows) {
          this.setState({
            selectedPrivileges:this.props.selectedrows
          })
      
          this.props.selectedrows.map((data, key) => {
            let obj;
            obj = {
              ...data,
              index: key + 1
            };
            selec = selec.concat(obj);
          });
        }
        
        this.setState(
          {
            selectedPrivileges:selec
          }
        )
       
      }
  createdByTemplate(rowData, column) {
    if(rowData.createdBy)
    {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.createdBy.picture}`;

    if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.createdBy.ip;
    return (
      <div style={{ display: "flex" }}>
        <div id="UserImageDiv">
         {" "}
          <img
            id="UserAvatarimg"
            src={path2}
            alt="av"
            style={{ height: "30px", width: "30px", borderRadius: "50px" }}
          />
        </div>
        <div>
          <div>{rowData.createdBy.userName}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  }}
  createdAt = (rowData, column) => {
    return (
      <div>
        <div>{DateFormat(rowData.createdAt)}</div>
        <div> {TimeFormat(rowData.createdAt)}</div>
      </div>
    );
  };
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"employee/removeprivilege",
          data:{privilegeId:rowData._id},
        }
         api(data).then((res)=>{
          this.props.getPreviligesData({
            page: this.state.page,
            limit: this.state.limit
          });
        openNotificationWithIcon('success','Privileges','Privileges Deleted Successfully')
         })
       
      }},
     ]
    let srce=require("../../images/tick.png")
    let srce2=require("../../images/cross.png")
    if (rowData.status){
     return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",borderRadius:"2px",marginRight:"10px"}}>
    <img id="UserAvatarimg" src={srce} alt="av" style={{paddingLeft:"3px"}}/></div>
     <SplitButton icon="fa-pencil" onClick={()=>
              this.props.history.push({pathname:`/home/employee/previliges/addpreviliges`,state:rowData})
              
     } model={items}></SplitButton>
     </div>
     }

    else {
     return <div style={{display:"flex"}}>
     <div style={{background:"#d2d6de",width:"30px",padding:"3px",borderRadius:"2px",marginRight:"10px"}}>
     <img id="UserAvatarimg" src={srce2} alt="av" style={{paddingLeft:"4px"}}/></div>
      <SplitButton icon="fa-pencil" 
      onClick={()=>
        this.props.history.push({pathname:`/home/employee/previliges/addpreviliges`,state:rowData})
        
      }
      model={items}></SplitButton>
      </div>
    }
  }
  export = () => {
    this.dt.exportCSV();
  };
  onPageChange = pageNumber => {
    this.props.getPreviligesData({
      page: pageNumber,
      limit: this.state.limit
    });
  };
  previliges(rowData,column){
    let list="";
   
    if(rowData.privilege)
    {
    rowData.privilege.map((value,key)=>{
      (key==0?list+=(rowData.privilege[key].selectPrivilege):list+=" , "+(rowData.privilege[key].selectPrivilege))
      
     }) 
     return (
      <div style={{wordWrap:""}}>
       {list}
        
      </div>
    );
    }
     else{ return (
      <div>helllo</div>
    );}
  }
clearAll=()=>{
  this.setState({
    page: 1,
    limit: 10,
    fetching: false,
    createdDate:"",
    filterName:"",
    filterData:"",
    name:"",
    createdBy:"",
    status:""
  })
  this.props.getPreviligesData({
    page: this.state.page,
    limit: this.state.limit
  });
}
  render() {
    let blankFilter = <InputText readOnly />;
    let privilegeList = [];
    if (this.props.state.data.privilegeData) {
      this.props.state.data.privilegeData.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        privilegeList = privilegeList.concat(obj);
      });
    }

    let createdDateFilter =
    <DatePicker
      allowClear={false}
      value={this.state.createdDate}
      className="ui-column-filter" onChange={
        (date, dateString) => {
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            createdDate: moment(dateString)
          })
          this.props.getPreviligesData({
            page:1,limit:this.state.limit,createdAt:dateString
          })
        }
      } />

      let nameFilter=<InputText 
      value={this.state.name}
      onChange={(e)=>{
        this.setState({
          name:e.target.value,
          filterName:"privilegeName",
          filterData:e.target.value
        })
        this.props.getPreviligesData({
          page:this.state.page,limit:this.state.limit,privilegeName:e.target.value
        })
      }}
      />;
      let createdByFilter=<InputText 
      value={this.state.createdBy}
      onChange={(e)=>{
        this.setState({
          createdBy:e.target.value,
          filterName:"createdBy",
          filterData:e.target.value
        })
        this.props.getPreviligesData({
          page:this.state.page,limit:this.state.limit,createdBy:e.target.value
        })
      }}
      />;
      let statusFilter=<select option="field"
      style={{width: '100%'}} className="ui-column-filter" 
      value={this.state.status} 
      onChange={
        (event)=>{ this.props.getPreviligesData({
          page:this.state.page,limit:this.state.limit,status:event.target.value
        })
        this.setState({status:event.target.value})}}
      
      >
      <option value="">All</option>
    <option value="true">Open</option>
    <option value="false">Lock</option>
    </select>
     
    return (
      <div>
        <div className="depositncredit-table-operations">
          <span onClick={this.clearAll} id="resetText">
            Reset Filter
          </span>
          <span id="showText">Show</span>
          <span id="selecNos">
            <select
              id="NoDropDown"
              onChange={event => {
                this.setState({ limit: event.target.value });
                this.props.getPreviligesData({
                  page: this.state.page,
                  limit: event.target.value
                });
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
          <Link to="/home/employee/previliges/addpreviliges">
            <button id="btnAdd">Add Previliges</button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          value={privilegeList}
          scrollHeight={"51vh"}
          ref={el => {
            this.dt = el;
          }}
          scrollable={true}
          loading={this.props.state.fetching}
           selection={this.state.selectedPrivileges}
           onSelectionChange={(e) => {
            this.setState({selectedPrivileges: e.data}),
            this.props.setPrivileges({
             selectedPrivileges:e.data
            });
          
          }}
        >
         <Column selectionMode="multiple" style={{width:'2em'}}/>
          <Column
            field="index"
            header="S.No"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="PrivilegeId"
            header="Previlige ID"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "110px" }}
          />
          <Column
            field="privilegeName"
            filter={true}
            filterElement={nameFilter}
            header=" Name"
            style={{ width: "120px", textAlign: "center" }}
            className="Image"
          />
         
          <Column
            // field="previliges"
            header="Privileges"
             body={this.previliges}
             filter={true}
           filterElement={blankFilter}
            style={{ width: "120px", textAlign: "left",whiteSpace:"normal" }}
            // className="CreatedBy"
          />
          <Column
            field="createdAt"
            header="Created Date"
             body={this.createdAt}
             filterElement={createdDateFilter}
             filter={true}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
            // filterElement={statusFilter}
          />
         
          <Column
            field="CreatedBy"
            header="Created By"
             body={this.createdByTemplate}
             filter={true}
             filterElement={createdByFilter}
            style={{ width: "120px", textAlign: "left" }}
            className="CreatedBy"
          />
            <Column
            field="status"
            header="Status"
            filter={true}
             body={this.status}
            style={{ width: "120px", textAlign: "left" }}
            filterElement={statusFilter}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={
            this.state.fetching == true
              ? 1
              : (this.props.state.data.privilegeData &&
                  this.props.state.data.totalPage) * this.state.limit
          }
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    fetching: state.fetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPreviligesData: data => dispatch({ type: GET_PRIVILEGES_DATA_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    setPrivileges:(data)=>dispatch({type:SET_PREVILIGES_IN_STORE_REQUEST,data})
  
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPreviligeTable);
