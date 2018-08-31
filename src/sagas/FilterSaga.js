import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { USER_REGISTER_CALL_SUCCESS, USER_REGISTER_CALL_FAILURE, User_Filter_Call_SUCCESS, User_Filter_Call_FAILURE } from "../actions/types";

// function that makes the api request and returns a Promise for response
export function postData(data,url) {
  console.log("ggggggggggggg",data);
  
  return axios({
    method: "post",
    url: url+'?limit='+data.limit+'&page='+data.page+'&filtername='+data.filterName+'&filterData='+data.filterData,
     data
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* FilterSaga(action) {
  try {
    console.log("333333333333333",action.data);
    const response = yield call(postData,action.data,`${basepath}admin/userlist`);
    console.log(response);
    const data = response.data;
    console.log("responseinfilter",data);
    // dispatch a success action to the store with the new data
    yield put({ type: User_Filter_Call_SUCCESS, data });
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: User_Filter_Call_FAILURE, error })
    
    alert(error);
    
  }
}