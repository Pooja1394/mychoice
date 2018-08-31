/*This file contains the code for CreateUser/SignUp New User 
Created By-Riyasat Ali
Created On-14/05/18
*/

import React, { Component } from 'react'
import "../style/ProductManagement.css";
import Header from "./Header";
import {Breadcrumb,notification,Row,Col} from 'antd';
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import { ADD_PRODUCT_BRAND_REQUEST,EDIT_PRODUCT_BRAND_REQUEST,GET_LOCATION_DATA } from '../actions/types';
import {Editor} from 'primereact/components/editor/Editor';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import { Upload, Icon, Modal } from 'antd';
import {api} from '../utils/Method';
import {imagebasepath,basepath} from "../utils/Constant";
import Sliderbutton from '../component/Sliderbutton';
const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};


class AddProductBrand extends Component {
  constructor(props){
    super(props);
    this.state={
      brandNameEn:"",
      brandNameMn:"",
      descriptionEn:"",
      descriptionMn:"",
      image:[],
      images:[],
      supplierName:"",      
      authorizedPerson:"",
      designation:"",
      companyInformation:[],
      address:"",
      township:"",
      divisionState:"",
      status:false,
      previewVisible: false,
      previewImage: '',
      supplier:[],
      id:""
    }
  }
  // handleSubmitClick = () => {
  //   const name = this._name.value;
  //   console.log("hello",this._name);
    
  //   // do something with `name`
  // }

  
  componentWillMount() {
    if (this.props.history.location.search){
    this.setState({isLoading:true});
    let _id=this.props.history.location.search.split("=")[1];
    console.log("===>", _id);
    let data = {
      method: "get",
      url: `brands/autofillbrand?id=${_id}`,
    };
    api(data).then(res => {
      console.log("helloin js", res);
      let value = res.data[0];
      let images = value.infoFile.map((v, k) => {
        return {
          uid: k,
          name: v,
          status: "done",
          url: `${imagebasepath}${v}`
        };
      });
      this.setState({
      isLoading:false,
      brandNameEn:value.brandNameEn,
      brandNameMn:value.brandNameMn,
      descriptionEn:value.descriptionEn,
      descriptionMn:value.descriptionMn,
      images:[],
      companyInformation:[],
      supplier:value.supplierName,      
      authorizedPerson:value.authPerson,
      designation:value.designation,
      address:value.address,
      township:value.town,
      divisionState:value.state,
      status:value.status,
      id:value._id,
      images:[{ uid: -1,
            name: 'xxx.png',
            status: 'done',
            flag:"true",
            url: `${basepath}${value.image}`
      }],
      companyInformation:images
    })
  })
}
}
componentDidMount() {
  this.props.onGetLocation()
  }
  
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleimagesChange = ({ fileList }) =>{
    console.log("hello",fileList);
  this.setState({ images:fileList,image:fileList })
  }
  handlecompanyInformationChange = ({ fileList }) =>{
    console.log("hello1",fileList);
    let arr= fileList.filter((v)=>{
      if(v.hasOwnProperty("lastModified"))
      {
        return v;
      }
     })
     console.log("array==>",arr);
  this.setState({ companyInformation:fileList,companyInfo:arr})
  }
  filterSuppliers=(event)=>{
    console.log("hello",event)
    let data={
      method:"get",
      url:`brands/suppliersearch?search=${event.query}`,
    }
    api(data).then((res)=>{
      console.log("helloin js",res);
      let data=res.data.data;
      let results = data.map((v,k) => {
              return {
                "name":v.supplierNameEn,
                "id":v._id              
              };
         });
         console.log("results",results)
      this.setState({filteredSuppliers:results})
      })
  }
  onSupplierChangeHandler=(e)=>{
   let arr=e.value.map((v,k)=>{
       return {"name":v.name,"id":v.id
      }
    })
    this.setState({supplier:arr})
  }
  render() {
    let options1=[]
    this.props.state.locationData.map((v,k)=>{
      console.log("v----------->",v)
          options1=options1.concat({
            "label":v.city,
            "value":v.city
          })
        })
      
        let township;
        this.props.state.locationData.map((v,k)=>{
          if(v.state=this.state.divisionState){
          township=v.township.map((town,key)=>{
            return{
              "label":town,
              "value":town
            }
          })
        }
        })
          console.log("options======>",options1,this.state.divisionState,township)
    console.log("hello",this.state.supplier);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { fetching, data, onBrandCreation,onBrandUpdation, error } = this.props;
    return (
      <div>
          {fetching||this.state.isLoading?
         <div style={{ display: 'block', width:'100%', height:'100%', textAlign:'center' , opacity:'0.5'}}>
         <div style={{height:"calc(100vh - 135px)"}}>
           <img style={{marginTop:"16%",height:"60px",width:"60px"}} src={require("../images/loader1.gif")}/>
           </div>
         </div>
          :
          <div>
        <div className="table-operations">
        <span id="UserText">Create Brand</span>
       
        </div>
  <div id="CreateUserDiv">
 <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText"> Brand Name (English)<span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.brandNameEn} onChange={(e)=>{this.setState({brandNameEn:e.target.value})}} maxLength="150"/></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText"> Brand Name (Myanmar)<span style={{color:'red'}}>*</span> </span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.brandNameMn} onChange={(e)=>{this.setState({brandNameMn:e.target.value})}} maxLength="200"/></Col></Row>
<Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="FooterSpan" className="CreateUserText"> Description (English)<span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:18,offset:1}}><Editor style={{height:'120px'}} value={this.state.descriptionEn} onTextChange={(e)=>{this.setState({descriptionEn:e.htmlValue})}} /></Col></Row>
<Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="FooterSpan" className="CreateUserText"> Description (Myanmar) <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:18,offset:1}}><Editor style={{height:'120px'}} value={this.state.descriptionMn} onTextChange={(e)=>this.setState({descriptionMn:e.htmlValue})}/></Col></Row>
<Row> <Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="DescSpan" className="CreateUserText"> Images <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:18,offset:1}}><div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={this.state.images}
          onPreview={this.handlePreview}
          onChange={this.handleimagesChange}
        >
          {this.state.images.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div></Col><br/>
      </Row>
      <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Supplier Name <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}>
  <AutoComplete id="category" style={{width:"100%"}} field="name" value={this.state.supplier} suggestions={this.state.filteredSuppliers} completeMethod={this.filterSuppliers}
      minLength={1} placeholder="Search Supplier" multiple={true} onChange={(e) => {console.log("===>",e);this.onSupplierChangeHandler(e)}} /></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Authorized Person <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.authorizedPerson} onChange={(e)=>this.setState({authorizedPerson:e.target.value})} maxLength="30"/></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Designation <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.designation} onChange={(e)=>this.setState({designation:e.target.value})} maxLength="30"/></Col></Row>

      <Row> <Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="DescSpan" className="CreateUserText"> Company Information </span></Col>
