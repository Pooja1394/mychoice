import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { USER_REGISTER_CALL_SUCCESS, USER_REGISTER_CALL_FAILURE, User_DATA_Call_SUCCESS, User_DATA_Call_FAILURE } from "../actions/types";

//function that makes the api request and returns a Promise for response
export function getData(data) {
  console.log("dattttaaaa",data)
  return axios({
    method: "post",
    url: basepath+`admin/userlist?page=${data.page}&limit=${data.limit}`,
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* UserListWorkerSaga(action) {
  try {
    // yield put({ type:"loading" });
    const response = yield call(getData,action.data);
    const data = response.data;
    console.log("response in userlist-------",response.data);
    // dispatch a success action to the store with the new data
    yield put({ type:User_DATA_Call_SUCCESS, data });
   
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: User_DATA_Call_FAILURE, error })
    alert(error);
    
  }
}
