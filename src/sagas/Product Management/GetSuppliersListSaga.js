import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../../utils/Constant"
import {push} from 'react-router-redux'
import { 
    GET_SUPPLIERS_CALL_SUCCESS,
    GET_SUPPLIERS_CALL_FAILURE,
    GET_LOCATION_DATA_SUCCESS,
    GET_LOCATION_DATA_FAILURE
    
  } from "../../actions/types";

//function that makes the api request and returns a Promise for response
export function getData(data) {
  console.log("dattttaaaa",data)
  let token=localStorage.getItem("token")
  // console.log("====hello",token)
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "post",
    headers:headers,
    data:data,
    url: basepath+`supplier/getsupplier`,
    
  });
}
export function getLocationData(data) {
  console.log("dattttaaaa",data)
  let token=localStorage.getItem("token")
  // console.log("====hello",token)
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "get",
    headers:headers,
    url: basepath+`delivery/getdata`,
    
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* GetSuppliersListSaga(action) {
  try {
    // yield put({ type:"loading" });
    const response = yield call(getData,action.data);
    const data = response.data;
    console.log("response in user",response.data);
    // dispatch a success action to the store with the new data
    yield put({ type:GET_SUPPLIERS_CALL_SUCCESS, data });
   
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: GET_SUPPLIERS_CALL_FAILURE, error })
    alert(error);
    
  }
}
export function* GetLocationDataSaga(action) {
  try {
    // yield put({ type:"loading" });
    const response = yield call(getLocationData,action.data);
    const data = response.data;
    console.log("response in user",response.data);
    // dispatch a success action to the store with the new data
    yield put({ type:GET_LOCATION_DATA_SUCCESS, data });
   
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: GET_LOCATION_DATA_FAILURE, error })
    alert(error);
    
  }
}
