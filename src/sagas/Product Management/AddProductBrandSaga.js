import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../../utils/Constant"
import {push,Link} from 'react-router-redux'
import { 
REQUEST_SUCCESS, 
REQUEST_FAILURE
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
  // console.log("====hello",token)
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
  // console.log("====hello",token)
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "put",
    url: url,
    headers:headers,
    data,
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* AddProductBrandSaga(action) {
  try {
    const response = yield call(postData,action.data,`${basepath}brands/createbrands`);
    console.log(response);
    const data = response.data;
    console.log("response",data);
    // dispatch a success action to the store with the new data
    yield put({ type:REQUEST_SUCCESS, data });
    openNotificationWithIcon('success',"Brands","Brand is Successfully Added")
    action.history.push('/home/product/brands');
    //{<Link to="/home/user"/>}
    } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type:REQUEST_FAILURE, error })
    openNotificationWithIcon('error',"Product Management",error)
    
  }
}
export function* EditProductBrandSaga(action) {
  try {
    const response = yield call(putData,action.data,`${basepath}brands/updatebrands`);
    console.log(response);
    const data = response.data;
    console.log("response",data);
    // dispatch a success action to the store with the new data
    yield put({ type: REQUEST_SUCCESS, data });
    {openNotificationWithIcon('success',"Brands","Brand is Successfully Updated")}
    action.history.push('/home/product/brands');
    //{<Link to="/home/user"/>}
    } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: REQUEST_FAILURE, error })
    {openNotificationWithIcon('error',"Product Management",error)}
    
  }
}