import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { USER_TABLE_SUCCESS, USER_TABLE_FAILURE, } from "../actions/types";

//function that makes the api request and returns a Promise for response
  
// worker saga: makes the api call when watcher saga sees the action
export function* UsertablecsvSaga(action) {
  try {
    // yield put({ type:"loading" });
    // const response = yield call(getData);
    // const data = response.data;
    console.log("response in users-------",action);
    const data=action.data;
    const value=action.value;
    // // dispatch a success action to the store with the new data
    yield put({ type:USER_TABLE_SUCCESS, data,value });
//    console.log("hellooooo",action.data);
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: USER_TABLE_FAILURE, error })
    
    alert(error);
    
  }
}
