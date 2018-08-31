import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { USER_REGISTER_CALL_SUCCESS, USER_REGISTER_CALL_FAILURE, User_DATA_Call_SUCCESS, User_DATA_Call_FAILURE, USER_PROFILE_DETAILS_CALL_SUCCESS, USER_PROFILE_DETAILS_CALL_FAILURE } from "../actions/types";
import {postData} from "./CreateUserSagas"
//function that makes the api request and returns a Promise for response
export function getData(username) {
    console.log("user....11",username);
    let data = username;
  return axios({
    method: "post",
    url: basepath+"admin/summary",
    data:{
                userName:username
              }
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* UserProfileDetailsSaga(action) {
  try {
      console.log("user....",action.username);
    // yield put({ type:"loading" });
    const response = yield call(postData,action.username,`${basepath}admin/summary`);
    const data = response.data;
    console.log("response",response);
    // dispatch a success action to the store with the new data
    yield put({ type:USER_PROFILE_DETAILS_CALL_SUCCESS, data }); 
  } 
  catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: USER_PROFILE_DETAILS_CALL_FAILURE, error })
    alert(error);
    
  }
}
