import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push,Link} from 'react-router-redux'
import {PRODUCT_LIST_REQUEST_SUCCESS, PRODUCT_LIST_REQUEST_FAILURE, PAYMENT_DETAILS_DATA_SUCCESS, PAYMENT_DETAILS_DATA_FAILURE } from "../actions/types";
import { Button, notification } from 'antd';
import AddProductContent from "../component/AddProductContent";
const openNotificationWithIcon = (type,message,description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
// function that makes the api request and returns a Promise for response
export function postData(data,url) {
  let token=localStorage.getItem("token");
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  console.log("data...",data)
  return axios({
    method: "post",
    url: url+'?limit='+data.limit+'&page='+data.page,
     data,
     headers:headers
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* PaymentDetailsSaga(action) {
  try {
    const response = yield call(postData,action.data,`${basepath}transfer/filtertransfer`);
    console.log(response);
    const data = response.data;
    console.log("response--->",data);
    // dispatch a success action to the store with the new data
    yield put({ type: PAYMENT_DETAILS_DATA_SUCCESS, data });
    } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: PAYMENT_DETAILS_DATA_FAILURE, error })
    alert(error)
  }
}