<Col md={{span:18,offset:1}}><div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={this.state.companyInformation}
          onPreview={this.handlePreview}
          onChange={this.handlecompanyInformationChange}
          onRemove={e => {
            let token=localStorage.getItem("token")
            console.log("productdelete",e,this.state.id)
            let data={
            method:"put",
            url:"user/deleteimg",
             data:{_id:this.state.id,type:"brand",index:e.uid},
          }
           api(data)
        }}
          multiple
        >
          {this.state.companyInformation.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div></Col><br/>
      </Row>
      <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Address <span style={{color:'red'}}>*</span></span></Col>
      <Col md={{span:18,offset:1}}><textarea className="textarea" type="text" value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} maxLength="150"/></Col></Row>
<Row>
<Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span className="CreateUserText">Township <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:6,offset:1}}>
<Dropdown  value={this.state.divisionState} placeholder="Select a state" options={options1} onChange={(e)=>{this.setState({divisionState: e.value})}} style={{width:'100%',height:"41px",background:"none",}}/>
{/* <input className="CreateUserField1" type="text" value={this.state.township} onChange={(e)=>this.setState({township:e.target.value})} maxLength="20"/> */}
</Col>
<Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span className="CreateUserText">Division/State <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:6,offset:1}}>
<Dropdown value={this.state.township} placeholder="Select a township" options={township} onChange={(e)=>{this.setState({township:e.value})}} style={{width:'100%',height:"41px",background:"none",}}/>
{/* <input className="CreateUserField1" type="text" value={this.state.divisionState} onChange={(e)=>this.setState({divisionState:e.target.value})} maxLength="20"/> */}
</Col>
</Row>
 <Row> <Col md={{span:4,offset:1}} style={{textAlign:"right"}} ><span id="StatuSpan" className="CreateUserText">Status <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}} style={{textAlign:"left"}}>
  <Sliderbutton 
    mainWidth="20%"
    clickForAllow={()=>this.setState({status:true})}
    clickFordeny={()=>this.setState({status:false})}
    background={this.state.status?'#4ca65a':'#dc4b38'}
    left={this.state.status?'0px':'50%'} 
    spaninner={this.state.status?'Yes':'No'}     
    buttonNameAllow="Yes"
    buttonNameDeny="No"  
    />
  </Col></Row>
  {/* <input type="text" placeholder="hello" ref={input => this._name = input} />
        <button onClick={this.handleSubmitClick}>Sign up</button> */}
  <Row> <Col md={{span:18,offset:6}} style={{textAlign:"left"}}><div id="BelowButtos"><button id="Createbtn" 
  onClick={()=>{
    if(this.state.brandNameEn==="")
    openNotificationWithIcon('warning','Brand Name (English)','Please enter brand name(english)!');
    else if(this.state.brandNameMn==="")
    openNotificationWithIcon('warning','Brand Name (Myanmar)','Please enter brand name(myanmar)!');
    else if(this.state.descriptionEn==="")
    openNotificationWithIcon('warning','Description (English)','Please enter description (english)!');
    else if(this.state.descriptionMn==="")
    openNotificationWithIcon('warning','Description (Myanmar)','Please enter description (myanmar)');
    else if(this.state.images.length==0)
    openNotificationWithIcon('warning','Images','Please upload images!');
    else if(this.state.designation==="")
    openNotificationWithIcon('warning','Designation','Please enter designation!');
    else if(this.state.authorizedPerson==="")
    openNotificationWithIcon('warning','Authorized Person','Please enter authorized person!');
    else if(this.state.images.length==0)
    openNotificationWithIcon('warning','Images','Please upload images!');
    // else if(this.state.companyInformation.length==0&&!this.props.history.location.search)
    // openNotificationWithIcon('warning','Company Information','Please upload company information!');
    else if(this.state.address=="")
     openNotificationWithIcon('warning','Address','Please enter address!');
     else if(this.state.township==="")
     openNotificationWithIcon('warning','Township','Please enter township!');
     else if(this.state.divisionState=="")
     openNotificationWithIcon('warning','Division/State','Please enter division/state!');
     else {
  let data = new FormData();
  // this.state.images.map((value,key)=>{
  //   return data.append("image",value.originFileObj)
  // })
  // this.state.companyInformation.map((value,key)=>{
  //   return data.append("image",value.originFileObj)
  // })
  let value="";
  this.state.supplier.map((v,k)=>{
    if(value==''){
      value+=v.name
    }else{
      value+=','+v.name
    }
  })
  data.append("brandNameEn",this.state.brandNameEn);
  data.append("brandNameMn",this.state.brandNameMn);
  data.append("descriptionEn",this.state.descriptionEn);
  data.append("descriptionMn",this.state.descriptionMn);
  // this.state.supplier.map((value,key)=>{
  data.append("supplierName",JSON.stringify(this.state.supplier));
  // })
  data.append("supplierList",value);
  data.append("authPerson",this.state.authorizedPerson);
  data.append("designation",this.state.designation);
  data.append("address",this.state.address);
  data.append("town",this.state.township);
  data.append("state",this.state.divisionState);
  data.append("status",this.state.status);
  if(this.props.history.location.search){
    data.append("_id",this.state.id);
    if (this.state.companyInfo.length!==0&&this.state.image.length==0){
      this.state.companyInfo.map((value,key)=>{
        return data.append("image",value.originFileObj)
      })
      data.append("imageType","infoFile");
    }
    else if(this.state.companyInfo.length==0&&this.state.image.length!==0){
      this.state.image.map((value,key)=>{
        return data.append("image",value.originFileObj)
      })
      data.append("imageType","image");
    }
    else if (this.state.companyInfo.length==0&&this.state.image.length==0){
      data.append("image","");
      data.append("imageType","");
    }
    else{
      this.state.image.map((value,key)=>{
        return data.append("image",value.originFileObj)
      })
      this.state.companyInfo.map((value,key)=>{
        return data.append("image",value.originFileObj)
      })
      data.append("imageType","both");
    }
}
else {
this.state.images.map((value,key)=>{
  return data.append("image",value.originFileObj)
})
this.state.companyInformation.map((value,key)=>{
  return data.append("image",value.originFileObj)
})
}
  for (const value of data.entries()) {
    console.log("==========>",value);
  }
  if(this.props.history.location.search){
    onBrandUpdation(
        data, this.props.history)
  }
  else {
    onBrandCreation(
      data, this.props.history)
  }
     }
}
  }>{this.props.history.location.search?"Update":"Create"}</button>
  <button id="Cancelbtn" onClick={()=>{
    this.props.history.push('/home/product/brands');
  }}>Cancel</button></div><br/>  
  </Col></Row>
    </div>
    </div>
     }</div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    state:state,
    fetching: state.fetching,
    // data: state.data,
    // error: state.error
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onBrandCreation: (data,history) => dispatch({ type: ADD_PRODUCT_BRAND_REQUEST ,data,history }),
    onBrandUpdation: (data,history) => dispatch({ type: EDIT_PRODUCT_BRAND_REQUEST ,data,history }),
    onGetLocation:(data,history)=>dispatch({type:GET_LOCATION_DATA})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddProductBrand)