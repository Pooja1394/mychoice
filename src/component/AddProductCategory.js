/*This file contains the code for CreateUser/SignUp New User 
Created By-Riyasat Ali
Created On-14/04/18
*/

import React, { Component } from 'react'
import "../style/ProductManagement.css";
import Header from "./Header";
import {Breadcrumb,notification,Row,Col} from 'antd';
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import { ADD_PRODUCT_CATEGORY_REQUEST,EDIT_PRODUCT_CATEGORY_REQUEST} from '../actions/types';
import {Editor} from 'primereact/components/editor/Editor';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import { Upload, Icon, Modal } from 'antd';
import {basepath} from "../utils/Constant";
import {api} from '../utils/Method';
import Sliderbutton from '../component/Sliderbutton';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};
class AddProductCategory extends Component {
  constructor(props){
    super(props);
    this.state={
      categoryNameEn:"",
      categoryNameMn:"",
      descriptionEn:'',
      descriptionMn:'',
      images:[],
      brandName:"",
      status:false,
      previewVisible: false,
      previewImage: '',
      id:"",
      brand:[],
      empty:""
    //   fileList: [{
    //     uid: -1,
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   }],
    }
  }
  componentWillMount() {
    if (this.props.history.location.state){ 
    console.log("===>",this.props.history.location.state)
    let value=this.props.history.location.state;
    this.setState({
      categoryNameEn:value.cateNameEn,
      categoryNameMn:value.cateNameMn,
      descriptionEn:value.descriptionEn,
      descriptionMn:value.descriptionMn,
      // images:[],
      brand:value.brandName,
      id:value._id,
      status:value.status,
      images:[{ uid: -1,
            name: 'xxx.png',
            status: 'done',
            flag:'true',
            url: `${basepath}${value.image}`
      }],
    })
  }
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
  this.setState({ images:fileList })
  }
  handlecompanyInformationChange = ({ fileList }) =>{
    console.log("hello1",fileList);
  this.setState({ companyInformation:fileList })
  }
  onProductTagChange=(e)=> {
    this.setState({city: e.value});
}

 
  setproductName=(e)=>{
    console.log("====>hello")
    this.setState({
      productName:e.target.value,
    });
  }
  filterBrands=(event)=> {
    console.log("hello",event)
    let data={
      method:"get",
      url:`category/brandsearch?search=${event.query}`,
    }
    api(data).then((res)=>{
      console.log("hello",res.data.data);
      let data=res.data.data;
      let results = data.map((v,k) => {
              return v.brandNameEn;
         });
      this.setState({filteredBrands:results})
      })
}
  
  render() {
    console.log("brand",this.props.state.autofill);
    
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { fetching, data, onCategoryCreation,onCategoryUpdation, error } = this.props;
    return (
      <div>
          {fetching?
          <div style={{ display: 'block', width:'100%', height:'100%', textAlign:'center' , opacity:'0.5'}}>
          <div style={{height:"calc(100vh - 135px)"}}>
            <img style={{marginTop:"16%",height:"60px",width:"60px"}} src={require("../images/loader1.gif")}/>
            </div>
          </div>
          :
          <div>
        <div className="table-operations">
        <span id="UserText">Create Category</span>
       
        </div>
  <div id="CreateUserDiv">
 <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="BrandSpan" className="CreateUserText"> Category Name (English)<span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.categoryNameEn} onChange={(e)=>{this.setState({categoryNameEn:e.target.value});console.log("===>",e)}} maxLength="150"/></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="CategorySpan" className="CreateUserText"> Category Name (Myanmar)<span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.categoryNameMn} onChange={(e)=>{this.setState({categoryNameMn:e.target.value})}} maxLength="200"/></Col></Row>
<Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="FooterSpan" className="CreateUserText"> Description (English)<span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:18,offset:1}}><Editor style={{height:'120px'}} value={this.state.descriptionEn} onTextChange={(e)=>this.setState({descriptionEn:e.htmlValue})}/></Col></Row>
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
      <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Brand Name <span style={{color:'red'}}>*</span></span></Col>
      <Col md={{span:18,offset:1}}>
      <AutoComplete id="category" style={{width:"100%"}} value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands}
      minLength={1} placeholder="Search Brand" multiple={true} onChange={(e) => {this.setState({brand: e.value});console.log("==>",e)}} /></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Status <span style={{color:'red'}}>*</span></span></Col>
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
  <Row> <Col md={{span:18,offset:6}} style={{textAlign:"left"}}><div id="BelowButtos"><button id="Createbtn" 
  onClick={()=>{
   if(this.state.categoryNameEn==="")
   openNotificationWithIcon('warning','Category Name (English)','Please enter category name(english)!');
   else if(this.state.categoryNameMn==="")
   openNotificationWithIcon('warning','Category Name (Myanmar)','Please enter category name(myanmar)!');
   else if(this.state.descriptionEn==="")
   openNotificationWithIcon('warning','Description (English)','Please enter description (english)!');
   else if(this.state.descriptionMn==="")
   openNotificationWithIcon('warning','Description (Myanmar)','Please enter description (myanmar)');
   else if(this.state.images.length==0)
   openNotificationWithIcon('warning','Images','Please upload images!');
   else if(this.state.brand==="")
   openNotificationWithIcon('warning','Brand Name','Please enter brand name!'); 
   else {
    let data = new FormData();
    data.append("cateNameEn",this.state.categoryNameEn);
    data.append("cateNameMn",this.state.categoryNameMn);
    data.append("descriptionEn",this.state.descriptionEn);
    data.append("descriptionMn",this.state.descriptionMn);
    // this.state.brand.map((value,key)=>{
    data.append("brandName",JSON.stringify(this.state.brand));
    // for (var i = 0; i < this.state.brand.length; i++) {
    //   data.append("brandName", this.state.brand[i]);
    // }
    // })
    data.append("status",this.state.status);
    if(this.props.history.location.state){
      data.append("_id",this.state.id);
     }
     if(this.state.images[0].flag){
      data.append("image",this.state.empty);
     }
     else{
      this.state.images.map((value,key)=>{
        return data.append("image",value.originFileObj)
      })
     }
    for (const value of data.entries()) {
      console.log("==========>",value);
    }
    console.log("===>",this.state.images[0].flag)
    if(this.props.history.location.state){
      onCategoryUpdation(
          data, this.props.history)
    }
    else {
      onCategoryCreation(
        data, this.props.history)
    }
}
}
  }>{this.props.history.location.state?"Update":"Create"}</button>
  <button id="Cancelbtn" onClick={()=>{
    this.props.history.goBack();
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
    // error: state.error
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onCategoryCreation: (data,history) => dispatch({ type: ADD_PRODUCT_CATEGORY_REQUEST ,data,history }),
    onCategoryUpdation: (data,history) => dispatch({ type: EDIT_PRODUCT_CATEGORY_REQUEST ,data,history })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddProductCategory)