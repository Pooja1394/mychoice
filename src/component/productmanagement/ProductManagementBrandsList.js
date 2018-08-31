/*This file contains the code for Product Information in admin panel 
Created By-Aviral Garg
Created On-16/04/18
*/

import React, { Component } from 'react'
import {Route,Link} from 'react-router-dom';
import { Layout,Table,Breadcrumb,Menu} from 'antd';
import "../../style/Content.css"
import Header from "../Header";
import "../../style/ProductContent.css";
import moment from "moment";
import {connect} from "react-redux"
import { User_Filter_Call_Request, GET_BRANDS_CALL_REQUEST ,USER_TABLE_CSV} from '../../actions/types';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Calendar} from 'primereact/components/calendar/Calendar';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Growl} from 'primereact/components/growl/Growl';
import { Pagination,DatePicker } from 'antd';
import {DateFormat,checkDeletePrivileges} from '../../utils/Method';
import {api} from '../../utils/Method';
import {basepath,imagebasepath} from "../../utils/Constant";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
class ProductManagementBrandsList extends Component {
  state = {
    arr:[],
    searchText:"",
    searchusernametext:"",
    brandName:"",
    id:"",
    product:"",
    supplier:"",
    supplierName:"",
    createdBy:"",
    status:"",
    loader:false   ,
    page:1,
    limit:10,
    count:1, 
    filterName:"",
    filterData:""
  };
  componentDidMount() {
    this.props.onRequestExportCSV(this.dt,["23"])
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
  TimeFormat2=(date)=>{
    let res = date.split("T");
    let time= res[1].split("+");
    console.log(time);
  return time[0];
  }
  status=(rowData,column)=>{
    let items =[ 
      {
        label: 'Delete', icon: 'fa-trash', command: () => {
        let data={
          method:"delete",
          url:"brands/deletebrands",
          data:{_id:rowData._id},
        }
        api(data).then((res)=>{
        this.props.onRequestData({page:this.state.page,limit:this.state.limit})
        this.growl.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
        })
          console.log("hello",rowData._id)
      }},
     ]
    let srce=require("../../images/tick.png")
    let srce2=require("../../images/cross.png")
    if (rowData.status){
     return <div style={{display:"flex"}}>
    <div style={{background:"#d2d6de",width:"30px",padding:"3px",borderRadius:"2px",marginRight:"10px"}}>
    <img id="UserAvatarimg" src={srce} alt="av" style={{paddingLeft:"3px"}}/></div>
     <SplitButton 
                 style={{display:this.props.state  && checkDeletePrivileges('Products')?'flex':'none'}}                                                                             
     icon="fa-pencil" onClick={()=>
       this.props.history.push(`/home/product/createbrand?id=${rowData._id}`)
     } model={items}></SplitButton>
     </div>
     }

    else {
     return <div style={{display:"flex"}}>
     <div style={{background:"#d2d6de",width:"30px",padding:"3px",borderRadius:"2px",marginRight:"10px"}}>
     <img id="UserAvatarimg" src={srce2} alt="av" style={{paddingLeft:"4px"}}/></div>
      <SplitButton icon="fa-pencil" 
                  style={{display:this.props.state  && checkDeletePrivileges('Products')?'flex':'none'}}                                                            
                  
      onClick={()=>
       this.props.history.push(`/home/product/createbrand?id=${rowData._id}`)
      } model={items}></SplitButton>
      </div>
    }
  }
  createdAt=(rowData,column)=>{
    return <div>{DateFormat(rowData.createdAt)}&nbsp;&nbsp;{this.TimeFormat(rowData.createdAt)}</div>
   }
image=(rowData)=>{
  let srce;
  let path2=`${imagebasepath}/${rowData.image}`
  if(rowData.image==""||rowData.image==undefined)
  {
    srce="hello"
  }
  else
  srce=path2
  return <div>
    <img id="UserAvatarimg" src={srce} alt="av" style={{height:"40px",width:"100px",marginRight:"10px"}}/>
    {rowData.userName}
    </div>;
}
supplier=(rowData,column)=>{
  console.log("==>hello1",rowData.supplierName)
  return <div>{rowData.supplierList}</div>
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
    console.log("data",this.state.export)
    let userList=[]
    if(this.props.state.brandsList){
      this.props.state.brandsList.data.map((data,key)=>{
        let obj;
        obj={
          ...data,index:key+1
        }
        userList=userList.concat(obj)
      })
    }
   let statusFilter=<select option="field"
   style={{width: '100%'}} className="ui-column-filter" 
   value={this.state.brand2} 
   onChange={(event)=>{this.props.onRequestFilter({status:event.target.value});this.setState({brand2:event.target.value})}}
   
   >
   <option value="">All</option>
 <option value="true">Open</option>
 <option value="false">Lock</option>
 </select>
let productFilter=<InputText option="field"
style={{width: '100%'}} className="ui-column-filter" 
value={this.state.product} 
// options={suspend} 
onChange={(e)=>{this.props.onRequestFilter({product:e.target.value});this.setState({product:e.target.value})}}

/>
let brandNameFilter=<InputText style={{width: '100%'}}
value={this.state.brandName}
className="ui-column-filter" 
onChange={(e)=>{
  this.setState({filterName:"brand",filterData:e.target.value,page:1,brandName:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,brandName:e.target.value})}}
/>
let createdAtFilter=<DatePicker className="ui-column-filter" 
allowClear={false}
value={this.state.created}
onChange={
(date, dateString)=> {
console.log("date", dateString);
this.setState({filterName:"createdAt",filterData:dateString,page:1,created:moment(dateString)})
 this.props.onRequestFilter({page:1,limit:this.state.limit,created:dateString})
}}/>
let supplierNameFilter=<InputText style={{width: '100%'}}
value={this.state.supplierName}
onChange={(e)=>{
  this.setState({filterName:"supplierName",filterData:e.target.value,page:1,supplierName:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,supplierName:e.target.value})}}
/>
let createdByFilter=<InputText style={{width: '100%'}}
value={this.state.createdBy}
className="ui-column-filter" 
onChange={(e)=>{
  // this.props.onRequestFilter({createdBy:e.target.value})}}
  this.setState({filterName:"createdBy",filterData:e.target.value,page:1,createdBy:e.target.value})
  this.props.onRequestFilter({page:1,limit:this.state.limit,createdBy:e.target.value})}}
/>
 let supplierFilter=<InputText style={{width: '100%'}}
 className="ui-column-filter" 
 value={this.state.supplier}
 onChange={(e)=>{
   // this.props.onRequestFilter({createdBy:e.target.value})}}
   this.setState({filterName:"supplier",filterData:e.target.value,page:1,supplier:e.target.value})
   this.props.onRequestFilter({page:1,limit:this.state.limit,supplier:e.target.value})}}
 />
 let brandIDfilter=<InputText style={{width: '100%'}}
 value={this.state.id}
 onChange={(e)=>{
 this.setState({filterName:"supplier",filterData:e.target.value,page:1,id:e.target.value})
 this.props.onRequestFilter({page:1,limit:this.state.limit,brandID:e.target.value})}}
 />
 let imageFilter=<InputText readOnly />
 let SNoFilter=<InputText readOnly />
    console.log("user-------->",userList)
    const { fetching, data, onRequestFilter,onRequestData, error } = this.props;
    return (
      <div>
      {/* <div className="product_content_container"> */}
      {/* <div className="Innercontainer" style={{margin:"0px"}}> */}
      <Growl ref={(el) => { this.growl = el; }}></Growl>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['3']}
        style={{ lineHeight: '45px' }}
      >
        <Menu.Item key="1"><Link to="/home/product">Products</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/home/product/categories">Categories</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/home/product/brands">Brands</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/home/product/suppliers">Suppliers</Link></Menu.Item>
        </Menu>
        <div className="tableOpsDiv">
      <span className="selectSpan" >
       <select className="selectBox"
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
        brandName:"",
        id:"",
        product:"",
        supplier:"",
        supplierName:"",
        createdBy:"",
        status:"",
        created:""
      })
      }}>Reset Filter</span>
      </div>
      <DataTable loading={fetching} loadingIcon="fas fa-spinner" columnResizeMode="expand" resizableColumns={true} scrollHeight={"80%)"} ref={(el)=>{this.dt=el;}} value={userList} scrollable={true}>
        <Column field="index" header="S.No" body={this.index} filter={true} filterElement={SNoFilter} style={{width:"50px"}}/>
        <Column field="_id" header="Brand ID" filter={true} filterElement={brandIDfilter} style={{width:"68px"}}/>
        <Column field="companyLogo" header="Image" body={this.image} filter={true} filterElement={imageFilter} style={{width:"120px",textAlign:"center"}} className='userId'/>       
        <Column field="brandNameEn" header="Brand Name" filter={true} filterElement={brandNameFilter} style={{width:"150px"}}/>
        <Column field="createdAt" header="Created Date" body={this.createdAt} filterElement={createdAtFilter} filter={true} style={{width:"150px"}} />
        <Column field="product"  header="Product" filter={true} filterElement={productFilter} style={{width:"100px",textAlign:"center"}}/>       
        <Column field="supplier" header="Supplier" filter={true} filterElement={supplierFilter} style={{width:"100px"}}/>
        <Column field="supplierList" header="Supplier Name" body={this.supplier} style={{width:"150px"}} filter={true} filterElement={supplierNameFilter}/> 
        <Column  header="Created By" body={this.createdBy} style={{width:"200px",textAlign:"left"}} filter={true} filterElement={createdByFilter}/> 
        <Column field="status"  header="Status" body={this.status}style={{width:"150px",overflowX:"visible"}} filter={true} filterElement={statusFilter}/> 
      </DataTable>
 {console.log("pageeeeee",this.props.userArrayList.totalPage)}
 <Pagination  defaultCurrent={0} pageSize={this.state.limit} total={(this.props.state.brandsList.totalPages)*(this.state.limit)}
 onChange={(current)=>{
this.onPageChange(current),
this.setState({page:current})
 }} />
      </div>
      //  </div> 
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
      onRequestFilter: (data) => dispatch({ type: GET_BRANDS_CALL_REQUEST ,data }),
      onRequestExportCSV: (data,value)=> dispatch({type:USER_TABLE_CSV,data,value}),
      onRequestData: (data) => dispatch({type: GET_BRANDS_CALL_REQUEST,data })
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(ProductManagementBrandsList)