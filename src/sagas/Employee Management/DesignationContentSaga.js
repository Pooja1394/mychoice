import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../../utils/Constant"
import {push} from 'react-router-redux'
import { GET_DESIGNATION_DATA_SUCCESS, GET_DESIGNATION_DATA_FAILURE, SET_DESIGNATION_IN_STORE_SUCCESS } from "../../actions/types";

// function that makes the api request and returns a Promise for response
export function getData(data,url) {
  let token=localStorage.getItem("token")
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
export function* DesignationContentSaga(action) {
  try {
    const response = yield call(getData,action.data,`${basepath}employee/getDesignation`);
    const data = response.data;
    console.log("datainbanksaga",data);
    // dispatch a success action to the store with the new data
    yield put({ type: GET_DESIGNATION_DATA_SUCCESS, data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: GET_DESIGNATION_DATA_FAILURE, error })
    alert(error);
    
  }
}

export function* SetDesignation(action){
  yield put({
      type:SET_DESIGNATION_IN_STORE_SUCCESS,
      data:action.data
  })
}