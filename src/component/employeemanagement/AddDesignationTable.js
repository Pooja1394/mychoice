import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import {Column} from 'primereact/components/column/Column';
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat,api, openNotificationWithIcon } from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import { GET_DESIGNATION_DATA_REQUEST, USER_TABLE_CSV, SET_PREVILIGES_IN_STORE_REQUEST, SET_DESIGNATION_IN_STORE_REQUEST } from "../../actions/types";

 class AddDesignationTable extends Component {
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
    selectedDesignation:[]
  };
  componentWillMount(){
    this.props.getDesignationData({
      page:this.state.page,
      limit:this.state.limit
    });
  
    this.props.onRequestExportCSV(this.dt, ["123"]);
  }
  componentDidMount(){
    let selec=[];
    if (this.props.selectedrows) {
      this.setState({
        selectedDesignation:this.props.selectedrows
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
        selectedDesignation:selec
      }
    )
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        <div>{DateFormat(rowData.createdAt)}</div>
        <div> {TimeFormat(rowData.createdAt)}</div>
      </div>
    );
  };
  onPageChange = pageNumber => {
    this.props.getDesignationData({
      page: pageNumber,
      limit: this.state.limit
    });
  };
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"employee/removeDesignation",
          data:{DesignationId:rowData._id},
        }
         api(data).then((res)=>{
          this.props.getDesignationData({
            page: this.state.page,
            limit: this.state.limit
          });
        openNotificationWithIcon('success','Designation','Designation Deleted Successfully')
         })
        
      }},
     ]
    let srce=require("../../images/tick.png")
    let srce2=require("../../images/cross.png")
    if (rowData.status){
     return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",borderRadius:"2px",marginRight:"10px"}}>
    <img id="UserAvatarimg" src={srce} alt="av" style={{paddingLeft:"3px"}}/></div>
     <SplitButton icon="fa-pencil" onClick={()=>{
    
       this.props.history.push({pathname:`/home/employee/designation/adddesignation`,state:rowData})
     }} model={items}></SplitButton>
     </div>
     }

    else {
     return <div style={{display:"flex"}}>
     <div style={{background:"#d2d6de",width:"30px",padding:"3px",borderRadius:"2px",marginRight:"10px"}}>
     <img id="UserAvatarimg" src={srce2} alt="av" style={{paddingLeft:"4px"}}/></div>
      <SplitButton icon="fa-pencil" 
      onClick={()=>
        this.props.history.push({pathname:`/home/employee/designation/adddesignation`,state:rowData})
       
      }
      model={items}></SplitButton>
      </div>
    }
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
  export = () => {
    this.dt.exportCSV();
  };
  previliges(rowData,column){
    let list="";
   
    if(rowData.privilege)
    {
    rowData.privilege.map((value,key)=>{
      rowData.privilege[key].privilege.map((value,key1)=>{
        (key==0?list+=(rowData.privilege[key].privilege[key1].selectPrivilege):list+=" , "+(rowData.privilege[key].privilege[key1].selectPrivilege))
        
      })
      
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
  // previliges(rowData,column){
  //   let list="";
  //   console.log("rorororor",rowData)
  //   if(rowData.privilege)
  //   {
  //   rowData.privilege.map((value,key)=>{
  //     rowData.privilege[key].privilege.map((value,key)=>{
  //       (key==0?list+=(rowData.privilege[key].privilege[key].selectPrivilege):list+=" , "+(rowData.privilege[key].privilege[key].selectPrivilege))
       
  //     })
      
  //    }) 
  //    console.log("rorororor",list)
  //    return (
  //     <div>
  //      {list}
  //       {console.log("prieiieieie",list)}
  //     </div>
  //   );
  //   // }
  //   //  else{ return (
  //   //   <div>helllo</div>
  //   // );
  // }
  // }
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
    this.props.getDesignationData({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  render() {
    let designationList = [];
    if (this.props.state.data.projects) {
      this.props.state.data.projects.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        designationList = designationList.concat(obj);
      });
    }
    let blankFilter = <InputText readOnly />;

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
          this.props.getDesignationData({
            page:1,limit:this.state.limit,createdAt:dateString
          })
        }
      } />

      let nameFilter=<InputText 
      value={this.state.name}
      onChange={(e)=>{
        this.setState({
          name:e.target.value,
          filterName:"DesignationName",
          filterData:e.target.value
        })
        this.props.getDesignationData({
          page:this.state.page,limit:this.state.limit,DesignationName:e.target.value
        })
      }}
      />;
      let createdByFilter=<InputText 
      value={this.state.createdBy}
      onChange={(e)=>{
        this.setState({
          // createdBy:e.target.value,
          filterName:"createdBy",
          filterData:e.target.value
        })
        this.props.getDesignationData({
          page:this.state.page,limit:this.state.limit,createdBy:e.target.value
        })
      }}
      />;
      let statusFilter=<select option="field"
      style={{width: '100%'}} className="ui-column-filter" 
      value={this.state.status} 
      onChange={
        (event)=>{ this.props.getDesignationData({
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
                this.props.getDesignationData({
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
          <Link to="/home/employee/designation/adddesignation">
            <button id="btnAdd" style={{width:"120px"}}>Add Designation</button>
          </Link>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <DataTable
          columnResizeMode="expand"
          resizableColumns={true}
          loadingIcon="fas fa-spinner"
          scrollHeight={"51vh"}
          ref={el => {
            this.dt = el;
          }}
          scrollable={true}
          value={designationList}
          loading={this.props.state.fetching}
          selection={this.state.selectedDesignation}
                    onSelectionChange={(e) => {
                     this.setState({selectedDesignation: e.data}),
                     this.props.setDesignation({
                      selectedDesignation:e.data
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
            field="DesignationId"
            header="Designation ID"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "110px" }}
          />
          <Column
            field="DesignationName"
            filter={true}
         filterElement={nameFilter}
            header=" Name"
            style={{ width: "120px", textAlign: "center" }}
            className="Image"
          />
         
          <Column
            field="previliges"
            header="Previliges"
            filter={true}
             body={this.previliges}
             filterElement={blankFilter}
           
            style={{ width: "120px", textAlign: "left",whiteSpace:"normal"  }}
            // className="CreatedBy"
          />
          <Column
            field="createdAt"
            header="Created Date"
            filterElement={createdDateFilter}
            filter={true}
            body={this.createdAt}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
            // filterElement={statusFilter}
          />
         
          <Column
            field="CreatedBy"
            header="Created By"
            filter={true}
           body={this.createdByTemplate}
            filterElement={createdByFilter}
            style={{ width: "120px", textAlign: "left" }}
            className="CreatedBy"
          />
            <Column
            field="status"
            header="Status"
            filter={true}
           body={this.status}
            style={{ width: "120px", textAlign: "left", overflowX: "visible" }}
           filterElement={statusFilter}
          />
        </DataTable>
        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={
            this.state.fetching == true
              ? 1
              : (this.props.state.data.projects &&
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
    getDesignationData: data => dispatch({ type: GET_DESIGNATION_DATA_REQUEST, data }),
    onRequestExportCSV: (data, value) => dispatch({ type: USER_TABLE_CSV, data, value }),
    setDesignation:(data)=>dispatch({type:SET_DESIGNATION_IN_STORE_REQUEST,data})
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDesignationTable);
