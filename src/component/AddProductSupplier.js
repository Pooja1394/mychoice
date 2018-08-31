/*This file contains the code for CreateUser/SignUp New User 
Created By-Riyasat Ali
Created On-14/05/18
*/
import React, { Component } from 'react'
import "../style/AddProductContent.css";
import Header from "./Header";
import {Breadcrumb,notification,Row,Col} from 'antd';
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import { ADD_PRODUCT_SUPPLIER_REQUEST,EDIT_PRODUCT_SUPPLIER_REQUEST,GET_LOCATION_DATA } from '../actions/types';
import {Editor} from 'primereact/components/editor/Editor';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import Sliderbutton from '../component/Sliderbutton';
import { Upload, Icon, Modal } from 'antd';
import {basepath} from "../utils/Constant";
import {api} from '../utils/Method';

const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};
class AddProductSupplier extends Component {
  constructor(props){
    super(props);
    this.state={
      supplierNameEnglish:"",
      supplierNameMyanmar:"",
      authorizedPerson:"",
      designation:"",
      companyLogo:[],
      company:[],
      supplierInformation:[],
      supplierInfo:[],
      address:"",
      township:"",
      divisionState:"",
      phone1:"",
      phone2:"",
      status:false,
      brand:"",
      previewVisible: false,
      previewImage: '',
      id:"",
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
    if (this.props.history.location.search){
      let _id=this.props.history.location.search.split("=")[1];
      console.log("===>", _id);
      let data = {
        method: "get",
        url: `supplier/autofillapi?id=${_id}`,
      };
      this.setState({isLoading:true})
      api(data).then(res => {
        console.log("helloin js", res);
        let data = res.data[0];
        let images = data.infoFile.map((v, k) => {
          return {
            uid: k,
            name: v,
            status: "done",
            url: `${basepath}${v}`
          };
        });
    this.setState({
      isLoading:false,
      supplierNameEnglish:data.supplierNameEn,
      supplierNameMyanmar:data.supplierNameMn,
      township:data.town,
      status:data.status,
      designation:data.designation,
      phone1:data.phoneNum1,
      phone2:data.phoneNum2,
      authorizedPerson:data.authPerson,
      address:data.address,
      divisionState:data.state,
      id:data._id,
      companyLogo:[{ uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: `${basepath}${data.image}`
      }],
      supplierInformation:images
    //   companyLogo:[],
    //   supplierInformation:[]
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
  handleCompanyLogoChange = ({ fileList }) =>{
    console.log("hello",fileList);
  this.setState({ companyLogo:fileList,company:fileList })
  }
  handleSupplierInformationChange = ({ fileList }) =>{
    console.log("hello1",fileList);
   let arr= fileList.filter((v)=>{
     if(v.hasOwnProperty("lastModified"))
     {
       return v;
     }
    })
    console.log("array==>",arr);
    
  this.setState({ supplierInformation:fileList,supplierInfo:arr })
  }
  render() {
    {console.log("===>",this.state.divisionState,this.props)}
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
          
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { fetching, data, onSupplierCreation,onSupplierUpdation, error } = this.props;
    return (
      <div>
          {fetching || this.state.isLoading?
          <div style={{ display: 'block', width:'100%', height:'100%', textAlign:'center' , opacity:'0.5'}}>
          <div style={{height:"calc(100vh - 135px)"}}>
            <img style={{marginTop:"16%",height:"60px",width:"60px"}} src={require("../images/loader1.gif")}/>
            </div>
          </div>
          :
          <div>
        <div className="table-operations">
        <span id="UserText">Create Supplier</span>
        </div>
  <div id="CreateUserDiv">
 <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Supplier Name (English)<span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.supplierNameEnglish} onChange={(e)=>{this.setState({supplierNameEnglish:e.target.value})}} maxLength="150"/></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Supplier Name (Myanmar)<span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.supplierNameMyanmar} onChange={(e)=>{this.setState({supplierNameMyanmar:e.target.value})}} maxLength="200"/></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Authorized Person <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.authorizedPerson} onChange={(e)=>this.setState({authorizedPerson:e.target.value})} maxLength="30"/></Col></Row>
  <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Designation <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><input className="CreateUserField1" type="text" value={this.state.designation} onChange={(e)=>this.setState({designation:e.target.value})} maxLength="30"/></Col></Row>
 <Row> <Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="DescSpan" className="CreateUserText"> Company Logo <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:18,offset:1}}><div className="clearfix" style={{border:"1px solid #d5d5d5",padding:"7px 0px 0px 7px"}}>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={this.state.companyLogo}
          onPreview={this.handlePreview}
          onChange={this.handleCompanyLogoChange}
        >
          {this.state.companyLogo.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div></Col><br/>
      </Row>
      <Row> <Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="DescSpan" className="CreateUserText"> Supplier Information </span></Col>
      <Col md={{span:18,offset:1}}><div className="clearfix" style={{border:"1px solid #d5d5d5",padding:"7px 0px 0px 7px"}}>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={this.state.supplierInformation}
          onPreview={this.handlePreview}
          onChange={this.handleSupplierInformationChange}
          multiple
          onRemove={(e)=>{
            let token=localStorage.getItem("token")
            console.log("====hello",token)
            console.log("productdelete",e,this.state.id)
            let data={
            method:"put",
            url:"user/deleteimg",
             data:{_id:this.state.id,type:"supplier",index:e.uid},
          }
           api(data)
            // console.log("hello",rowData._id)
        }}
        >
          {this.state.supplierInformation.length >= 5 ? null : uploadButton}
        </Upload>
      </div></Col><br/>
      </Row>
      <Row><Col md={{span:4,offset:1}} style={{textAlign:"right"}}> <span id="" className="CreateUserText"> Address <span style={{color:'red'}}>*</span></span></Col>
  <Col md={{span:18,offset:1}}><textarea className="textarea" type="text" value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} maxLength="150"/></Col></Row>
<Row>
<Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span className="CreateUserText">Division/State <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:6,offset:1}}>
<Dropdown  value={this.state.divisionState} placeholder="Select a state" options={options1} onChange={(e)=>{this.setState({divisionState: e.value})}} style={{width:'100%',height:"41px",background:"none",}}/>
{/* <input className="CreateUserField1" type="text" value={this.state.divisionState} onChange={(e)=>this.setState({divisionState:e.target.value})} maxLength="20"/> */}
</Col>
<Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span className="CreateUserText">Township <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:6,offset:1}}>
<Dropdown value={this.state.township} placeholder="Select a township" options={township} onChange={(e)=>{this.setState({township:e.value})}} style={{width:'100%',height:"41px",background:"none",}}/>
</Col>
{/* <input className="CreateUserField1" type="text" value={this.state.township} onChange={(e)=>this.setState({township:e.target.value})} maxLength="20"/></Col> */}
</Row>
<Row>
<Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span className="CreateUserText">Phone No.1 <span style={{color:'red'}}>*</span></span></Col>
<Col md={{span:6,offset:1}}>
<input className="CreateUserField1" type="text" value={this.state.phone1} onChange={(e)=>this.setState({phone1:e.target.value})} maxLength="15"/>
</Col>
<Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span className="CreateUserText">Phone No.2 </span></Col>
<Col md={{span:6,offset:1}}><input className="CreateUserField1" type="text" value={this.state.phone2} onChange={(e)=>this.setState({phone2:e.target.value})} maxLength="15"/></Col>
</Row>
 <Row> <Col md={{span:4,offset:1}} style={{textAlign:"right"}}><span id="StatuSpan" className="CreateUserText">Status <span style={{color:'red'}}>*</span></span></Col>
 <Col md={{span:18,offset:1}}>
 <Sliderbutton 
    mainWidth="20%"
    clickForAllow={()=>{console.log("hello in true ");this.setState({status:true})}}
    clickFordeny={()=>{console.log("hello in false ");this.setState({status:false})}}
    background={this.state.status?'#4ca65a':'#dc4b38'}
    left={this.state.status?'0px':'50%'} 
    spaninner={this.state.status?'Yes':'No'}     
    buttonNameAllow="Yes"
    buttonNameDeny="No"  
    />
    </Col>
 </Row>
  <Row> <Col md={{span:18,offset:6}} style={{textAlign:"left"}}><div id="BelowButtos"><button id="Createbtn" 
  onClick={()=>{
    if(this.state.supplierNameEnglish==="")
    openNotificationWithIcon('warning','Supplier Name (English)','Please enter supplier name(english)!');
    else if(this.state.supplierNameMyanmar==="")
    openNotificationWithIcon('warning','Supplier Name (Myanmar)','Please enter supplier name(myanmar)!');
    else if(this.state.authorizedPerson==="")
    openNotificationWithIcon('warning','Authorized Person','Please enter authorized person!');
    else if(this.state.designation==="")
    openNotificationWithIcon('warning','Designation','Please enter designation!');
    else if(this.state.companyLogo.length==0)
    openNotificationWithIcon('warning','Company Logo','Please upload company logo!');
    else if(this.state.address=="")
     openNotificationWithIcon('warning','Address','Please enter address!');
     else if(this.state.township==="")
     openNotificationWithIcon('warning','Township','Please enter township!');
     else if(this.state.divisionState=="")
     openNotificationWithIcon('warning','Division/State','Please enter division/state!');
     else if(this.state.phone1==="")
     openNotificationWithIcon('warning','Phone no.1','Please enter phone no.1!');
     else{
      let data = new FormData();
      data.append("supplierNameEn",this.state.supplierNameEnglish);
      data.append("supplierNameMn",this.state.supplierNameMyanmar);
      data.append("authPerson",this.state.authorizedPerson);
      data.append("designation",this.state.designation);
      data.append("address",this.state.address);
      data.append("town",this.state.township);
      data.append("state",this.state.divisionState);
      data.append("phoneNum1",this.state.phone1);
      data.append("phoneNum2",this.state.phone2);
      data.append("status",this.state.status);
      data.append("brand",this.state.brand);
      if(this.props.history.location.search){
            data.append("_id",this.state.id);
            if (this.state.supplierInfo.length!==0&&this.state.company.length==0){
              this.state.supplierInfo.map((value,key)=>{
                return data.append("image",value.originFileObj)
              })
              data.append("imageType","infoFile");
            }
            else if(this.state.supplierInfo.length==0&&this.state.company.length!==0){
              this.state.company.map((value,key)=>{
                return data.append("image",value.originFileObj)
              })
              data.append("imageType","image");
            }
            else if (this.state.supplierInfo.length==0&&this.state.company.length==0){
              data.append("image","");
              data.append("imageType","");
            }
            else{
              this.state.company.map((value,key)=>{
                return data.append("image",value.originFileObj)
              })
              this.state.supplierInfo.map((value,key)=>{
                return data.append("image",value.originFileObj)
              })
              data.append("imageType","both");
            }
      }
      else {
        this.state.companyLogo.map((value,key)=>{
          return data.append("image",value.originFileObj)
        })
        this.state.supplierInformation.map((value,key)=>{
          return data.append("image",value.originFileObj)
        })
      }
      for (const value of data.entries()) {
        console.log("==========>",value);
      }

if(this.props.history.location.search){
  onSupplierUpdation(
      data, this.props.history)
}
else {
  onSupplierCreation(
    data, this.props.history)
}
}
}
  }>{this.props.history.location.search?"Update":"Create"}</button>
  <button id="Cancelbtn" onClick={()=>{
    this.props.history.push('/home/product/suppliers');
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
    error: state.error
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
        onSupplierCreation: (data,history) => dispatch({ type: ADD_PRODUCT_SUPPLIER_REQUEST ,data,history }),
        onSupplierUpdation: (data,history) => dispatch({ type: EDIT_PRODUCT_SUPPLIER_REQUEST ,data,history }),
        onGetLocation:(data,history)=>dispatch({type:GET_LOCATION_DATA})
      }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddProductSupplier)