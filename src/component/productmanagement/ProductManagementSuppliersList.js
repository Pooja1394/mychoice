/*This file contains the code for Product Information in admin panel 
Created By-Aviral Garg
Created On-16/04/18
*/

import React, { Component } from 'react'
import {Route,Link} from 'react-router-dom';
import { Layout,Table,Breadcrumb,Menu} from 'antd';
import Header from "../Header";
import "../../style/ProductManagement.css";
import {connect} from "react-redux";
import moment from "moment";
import { User_Filter_Call_Request, GET_SUPPLIERS_CALL_REQUEST,USER_TABLE_CSV} from '../../actions/types';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Growl} from 'primereact/components/growl/Growl';
import { Pagination,DatePicker } from 'antd';
import {DateFormat,api,checkDeletePrivileges} from '../../utils/Method';
import {basepath,imagebasepath} from "../../utils/Constant";
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

class ProductManagementSuppliersList extends Component {
  state = {
    arr:[],
    searchText:"",
    searchusernametext:"",
    id:"",
    supplierName:"",
    brand:"",
    createdBy:"",
    status:"",
    loader:false   ,
    page:1,
    limit:10,
    count:1, 
    filterName:"",
    filterData:"",
    created:""
  };
  componentDidMount() {
    this.props.onRequestExportCSV(this.dt,["24"])
    this.props.onRequestData({page:this.state.page,limit:this.state.limit});
  }
  
  onPageChange = (pageNumber) =>{
    this.props.onRequestData({page:pageNumber,limit:this.state.limit});
  }

  TimeFormat=(date)=>{
    let res = date.split("T");
    let time= res[1].split(".");
    console.log(time);
    let datee=new Date(date);
      console.log("===>hello",datee.toLocaleTimeString())
       return datee.toLocaleTimeString();
    
  // return time[0];
  }
  
  companyLogo(rowData,column){
    console.log("helloin",rowData)
    // var src = "showcase/resources/demo/images/car/" + rowData.brand + ".png";
    let srce;
      let path2=`${imagebasepath}/${rowData.image}`
      if(rowData.image==""||rowData.image==undefined)
      {
        srce="hello"
      }
      else
      srce=path2
      return <div>
        <img id="UserAvatarimg" src={srce} alt="av" style={{height:"40px",width:"90px",marginRight:"10px"}}/>
        {rowData.userName}
        </div>;
  }
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"supplier/deletesupplier",
          data:{_id:rowData._id},
        }
        api(data).then((res)=>{
        this.props.onRequestData({page:this.state.page,limit:this.state.limit});
        this.growl.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
        
        console.log("====>",res)
        })
          console.log("hello",{_id:rowData._id})
      }},
     ]
    let srce=require("../../images/tick.png")
    let srce2=require("../../images/cross.png")
    if (rowData.status){
     return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",height:"30px",borderRadius:"2px",marginRight:"10px"}}><img id="UserAvatarimg" src={srce} alt="av" style={{paddingLeft:"2px"}}/></div>
     <SplitButton icon="fa-pencil" 
      style={{display:this.props.state  && checkDeletePrivileges('Products')?'flex':'none'}}                                                            
                 
     onClick={()=>{
       console.log("==>",this.props.history)
       this.props.history.push(`/home/product/createsupplier?id=${rowData._id}`)
     }} model={items}></SplitButton>
     </div>
      }
     else {
    return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",height:"30px",borderRadius:"2px",marginRight:"10px"}}>
    <img id="UserAvatarimg" src={srce2} alt="av" style={{paddingLeft:"4px"}}/></div>
     <SplitButton icon="fa-pencil"
      style={{display:this.props.state  && checkDeletePrivileges('Products')?'flex':'none'}}                                                                             
     onClick={()=>{
       this.props.history.push(`/home/product/createsupplier?id=${rowData._id}`)
     }} model={items}></SplitButton>
     </div>
   }
}
createdAt=(rowData,column)=>{
  return <div>{DateFormat(rowData.createdAt)}&nbsp;&nbsp;{this.TimeFormat(rowData.createdAt)}</div>
 }
  createdBy=(rowData,column)=>{
    let srce,ipAddr;
    let path2=`${imagebasepath}/${rowData.createdBy.img}`
    // let path2=rowData.createdBy.img;
    if(rowData.createdBy.img==""||rowData.createdBy.img==undefined)
    {
      srce="User"
    }
    else
    srce=path2
    if(rowData.createdBy.ip==""||rowData.createdBy.ip==undefined)
    ipAddr="192.168.17.9"
    else
    ipAddr=rowData.createdBy.ip;
        return <div style={{display:"flex"}}>
     <div id="UserImageDiv"> <img id="UserAvatarimg" src={srce} alt="av" style={{height:"30px",width:"30px",borderRadius:"50px"}}/></div>
      <div><div>{rowData.createdBy.name}</div><div>{ipAddr}</div></div>
      </div>;
  }
  render() {
    let userList=[]
    if(this.props.state.supplierList){
      console.log("data",this.props.state.supplierList)
      this.props.state.supplierList.data.map((data,key)=>{
        let obj;
        obj={
          ...data,index:key+1
        }
        userList=userList.concat(obj)
      })
    }
   let statusFilter=<select option="field"
   style={{width: '100%'}} className="ui-column-filter" 
   value={this.state.status} 
   onChange={(event)=>{
    this.setState({filterName:"status",filterData:event.target.value,page:1,status:event.target.value}) 
    this.props.onRequestFilter({page:1,limit:this.state.limit,status:event.target.value})}}
   >
   <option value="">All</option>
 <option value="true">Open</option>
 <option value="false">Lock</option>
 </select>
let idFilter=<InputText style={{width: '100%'}}
value={this.state.id}
className="ui-column-filter" 
onChange={(e)=>{this.props.onRequestFilter({supplierId:e.target.value});this.setState({id:e.target.value})}}
/>
// const dateFormat = 'YYYY-MM-DD';
let createdAtFilter=<DatePicker className="ui-column-filter" 
   allowClear={false}
   value={this.state.created}
   onChange={
   (date, dateString)=> {
   console.log("date", dateString);
   this.setState({filterName:"createdAt",filterData:dateString,page:1,created:moment(dateString)})
    this.props.onRequestFilter({page:1,limit:this.state.limit,created:dateString})
 }}/>

let supplierFilter=<InputText style={{width: '100%'}}
className="ui-column-filter" 
value={this.state.supplierName}
onChange={(e)=>{
  this.setState({filterName:"supplierName",filterData:e.target.value,page:1,supplierName:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,supplierName:e.target.value})}}
/>
let brandFilter=<InputText style={{width: '100%'}}
className="ui-column-filter" 
value={this.state.brand}
onChange={(e)=>{
  this.setState({filterName:"brand",filterData:e.target.value,page:1,brand:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,brand:parseInt(e.target.value)})}}
/>
let createdByFilter=<InputText style={{width: '100%'}}
className="ui-column-filter" 
value={this.state.createdBy}
onChange={(e)=>{
  // this.props.onRequestFilter({createdBy:e.target.value})}}
  this.setState({filterName:"createdBy",filterData:e.target.value,page:1,createdBy:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,createdBy:e.target.value})}}
/>
let imageFilter=<InputText readOnly />
let SNoFilter=<InputText readOnly />
    const { fetching, data, onRequestFilter,onRequestData, error } = this.props;
    return (
      <div>
      {/* <div className="product_content_container"> */}
      {/* <div className="Innercontainer" style={{margin:0}}> */}
      <Growl ref={(el) => { this.growl = el; }}></Growl>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['4']}
        style={{ lineHeight: '45px' }}
      >
        <Menu.Item key="1"><Link to="/home/product">Products</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/home/product/categories">Categories</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/home/product/brands">Brands</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/home/product/suppliers">Suppliers</Link></Menu.Item>
        </Menu>
      <div className="tableOpsDiv">
      <span className="selectSpan" >
       <select
       className="selectBox"
       onChange={(event)=>{
        this.setState({limit:event.target.value})
        onRequestFilter({page:1,limit:event.target.value,[this.state.filterName]:this.state.filterData})
       }}>
       >
       <option value="10">10</option>
       <option value="20">20</option>
       <option value="30">30</option>
       <option value="40">40</option>
      </select></span>
      <span className="showSpan">Show</span>
      <span className="resetSpan" style={{float:"right",cursor:"pointer"}} onClick={()=>{this.props.onRequestData();
      this.setState({
        id:"",
        supplierName:"",
        brand:"",
        createdBy:"",
        status:"",
        created:""
      })
      }}>Reset Filter</span>
      </div>
     <DataTable loading={fetching} columnResizeMode="expand" resizableColumns={true} loadingIcon="fas fa-spinner" scrollHeight={"51vh"} ref={(el)=>{this.dt=el;}} value={userList} scrollable={true}>
        <Column field="index" header="S.No" filter={true} filterElement={SNoFilter} style={{width:"50px"}}/>
        <Column field="_id" header="Supplier ID" filter={true} filterElement={idFilter} style={{width:"82px"}}/>
        <Column field="companyLogo" header="Company Logo" filter={true} filterElement={imageFilter} body={this.companyLogo} style={{width:"150px",textAlign:"center"}} className='userId'/>       
        <Column field="createdAt" header="Created Date" filter={true} body={this.createdAt} filterElement={createdAtFilter} style={{width:"150px"}}/>
        <Column field="supplierNameEn" header="Supplier Name" filter={true} filterElement={supplierFilter} style={{width:"150px"}} />
        <Column field="brand"  header="Brand" filter={true} filterElement={brandFilter} style={{width:"100px",textAlign:"center"}}/>       
        <Column field="" header="Created By" body={this.createdBy} filter={true} filterElement={createdByFilter} style={{width:"200px",textAlign:"left"}}/>
        <Column field="status"  header="Status" body={this.status} style={{width:"150px",textAlign:"left",overflowX:"visible"}} filter={true} filterElement={statusFilter}/> 
      </DataTable>
 {console.log("pageeeeee",this.props.userArrayList.totalPage)}
 <Pagination  defaultCurrent={0} pageSize={this.state.limit} total={(this.props.state.supplierList.totalPages)*(this.state.limit)}
 onChange={(current)=>{
this.onPageChange(current),
this.setState({page:current})
 }} />
      </div>
    // </div>
    )
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
      onRequestFilter: (data) => dispatch({ type: GET_SUPPLIERS_CALL_REQUEST ,data }),
      onRequestExportCSV: (data,value)=> dispatch({type:USER_TABLE_CSV,data,value}),
      onRequestData: (data) => dispatch({type: GET_SUPPLIERS_CALL_REQUEST,data })
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(ProductManagementSuppliersList)