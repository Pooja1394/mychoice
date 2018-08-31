import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { GET_NOTIFICATION_DATA_SUCCESS, GET_NOTIFICATION_DATA_FAILURE } from "../actions/types";

export function getData(data) {
  return axios({
    method: "post",
    url: basepath+`notify/getnotify`+'?limit='+data.limit+'&page='+data.page,
    data:data
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* NotificationSaga(action) {
  try {
    // yield put({ type:"loading" });
    const response = yield call(getData,action.data);
    const data = response.data;
    // dispatch a success action to the store with the new data
    yield put({ type:GET_NOTIFICATION_DATA_SUCCESS, data });
   
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: GET_NOTIFICATION_DATA_FAILURE, error })
    alert(error);
    
  }
}
