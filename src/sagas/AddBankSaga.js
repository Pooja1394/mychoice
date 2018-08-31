import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { BANK_DETAILS_FILTER_SUCCESS, BANK_DETAILS_FILTER_REQUEST, BANK_DETAILS_FILTER_FAILURE, User_Filter_Call_FAILURE, ADD_BANK_SUCCESS, ADD_BANK_FAILURE } from "../actions/types";
import {openNotificationWithIcon} from "../utils/Method"
// function that makes the api request and returns a Promise for response
export function postData(data,url) {
  let headers={
    'Authorization':'Bearer '+localStorage.getItem("token"),
    'Accept': 'application/json',
  }
  return axios({
    method: "post",
    url: url,
    data,
     headers:headers
     
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* AddBankSaga(action) {
  console.log("EditBAnkinsaga123",action.data)
  try {
    const response = yield call(postData,action.data,`${basepath}bank/addbank`);
    const data = response.data;
    // dispatch a success action to the store with the new data
    yield put({ type: ADD_BANK_SUCCESS, data });
    openNotificationWithIcon('success', 'Add Bank', 'Bank added successfully');
   action.history.push("/home/depositncredit/bank");
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: ADD_BANK_FAILURE, error })
    alert(error);
    
  }
}

// worker saga: makes the api call when watcher saga sees the action
export function* EditBankSaga(action) {
  console.log("EditBAnkinsaga",action.data)
  try {
    const response = yield call(postData,action.data,`${basepath}bank/editbank`);
    const data = response.data;
    // dispatch a success action to the store with the new data
    yield put({ type: ADD_BANK_SUCCESS, data });
    openNotificationWithIcon('success', 'Add Bank', 'Bank added successfully');
   action.history.push("/home/depositncredit/bank");
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: ADD_BANK_FAILURE, error })
    alert(error);
    
  }
}