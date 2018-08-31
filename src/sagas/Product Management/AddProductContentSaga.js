import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../../utils/Constant"
import {push,Link} from 'react-router-redux'
import { 
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  CATEGORY_AUTOFILL_FAILURE,
  CATEGORY_AUTOFILL_SUCCESS
 } from "../../actions/types";
import { Button, notification } from 'antd';
const openNotificationWithIcon = (type,message,description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
// function that makes the api request and returns a Promise for response
export function postData(data,url) {
  console.log("data...",data)
  let token=localStorage.getItem("token")
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "post",
    url: url,
    headers:headers,
     data,
  });
}
export function putData(data,url) {
  console.log("data...",data)
  let token=localStorage.getItem("token")
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "put",
    headers:headers,
    url: url,
     data,
  });
}
  
// worker saga: makes the api call when watcher saga sees the action

export function* AddProductContentSaga(action) {
  try {
    const response = yield call(postData,action.data,`${basepath}products/createproduct`);
    console.log(response);
    const data = response.data;
    console.log("response",data);
    // dispatch a success action to the store with the new data
    yield put({ type: REQUEST_SUCCESS, data });
    {openNotificationWithIcon('success',"Products","Product is Successfully Created")}
    action.history.push('/home/product');
    //{<Link to="/home/user"/>}
    } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: REQUEST_FAILURE, error })
    {openNotificationWithIcon('error',"Products",error)}
    
  }
  
}
export function* EditProductContentSaga(action) {
  try {
    const response = yield call(putData,action.data,`${basepath}products/updateproduct`);
    console.log(response);
    const data = response.data;
    console.log("response",data);
    // dispatch a success action to the store with the new data
    yield put({ type: REQUEST_SUCCESS, data });
    {openNotificationWithIcon('success',"Products","Product is Successfully Updated")}
    action.history.push('/home/product');
    //{<Link to="/home/user"/>}
    } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: REQUEST_FAILURE, error })
    {openNotificationWithIcon('error',"Products",error)}
    
  }
}
export function* HandleCategoryAutofillSaga(action) {
  try {
    // yield put({ type:"loading" });
    // const response = yield call(getData);
    // const data = response.data;
    console.log("response in users-------",action);
    const data=action.data;
    // // dispatch a success action to the store with the new data
    yield put({ type:CATEGORY_AUTOFILL_SUCCESS, data });
//    console.log("hellooooo",action.data);
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: CATEGORY_AUTOFILL_FAILURE, error })
    
    alert(error);
    
  }
  
}