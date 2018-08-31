import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { BANK_DETAILS_FILTER_SUCCESS, BANK_DETAILS_FILTER_REQUEST, BANK_DETAILS_FILTER_FAILURE, User_Filter_Call_FAILURE } from "../actions/types";

// function that makes the api request and returns a Promise for response
export function getData(data,url) {
  console.log("toeknnn",localStorage.getItem("token"))
  let token=localStorage.getItem("token")
  console.log("====hello",data)
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "post",
    url: url+'?limit='+data.limit+'&page='+data.page,
    headers:headers,   
    data:data  
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* BankListSaga(action) {
  try {
    const response = yield call(getData,action.data,`${basepath}bank/getbank`);
    const data = response.data;
    console.log("datainbanksaga",data);
    // dispatch a success action to the store with the new data
    yield put({ type: BANK_DETAILS_FILTER_SUCCESS, data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: BANK_DETAILS_FILTER_FAILURE, error })
    alert(error);
    
  }
}