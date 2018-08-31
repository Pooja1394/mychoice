import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { 
    GET_BRANDS_CALL_SUCCESS,
    GET_BRANDS_CALL_FAILURE,
    UPDATE_AMOUNT_SUCCESS,
    UPDATE_AMOUNT_FAILURE,
    UPDATE_AMOUNT_IN_STORE_SUCCESS,
    UPDATE_AMOUNT_IN_INPUT_SUCCESS,
    UPDATE_SELECT_VALUE_SUCCESS,
  } from "../actions/types";

//function that makes the api request and returns a Promise for response
export function getData(data) {
  console.log("dattttaaaa",data)
  let token=localStorage.getItem("token")
  
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "put",
    headers:headers,
    data:data,
    url: basepath+`user/updateamount`,
    });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* UpdateAmountSaga(action) {
  try {
    // yield put({ type:"loading" });
    const response = yield call(getData,action.data);
    const data = response.data;
    // dispatch a success action to the store with the new data
    yield put({ type:UPDATE_AMOUNT_SUCCESS, data });
   
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: UPDATE_AMOUNT_FAILURE, error })
    
    alert(error);
    
  }
}
export function* updateAmountInStore(action){
    yield put({
        type:UPDATE_AMOUNT_IN_STORE_SUCCESS,
        data:action.data
    })
}

export function* updateAmountInInput(action){
  yield put({
      type:UPDATE_AMOUNT_IN_INPUT_SUCCESS,
      data:action.data
  })
}


export function* updateSelectInInput(action){
  yield put({
      type:UPDATE_SELECT_VALUE_SUCCESS,
      data:action.data
  })
}