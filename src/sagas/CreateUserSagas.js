import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push,Link} from 'react-router-redux'
import { USER_REGISTER_CALL_SUCCESS, USER_REGISTER_CALL_FAILURE } from "../actions/types";
import { Button, notification } from 'antd';;
const openNotificationWithIcon = (type,message,description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
// function that makes the api request and returns a Promise for response
export function postData(data,url) {
  console.log("data...",data)
  return axios({
    method: "post",
    url: url,
     data,
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* CreateUserWorkerSaga(action) {
  // console.log("hiostryyy",action.history);
  try {
    const response = yield call(postData,action.data,`${basepath}user/register`);
    console.log(response);
    const data = response.data;
    console.log("response",data);
    // dispatch a success action to the store with the new data
    yield put({ type: USER_REGISTER_CALL_SUCCESS, data });
    {openNotificationWithIcon('success',"User Registration","User is successfully Registered")}
    action.history.push('/home/user');
    //{<Link to="/home/user"/>}
    } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: USER_REGISTER_CALL_FAILURE, error })
    {openNotificationWithIcon('error',"User Registration",error)}
    
  }
}